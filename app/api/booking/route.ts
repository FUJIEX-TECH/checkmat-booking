import { NextRequest, NextResponse } from "next/server"
import { siteConfig } from "@/config/site"

export async function POST(req: NextRequest) {
  const { name, email, phone, program, day, time } = await req.json()

  if (!name || !email || !program || !day || !time) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const leadPayload = {
    name,
    email,
    phone: phone ?? "",
    lead_id: "",
    scheduled_at: `${day} ${time}`,
    source: "manual_booking_page",
    utm_source: "",
    utm_campaign: "",
    program,
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

  return NextResponse.json({ success: true })
}
