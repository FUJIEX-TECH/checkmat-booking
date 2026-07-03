"use client"

import { useState } from "react"
import { siteConfig } from "@/config/site"
import type { UnifiedLead, LeadOrigin } from "@/lib/leads-merge"
import type { LeadStatus } from "@/lib/redis"

// Formata um instante (ISO/UTC) em um fuso específico — ex: "19/06 13:40"
function fmtTz(iso: string, tz: string): string {
  const d = new Date(iso)
  if (isNaN(d.getTime())) return "—"
  return d.toLocaleString("pt-BR", {
    timeZone: tz, day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit",
  })
}

type ClassDef ={ slug: string; label: string; ageRange: string; slots: { day: string; time: string }[] }
const CLASSES = siteConfig.cal.classes as ClassDef[]

const STATUS_OPTIONS: LeadStatus[] = [
  "pendente",
  "contactado 1x",
  "contactado 2x",
  "agendado",
  "no-show",
  "matriculado",
  "perdido",
]

const STATUS_STYLES: Record<LeadStatus, string> = {
  pendente: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "contactado 1x": "bg-sky-500/15 text-sky-400 border-sky-500/30",
  "contactado 2x": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  agendado: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  "no-show": "bg-red-500/15 text-red-400 border-red-500/30",
  matriculado: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  perdido: "bg-zinc-500/20 text-zinc-400 border-zinc-500/40",
}

const ORIGIN_STYLES: Record<LeadOrigin, string> = {
  "Meta Ads (Formulário)": "bg-amber-500/15 text-amber-400 border border-amber-500/30",
  "Meta Ads (Site)": "bg-[#C8102E]/20 text-[#C8102E] border border-[#C8102E]/30",
  "Orgânico": "bg-white/10 text-white/50",
  "Agente Kimura": "bg-violet-500/15 text-violet-400 border border-violet-500/30",
}

// Próximas N ocorrências de um dia da semana (ex: próximas 4 terças).
const WEEKDAY_INDEX: Record<string, number> = {
  Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6,
}
function getNextDates(weekday: string, count = 4): Date[] {
  const target = WEEKDAY_INDEX[weekday]
  const out: Date[] = []
  const d = new Date()
  while (out.length < count) {
    if (d.getDay() === target && d > new Date(Date.now() - 86400000)) out.push(new Date(d))
    d.setDate(d.getDate() + 1)
  }
  return out
}
const fmtISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
const fmtDateLabel = (d: Date) =>
  d.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" })

