import { NextRequest, NextResponse } from "next/server"
import { sendCapiEvent } from "@/lib/meta-capi"
import { v4 as uuidv4 } from "uuid"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      eventName = "Schedule",
      eventId,
      email,
      phone,
      firstName,
      lastName,
      fbp,
      fbc,
      customData,
    } = body

    const clientIpAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      undefined
    const clientUserAgent = req.headers.get("user-agent") ?? undefined

    const result = await sendCapiEvent({
      eventName,
      eventId: eventId ?? uuidv4(),
      eventTime: Math.floor(Date.now() / 1000),
      email,
      phone,
      firstName,
      lastName,
      clientIpAddress,
      clientUserAgent,
      fbp,
      fbc,
      customData,
      eventSourceUrl: process.env.NEXT_PUBLIC_SITE_URL,
    })

    return NextResponse.json(result, { status: result.success ? 200 : 500 })
  } catch (err) {
    console.error("/api/capi error:", err)
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
