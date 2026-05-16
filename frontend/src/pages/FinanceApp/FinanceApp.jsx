import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePreferences } from '../../context/PreferencesContext'
import {
  buildYearMonthLabel,
  calculateMonthlyTotals,
  calculateTotals,
  createTransactionId,
  formatCurrency,
  formatDate,
  getMonthKey,
  normalizeText,
  STORAGE_KEY,
  sumByCategory,
} from '../../utils/finance'
import { clearSession, getSession } from '../../utils/session'
import { demoCategories, demoTransactions } from '../../data/demoData'
import './FinanceApp.css'

const defaultTransactionForm = {
  type: 'expense',
  amount: '',
  category: '',
  description: '',
  date: new Date().toISOString().slice(0, 10),
}

const defaultFilters = {
  search: '',
  type: 'all',
  category: 'all',
  from: '',
  to: '',
}

const emptyDialog = {
  open: false,
  mode: 'expense',
  editingId: null,
  form: defaultTransactionForm,
}

const readStoredTransactions = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return demoTransactions
    }

    const parsed = JSON.parse(raw)
    return Array.isArray(parsed.transactions) && parsed.transactions.length ? parsed.transactions : demoTransactions
  } catch {
    return demoTransactions
  }
}

const availableCategories = (transactions) => {
  const categories = new Set([...demoCategories, ...transactions.map((transaction) => transaction.category).filter(Boolean)])
  return Array.from(categories).sort((a, b) => a.localeCompare(b, 'es'))
}

