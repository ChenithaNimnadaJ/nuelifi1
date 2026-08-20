import React, { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Analytics from './pages/Analytics'
import Profile from './pages/Profile'
import Billing from './pages/Billing'
import Notifications from './pages/Notifications'

export default function App(){
  const [page, setPage] = useState<string>('landing')
  const [authenticated, setAuthenticated] = useState(false)

  function handleNavigate(p: string){
    setPage(p)
  }

  function handleLogin(){
    setAuthenticated(true)
    setPage('dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--color-bg)] text-[color:var(--color-fg)] font-inter">
      <Header />

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Show sidebar only when authenticated */}
        {authenticated && (
          <Sidebar onNavigate={handleNavigate} current={page} />
        )}

        <div className="flex-1">
          {!authenticated && page === 'landing' && <Landing />}
          {!authenticated && page === 'login' && <Login onLogin={handleLogin} />}

          {authenticated && page === 'dashboard' && <Dashboard />}
          {authenticated && page === 'analytics' && <Analytics />}
          {authenticated && page === 'profile' && <Profile />}
          {authenticated && page === 'billing' && <Billing />}
          {authenticated && page === 'notifications' && <Notifications />}
          {authenticated && page === 'settings' && <Settings />}

          <Footer />
        </div>
      </div>
    </div>
  )
}
