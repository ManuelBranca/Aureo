import { useEffect, useRef, useState } from 'react'
import { usePreferences } from '../../context/PreferencesContext'
import './PreferencesBar.css'

function PreferencesBar() {
  const { theme, locale, setLocale, toggleTheme, t } = usePreferences()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const onPointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const handleThemeToggle = () => {
    toggleTheme()
    setOpen(false)
  }

  const handleLocaleChange = (nextLocale) => {
    setLocale(nextLocale)
    setOpen(false)
  }

  return (
    <div className="preferences-fab" ref={menuRef}>
      <button
        type="button"
        className="preferences-fab-button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`${t('theme')} / ${t('language')}`}
      >
        ⚙
      </button>

      {open ? (
        <div className="preferences-popover" role="menu" aria-label={`${t('theme')} ${t('language')}`}>
          <div className="preferences-section">
            <span className="preferences-label">{t('theme')}</span>
            <button type="button" className="preferences-option" onClick={handleThemeToggle}>
              {theme === 'dark' ? t('light') : t('dark')}
            </button>
          </div>

          <div className="preferences-section">
            <span className="preferences-label">{t('language')}</span>
            <div className="preferences-switcher">
              <button
                type="button"
                className={`preferences-option ${locale === 'es' ? 'is-active' : ''}`}
                onClick={() => handleLocaleChange('es')}
              >
                {t('spanish')}
              </button>
              <button
                type="button"
                className={`preferences-option ${locale === 'en' ? 'is-active' : ''}`}
                onClick={() => handleLocaleChange('en')}
              >
                {t('english')}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default PreferencesBar
