"use client"

import { useSearchParams } from "next/navigation"
import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect, Suspense } from "react"
import { siteConfig } from "@/config/site"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

function CalEmbedInner({ slug }: { slug: string }) {
  const params = useSearchParams()
  const name = params.get("name") ?? ""
  const email = params.get("email") ?? ""
  const phone = params.get("phone") ?? ""
  const leadId = params.get("lead_id") ?? ""
  const utmSource = params.get("utm_source") ?? ""
  const utmCampaign = params.get("utm_campaign") ?? ""

  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi({})
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: siteConfig.brand.primaryColor } },
        hideEventTypeDetails: false,
      })
      cal("on", {
        action: "bookingSuccessful",
        callback: (e: unknown) => {
          const eventId = crypto.randomUUID()

          // Client-side pixel
          if (typeof window !== "undefined" && window.fbq) {
            window.fbq("track", "Schedule", {}, { eventID: eventId })
          }

          // Server-side CAPI
          fetch("/api/capi", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              eventName: "Schedule",
              eventId,
              email,
              phone,
              firstName: name.split(" ")[0],
              lastName: name.split(" ").slice(1).join(" "),
              customData: {
                lead_id: leadId,
                utm_source: utmSource,
                utm_campaign: utmCampaign,
              },
            }),
          })

          // Redirect para /confirmed extraindo dados do evento
          const data = (e as { data?: { booking?: { startTime?: string } } })?.data
          const startTime = data?.booking?.startTime ?? ""
          const qs = new URLSearchParams({
            ...(name && { name }),
            ...(startTime && { scheduled_at: startTime }),
          }).toString()
          window.location.href = `/confirmed${qs ? `?${qs}` : ""}`
        },
      })
    })()
  }, [name, email, phone, leadId, utmSource, utmCampaign])

  return (
    <Cal
      calLink={`${siteConfig.cal.username}/${slug}`}
      style={{ width: "100%", height: "100%", minHeight: 600, overflow: "scroll" }}
      config={{
        name,
        email,
        "metadata[phone]": phone,
        "metadata[lead_id]": leadId,
        "metadata[utm_source]": utmSource,
        "metadata[utm_campaign]": utmCampaign,
        "metadata[source]": "manual_booking_page",
      }}
    />
  )
}

export function CalEmbed({ slug }: { slug: string }) {
  return (
    <Suspense fallback={<div className="h-[600px] flex items-center justify-center text-gray-400">Loading calendar…</div>}>
      <CalEmbedInner slug={slug} />
    </Suspense>
  )
}
