import { NextRequest, NextResponse } from "next/server"
import { getLeads } from "@/lib/redis"

export async function GET(req: NextRequest) {
  const token = req.headers.get("x-admin-token")
  if (token !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const leads = await getLeads()
  return NextResponse.json(leads)
}
