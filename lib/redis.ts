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
