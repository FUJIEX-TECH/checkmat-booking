import { PlaceholderImage } from "@/components/PlaceholderImage"
import { siteConfig } from "@/config/site"

export function Coaches() {
  const coach = siteConfig.coaches[0]

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-black mb-4">
          Meet Your Coach
        </h2>
        <p className="text-center text-gray-500 text-lg mb-12 max-w-xl mx-auto">
          World-class instructor who remembers what it was like to be a beginner.
        </p>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10">
          <div className="relative h-56 w-56 flex-shrink-0 rounded-full overflow-hidden ring-4 ring-[#C8102E]/20 shadow-xl">
            <PlaceholderImage
              src={coach.photo}
              alt={coach.name}
              fill
              sizes="224px"
              className="object-cover"
              fallbackLabel="Coach photo"
            />
          </div>
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-2xl font-bold text-black">{coach.name}</h3>
            <span className="inline-block bg-black text-white text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mt-2 mb-4">
              {coach.belt}
            </span>
            <p className="text-gray-600 text-base leading-relaxed">{coach.bio}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
