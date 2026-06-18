import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { siteConfig } from "@/config/site"
import { v4 as uuidv4 } from "uuid"

function verifySignature(body: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac("sha256", secret)
  hmac.update(body)
  const expected = `sha256=${hmac.digest("hex")}`
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const signature = req.headers.get("x-cal-signature-256") ?? ""
  const secret = process.env.CAL_WEBHOOK_SECRET ?? ""

  if (secret && !verifySignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
  }

  let payload: Record<string, unknown>
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const triggerEvent = (payload.triggerEvent as string) ?? ""

  if (triggerEvent !== "BOOKING_CREATED" && triggerEvent !== "BOOKING_RESCHEDULED") {
    return NextResponse.json({ received: true, skipped: true })
  }

  const booking = (payload.payload as Record<string, unknown>) ?? {}
  const attendees = (booking.attendees as Array<Record<string, unknown>>) ?? []
  const attendee = attendees[0] ?? {}
  const metadata = (booking.metadata as Record<string, string>) ?? {}

  const name = (attendee.name as string) ?? ""
  const email = (attendee.email as string) ?? ""
  const phone = (metadata["phone"] as string) ?? ""
  const leadId = (metadata["lead_id"] as string) ?? ""
  const utmSource = (metadata["utm_source"] as string) ?? ""
  const utmCampaign = (metadata["utm_campaign"] as string) ?? ""
  const scheduledAt = (booking.startTime as string) ?? new Date().toISOString()

  const leadPayload = {
    customer: {
      name,
      email,
      number: phone,
    },
  }

  try {
    const backendUrl = process.env.ROLLCALL_BACKEND_URL ?? siteConfig.webhook.leadEndpoint
    await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadPayload),
    })
  } catch (err) {
    console.error("Error forwarding to rollcall backend:", err)
  }

  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ""
    await fetch(`${siteUrl}/api/capi`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "Schedule",
        eventId: uuidv4(),
        email,
        phone,
        firstName: name.split(" ")[0],
        lastName: name.split(" ").slice(1).join(" "),
        customData: { lead_id: leadId, utm_source: utmSource, utm_campaign: utmCampaign },
      }),
    })
  } catch (err) {
    console.error("Error firing CAPI from webhook:", err)
  }

  return NextResponse.json({ received: true })
}
