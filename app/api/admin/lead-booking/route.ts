import { NextRequest, NextResponse } from "next/server"
import { isAuthorized } from "@/lib/auth"
import { setBooking, setStatus } from "@/lib/redis"

// Agenda manualmente um lead (programa + dia/horário + data) e marca como "agendado".
export async function POST(req: NextRequest) {
  const token = req.headers.get("x-admin-token")
  if (!isAuthorized(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = (await req.json().catch(() => null)) as {
    key?: string
    program?: string
    day?: string
    time?: string
    date?: string
  } | null

  if (!body?.key || !body?.program || !body?.day || !body?.time || !body?.date) {
    return NextResponse.json(
      { error: "key, program, day, time e date são obrigatórios" },
      { status: 400 }
    )
  }

  await setBooking(body.key, {
    program: body.program,
    day: body.day,
    time: body.time,
    date: body.date,
  })
  await setStatus(body.key, "agendado")
  return NextResponse.json({ ok: true })
}
