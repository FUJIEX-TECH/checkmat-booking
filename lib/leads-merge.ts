import type { Lead, LeadStatus, LeadBooking } from "./redis"
import type { MetaLead } from "./sheets"
import { isTestLead } from "./test-leads"

export interface Appointment {
  leadName: string
  email: string
  classType: string
  scheduledStartAt: string
}

export type LeadOrigin =
  | "Meta Ads (Formulário)"
  | "Meta Ads (Site)"
  | "Orgânico"
  | "Agente Kimura"

export interface UnifiedLead {
  key: string // identidade normalizada (email, ou telefone se não houver email) — usada pra status
  name: string
  email: string
  phone: string
  program: string // "" quando só veio do formulário
  trial: string // data/hora da aula experimental, "" quando só veio do formulário
  origin: LeadOrigin
  status: LeadStatus
  createdAt: string // ISO
  booked: boolean
}

const normEmail = (e: string) => (e || "").toLowerCase().trim()
// Só dígitos, comparando pelos últimos 10 (ignora +1 / 55 / formatações).
const normPhone = (p: string) => {
  const d = (p || "").replace(/\D/g, "")
  return d.length >= 10 ? d.slice(-10) : d
}
const identityKey = (email: string, phone: string) =>
  normEmail(email) || normPhone(phone) || ""

// Formata o instante de uma aula no fuso da academia (PT) — ex: "qua, 18/06 · 18:30".
function fmtClass(iso: string): string {
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ""
  return d.toLocaleString("pt-BR", {
    timeZone: "America/Los_Angeles",
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function dateTrial(date: string, time: string, day: string): string {
  if (date) {
    const d = new Date(`${date}T00:00:00`)
    if (!isNaN(d.getTime())) {
      const fmt = d.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" })
      return `${fmt} · ${time}`
    }
  }
  if (day || time) return `${day} · ${time}`.trim()
  return ""
}

const siteTrial = (l: Lead) => dateTrial(l.scheduled_date ?? "", l.time, l.day)

/**
 * Funde as três fontes (leads do site, agendamentos do Agente Kimura e formulário do Meta Ads)
 * numa lista única sem duplicidade. Casa pessoas por email (primário) ou telefone (secundário).
 * Quem agendou (site/Kimura) entra como "booked"; quem só preencheu o formulário entra como
 * lead pendente com programa/aula em branco.
 */
export function mergeLeads(
  siteLeads: Lead[],
  appointments: Appointment[],
  metaLeads: MetaLead[],
  statuses: Record<string, string>,
  bookings: Record<string, LeadBooking> = {}
): UnifiedLead[] {
  const list: UnifiedLead[] = []
  const byEmail = new Map<string, UnifiedLead>()
  const byPhone = new Map<string, UnifiedLead>()

  const find = (email: string, phone: string): UnifiedLead | undefined => {
    const ek = normEmail(email)
    const pk = normPhone(phone)
    return (ek && byEmail.get(ek)) || (pk && byPhone.get(pk)) || undefined
  }

  const index = (u: UnifiedLead) => {
    const ek = normEmail(u.email)
    const pk = normPhone(u.phone)
    if (ek && !byEmail.has(ek)) byEmail.set(ek, u)
    if (pk && !byPhone.has(pk)) byPhone.set(pk, u)
  }

  const add = (u: UnifiedLead) => {
    list.push(u)
    index(u)
  }

  // 1) Leads agendados pelo site (têm programa, aula, telefone).
  for (const l of siteLeads) {
    const existing = find(l.email, l.phone)
    if (existing) {
      if (!existing.phone) existing.phone = l.phone
      index(existing)
      continue
    }
    add({
      key: identityKey(l.email, l.phone),
      name: l.name,
      email: l.email,
      phone: l.phone,
      program: l.program || "",
      trial: siteTrial(l),
      origin: l.utm_source || l.lead_id ? "Meta Ads (Site)" : "Orgânico",
      status: "agendado",
      createdAt: l.created_at,
      booked: true,
    })
  }

  // 2) Agendamentos do Agente Kimura (sem telefone — casa só por email).
  for (const a of appointments) {
    if (isTestLead(a.leadName, a.email)) continue
    const existing = find(a.email, "")
    if (existing) continue
    add({
      key: identityKey(a.email, ""),
      name: a.leadName,
      email: a.email,
      phone: "",
      program: a.classType || "",
      trial: fmtClass(a.scheduledStartAt),
      origin: "Agente Kimura",
      status: "agendado",
      createdAt: a.scheduledStartAt,
      booked: true,
    })
  }

  // 3) Formulário do Meta Ads — só entra quem ainda não agendou por nenhum canal.
  for (const m of metaLeads) {
    const existing = find(m.email, m.phone)
    if (existing) {
      if (!existing.phone && m.phone) existing.phone = m.phone
      index(existing)
      continue
    }
    add({
      key: identityKey(m.email, m.phone),
      name: m.name,
      email: m.email,
      phone: m.phone,
      program: "",
      trial: "",
      origin: "Meta Ads (Formulário)",
      status: "pendente",
      createdAt: m.createdTime,
      booked: false,
    })
  }

  // Agendamento manual feito pelo Admin (lead que veio só do formulário) preenche programa/aula.
  for (const u of list) {
    const b = u.key && bookings[u.key]
    if (b) {
      u.program = b.program
      u.trial = dateTrial(b.date, b.time, b.day)
      u.booked = true
      u.status = "agendado"
    }
  }

  // Status manual salvo no Redis sobrescreve o default.
  for (const u of list) {
    const saved = u.key && statuses[u.key]
    if (saved) u.status = saved as LeadStatus
  }

  // Mais recente primeiro.
  list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  return list
}
