"use client"

import { MapPin, Phone, Clock } from "lucide-react"
import { siteConfig } from "@/config/site"

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

function getTodayName(): string {
  return DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]
}

export function Location() {
  const today = getTodayName()

  return (
    <section className="py-16 sm:py-24 bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold mb-4">Find Us</h2>
        <p className="text-center text-white/60 text-lg mb-12 max-w-xl mx-auto">
          We&apos;re easy to find, with free parking right out front.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Map */}
          <div className="rounded-2xl overflow-hidden aspect-video w-full shadow-xl">
            <iframe
              src={siteConfig.business.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Checkmat Brentwood location on Google Maps"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6">
            <div className="flex gap-3">
              <MapPin className="h-6 w-6 text-[#C8102E] flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-bold text-lg">Address</p>
                <a
                  href={siteConfig.business.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {siteConfig.business.address}
                </a>
              </div>
            </div>

            <div className="flex gap-3">
              <Phone className="h-6 w-6 text-[#C8102E] flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-bold text-lg">Phone</p>
                <a
                  href={`tel:${siteConfig.business.phoneRaw}`}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {siteConfig.business.phone}
                </a>
              </div>
            </div>

            <div className="flex gap-3">
              <Clock className="h-6 w-6 text-[#C8102E] flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div className="w-full">
                <p className="font-bold text-lg mb-2">Hours</p>
                <ul className="space-y-1">
                  {siteConfig.business.hours.map((h) => (
                    <li
                      key={h.day}
                      className={`flex justify-between text-sm ${
                        h.day === today ? "text-[#C8102E] font-bold" : "text-white/70"
                      }`}
                    >
                      <span>{h.day}</span>
                      <span>
                        {h.open === "Closed" ? "Closed" : `${h.open} – ${h.close}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
