import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { siteConfig } from "@/config/site"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://checkmat.fujiex.com.br"),
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://checkmat.fujiex.com.br",
    siteName: siteConfig.business.name,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.business.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
}

const PIXEL_ID = process.env.META_PIXEL_ID ?? siteConfig.meta.pixelId

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "SportsActivityLocation"],
  name: siteConfig.business.name,
  description: siteConfig.seo.description,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://checkmat.fujiex.com.br",
  telephone: siteConfig.business.phone,
  email: siteConfig.business.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "640 Harvest Park Drive",
    addressLocality: "Brentwood",
    addressRegion: "CA",
    postalCode: "94513",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.business.coordinates.lat,
    longitude: siteConfig.business.coordinates.lng,
  },
  openingHoursSpecification: siteConfig.business.hours
    .filter((h) => h.open !== "Closed")
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${h.day}`,
      opens: h.open,
      closes: h.close,
    })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "200",
  },
  sport: "Brazilian Jiu-Jitsu",
  priceRange: "$",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        {children}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={"https://www.facebook.com/tr?id=" + PIXEL_ID + "&ev=PageView&noscript=1"}
            alt=""
          />
        </noscript>
      </body>
    </html>
  )
}
