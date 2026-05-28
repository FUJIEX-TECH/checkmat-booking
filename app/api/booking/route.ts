import { NextRequest, NextResponse } from "next/server"
import { siteConfig } from "@/config/site"
import { saveLead } from "@/lib/redis"
import { sendBookingEmails } from "@/lib/email"

export async function POST(req: NextRequest) {
  const { name, email, phone, program, day, time, lead_id, utm_source, utm_campaign } = await req.json()

  if (!name || !email || !program || !day || !time) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const leadPayload = {
    name,
    email,
    phone: phone ?? "",
    lead_id: lead_id ?? "",
    scheduled_at: `${day} ${time}`,
    source: "manual_booking_page",
    utm_source: utm_source ?? "",
    utm_campaign: utm_campaign ?? "",
    program,
  }

  await Promise.allSettled([
    fetch(process.env.ROLLCALL_BACKEND_URL ?? siteConfig.webhook.leadEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadPayload),
    }),
    saveLead({ name, email, phone: phone ?? "", program, day, time, lead_id: lead_id ?? "", utm_source: utm_source ?? "", utm_campaign: utm_campaign ?? "" }),
    sendBookingEmails({ name, email, phone: phone ?? "", program, day, time }),
  ])

  return NextResponse.json({ success: true })
}
