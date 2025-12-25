import { useState } from 'react'
import './App.css'
import DashboardLayout from './components/DashboardLayout.jsx'
import EditProfile from './pages/EditProfile.jsx'
import Login from './pages/Login.jsx'
import { Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<EditProfile />} />
        <Route path="/dashboard/profile" element={<EditProfile />} />
        <Route path="/dashboard" element={<EditProfile />} /> 
      </Route>
    </Routes>
  )
}

export default App
