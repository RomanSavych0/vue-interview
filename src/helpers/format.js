export function formatCurrency(value) {
  if (typeof value === 'number') return value.toFixed(2)
  if (!isNaN(Number(value))) return Number(value).toFixed(2)
  return value
} 