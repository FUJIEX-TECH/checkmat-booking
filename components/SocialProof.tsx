"use client"

import { Star, ExternalLink, Quote } from "lucide-react"
import { siteConfig } from "@/config/site"

export function SocialProof() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-black mb-3">
          What Our Students Say
        </h2>
        <div className="flex justify-center items-center gap-2 mb-12">
          <div className="flex" aria-label="5 star rating">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-gray-600 font-semibold">5.0 · 200+ reviews on Google</span>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {siteConfig.testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 flex flex-col gap-4"
            >
              <Quote className="h-8 w-8 text-[#C8102E]/30 flex-shrink-0" aria-hidden="true" />

              <blockquote className="text-gray-700 text-base leading-relaxed flex-1">
                {t.text}
              </blockquote>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div>
                  <p className="font-bold text-black text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
                <div className="flex" aria-label={`${t.rating} stars`}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href={siteConfig.business.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#C8102E] font-semibold hover:underline"
          >
            Read more reviews on Google
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
