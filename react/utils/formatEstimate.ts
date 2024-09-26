const formatEstimate = (estimate: string): string => {
  const unitiesSingular = ['hora', 'dia', 'semana', 'mês', 'ano']
  const unitiesPlural = ['horas', 'dias', 'semana', 'meses', 'anos']

  const value = estimate.replace(/\D/g, '')
  const business = estimate.includes('b')
  const char = estimate.substr(estimate.length - 1)
  const index = ['h', 'd', 'w', 'm', 'y'].indexOf(char)
  const unity = value === '1' ? unitiesSingular[index] : unitiesPlural[index]

  return `${value} ${unity} ${
    business ? (value === '1' ? 'útil' : 'úteis') : ''
  }`
}

export default formatEstimate
