import React from 'react'
import LoginPage from './pages/Login'
import { ToastContainer } from 'react-toastify'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
  <div>
    <Router>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
    <ToastContainer />
  </div>

  )
}

export default App