"use client"

import { useState } from "react"
import { BookingForm } from "@/components/BookingForm"
import { siteConfig } from "@/config/site"
import { ChevronLeft, Heart, Star, Shield, Trophy, Users, Dumbbell, Swords } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const classIcons: Record<string, LucideIcon> = {
  "toddler-and-me": Heart,
  "little-champions": Star,
  "legacy-45": Shield,
  "legacy-60": Shield,
  "elite-comp-team": Trophy,
  "adult-juvenile-fundamentals": Users,
  "adult-jiu-jitsu": Swords,
  "youth-wrestling": Dumbbell,
  "youth-muay-thai": Dumbbell,
  "adult-muay-thai": Dumbbell,
}

export function BookingSection() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const classes = siteConfig.cal.classes

  return (
    <section id="booking" className="py-16 sm:py-24 bg-gray-950 scroll-mt-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Book Your Free Class
          </h2>
          <p className="text-white/60 text-lg max-w-md mx-auto">
            {selectedSlug ? "Pick a date and time below." : "Choose your program to get started."}
          </p>
        </div>

        {!selectedSlug ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {classes.map((c) => {
              const Icon = classIcons[c.slug] ?? Shield
              return (
                <button
                  key={c.slug}
                  onClick={() => setSelectedSlug(c.slug)}
                  className="flex items-start gap-4 text-left p-5 rounded-2xl border-2 border-white/10 bg-white/5 hover:border-[#C8102E] hover:bg-white/10 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex-shrink-0 h-11 w-11 rounded-xl bg-[#C8102E]/10 flex items-center justify-center group-hover:bg-[#C8102E] transition-colors">
                    <Icon className="h-5 w-5 text-[#C8102E] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="font-bold text-white text-base group-hover:text-[#C8102E] transition-colors">
                        {c.label}
                      </p>
                      {c.ageRange && (
                        <span className="text-xs font-bold uppercase tracking-wide bg-[#C8102E] text-white px-2 py-0.5 rounded-full">
                          {c.ageRange}
                        </span>
                      )}
                    </div>
                    <p className="text-white/50 text-sm">{c.description}</p>
                  </div>
                </button>
              )
            })}
          </div>
        ) : (
          <>
            <button
              onClick={() => setSelectedSlug(null)}
              className="flex items-center gap-1 text-sm text-white/40 hover:text-[#C8102E] transition-colors mb-4"
            >
              <ChevronLeft className="h-4 w-4" />
              Change program
            </button>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <BookingForm slug={selectedSlug} />
            </div>
          </>
        )}

        <p className="text-center text-sm text-white/40 mt-4">
          Having trouble?{" "}
          <a
            href={`tel:${siteConfig.business.phoneRaw}`}
            className="text-[#C8102E] font-semibold hover:underline"
          >
            Call us at {siteConfig.business.phone}
          </a>
        </p>
      </div>
    </section>
  )
}
