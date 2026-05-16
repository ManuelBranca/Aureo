import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import backendApi from '../../api/backend'
import { usePreferences } from '../../context/PreferencesContext'
import { setSession } from '../../utils/session'
import '../AuthShared.css'
import './LoginScreen.css'
import aureoLogo from '../../assets/aureo-logo.png'

const initialForm = {
  email: '',
  password: '',
}

function LoginScreen() {
  const navigate = useNavigate()
  const { t } = usePreferences()
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!form.email.trim() || !form.password.trim()) {
      setError(t('completeEmailPassword'))
      return
    }

    setLoading(true)
    try {
      const users = await backendApi.findAllUsers()
      const match = (Array.isArray(users) ? users : []).find(
        (user) => user.email === form.email.trim() && user.password === form.password.trim() && user.active !== false,
      )

      if (!match) {
        setError(t('loginFailed'))
        return
      }

      setSession(match)
      navigate('/app')
    } catch (err) {
      setError(err instanceof Error ? err.message : t('loginFailed'))
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
          <p className="auth-badge">{t('signInFormTitle')}</p>
          <h1>{t('signInPrompt')}</h1>
          <p>{t('signInHint')}</p>
        </div>
      </section>

      <section className="auth-grid auth-grid-single">
        <article className="auth-card">
          <form className="stack-form" onSubmit={handleSubmit}>
            <label className="field">
              <span>{t('emailLabel')}</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="tu@mail.com"
              />
            </label>

            <label className="field">
              <span>{t('passwordLabel')}</span>
              <input
                type="password"
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                placeholder="Tu contraseña"
              />
            </label>

            {error ? <p className="auth-message auth-message-error">{error}</p> : null}

            <button type="submit" className="auth-button auth-button-primary" disabled={loading}>
              {t('login')}
            </button>
          </form>

          <p className="auth-link-row">
            {t('noAccount')} <Link to="/register">{t('createAccount')}</Link>
          </p>
        </article>
      </section>
    </main>
  )
}

export default LoginScreen
