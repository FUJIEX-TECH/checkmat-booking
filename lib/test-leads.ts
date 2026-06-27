// Identidades de teste que não devem aparecer no Admin (dados internos da Fujiex/dev).
const TEST_EMAILS = new Set(["fetraks@gmail.com", "test@meta.com", "test@test.com"])

export function isTestLead(name: string, email: string): boolean {
  const n = (name || "").toLowerCase()
  const e = (email || "").toLowerCase().trim()
  return (
    !e ||
    TEST_EMAILS.has(e) ||
    n.includes("test lead") ||
    n.startsWith("<test") ||
    e.includes("dummy")
  )
}
