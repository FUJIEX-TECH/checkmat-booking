"use client"

import { useState } from "react"
import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { CheckCircle, Loader2 } from "lucide-react"

const DAYS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

interface Props {
  slug: string
}

export function BookingForm({ slug }: Props) {
  const cls = siteConfig.cal.classes.find((c) => c.slug === slug)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  if (!cls) return null

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
        body: JSON.stringify({ name, email, phone, program: cls.label, day, time }),
      })

      if (!res.ok) throw new Error("Failed to submit")

      const params = new URLSearchParams({ name, scheduled_at: `${day} ${time}` }).toString()
      window.location.href = `/confirmed?${params}`
    } catch {
      setError("Something went wrong. Please try again or call us.")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Slot selector */}
      <div>
        <p className="text-white font-semibold mb-3">Select a day and time</p>
        <div className="space-y-3">
          {sortedDays.map((day) => (
            <div key={day}>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{day}</p>
              <div className="flex flex-wrap gap-2">
                {groupedSlots[day].map((time) => {
                  const val = `${day}|${time}`
                  const selected = selectedSlot === val
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setSelectedSlot(val)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                        selected
                          ? "bg-[#C8102E] border-[#C8102E] text-white"
                          : "bg-white/5 border-white/20 text-white/80 hover:border-[#C8102E] hover:text-white"
                      }`}
                    >
                      {selected && <CheckCircle className="inline h-3.5 w-3.5 mr-1.5 -mt-0.5" />}
                      {time}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Full name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#C8102E] transition-colors"
        />
        <input
          type="email"
          placeholder="Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#C8102E] transition-colors"
        />
        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#C8102E] transition-colors"
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#C8102E] hover:bg-[#a50d25] text-white font-bold py-3 rounded-xl min-h-[48px] text-base"
      >
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Confirm My Free Class →"}
      </Button>
    </form>
  )
}
