export function formatZipCode(cep: string) {
  cep = cep.replace(/\D/g, '')

  if (cep.length !== 8) return

  cep = cep.replace(/^(\d{5})(\d{3})$/, '$1-$2')

  return cep
}
