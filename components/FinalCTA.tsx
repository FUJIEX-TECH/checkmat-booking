"use client"

import { Button } from "@/components/ui/button"

export function FinalCTA() {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="py-16 sm:py-20 bg-[#C8102E]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center text-white">
        <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight">
          Your Mat Awaits
        </h2>
        <p className="text-white/90 text-lg sm:text-xl mb-8 max-w-xl mx-auto">
          Every black belt started exactly where you are today. Take the first step.
        </p>
        <Button
          onClick={scrollToBooking}
          size="lg"
          className="bg-white text-[#C8102E] hover:bg-gray-100 font-bold text-lg sm:text-xl px-10 py-6 rounded-xl shadow-2xl transition-all duration-200 hover:scale-105 min-h-[56px]"
          aria-label="Book my free class"
        >
          Book My Free Class →
        </Button>
        <p className="mt-4 text-white/70 text-sm">No card required · No experience needed · 100% free</p>
      </div>
    </section>
  )
}
