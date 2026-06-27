// Autoriza o acesso ao Admin com qualquer uma das senhas configuradas.
// Suporta duas senhas (ADMIN_PASSWORD e ADMIN_PASSWORD_2) para acesso compartilhado.
export function isAuthorized(token: string | null): boolean {
  if (!token) return false
  const valid = [process.env.ADMIN_PASSWORD, process.env.ADMIN_PASSWORD_2].filter(Boolean)
  return valid.includes(token)
}
