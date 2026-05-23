"use client"

import Image from "next/image"
import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"

export function LogoCTA() {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="bg-[#C8102E] py-6 px-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <Image
          src={siteConfig.brand.logoPath}
          alt={siteConfig.business.name + " logo"}
          width={216}
          height={216}
          className="object-contain"
        />
        <Button
          onClick={scrollToBooking}
          className="bg-black hover:bg-gray-900 text-white font-bold px-8 py-3 rounded-xl min-h-[48px] w-full sm:w-auto text-base"
        >
          Book My Free Class →
        </Button>
      </div>
    </div>
  )
}
