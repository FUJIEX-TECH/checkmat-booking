import { Hero } from "@/components/Hero"
import { LogoCTA } from "@/components/LogoCTA"
import { TrustBadges } from "@/components/TrustBadges"
import { Benefits } from "@/components/Benefits"
import { WhatToExpect } from "@/components/WhatToExpect"
import { Coaches } from "@/components/Coaches"
import { BookingSection } from "@/components/BookingSection"
import { SocialProof } from "@/components/SocialProof"
import { Location } from "@/components/Location"
import { FAQ } from "@/components/FAQ"
import { FinalCTA } from "@/components/FinalCTA"
import { Footer } from "@/components/Footer"
import { StickyMobileCTA } from "@/components/StickyMobileCTA"

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoCTA />
      <TrustBadges />
      <Benefits />
      <WhatToExpect />
      <Coaches />
      <BookingSection />
      <SocialProof />
      <div id="location">
        <Location />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      <FinalCTA />
      <Footer />
      <StickyMobileCTA />
    </>
  )
}
