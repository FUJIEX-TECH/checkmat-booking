import { Shield, Award, Star, BadgeCheck } from "lucide-react"

const badges = [
  { icon: Shield, label: "Checkmat HQ Affiliate" },
  { icon: Award, label: "IBJJF Registered" },
  { icon: Star, label: "5-Star Rated" },
  { icon: BadgeCheck, label: "Black Belt Instructors" },
]

export function TrustBadges() {
  return (
    <section className="bg-black py-6 border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-2 text-white/90">
              <Icon className="h-5 w-5 text-[#C8102E] flex-shrink-0" aria-hidden="true" />
              <span className="text-sm font-semibold tracking-wide whitespace-nowrap">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
