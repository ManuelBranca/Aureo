export const STORAGE_KEY = 'aureo.finance.state.v1'

export const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

export const formatCurrency = (value) => currencyFormatter.format(value || 0)

export const formatDate = (date) =>
  new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))

export const getMonthKey = (date) => {
  const current = new Date(date)
  return `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`
}

export const createTransactionId = () =>
  globalThis.crypto?.randomUUID?.() ?? `tx-${Date.now()}-${Math.random().toString(16).slice(2)}`

export const normalizeText = (value = '') =>
  value
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

export const calculateTotals = (transactions) =>
  transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += Number(transaction.amount) || 0
      } else {
        acc.expenses += Number(transaction.amount) || 0
      }

      acc.balance = acc.income - acc.expenses
      return acc
    },
    { income: 0, expenses: 0, balance: 0 },
  )

export const calculateMonthlyTotals = (transactions, monthKey) => {
  const monthlyTransactions = transactions.filter((transaction) => getMonthKey(transaction.date) === monthKey)
  return calculateTotals(monthlyTransactions)
}

export const sumByCategory = (transactions) =>
  transactions.reduce((acc, transaction) => {
    const key = transaction.category || 'Sin categoría'
    const current = acc[key] || 0
    acc[key] = current + Number(transaction.amount || 0)
    return acc
  }, {})

export const buildYearMonthLabel = (monthKey) => {
  const [year, month] = monthKey.split('-').map(Number)
  const date = new Date(year, month - 1, 1)
  return new Intl.DateTimeFormat('es-AR', { month: 'long', year: 'numeric' }).format(date)
}

export const clampPercentage = (value) => Math.max(0, Math.min(100, value))
