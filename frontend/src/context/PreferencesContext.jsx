/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const THEME_KEY = 'aureo.theme.v1'
const LOCALE_KEY = 'aureo.locale.v1'

const dictionaries = {
  es: {
    brand: 'Aureo',
    financeSubtitle: 'Movimientos',
    financeDescription: 'Agregá ingresos o gastos en segundos. El resumen queda abajo, para cuando quieras revisar tus números.',
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    register: 'Crear usuario',
    openApp: 'Abrir app',
    income: '+ Agregar ingreso',
    expense: '+ Agregar gasto',
    summary: 'Ver resumen',
    movements: 'Movimientos',
    balance: 'Resumen',
    recentMovements: 'Movimientos recientes',
    recentDesc: 'Ingresos y gastos ordenados por fecha.',
    search: 'Buscar',
    all: 'Todos',
    incomes: 'Ingresos',
    expenses: 'Gastos',
    category: 'Categoría',
    from: 'Desde',
    to: 'Hasta',
    clearFilters: 'Limpiar filtros',
    noFilteredMovements: 'No hay movimientos con esos filtros',
    noFilteredHelp: 'Usá los botones de arriba para agregar un ingreso o un gasto nuevo.',
    currentMonthSummary: 'Resumen del mes actual',
    currentMonthTop: 'Gastos principales del mes',
    currentMonthTopDesc: 'Las categorías más importantes de tu flujo actual.',
    titleNoExpenses: 'Todavía no hay gastos en el mes',
    titleNoExpensesHelp: 'Cuando registres egresos vas a ver el desglose por categoría acá.',
    addIncome: 'Agregar ingreso',
    addExpense: 'Agregar gasto',
    editMovement: 'Editar movimiento',
    chooseDateNote: 'La fecha se carga sola con el día de hoy, pero la podés cambiar.',
    close: 'Cerrar',
    cancel: 'Cancelar',
    amount: 'Importe',
    description: 'Descripción',
    type: 'Tipo',
    date: 'Fecha',
    edit: 'Editar',
    delete: 'Eliminar',
    saveChanges: 'Guardar cambios',
    addMovement: 'Agregar movimiento',
    dailySummaryHint: 'El resumen queda abajo, para cuando quieras revisar tus números.',
    activeSession: 'Sesión activa',
    theme: 'Tema',
    language: 'Idioma',
    light: 'Claro',
    dark: 'Oscuro',
    spanish: 'Español',
    english: 'Inglés',
    emailLabel: 'Email',
    passwordLabel: 'Contraseña',
    nameLabel: 'Nombre',
    birthDateLabel: 'Fecha de nacimiento',
    signInPrompt: 'Entrá con tu usuario para empezar a registrar movimientos.',
    signInHint: 'Si todavía no tenés cuenta, podés crear una desde la pantalla de registro.',
    signInFormTitle: 'Iniciar sesión',
    signInFormHint: 'Ingresá con tus datos para abrir la app.',
    noAccount: '¿No tenés cuenta?',
    createAccount: 'Crear usuario',
    createAccountTitle: 'Crear usuario',
    createAccountHint: 'Registrate para empezar a usar Aureo.',
    registerHint: 'Después podés volver a iniciar sesión con los datos que cargues acá.',
    alreadyAccount: '¿Ya tenés cuenta?',
    backHome: '¿Querés volver?',
    home: 'Inicio',
    completeAllFields: 'Completá todos los campos.',
    completeEmailPassword: 'Ingresá email y contraseña.',
    minPassword: 'La contraseña debe tener al menos 6 caracteres.',
    userCreated: 'Usuario creado con éxito.',
    loginFailed: 'No encontramos un usuario con esos datos.',
    registerFailed: 'No se pudo crear el usuario.',
    descriptionRequired: 'La descripción es obligatoria.',
    categoryRequired: 'La categoría es obligatoria.',
    dateRequired: 'La fecha es obligatoria.',
    amountPositive: 'El importe debe ser mayor que cero.',
    confirmDeleteMovement: '¿Querés eliminar este movimiento?',
    sessionClosed: 'Sesión cerrada.',
  },
  en: {
    brand: 'Aureo',
    financeSubtitle: 'Movements',
    financeDescription: 'Add income or expenses in seconds. The summary stays below when you want to review your numbers.',
    login: 'Log in',
    logout: 'Log out',
    register: 'Create account',
    openApp: 'Open app',
    income: '+ Add income',
    expense: '+ Add expense',
    summary: 'View summary',
    movements: 'Movements',
    balance: 'Summary',
    recentMovements: 'Recent movements',
    recentDesc: 'Income and expenses sorted by date.',
    search: 'Search',
    all: 'All',
    incomes: 'Income',
    expenses: 'Expenses',
    category: 'Category',
    from: 'From',
    to: 'To',
    clearFilters: 'Clear filters',
    noFilteredMovements: 'No movements match those filters',
    noFilteredHelp: 'Use the buttons above to add a new income or expense.',
    currentMonthSummary: 'Current month summary',
    currentMonthTop: 'Top expense categories',
    currentMonthTopDesc: 'The categories that matter most in your current flow.',
    titleNoExpenses: 'No expenses yet this month',
    titleNoExpensesHelp: 'Once you add expenses, the breakdown by category will appear here.',
    addIncome: 'Add income',
    addExpense: 'Add expense',
    editMovement: 'Edit movement',
    chooseDateNote: 'The date is automatically set to today, but you can change it.',
    close: 'Close',
    cancel: 'Cancel',
    amount: 'Amount',
    description: 'Description',
    type: 'Type',
    date: 'Date',
    edit: 'Edit',
    delete: 'Delete',
    saveChanges: 'Save changes',
    addMovement: 'Add movement',
    dailySummaryHint: 'The summary stays below when you want to review your numbers.',
    activeSession: 'Active session',
    theme: 'Theme',
    language: 'Language',
    light: 'Light',
    dark: 'Dark',
    spanish: 'Spanish',
    english: 'English',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    nameLabel: 'Name',
    birthDateLabel: 'Birth date',
    signInPrompt: 'Log in with your account to start tracking movements.',
    signInHint: 'If you do not have an account yet, you can create one from the register page.',
    signInFormTitle: 'Log in',
    signInFormHint: 'Use your credentials to open the app.',
    noAccount: 'No account yet?',
    createAccount: 'Create account',
    createAccountTitle: 'Create account',
    createAccountHint: 'Sign up to start using Aureo.',
    registerHint: 'You can log in later with the details you enter here.',
    alreadyAccount: 'Already have an account?',
    backHome: 'Go back',
    home: 'Home',
    completeAllFields: 'Please complete all fields.',
    completeEmailPassword: 'Please enter email and password.',
    minPassword: 'Password must be at least 6 characters.',
    userCreated: 'User created successfully.',
    loginFailed: 'We could not find a user with those credentials.',
    registerFailed: 'We could not create the user.',
    descriptionRequired: 'Description is required.',
    categoryRequired: 'Category is required.',
    dateRequired: 'Date is required.',
    amountPositive: 'Amount must be greater than zero.',
    confirmDeleteMovement: 'Do you want to delete this movement?',
    sessionClosed: 'Session closed.',
  },
}

const PreferencesContext = createContext(null)

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  return localStorage.getItem(THEME_KEY) ?? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
}

function getInitialLocale() {
  if (typeof window === 'undefined') {
    return 'es'
  }

  return localStorage.getItem(LOCALE_KEY) ?? 'es'
}

export function PreferencesProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)
  const [locale, setLocale] = useState(getInitialLocale)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.dataset.locale = locale
    document.documentElement.lang = locale
    localStorage.setItem(THEME_KEY, theme)
    localStorage.setItem(LOCALE_KEY, locale)
  }, [theme, locale])

  const value = useMemo(() => {
    const dictionary = dictionaries[locale] ?? dictionaries.es
    const t = (key) => dictionary[key] ?? key

    return {
      theme,
      locale,
      setTheme,
      setLocale,
      toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
      t,
      isDark: theme === 'dark',
    }
  }, [theme, locale])

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}

export function usePreferences() {
  const context = useContext(PreferencesContext)
  if (!context) {
    throw new Error('usePreferences must be used within PreferencesProvider')
  }
  return context
}
