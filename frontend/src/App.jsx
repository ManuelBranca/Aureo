import { Navigate, Route, Routes } from 'react-router-dom'
import PreferencesBar from './components/PreferencesBar/PreferencesBar'
import { PreferencesProvider } from './context/PreferencesContext'
import WelcomeScreen from './pages/WelcomeScreen/WelcomeScreen'
import LoginScreen from './pages/LoginScreen/LoginScreen'
import RegisterScreen from './pages/RegisterScreen/RegisterScreen'
import FinanceApp from './pages/FinanceApp/FinanceApp'

function App() {
  return (
    <PreferencesProvider>
      <PreferencesBar />
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/app" element={<FinanceApp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PreferencesProvider>
  )
}

export default App
