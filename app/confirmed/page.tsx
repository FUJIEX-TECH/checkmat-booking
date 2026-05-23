"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { useEffect } from "react"
import { CheckCircle, Phone, MapPin, Calendar, Clock } from "lucide-react"
import { siteConfig } from "@/config/site"
import Link from "next/link"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

function formatIcsDate(isoString: string): string {
  return isoString.replace(/[-:]/g, "").split(".")[0] + "Z"
}

function ConfirmedInner() {
  const params = useSearchParams()
  const date = params.get("date") ?? ""
  const time = params.get("time") ?? ""
  const name = params.get("name") ?? ""

  const scheduledAt = params.get("scheduled_at") ?? ""

  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "CompleteRegistration")
    }
  }, [])

  const formattedDate = scheduledAt
    ? new Date(scheduledAt).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: siteConfig.business.timezone,
      })
    : date

  const formattedTime = scheduledAt
    ? new Date(scheduledAt).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: siteConfig.business.timezone,
        timeZoneName: "short",
      })
    : time

  const googleCalUrl = scheduledAt
    ? (() => {
        const start = formatIcsDate(scheduledAt)
        const endDt = new Date(new Date(scheduledAt).getTime() + 60 * 60 * 1000)
        const end = formatIcsDate(endDt.toISOString())
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Free+BJJ+Trial+at+Checkmat+Brentwood&dates=${start}/${end}&location=640+Harvest+Park+Drive+Brentwood+CA+94513&details=Your+free+trial+class+at+Checkmat+Brentwood.+Arrive+10+minutes+early.`
      })()
    : "#"

  const icsContent = scheduledAt
    ? (() => {
        const start = formatIcsDate(scheduledAt)
        const endDt = new Date(new Date(scheduledAt).getTime() + 60 * 60 * 1000)
        const end = formatIcsDate(endDt.toISOString())
        return [
          "BEGIN:VCALENDAR",
          "VERSION:2.0",
          "BEGIN:VEVENT",
          `DTSTART:${start}`,
          `DTEND:${end}`,
          "SUMMARY:Free BJJ Trial at Checkmat Brentwood",
          "LOCATION:640 Harvest Park Drive Brentwood CA 94513",
          "DESCRIPTION:Your free trial class. Arrive 10 minutes early.",
          "END:VEVENT",
          "END:VCALENDAR",
        ].join("\n")
      })()
    : null

  const downloadIcs = () => {
    if (!icsContent) return
    const blob = new Blob([icsContent], { type: "text/calendar" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "checkmat-trial-class.ics"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-start pt-12 pb-24 px-4">
      {/* Success card */}
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8 sm:p-10 text-center mb-6">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" aria-hidden="true" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black mb-2">
          {name ? `You're booked, ${name.split(" ")[0]}!` : "You're booked!"}
        </h1>
        <p className="text-gray-500 text-lg mb-6">
          Your free trial class is confirmed. We&apos;ll send a text reminder before your class.
        </p>

        {(formattedDate || formattedTime) && (
          <div className="bg-gray-50 rounded-2xl p-5 mb-6 text-left space-y-3">
            {formattedDate && (
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-[#C8102E] flex-shrink-0" aria-hidden="true" />
                <span className="font-semibold text-gray-900">{formattedDate}</span>
              </div>
            )}
            {formattedTime && (
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-[#C8102E] flex-shrink-0" aria-hidden="true" />
                <span className="font-semibold text-gray-900">{formattedTime}</span>
              </div>
            )}
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-[#C8102E] flex-shrink-0 mt-0.5" aria-hidden="true" />
              <a
                href={siteConfig.business.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gray-900 hover:text-[#C8102E] transition-colors"
              >
                {siteConfig.business.address}
              </a>
            </div>
          </div>
        )}

        {/* Add to calendar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <a
            href={googleCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#C8102E] text-white font-bold py-3 rounded-xl hover:bg-[#a50d25] transition-colors min-h-[48px]"
          >
            <Calendar className="h-4 w-4" aria-hidden="true" />
            Add to Google Calendar
          </a>
          <button
            onClick={downloadIcs}
            disabled={!icsContent}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed min-h-[48px]"
          >
            <Calendar className="h-4 w-4" aria-hidden="true" />
            Apple / Outlook (.ics)
          </button>
        </div>

        {/* Call button */}
        <a
          href={`tel:${siteConfig.business.phoneRaw}`}
          className="flex items-center justify-center gap-2 w-full border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:border-[#C8102E] hover:text-[#C8102E] transition-colors min-h-[48px]"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          {siteConfig.business.phone}
        </a>
      </div>

      {/* What to bring */}
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-sm p-6 sm:p-8 mb-6">
        <h2 className="font-bold text-xl text-black mb-4">What to Bring</h2>
        <ul className="space-y-3 text-gray-700">
          {[
            "Comfortable workout clothes (shorts + t-shirt)",
            "Water bottle",
            "Flip-flops or sandals for the changing area",
            "A positive attitude — that's it!",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="text-green-500 font-bold text-lg leading-tight">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-gray-500 bg-gray-50 rounded-xl p-3">
          <strong>Reminder:</strong> Arrive 10 minutes early to meet your coach and sign the waiver.
          We&apos;ll provide a clean gi for your first class.
        </p>
      </div>

      <Link
        href="/"
        className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
      >
        ← Back to main page
      </Link>
    </main>
  )
}

export default function ConfirmedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <ConfirmedInner />
    </Suspense>
  )
}
