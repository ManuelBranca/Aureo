import WelcomeScreen from './pages/WelcomeScreen/WelcomeScreen'
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
      <Routes>
        <Route path="/" element={<WelcomeScreen/>} />
      </Routes>
  )
}

export default App