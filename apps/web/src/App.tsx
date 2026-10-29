import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { LoginPage } from './components/pages/LoginPage/LoginPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
