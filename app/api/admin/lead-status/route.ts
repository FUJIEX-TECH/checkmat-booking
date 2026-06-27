import { NextRequest, NextResponse } from "next/server"
import { isAuthorized } from "@/lib/auth"
import { setStatus, type LeadStatus } from "@/lib/redis"

const VALID: LeadStatus[] = ["pendente", "agendado", "no show", "convertido"]

// Atualiza o status manual de um lead (chave = identidade normalizada).
export async function PATCH(req: NextRequest) {
  const token = req.headers.get("x-admin-token")
  if (!isAuthorized(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = (await req.json().catch(() => null)) as { key?: string; status?: string } | null
  if (!body?.key || !body?.status || !VALID.includes(body.status as LeadStatus)) {
    return NextResponse.json({ error: "key e status válidos são obrigatórios" }, { status: 400 })
  }

  await setStatus(body.key, body.status as LeadStatus)
  return NextResponse.json({ ok: true })
}
