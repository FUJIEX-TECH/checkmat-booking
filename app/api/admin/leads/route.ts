import { NextRequest, NextResponse } from "next/server"
import { isAuthorized } from "@/lib/auth"
import { getLeads } from "@/lib/redis"

export async function GET(req: NextRequest) {
  const token = req.headers.get("x-admin-token")
  if (!isAuthorized(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const leads = await getLeads()
  return NextResponse.json(leads)
}
