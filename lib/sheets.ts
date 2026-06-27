import crypto from "crypto"
import { isTestLead } from "./test-leads"

// Leitura do export do formulário de lead do Meta Ads (Google Sheet privada).
// Auth via service account (JWT bearer flow) usando crypto nativo — sem dependência externa.

export interface MetaLead {
  name: string
  email: string
  phone: string
  createdTime: string
  platform: string // fb | ig
  campaignName: string
  leadStatus: string
}

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
}

// Troca o JWT assinado pela service account por um access_token de leitura do Sheets.
async function getAccessToken(): Promise<string> {
  const email = process.env.GOOGLE_SA_CLIENT_EMAIL
  const key = process.env.GOOGLE_SA_PRIVATE_KEY?.replace(/\\n/g, "\n")
  if (!email || !key) throw new Error("GOOGLE_SA_CLIENT_EMAIL / GOOGLE_SA_PRIVATE_KEY ausentes")

  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))
  const claim = base64url(
    JSON.stringify({
      iss: email,
      scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  )
  const signingInput = `${header}.${claim}`
  const signature = base64url(crypto.sign("RSA-SHA256", Buffer.from(signingInput), key))
  const jwt = `${signingInput}.${signature}`

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  })
  if (!res.ok) {
    throw new Error(`Token error ${res.status}: ${await res.text()}`)
  }
  const data = (await res.json()) as { access_token: string }
  return data.access_token
}

// Resolve o título da aba a partir do gid numérico da URL.
async function getSheetTitle(token: string, spreadsheetId: string, gid: string): Promise<string> {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties`,
    { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
  )
  if (!res.ok) throw new Error(`Sheets meta error ${res.status}: ${await res.text()}`)
  const data = (await res.json()) as {
    sheets: { properties: { sheetId: number; title: string } }[]
  }
  const match = data.sheets.find((s) => String(s.properties.sheetId) === String(gid))
  if (!match) throw new Error(`Aba gid=${gid} não encontrada`)
  return match.properties.title
}

export async function getMetaLeads(): Promise<MetaLead[]> {
  const spreadsheetId = process.env.META_SHEET_ID
  const gid = process.env.META_SHEET_GID
  if (!spreadsheetId || !gid) throw new Error("META_SHEET_ID / META_SHEET_GID ausentes")

  const token = await getAccessToken()
  const title = await getSheetTitle(token, spreadsheetId, gid)

  const range = encodeURIComponent(`${title}!A1:P10000`)
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`,
    { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
  )
  if (!res.ok) throw new Error(`Sheets values error ${res.status}: ${await res.text()}`)
  const data = (await res.json()) as { values?: string[][] }
  const rows = data.values ?? []
  if (rows.length < 2) return []

  const header = rows[0].map((h) => h.toLowerCase().trim())
  const col = (names: string[]) => header.findIndex((h) => names.includes(h))
  const iName = col(["name", "full_name", "full name"])
  const iEmail = col(["email"])
  const iPhone = col(["phone", "phone_number"])
  const iCreated = col(["created_time", "created time", "created"])
  const iPlatform = col(["platform"])
  const iCampaign = col(["campaign_name", "campaign name"])
  const iStatus = col(["lead_status", "lead status"])

  const clean = (v: string | undefined) => (v ?? "").toString().trim()
  // Meta às vezes prefixa valores ("p:+1...", "l:...") — remove o prefixo de telefone.
  const cleanPhone = (v: string | undefined) => clean(v).replace(/^p:/i, "").trim()

  return rows
    .slice(1)
    .map((r) => ({
      name: clean(r[iName]),
      email: clean(r[iEmail]),
      phone: cleanPhone(r[iPhone]),
      createdTime: clean(r[iCreated]),
      platform: clean(r[iPlatform]),
      campaignName: clean(r[iCampaign]),
      leadStatus: clean(r[iStatus]),
    }))
    .filter((l) => !isTestLead(l.name, l.email))
}
