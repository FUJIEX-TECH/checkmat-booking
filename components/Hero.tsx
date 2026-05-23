"use client"

import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        aria-hidden="true"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white py-24">
        {/* Eyebrow */}
        <p className="text-[#C8102E] font-bold tracking-widest uppercase text-sm sm:text-base mb-4">
          Checkmat Brentwood · Brentwood, CA
        </p>

        {/* Headline */}
        <h1 className="font-extrabold leading-tight tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6">
          Your First Brazilian Jiu-Jitsu
          <br />
          <span className="text-[#C8102E]">Class is on Us</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
          Train at Northern California&apos;s most respected BJJ academy.
          No experience required. No commitment.
        </p>

        {/* CTA */}
        <Button
          onClick={scrollToBooking}
          size="lg"
          className="bg-[#C8102E] hover:bg-[#a50d25] text-white font-bold text-lg sm:text-xl px-10 py-6 rounded-xl shadow-2xl transition-all duration-200 hover:scale-105 min-h-[56px]"
          aria-label="Book my free class"
        >
          Book My Free Class →
        </Button>

        {/* Trust line */}
        <div className="mt-6 flex items-center justify-center gap-2 text-white/80">
          <div className="flex" aria-label="5 star rating">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-sm sm:text-base">Rated 5.0 on Google by 200+ students</span>
        </div>

        {/* Scroll hint */}
        <div className="mt-16 animate-bounce" aria-hidden="true">
          <svg className="w-6 h-6 mx-auto text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
