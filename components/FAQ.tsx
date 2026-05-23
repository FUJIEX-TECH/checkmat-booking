import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { siteConfig } from "@/config/site"

export function FAQ() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-black mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-500 text-lg mb-10 max-w-md mx-auto">
          Still have questions? Call us at{" "}
          <a
            href={`tel:${siteConfig.business.phoneRaw}`}
            className="text-[#C8102E] font-semibold hover:underline"
          >
            {siteConfig.business.phone}
          </a>
        </p>

        <Accordion className="space-y-2">
          {siteConfig.faq.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-gray-200 rounded-xl px-4 data-[state=open]:border-[#C8102E]/30"
            >
              <AccordionTrigger className="font-semibold text-left text-gray-900 py-4 hover:no-underline hover:text-[#C8102E]">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4 leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
