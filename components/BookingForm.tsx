"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { CheckCircle, Loader2, Clock, Calendar, MapPin, User, Mail, Phone } from "lucide-react"

const DAYS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

function addMinutes(time: string, minutes: number): string {
  const [timePart, period] = time.split(" ")
  const [h, m] = timePart.split(":").map(Number)
  let total = (h % 12) * 60 + m + (period === "PM" ? 720 : 0) + minutes
  const newPeriod = total >= 720 && total < 1440 ? "PM" : "AM"
  total = total % 1440
  const newH = Math.floor(total / 60) % 12 || 12
  const newM = total % 60
  return `${newH}:${newM.toString().padStart(2, "0")} ${newPeriod}`
}

interface Props {
  slug: string
}

export function BookingForm({ slug }: Props) {
  const cls = siteConfig.cal.classes.find((c) => c.slug === slug)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [leadId, setLeadId] = useState("")
  const [utmSource, setUtmSource] = useState("")
  const [utmCampaign, setUtmCampaign] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("name")) setName(params.get("name")!)
    if (params.get("email")) setEmail(params.get("email")!)
    if (params.get("phone")) setPhone(params.get("phone")!)
    if (params.get("lead_id")) setLeadId(params.get("lead_id")!)
    if (params.get("utm_source")) setUtmSource(params.get("utm_source")!)
    if (params.get("utm_campaign")) setUtmCampaign(params.get("utm_campaign")!)
  }, [])

  const router = useRouter()

  if (!cls) return null

  const duration = cls.description.match(/(\d+)\s*min/)?.[1]

  const groupedSlots = cls.slots.reduce<Record<string, string[]>>((acc, s) => {
    if (!acc[s.day]) acc[s.day] = []
    acc[s.day].push(s.time)
    return acc
  }, {})

  const sortedDays = Object.keys(groupedSlots).sort(
    (a, b) => DAYS_ORDER.indexOf(a) - DAYS_ORDER.indexOf(b)
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSlot || !name || !email) {
      setError("Please fill in all required fields and select a time slot.")
      return
    }
    setError("")
    setLoading(true)

    const [day, time] = selectedSlot.split("|")

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, program: cls.label, day, time, lead_id: leadId, utm_source: utmSource, utm_campaign: utmCampaign }),
      })

      if (!res.ok) throw new Error("Failed to submit")

      const params = new URLSearchParams({ name, scheduled_at: `${day} ${time}` }).toString()
      router.push(`/confirmed?${params}`)
    } catch {
      setError("Something went wrong. Please try again or call us.")
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Class info banner */}
      <div className="rounded-2xl bg-[#C8102E]/10 border border-[#C8102E]/30 p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <h3 className="text-white font-extrabold text-lg">{cls.label}</h3>
              {cls.ageRange && (
                <span className="text-xs font-bold uppercase tracking-wide bg-[#C8102E] text-white px-2 py-0.5 rounded-full">
                  {cls.ageRange}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-white/60">
              {duration && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[#C8102E]" />
                  {duration} minutes
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#C8102E]" />
                {siteConfig.business.address}
              </span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Slot selector */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-4 w-4 text-[#C8102E]" />
            <p className="text-white font-semibold">Choose a day and time</p>
          </div>
          <div className="space-y-4">
            {sortedDays.map((day) => (
              <div key={day} className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-3">{day}</p>
                <div className="flex flex-wrap gap-2">
                  {groupedSlots[day].map((time) => {
                    const val = `${day}|${time}`
                    const selected = selectedSlot === val
                    const endTime = addMinutes(time, cls.durationMin)
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setSelectedSlot(val)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                          selected
                            ? "bg-[#C8102E] border-[#C8102E] text-white shadow-lg shadow-[#C8102E]/20"
                            : "bg-black/30 border-white/20 text-white/80 hover:border-[#C8102E] hover:text-white"
                        }`}
                      >
                        {selected
                          ? <CheckCircle className="h-3.5 w-3.5 flex-shrink-0" />
                          : <Clock className="h-3.5 w-3.5 flex-shrink-0 text-white/40" />
                        }
                        {time} – {endTime}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Fields */}
        <div>
          <p className="text-white font-semibold mb-4 flex items-center gap-2">
            <User className="h-4 w-4 text-[#C8102E]" />
            Your information
          </p>
          <div className="space-y-3">
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                type="text"
                placeholder="Full name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-[#C8102E] transition-colors"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                type="email"
                placeholder="Email address *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-[#C8102E] transition-colors"
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-[#C8102E] transition-colors"
              />
            </div>
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#C8102E] hover:bg-[#a50d25] text-white font-bold py-3 rounded-xl min-h-[52px] text-base shadow-lg shadow-[#C8102E]/20"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Confirm My Free Class →"
          )}
        </Button>

        <p className="text-center text-xs text-white/30">
          No payment required. Free trial class at {siteConfig.business.address}.
        </p>
      </form>
    </div>
  )
}
