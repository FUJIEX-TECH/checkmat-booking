import { NextRequest, NextResponse } from "next/server"

// Proxy protegido para a API de appointments do Kimura Agent (backend do Rafael).
// Mantém a senha do admin como única porta e evita expor a chamada/CORS no client.
export async function GET(req: NextRequest) {
  const token = req.headers.get("x-admin-token")
  if (token !== process.env.ADMIN_PASSWORD) {
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
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 502 })
  }
}
