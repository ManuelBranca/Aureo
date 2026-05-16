import { useState } from 'react'
import { Link } from 'react-router-dom'
import backendApi from '../../api/backend'
import { usePreferences } from '../../context/PreferencesContext'
import '../AuthShared.css'
import './RegisterScreen.css'
import aureoLogo from '../../assets/aureo-logo.png'

const initialForm = {
  username: '',
  email: '',
  password: '',
  birthDate: '',
}

function RegisterScreen() {
  const { t } = usePreferences()
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setNotice('')

    if (!form.username.trim() || !form.email.trim() || !form.password.trim() || !form.birthDate) {
      setError(t('completeAllFields'))
      return
    }

    if (form.password.trim().length < 6) {
      setError(t('minPassword'))
      return
    }

    setLoading(true)
    try {
      const status = await backendApi.createUser({
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password.trim(),
        birthDate: form.birthDate,
      })

      setNotice(status?.message ?? t('userCreated'))
      setForm(initialForm)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('registerFailed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-card auth-card-hero">
        <div className="auth-logo-wrap">
          <img src={aureoLogo} alt="Aureo" className="auth-logo" />
        </div>
        <div className="auth-hero-copy">
          <p className="auth-badge">{t('createAccountTitle')}</p>
          <h1>{t('createAccountHint')}</h1>
          <p>{t('registerHint')}</p>
        </div>
      </section>

      <section className="auth-grid auth-grid-single">
        <article className="auth-card">
          <form className="stack-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label className="field">
                <span>{t('nameLabel')}</span>
                <input
                  type="text"
                  value={form.username}
                  onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
                  placeholder="Manuel"
                />
              </label>

              <label className="field">
                <span>{t('emailLabel')}</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  placeholder="manu@mail.com"
                />
              </label>

              <label className="field">
                <span>{t('passwordLabel')}</span>
                <input
                  type="password"
                  value={form.password}
                  onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                  placeholder="Mínimo 6 caracteres"
                />
              </label>

              <label className="field">
                <span>{t('birthDateLabel')}</span>
                <input
                  type="date"
                  value={form.birthDate}
                  onChange={(event) => setForm((current) => ({ ...current, birthDate: event.target.value }))}
                />
              </label>
            </div>

            {error ? <p className="auth-message auth-message-error">{error}</p> : null}
            {notice ? <p className="auth-message auth-message-success">{notice}</p> : null}

            <button type="submit" className="auth-button auth-button-primary" disabled={loading}>
              {t('register')}
            </button>
          </form>

          <p className="auth-link-row">
            {t('alreadyAccount')} <Link to="/login">{t('login')}</Link>
          </p>
          <p className="auth-link-row">
            {t('backHome')} <Link to="/">{t('home')}</Link>
          </p>
        </article>
      </section>
    </main>
  )
}

export default RegisterScreen
