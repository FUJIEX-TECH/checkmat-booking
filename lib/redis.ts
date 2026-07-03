import { Redis } from "@upstash/redis"

export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  program: string
  day: string
  time: string
  scheduled_date?: string
  lead_id: string
  utm_source: string
  utm_campaign: string
  created_at: string
}

export async function saveLead(lead: Omit<Lead, "id" | "created_at">) {
  const id = `lead:${Date.now()}:${Math.random().toString(36).slice(2, 7)}`
  const data: Lead = { ...lead, id, created_at: new Date().toISOString() }
  await redis.lpush("leads", JSON.stringify(data))
  return data
}

export async function getLeads(): Promise<Lead[]> {
  const raw = await redis.lrange("leads", 0, 499)
  return raw.map((item) => (typeof item === "string" ? JSON.parse(item) : item))
}

export type LeadStatus =
  | "pendente"
  | "contactado 1x"
  | "contactado 2x"
  | "agendado"
  | "no-show"
  | "matriculado"
  | "perdido"

// Status de cada lead, persistido num hash do Redis (chave = identidade normalizada do lead).
export async function getStatuses(): Promise<Record<string, string>> {
  const all = await redis.hgetall<Record<string, string>>("lead_status")
  return all ?? {}
}

export async function setStatus(key: string, status: LeadStatus): Promise<void> {
  await redis.hset("lead_status", { [key]: status })
}

// Agendamento manual feito pelo Admin para um lead que veio só do formulário do Meta.
export interface LeadBooking {
  program: string
  day: string
  time: string
  date: string // ISO yyyy-mm-dd
}

// Leads inseridos manualmente (walk-in, telefone, teste) — entram como pendentes, sem programa.
export interface ManualLead {
  name: string
  email: string
  phone: string
  createdTime: string
}

export async function getManualLeads(): Promise<ManualLead[]> {
  const raw = await redis.lrange("manual_leads", 0, 199)
  return raw.map((item) => (typeof item === "string" ? JSON.parse(item) : item))
}

export async function getBookings(): Promise<Record<string, LeadBooking>> {
  const all = await redis.hgetall<Record<string, LeadBooking>>("lead_booking")
  return all ?? {}
}

export async function setBooking(key: string, booking: LeadBooking): Promise<void> {
  await redis.hset("lead_booking", { [key]: booking })
}
