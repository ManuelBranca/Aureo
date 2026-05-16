const today = new Date()

const toIsoDate = (date) => date.toISOString().slice(0, 10)

const addDays = (baseDate, days) => {
  const next = new Date(baseDate)
  next.setDate(next.getDate() + days)
  return next
}

const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

export const demoTransactions = [
  {
    id: 'tx-salary',
    type: 'income',
    amount: 2200000,
    category: 'Salario',
    description: 'Sueldo mensual',
    date: toIsoDate(addDays(startOfMonth, 0)),
  },
  {
    id: 'tx-freelance',
    type: 'income',
    amount: 350000,
    category: 'Freelance',
    description: 'Proyecto de consultoría',
    date: toIsoDate(addDays(startOfMonth, 7)),
  },
  {
    id: 'tx-rent',
    type: 'expense',
    amount: 680000,
    category: 'Vivienda',
    description: 'Alquiler',
    date: toIsoDate(addDays(startOfMonth, 2)),
  },
  {
    id: 'tx-groceries',
    type: 'expense',
    amount: 95000,
    category: 'Alimentación',
    description: 'Supermercado semanal',
    date: toIsoDate(addDays(startOfMonth, 4)),
  },
  {
    id: 'tx-transport',
    type: 'expense',
    amount: 42000,
    category: 'Transporte',
    description: 'Subte y cargas',
    date: toIsoDate(addDays(startOfMonth, 6)),
  },
  {
    id: 'tx-entertainment',
    type: 'expense',
    amount: 65000,
    category: 'Ocio',
    description: 'Cine y cena',
    date: toIsoDate(addDays(startOfMonth, 10)),
  },
  {
    id: 'tx-interest',
    type: 'income',
    amount: 18000,
    category: 'Inversiones',
    description: 'Intereses',
    date: toIsoDate(addDays(startOfMonth, 13)),
  },
]

export const demoGoals = [
  {
    id: 'goal-emergency',
    name: 'Fondo de emergencia',
    targetAmount: 3000000,
    savedAmount: 820000,
    color: '#4ad4a0',
  },
  {
    id: 'goal-trip',
    name: 'Viaje 2026',
    targetAmount: 1000000,
    savedAmount: 420000,
    color: '#8aa4ff',
  },
]

export const demoCategories = [
  'Salario',
  'Freelance',
  'Inversiones',
  'Vivienda',
  'Alimentación',
  'Transporte',
  'Ocio',
  'Salud',
  'Educación',
  'Otros',
]

export const demoFilters = {
  search: '',
  type: 'all',
  category: 'all',
  from: '',
  to: '',
}
