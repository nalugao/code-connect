import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { LoginPage } from './components/pages/LoginPage/LoginPage'
import { SignUpPage } from './components/pages/SignUpPage/SignUpPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
