"use client"

import { useEffect, useState } from "react"

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 md:hidden bg-white border-t border-gray-200 shadow-2xl">
      <button
        onClick={scrollToBooking}
        className="w-full bg-[#C8102E] hover:bg-[#a50d25] text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-colors min-h-[56px] active:scale-[0.98]"
        aria-label="Book my free class"
      >
        Book My Free Class →
      </button>
    </div>
  )
}
