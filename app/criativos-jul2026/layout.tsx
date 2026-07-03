import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Criativos — Julho 2026 · Checkmat Brentwood",
  robots: { index: false, follow: false },
}

export default function CriativosLayout({ children }: { children: React.ReactNode }) {
  return children
}
