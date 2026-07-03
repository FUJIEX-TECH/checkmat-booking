// Registro dos roteiros de criativo do mês. Adicionar uma entrada aqui + criar
// a pasta app/criativos-jul2026/[slug]/page.tsx é o suficiente para publicar um novo.
export interface CreativeEntry {
  slug: string
  title: string
  subtitle: string
  duration: string
  format: string
}

export const creatives: CreativeEntry[] = [
  {
    slug: "muaythai",
    title: "Muay Thai",
    subtitle: "Adultos · Criativo 1",
    duration: "~28 segundos",
    format: "Selfie + b-roll",
  },
  {
    slug: "kids",
    title: "Kids & Família",
    subtitle: "Pais e filhos · Criativo 2",
    duration: "~30 segundos",
    format: "Selfie + b-roll",
  },
  {
    slug: "bjj",
    title: "Brazilian Jiu-Jitsu",
    subtitle: "Adultos · Criativo 3",
    duration: "~28 segundos",
    format: "Selfie + b-roll",
  },
]
