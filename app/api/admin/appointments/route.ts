import { NextRequest, NextResponse } from "next/server"
import { isAuthorized } from "@/lib/auth"
import { isTestLead } from "@/lib/test-leads"

// Proxy protegido para a API de appointments do Kimura Agent (backend do Rafael).
// Mantém a senha do admin como única porta e evita expor a chamada/CORS no client.
export async function GET(req: NextRequest) {
  const token = req.headers.get("x-admin-token")
  if (!isAuthorized(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const apptUrl = process.env.KIMURA_APPOINTMENTS_URL ?? "https://oss-assistant-production.up.railway.app/api/appointments"
  const clientId = process.env.KIMURA_CLIENT_ID ?? "1"

  try {
    const res = await fetch(`${apptUrl}?clientId=${encodeURIComponent(clientId)}`, { cache: "no-store" })
    if (!res.ok) {
      return NextResponse.json({ error: `Upstream ${res.status}` }, { status: 502 })
    }
    const data = await res.json()
    // Remove identidades de teste (ex: Fernando Hideki Fujie / fetraks@gmail.com).
    const appointments = (data.appointments ?? []).filter(
      (a: { leadName?: string; email?: string }) => !isTestLead(a.leadName ?? "", a.email ?? "")
    )
    return NextResponse.json({ ...data, appointments, count: appointments.length })
  } catch {
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 502 })
  }
}