function FinanceApp() {
  const navigate = useNavigate()
  const { t } = usePreferences()
  const [session, setSession] = useState(getSession())
  const [transactions, setTransactions] = useState(readStoredTransactions)
  const [activeView, setActiveView] = useState('transactions')
  const [filters, setFilters] = useState(defaultFilters)
  const [dialog, setDialog] = useState(emptyDialog)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ transactions }))
  }, [transactions])

  const categories = availableCategories(transactions)
  const totals = calculateTotals(transactions)
  const monthKey = getMonthKey(new Date())
  const monthlyTotals = calculateMonthlyTotals(transactions, monthKey)
  const monthlyTransactions = transactions.filter((transaction) => getMonthKey(transaction.date) === monthKey)
  const topExpenseCategories = Object.entries(
    sumByCategory(monthlyTransactions.filter((transaction) => transaction.type === 'expense')),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)

  const filteredTransactions = useMemo(() => {
    const search = normalizeText(filters.search)

    return [...transactions]
      .filter((transaction) => {
        if (filters.type !== 'all' && transaction.type !== filters.type) {
          return false
        }

        if (filters.category !== 'all' && transaction.category !== filters.category) {
          return false
        }

        if (filters.from && transaction.date < filters.from) {
          return false
        }

        if (filters.to && transaction.date > filters.to) {
          return false
        }

        if (!search) {
          return true
        }

        return [transaction.description, transaction.category, transaction.type]
          .filter(Boolean)
          .some((value) => normalizeText(value).includes(search))
      })
      .sort((a, b) => b.date.localeCompare(a.date))
  }, [transactions, filters])

  const openDialog = (mode, transaction = null) => {
    setFormError('')
    setDialog({
      open: true,
      mode,
      editingId: transaction?.id ?? null,
      form: transaction
        ? {
            type: transaction.type,
            amount: String(transaction.amount),
            category: transaction.category,
            description: transaction.description,
            date: transaction.date,
          }
        : {
            ...defaultTransactionForm,
            type: mode,
            date: new Date().toISOString().slice(0, 10),
          },
    })
  }

  const closeDialog = () => {
    setDialog(emptyDialog)
    setFormError('')
  }

  const handleSubmitTransaction = (event) => {
    event.preventDefault()
    setFormError('')

    const amount = Number(dialog.form.amount)

    if (!dialog.form.description.trim()) {
      setFormError(t('descriptionRequired'))
      return
    }

    if (!dialog.form.category.trim()) {
      setFormError(t('categoryRequired'))
      return
    }

    if (!dialog.form.date) {
      setFormError(t('dateRequired'))
      return
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      setFormError(t('amountPositive'))
      return
    }

    const nextTransaction = {
      id: dialog.editingId ?? createTransactionId(),
      type: dialog.form.type,
      amount,
      category: dialog.form.category.trim(),
      description: dialog.form.description.trim(),
      date: dialog.form.date,
    }

    setTransactions((current) => {
      const next = dialog.editingId
        ? current.map((transaction) => (transaction.id === dialog.editingId ? nextTransaction : transaction))
        : [nextTransaction, ...current]

      return next
    })

    closeDialog()
    setActiveView('transactions')
  }

  const handleDeleteTransaction = (id) => {
    const confirmed = window.confirm(t('confirmDeleteMovement'))
    if (!confirmed) {
      return
    }

    setTransactions((current) => current.filter((transaction) => transaction.id !== id))
  }

  const handleLogout = () => {
    clearSession()
    setSession(null)
    navigate('/')
  }

  return (
    <main className="finance-app">
      <header className="app-hero">
        <div>
          <p className="app-kicker">Aureo personal finance</p>
          <h1 className="app-title">{t('movements')}</h1>
          <p className="app-description">
            {t('financeDescription')}
          </p>
        </div>

        <div className="app-actions app-session">
          {session ? (
            <span className="session-pill">
              {t('activeSession')} <strong>{session.username}</strong>
            </span>
          ) : (
            <Link className="ghost-button" to="/login">
              {t('login')}
            </Link>
          )}
          {session ? (
            <button type="button" className="ghost-button" onClick={handleLogout}>
              {t('logout')}
            </button>
          ) : null}
        </div>
      </header>

      <section className="quick-actions">
        <button type="button" className="quick-action quick-action-income" onClick={() => openDialog('income')}>
          {t('income')}
        </button>
        <button type="button" className="quick-action quick-action-expense" onClick={() => openDialog('expense')}>
          {t('expense')}
        </button>
        <button type="button" className="quick-action quick-action-secondary" onClick={() => setActiveView('summary')}>
          {t('summary')}
        </button>
      </section>

      <nav className="app-nav" aria-label="Secciones principales">
        <button
          type="button"
          className={`app-nav-button ${activeView === 'transactions' ? 'is-active' : ''}`}
          onClick={() => setActiveView('transactions')}
        >
          {t('movements')}
        </button>
        <button
          type="button"
          className={`app-nav-button ${activeView === 'summary' ? 'is-active' : ''}`}
          onClick={() => setActiveView('summary')}
        >
          {t('balance')}
        </button>
      </nav>

      {activeView === 'transactions' && (
        <section className="app-grid">
          <article className="panel panel-wide">
            <div className="panel-header">
              <div>
                <h2>{t('recentMovements')}</h2>
                <p>{t('recentDesc')}</p>
              </div>
            </div>

            <div className="filter-grid">
              <label className="field">
                <span>{t('search')}</span>
                <input
                  type="search"
                  value={filters.search}
                  onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))}
                  placeholder="Descripción o categoría"
                />
              </label>

              <label className="field">
                <span>{t('type')}</span>
                <select
                  value={filters.type}
                  onChange={(event) => setFilters((current) => ({ ...current, type: event.target.value }))}
                >
                  <option value="all">{t('all')}</option>
                  <option value="income">{t('incomes')}</option>
                  <option value="expense">{t('expenses')}</option>
                </select>
              </label>

              <label className="field">
                <span>{t('category')}</span>
                <select
                  value={filters.category}
                  onChange={(event) => setFilters((current) => ({ ...current, category: event.target.value }))}
                >
                  <option value="all">{t('all')}</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>{t('from')}</span>
                <input
                  type="date"
                  value={filters.from}
                  onChange={(event) => setFilters((current) => ({ ...current, from: event.target.value }))}
                />
              </label>

              <label className="field">
                <span>{t('to')}</span>
                <input
                  type="date"
                  value={filters.to}
                  onChange={(event) => setFilters((current) => ({ ...current, to: event.target.value }))}
                />
              </label>
            </div>

            <div className="filter-actions">
              <button
                type="button"
                className="ghost-button"
                onClick={() => setFilters(defaultFilters)}
              >
                {t('clearFilters')}
              </button>
            </div>

            <div className="transaction-list">
              {filteredTransactions.length ? (
                filteredTransactions.map((transaction) => (
                  <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                    onEdit={() => openDialog(transaction.type, transaction)}
                    onDelete={handleDeleteTransaction}
                  />
                ))
              ) : (
                <EmptyState
                  title={t('noFilteredMovements')}
                  description={t('noFilteredHelp')}
                />
              )}
            </div>
          </article>
        </section>
      )}

      {activeView === 'summary' && (
        <section className="app-grid overview-grid">
          <SummaryCard title={t('balance')} value={formatCurrency(totals.balance)} tone="accent" />
          <SummaryCard title={t('incomes')} value={formatCurrency(totals.income)} tone="success" />
          <SummaryCard title={t('expenses')} value={formatCurrency(totals.expenses)} tone="danger" />
          <SummaryCard title={t('movements')} value={transactions.length.toString()} tone="neutral" />

          <article className="panel panel-wide">
            <div className="panel-header">
              <div>
                <h2>{t('currentMonthSummary')}</h2>
                <p>{buildYearMonthLabel(monthKey)}</p>
              </div>
            </div>

            <div className="month-summary">
              <div>
                <span>{t('incomes')}</span>
                <strong>{formatCurrency(monthlyTotals.income)}</strong>
              </div>
              <div>
                <span>{t('expenses')}</span>
                <strong>{formatCurrency(monthlyTotals.expenses)}</strong>
              </div>
              <div>
                <span>{t('balance')}</span>
                <strong>{formatCurrency(monthlyTotals.balance)}</strong>
              </div>
            </div>

            <div className="comparison-bars">
              <BarRow label={t('incomes')} value={monthlyTotals.income} total={Math.max(monthlyTotals.income, monthlyTotals.expenses, 1)} tone="success" />
              <BarRow label={t('expenses')} value={monthlyTotals.expenses} total={Math.max(monthlyTotals.income, monthlyTotals.expenses, 1)} tone="danger" />
            </div>
          </article>

          <article className="panel panel-wide">
            <div className="panel-header">
              <div>
                <h2>{t('currentMonthTop')}</h2>
                <p>{t('currentMonthTopDesc')}</p>
              </div>
            </div>

            {topExpenseCategories.length ? (
              <div className="category-list">
                {topExpenseCategories.map(([category, amount]) => (
                  <div key={category} className="category-item">
                    <span>{category}</span>
                    <strong>{formatCurrency(amount)}</strong>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title={t('titleNoExpenses')} description={t('titleNoExpensesHelp')} />
            )}
          </article>
        </section>
      )}

      {dialog.open ? (
        <div className="modal-backdrop" onClick={closeDialog} role="presentation">
          <section className="modal-card" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
            <div className="panel-header">
              <div>
                <h2>{dialog.editingId ? t('editMovement') : dialog.mode === 'income' ? t('addIncome') : t('addExpense')}</h2>
                <p>{t('chooseDateNote')}</p>
              </div>
              <button type="button" className="ghost-button" onClick={closeDialog}>
                {t('close')}
              </button>
            </div>

            <form className="stack-form" onSubmit={handleSubmitTransaction}>
              <div className="form-grid">
                <label className="field">
                  <span>{t('type')}</span>
                  <select
                    value={dialog.form.type}
                    onChange={(event) =>
                      setDialog((current) => ({
                        ...current,
                        form: { ...current.form, type: event.target.value },
                      }))
                    }
                  >
                    <option value="income">{t('incomes')}</option>
                    <option value="expense">{t('expenses')}</option>
                  </select>
                </label>

                <label className="field">
                  <span>{t('amount')}</span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={dialog.form.amount}
                    onChange={(event) =>
                      setDialog((current) => ({
                        ...current,
                        form: { ...current.form, amount: event.target.value },
                      }))
                    }
                    placeholder="0"
                  />
                </label>

                <label className="field">
                  <span>{t('category')}</span>
                  <input
                    list="finance-categories"
                    value={dialog.form.category}
                    onChange={(event) =>
                      setDialog((current) => ({
                        ...current,
                        form: { ...current.form, category: event.target.value },
                      }))
                    }
                    placeholder="Ej. Alimentación"
                  />
                  <datalist id="finance-categories">
                    {categories.map((category) => (
                    <option key={category} value={category} />
                    ))}
                  </datalist>
                </label>

                <label className="field">
                  <span>{t('date')}</span>
                  <input
                    type="date"
                    value={dialog.form.date}
                    onChange={(event) =>
                      setDialog((current) => ({
                        ...current,
                        form: { ...current.form, date: event.target.value },
                      }))
                    }
                  />
                </label>
              </div>

              <label className="field">
                <span>{t('description')}</span>
                <textarea
                  rows="3"
                  value={dialog.form.description}
                  onChange={(event) =>
                    setDialog((current) => ({
                      ...current,
                      form: { ...current.form, description: event.target.value },
                    }))
                  }
                  placeholder="Ej. Compra en supermercado"
                />
              </label>

              {formError ? <p className="form-error">{formError}</p> : null}

              <div className="form-actions">
                <button type="submit" className="primary-button">
                  {dialog.editingId ? t('saveChanges') : t('addMovement')}
                </button>
                <button type="button" className="ghost-button" onClick={closeDialog}>
                  {t('cancel')}
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </main>
  )
}

function SummaryCard({ title, value, tone }) {
  return (
    <article className={`summary-card tone-${tone}`}>
      <span>{title}</span>
      <strong>{value}</strong>
    </article>
  )
}

function BarRow({ label, value, total, tone }) {
  const width = Math.max(4, (value / total) * 100)

  return (
    <div className="bar-row">
      <div className="bar-row-head">
        <span>{label}</span>
        <strong>{formatCurrency(value)}</strong>
      </div>
      <div className="bar-track">
        <div className={`bar-fill tone-${tone}`} style={{ width: `${width}%` }} />
      </div>
    </div>
  )
}

function TransactionRow({ transaction, onEdit, onDelete }) {
  const tone = transaction.type === 'income' ? 'success' : 'danger'

  return (
    <article className="transaction-row">
      <div className="transaction-main">
        <span className={`transaction-pill tone-${tone}`}>{transaction.type === 'income' ? 'Ingreso' : 'Gasto'}</span>
        <h3>{transaction.description}</h3>
        <p>
          {transaction.category} · {formatDate(transaction.date)}
        </p>
      </div>

      <div className="transaction-meta">
        <strong className={`transaction-amount tone-${tone}`}>
          {transaction.type === 'income' ? '+' : '-'}
          {formatCurrency(transaction.amount)}
        </strong>

        <div className="transaction-actions">
          <button type="button" className="inline-action" onClick={onEdit}>
            Editar
          </button>
          <button type="button" className="inline-action danger" onClick={() => onDelete(transaction.id)}>
            Eliminar
          </button>
        </div>
      </div>
    </article>
  )
}

function EmptyState({ title, description }) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default FinanceApp