type SortCol = "name" | "email" | "phone" | "program" | "trial" | "origin" | "status" | "createdAt"

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [authed, setAuthed] = useState(false)
  const [leads, setLeads] = useState<UnifiedLead[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState<{ col: SortCol; dir: "asc" | "desc" }>({ col: "createdAt", dir: "desc" })

  // Modal de agendamento manual
  const [bookingLead, setBookingLead] = useState<UnifiedLead | null>(null)
  const [bkClass, setBkClass] = useState<ClassDef | null>(null)
  const [bkSlot, setBkSlot] = useState<string>("") // "Day|Time"
  const [bkDate, setBkDate] = useState<string>("")
  const [bkSaving, setBkSaving] = useState(false)

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    // Teclado mobile às vezes adiciona espaço/maiúscula — normaliza antes de enviar.
    const pwd = password.trim()
    try {
      const res = await fetch("/api/admin/unified", { headers: { "x-admin-token": pwd }, cache: "no-store" })
      if (res.ok) {
        const data = await res.json()
        setLeads(data.leads ?? [])
        setPassword(pwd)
        setAuthed(true)
      } else if (res.status === 401) {
        setError("Senha incorreta.")
      } else {
        setError(`Erro do servidor (${res.status}). Tente de novo.`)
      }
    } catch {
      setError("Sem conexão com o servidor. Confira a rede/Wi-Fi.")
    }
    setLoading(false)
  }

  const refresh = async () => {
    const res = await fetch("/api/admin/unified", { headers: { "x-admin-token": password }, cache: "no-store" })
    if (res.ok) {
      const data = await res.json()
      setLeads(data.leads ?? [])
    }
  }

  const saveStatus = async (key: string, status: LeadStatus) => {
    await fetch("/api/admin/lead-status", {
      method: "PATCH",
      headers: { "x-admin-token": password, "Content-Type": "application/json" },
      body: JSON.stringify({ key, status }),
    })
  }

  const onStatusChange = (lead: UnifiedLead, status: LeadStatus) => {
    // Mudar para "agendado" um lead que ainda não tem turma/horário → abre o modal.
    if (status === "agendado" && !lead.program) {
      setBookingLead(lead)
      setBkClass(null)
      setBkSlot("")
      setBkDate("")
      return
    }
    setLeads((prev) => prev.map((l) => (l.key === lead.key ? { ...l, status } : l)))
    saveStatus(lead.key, status)
  }

  const saveBooking = async () => {
    if (!bookingLead || !bkClass || !bkSlot || !bkDate) return
    const [day, time] = bkSlot.split("|")
    setBkSaving(true)
    await fetch("/api/admin/lead-booking", {
      method: "POST",
      headers: { "x-admin-token": password, "Content-Type": "application/json" },
      body: JSON.stringify({ key: bookingLead.key, program: bkClass.label, day, time, date: bkDate }),
    })
    setBkSaving(false)
    setBookingLead(null)
    await refresh()
  }

  const toggleSort = (col: SortCol) =>
    setSort((s) => {
      if (s.col === col) return { col, dir: s.dir === "asc" ? "desc" : "asc" }
      // Datas começam do mais recente pro mais antigo no primeiro clique.
      const firstDir: "asc" | "desc" = col === "trial" || col === "createdAt" ? "desc" : "asc"
      return { col, dir: firstDir }
    })

  const filtered = leads.filter((l) =>
    [l.name, l.email, l.phone, l.program, l.origin, l.status].some((v) =>
      v?.toLowerCase().includes(search.toLowerCase())
    )
  )

  const sorted = [...filtered].sort((a, b) => {
    const dir = sort.dir === "asc" ? 1 : -1
    if (sort.col === "createdAt") {
      return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * dir
    }
    // Aula experimental: ordena pela data real (trialAt); quem não agendou vai sempre pro fim.
    if (sort.col === "trial") {
      if (!a.trialAt && !b.trialAt) return 0
      if (!a.trialAt) return 1
      if (!b.trialAt) return -1
      return (new Date(a.trialAt).getTime() - new Date(b.trialAt).getTime()) * dir
    }
    return String(a[sort.col] ?? "").localeCompare(String(b[sort.col] ?? ""), "pt-BR") * dir
  })

  const fromMeta = leads.filter((l) => l.origin.startsWith("Meta Ads")).length
  const pending = leads.filter((l) => l.status === "pendente").length
  const today = leads.filter(
    (l) => new Date(l.createdAt).toDateString() === new Date().toDateString()
  ).length

  const SortHeader = ({ col, label, pinned }: { col: SortCol; label: string; pinned?: boolean }) => (
    <th
      onClick={() => toggleSort(col)}
      className={`text-left px-4 py-3 text-white/40 font-semibold uppercase tracking-widest text-xs cursor-pointer select-none hover:text-white/70 whitespace-nowrap ${pinned ? "max-sm:sticky max-sm:left-0 max-sm:z-20 max-sm:bg-gray-900 max-sm:border-r max-sm:border-white/10" : ""}`}
    >
      {label}
      <span className="ml-1 text-[#C8102E]">{sort.col === col ? (sort.dir === "asc" ? "▲" : "▼") : ""}</span>
    </th>
  )

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <form onSubmit={login} className="bg-gray-900 border border-white/10 rounded-2xl p-8 w-full max-w-sm space-y-4">
          <div className="text-center mb-2">
            <h1 className="text-white font-extrabold text-xl">Admin</h1>
            <p className="text-white/40 text-sm">Checkmat Brentwood</p>
          </div>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white text-base placeholder-white/30 focus:outline-none focus:border-[#C8102E] transition-colors"
            required
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C8102E] hover:bg-[#a50d25] text-white font-bold py-3 rounded-xl transition-colors"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-[1500px] mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold">Leads — Checkmat Brentwood</h1>
            <p className="text-white/40 text-sm mt-1">{leads.length} leads · {fromMeta} do Meta Ads</p>
          </div>
          <button onClick={refresh} className="text-sm text-white/50 hover:text-white transition-colors border border-white/20 px-4 py-2 rounded-xl">
            Atualizar
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Total</p>
            <p className="text-3xl font-extrabold">{leads.length}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Meta Ads</p>
            <p className="text-3xl font-extrabold text-[#C8102E]">{fromMeta}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Pendentes</p>
            <p className="text-3xl font-extrabold text-amber-400">{pending}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Hoje</p>
            <p className="text-3xl font-extrabold">{today}</p>
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Buscar por nome, email, programa, origem, status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-[#C8102E] transition-colors mb-4"
        />

        {/* Table */}
        <div className="rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <SortHeader col="name" label="Nome" pinned />
                  <SortHeader col="email" label="Email" />
                  <SortHeader col="phone" label="Telefone" />
                  <SortHeader col="program" label="Programa" />
                  <SortHeader col="trial" label="Aula experimental" />
                  <SortHeader col="origin" label="Origem" />
                  <SortHeader col="status" label="Status" />
                  <SortHeader col="createdAt" label="Cadastro" />
                </tr>
              </thead>
              <tbody>
                {sorted.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-white/30">Nenhum lead encontrado.</td>
                  </tr>
                )}
                {sorted.map((lead) => (
                  <tr key={lead.key || lead.email} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-semibold whitespace-nowrap max-sm:sticky max-sm:left-0 max-sm:z-10 max-sm:bg-gray-950 max-sm:border-r max-sm:border-white/10 max-sm:whitespace-normal max-sm:break-words max-sm:max-w-[130px]">{lead.name || "—"}</td>
                    <td className="px-4 py-3 text-white/60">{lead.email || "—"}</td>
                    <td className="px-4 py-3 text-white/60 whitespace-nowrap">{lead.phone || "—"}</td>
                    <td className="px-4 py-3">
                      {lead.program ? (
                        <span className="bg-white/10 px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap">{lead.program}</span>
                      ) : (
                        <span className="text-white/25">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-white/60 whitespace-nowrap">
                      {lead.trial || <span className="text-white/25">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap ${ORIGIN_STYLES[lead.origin]}`}>
                        {lead.origin}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={lead.status}
                        onChange={(e) => onStatusChange(lead, e.target.value as LeadStatus)}
                        className={`px-2 py-1 rounded-lg text-xs font-bold border bg-transparent focus:outline-none cursor-pointer ${STATUS_STYLES[lead.status]}`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s} className="bg-gray-900 text-white">
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-white/40 text-xs whitespace-nowrap">
                      <div className="leading-tight">
                        <div>{fmtTz(lead.createdAt, "America/Los_Angeles")} <span className="text-white/30">PT</span></div>
                        <div>{fmtTz(lead.createdAt, "America/Sao_Paulo")} <span className="text-white/30">BRT</span></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de agendamento manual — bottom-sheet no mobile, centralizado no desktop */}
      {bookingLead && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 sm:items-center sm:px-4"
          onClick={() => setBookingLead(null)}
        >
          <div
            className="bg-gray-900 border border-white/10 w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header fixo */}
            <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3 border-b border-white/10">
              {/* Alça do bottom-sheet (só mobile) */}
              <div className="sm:hidden absolute left-1/2 -translate-x-1/2 top-2 h-1 w-10 rounded-full bg-white/20" />
              <div className="min-w-0 mt-1">
                <h2 className="text-lg font-extrabold">Agendar aula experimental</h2>
                <p className="text-white/40 text-sm truncate">{bookingLead.name} · {bookingLead.email}</p>
              </div>
              <button
                onClick={() => setBookingLead(null)}
                aria-label="Fechar"
                className="shrink-0 h-10 w-10 -mr-2 flex items-center justify-center rounded-xl text-white/40 hover:text-white hover:bg-white/5 text-xl leading-none"
              >
                ✕
              </button>
            </div>

            {/* Corpo rolável */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
              {/* Programa */}
              <div>
                <p className="text-white/70 text-sm font-semibold mb-2">Programa</p>
                <select
                  value={bkClass?.slug ?? ""}
                  onChange={(e) => {
                    const c = CLASSES.find((x) => x.slug === e.target.value) ?? null
                    setBkClass(c)
                    setBkSlot("")
                    setBkDate("")
                  }}
                  className="w-full px-4 min-h-[48px] rounded-xl bg-white/5 border border-white/20 text-white text-base focus:outline-none focus:border-[#C8102E]"
                >
                  <option value="" className="bg-gray-900">Selecione o programa…</option>
                  {CLASSES.map((c) => (
                    <option key={c.slug} value={c.slug} className="bg-gray-900">
                      {c.label} ({c.ageRange})
                    </option>
                  ))}
                </select>
              </div>

              {/* Dia e horário */}
              {bkClass && (
                <div>
                  <p className="text-white/70 text-sm font-semibold mb-2">Dia e horário</p>
                  <div className="flex flex-wrap gap-2">
                    {bkClass.slots.map((s) => {
                      const val = `${s.day}|${s.time}`
                      const sel = bkSlot === val
                      return (
                        <button
                          key={val}
                          type="button"
                          onClick={() => { setBkSlot(val); setBkDate("") }}
                          className={`px-4 min-h-[44px] rounded-xl text-sm font-bold border-2 transition-all active:scale-95 ${sel ? "bg-[#C8102E] border-[#C8102E] text-white" : "bg-black/30 border-white/20 text-white/80 hover:border-[#C8102E]"}`}
                        >
                          {s.day.slice(0, 3)} · {s.time}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Data */}
              {bkSlot && (
                <div>
                  <p className="text-white/70 text-sm font-semibold mb-2">Qual data?</p>
                  <div className="flex flex-wrap gap-2">
                    {getNextDates(bkSlot.split("|")[0], 4).map((d) => {
                      const iso = fmtISO(d)
                      const sel = bkDate === iso
                      return (
                        <button
                          key={iso}
                          type="button"
                          onClick={() => setBkDate(iso)}
                          className={`px-4 min-h-[44px] rounded-xl text-sm font-bold border-2 transition-all active:scale-95 capitalize ${sel ? "bg-[#C8102E] border-[#C8102E] text-white" : "bg-black/30 border-white/20 text-white/80 hover:border-[#C8102E]"}`}
                        >
                          {fmtDateLabel(d)}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer fixo com o botão */}
            <div className="px-5 py-4 border-t border-white/10 bg-gray-900 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <button
                onClick={saveBooking}
                disabled={!bkClass || !bkSlot || !bkDate || bkSaving}
                className="w-full bg-[#C8102E] hover:bg-[#a50d25] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold min-h-[52px] rounded-xl transition-colors active:scale-[0.99]"
              >
                {bkSaving ? "Salvando..." : "Confirmar agendamento"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
