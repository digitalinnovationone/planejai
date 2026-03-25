export function formatCurrencyMask(value: string): string {
  const digits = value.replace(/\D/g, '')

  if (!digits) {
    return ''
  }

  const number = Number(digits) / 100

  if (isNaN(number)) {
    return ''
  }

  return number.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
