"use client"

import { PlaceholderImage } from "@/components/PlaceholderImage"
import { siteConfig } from "@/config/site"
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-black text-white/80 py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-10 w-10">
                <PlaceholderImage
                  src={siteConfig.brand.logoPath}
                  alt={siteConfig.business.name + " logo"}
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <span className="font-extrabold text-white text-lg">{siteConfig.business.name}</span>
            </div>
            <p className="text-sm leading-relaxed text-white/60">{siteConfig.business.tagline}</p>
            <div className="flex gap-4 mt-4">
              {siteConfig.business.socialLinks.instagram && (
                <a
                  href={siteConfig.business.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:text-white transition-colors text-sm font-semibold flex items-center gap-1"
                >
                  Instagram <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              )}
              {siteConfig.business.socialLinks.facebook && (
                <a
                  href={siteConfig.business.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="hover:text-white transition-colors text-sm font-semibold flex items-center gap-1"
                >
                  Facebook <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-[#C8102E]" aria-hidden="true" />
                <a
                  href={siteConfig.business.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.business.address}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-[#C8102E]" aria-hidden="true" />
                <a
                  href={`tel:${siteConfig.business.phoneRaw}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.business.phone}
                </a>
              </li>
              {siteConfig.business.email && (
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 flex-shrink-0 text-[#C8102E]" aria-hidden="true" />
                  <a
                    href={`mailto:${siteConfig.business.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {siteConfig.business.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Book Free Class", href: "#booking" },
                { label: "Class Schedule", href: "#booking" },
                { label: "FAQ", href: "#faq" },
                { label: "Location", href: "#location" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="hover:text-white transition-colors"
                    onClick={(e) => {
                      if (href.startsWith("#")) {
                        e.preventDefault()
                        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
                      }
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-sm text-white/40">
          © {year} {siteConfig.business.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
