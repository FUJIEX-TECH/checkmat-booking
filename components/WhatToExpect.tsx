const steps = [
  {
    number: "01",
    title: "Arrive 10 Minutes Early",
    description: "Meet your coach, sign the waiver, and get a quick tour of the facility.",
  },
  {
    number: "02",
    title: "Warm-Up & Basics",
    description: "15 minutes of movement drills and fundamental BJJ positions — no prior fitness required.",
  },
  {
    number: "03",
    title: "Technique of the Day",
    description: "Learn one real BJJ technique, broken down step-by-step by a black belt instructor.",
  },
  {
    number: "04",
    title: "Light Drilling",
    description: "Practice the move with a friendly training partner. No sparring on day one — just controlled, safe reps.",
  },
]

export function WhatToExpect() {
  return (
    <section className="py-16 sm:py-24 bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold mb-4">
          What to Expect on Day One
        </h2>
        <p className="text-center text-white/60 text-lg mb-14 max-w-xl mx-auto">
          We&apos;ve taught hundreds of beginners. Here&apos;s exactly what happens in your free class.
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Connector line — desktop only */}
          <div className="hidden md:block absolute top-8 left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] h-0.5 bg-[#C8102E]/30" aria-hidden="true" />

          <div className="grid md:grid-cols-4 gap-8 md:gap-4">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center text-center relative">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#C8102E] text-white font-extrabold text-xl z-10 shadow-lg mb-4 flex-shrink-0">
                  {step.number}
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
