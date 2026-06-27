import { NextRequest, NextResponse } from "next/server"
import { isAuthorized } from "@/lib/auth"
import { getLeads, getStatuses, getBookings, getManualLeads } from "@/lib/redis"
import { getMetaLeads } from "@/lib/sheets"
import { mergeLeads, type Appointment } from "@/lib/leads-merge"

// Leads unificados (site + Agente Kimura + formulário do Meta Ads) sem duplicidade.
export async function GET(req: NextRequest) {
  const token = req.headers.get("x-admin-token")
  if (!isAuthorized(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const apptUrl =
    process.env.KIMURA_APPOINTMENTS_URL ??
    "https://oss-assistant-production.up.railway.app/api/appointments"
  const clientId = process.env.KIMURA_CLIENT_ID ?? "1"

  // Cada fonte é resiliente: se uma falhar, as outras ainda aparecem.
  const [siteLeads, statuses, bookings, manualLeads, appointments, metaLeads] = await Promise.all([
    getLeads().catch(() => []),
    getStatuses().catch(() => ({})),
    getBookings().catch(() => ({})),
    getManualLeads().catch(() => []),
    fetch(`${apptUrl}?clientId=${encodeURIComponent(clientId)}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { appointments: [] }))
      .then((d) => (d.appointments ?? []) as Appointment[])
      .catch(() => [] as Appointment[]),
    getMetaLeads().catch((e) => {
      console.error("getMetaLeads falhou:", e?.message)
      return []
    }),
  ])

  // Leads manuais entram pelo mesmo caminho dos do formulário (pendentes, sem programa).
  const pendingLeads = [
    ...metaLeads,
    ...manualLeads.map((m) => ({ ...m, platform: "", campaignName: "", leadStatus: "" })),
  ]

  const leads = mergeLeads(siteLeads, appointments, pendingLeads, statuses, bookings)
  return NextResponse.json({
    leads,
    counts: { site: siteLeads.length, meta: metaLeads.length, kimura: appointments.length, manual: manualLeads.length },
  })
}
