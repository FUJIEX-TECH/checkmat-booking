"use client"

import { useState, useEffect } from "react"
import type { Lead } from "@/lib/redis"

// Formata um instante (ISO/UTC) em um fuso específico — ex: "19/06 13:40"
function fmtTz(iso: string, tz: string): string {
  return new Date(iso).toLocaleString("pt-BR", {
    timeZone: tz, day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit",
  })
}

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [authed, setAuthed] = useState(false)
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await fetch("/api/admin/leads", {
      headers: { "x-admin-token": password },
    })
    if (res.ok) {
      const data = await res.json()
      setLeads(data)
      setAuthed(true)
    } else {
      setError("Senha incorreta.")
    }
    setLoading(false)
  }

  const refresh = async () => {
    const res = await fetch("/api/admin/leads", {
      headers: { "x-admin-token": password },
    })
    if (res.ok) setLeads(await res.json())
  }

  const filtered = leads.filter((l) =>
    [l.name, l.email, l.phone, l.program].some((v) =>
      v?.toLowerCase().includes(search.toLowerCase())
    )
  )

  const fromMeta = leads.filter((l) => l.utm_source || l.lead_id).length

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
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-[#C8102E] transition-colors"
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold">Leads — Checkmat Brentwood</h1>
            <p className="text-white/40 text-sm mt-1">{leads.length} agendamentos · {fromMeta} do Meta Ads</p>
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
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Orgânico</p>
            <p className="text-3xl font-extrabold">{leads.length - fromMeta}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Hoje</p>
            <p className="text-3xl font-extrabold">
              {leads.filter((l) => new Date(l.created_at).toDateString() === new Date().toDateString()).length}
            </p>
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Buscar por nome, email, programa..."
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
                  <th className="text-left px-4 py-3 text-white/40 font-semibold uppercase tracking-widest text-xs">Nome</th>
                  <th className="text-left px-4 py-3 text-white/40 font-semibold uppercase tracking-widest text-xs">Email</th>
                  <th className="text-left px-4 py-3 text-white/40 font-semibold uppercase tracking-widest text-xs">Telefone</th>
                  <th className="text-left px-4 py-3 text-white/40 font-semibold uppercase tracking-widest text-xs">Programa</th>
                  <th className="text-left px-4 py-3 text-white/40 font-semibold uppercase tracking-widest text-xs">Aula experimental</th>
                  <th className="text-left px-4 py-3 text-white/40 font-semibold uppercase tracking-widest text-xs">Origem</th>
                  <th className="text-left px-4 py-3 text-white/40 font-semibold uppercase tracking-widest text-xs">Cadastro</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-white/30">Nenhum lead encontrado.</td>
                  </tr>
                )}
                {filtered.map((lead) => (
                  <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-semibold">{lead.name}</td>
                    <td className="px-4 py-3 text-white/60">{lead.email}</td>
                    <td className="px-4 py-3 text-white/60">{lead.phone || "—"}</td>
                    <td className="px-4 py-3">
                      <span className="bg-white/10 px-2 py-0.5 rounded-full text-xs font-semibold">{lead.program}</span>
                    </td>
                    <td className="px-4 py-3 text-white/60">
                      {lead.scheduled_date ? (
                        <>
                          <span className="font-semibold text-white/80">
                            {new Date(`${lead.scheduled_date}T00:00:00`).toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" })}
                          </span>
                          {" · "}{lead.time}
                        </>
                      ) : (
                        <span className="text-white/50">{lead.day} · {lead.time}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {lead.utm_source || lead.lead_id ? (
                        <span className="bg-[#C8102E]/20 text-[#C8102E] border border-[#C8102E]/30 px-2 py-0.5 rounded-full text-xs font-bold">
                          Meta Ads
                        </span>
                      ) : (
                        <span className="bg-white/10 text-white/50 px-2 py-0.5 rounded-full text-xs font-semibold">
                          Orgânico
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-white/40 text-xs">
                      <div className="leading-tight">
                        <div>{fmtTz(lead.created_at, "America/Los_Angeles")} <span className="text-white/30">PT</span></div>
                        <div>{fmtTz(lead.created_at, "America/Sao_Paulo")} <span className="text-white/30">BRT</span></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
