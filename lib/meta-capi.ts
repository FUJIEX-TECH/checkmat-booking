import crypto from "crypto"

function hashValue(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex")
}

export interface CapiEventPayload {
  eventName: string
  eventId: string
  eventTime: number
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  clientIpAddress?: string
  clientUserAgent?: string
  fbp?: string
  fbc?: string
  customData?: Record<string, unknown>
  eventSourceUrl?: string
}

export async function sendCapiEvent(payload: CapiEventPayload): Promise<{ success: boolean; error?: string }> {
  const pixelId = process.env.META_PIXEL_ID
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN

  if (!pixelId || !accessToken) {
    console.error("META_PIXEL_ID or META_CAPI_ACCESS_TOKEN not set")
    return { success: false, error: "Missing env vars" }
  }

  const userData: Record<string, string | string[]> = {}

  if (payload.email) userData.em = hashValue(payload.email)
  if (payload.phone) {
    const cleaned = payload.phone.replace(/\D/g, "")
    userData.ph = hashValue(cleaned)
  }
  if (payload.firstName) userData.fn = hashValue(payload.firstName)
  if (payload.lastName) userData.ln = hashValue(payload.lastName)
  if (payload.clientIpAddress) userData.client_ip_address = payload.clientIpAddress
  if (payload.clientUserAgent) userData.client_user_agent = payload.clientUserAgent
  if (payload.fbp) userData.fbp = payload.fbp
  if (payload.fbc) userData.fbc = payload.fbc

  const event = {
    event_name: payload.eventName,
    event_id: payload.eventId,
    event_time: payload.eventTime,
    action_source: "website",
    event_source_url: payload.eventSourceUrl ?? process.env.NEXT_PUBLIC_SITE_URL,
    user_data: userData,
    ...(payload.customData ? { custom_data: payload.customData } : {}),
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [event] }),
      }
    )

    if (!res.ok) {
      const text = await res.text()
      console.error("CAPI error:", text)
      return { success: false, error: text }
    }

    return { success: true }
  } catch (err) {
    console.error("CAPI fetch error:", err)
    return { success: false, error: String(err) }
  }
}
