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
    customer: {
      name,
      email,
      number: phone ?? "",
    },
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
