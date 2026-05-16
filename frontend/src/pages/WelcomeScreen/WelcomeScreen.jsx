import { Link } from 'react-router-dom'
import { usePreferences } from '../../context/PreferencesContext'
import './WelcomeScreen.css'
import aureoLogo from '../../assets/aureo-logo.png'

function WelcomeScreen() {
  const { t } = usePreferences()

  return (
    <main className="welcome-shell">
      <section className="welcome-card">
        <div className="welcome-badge">{t('brand')}</div>
        <div className="welcome-logo-wrap">
          <img src={aureoLogo} alt="Aureo" className="welcome-logo" />
        </div>
        <h1 className="welcome-title">{t('brand')}</h1>
        <p className="welcome-copy">
          {t('financeDescription')}
        </p>

        <div className="welcome-actions">
          <Link className="welcome-button welcome-button-primary" to="/login">
            {t('login')}
          </Link>
          <Link className="welcome-button welcome-button-secondary" to="/register">
            {t('register')}
          </Link>
          <Link className="welcome-button welcome-button-secondary" to="/app">
            {t('openApp')}
          </Link>
        </div>
      </section>
    </main>
  )
}

export default WelcomeScreen
