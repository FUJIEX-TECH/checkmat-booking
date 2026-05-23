import { Users, Package, Lock } from "lucide-react"

const benefits = [
  {
    icon: Users,
    heading: "No Experience Needed",
    body: "Our coaches start you from zero. The majority of students walking through our door are first-timers — just like you.",
  },
  {
    icon: Package,
    heading: "All Equipment Provided",
    body: "Just show up in workout clothes. We provide a clean gi for your trial class so you don't have to buy anything.",
  },
  {
    icon: Lock,
    heading: "Zero Commitment",
    body: "One free class, no card required. If you love it, we'll talk membership. If not, no hard feelings.",
  },
]

export function Benefits() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-black mb-4">
          Why Try Checkmat Brentwood?
        </h2>
        <p className="text-center text-gray-500 text-lg mb-12 max-w-xl mx-auto">
          We make it as easy as possible to take that first step.
        </p>
        <div className="grid sm:grid-cols-3 gap-8">
          {benefits.map(({ icon: Icon, heading, body }) => (
            <div
              key={heading}
              className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-[#C8102E]/10">
                <Icon className="h-7 w-7 text-[#C8102E]" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-black">{heading}</h3>
              <p className="text-gray-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
