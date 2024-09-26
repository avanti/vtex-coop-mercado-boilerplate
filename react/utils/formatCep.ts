export const formatCEP = (cep: string) => {
  const digitsOnly = cep.replace(/\D/g, '')

  if (digitsOnly.length !== 8) {
    return cep
  }

  const formattedCEP = `${digitsOnly.substr(0, 5)}-${digitsOnly.substr(5)}`
  return formattedCEP
}
