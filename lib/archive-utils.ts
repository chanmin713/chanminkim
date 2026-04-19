export function timeValue(date?: string) {
  if (!date) return Number.NEGATIVE_INFINITY
  const value = new Date(date).getTime()
  return Number.isNaN(value) ? Number.NEGATIVE_INFINITY : value
}

export function formatDate(date?: string | null) {
  if (!date) return ''
  const parsed = new Date(date)
  return Number.isNaN(parsed.getTime())
    ? ''
    : parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function formatDateLabel(options: {
  date?: string | null
  unreleased?: boolean
}) {
  if (options.unreleased) return 'Unreleased'
  return formatDate(options.date)
}
