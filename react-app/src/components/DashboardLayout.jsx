import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className="flex flex-col h-screen w-screen bg-white dark:bg-black transition-colors duration-300">
        <Header />

        <div className="flex flex-1 overflow-hidden">
            <Sidebar />

            <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <Outlet />
            </main>
        </div>
    </div>
  )
}

export default DashboardLayout
