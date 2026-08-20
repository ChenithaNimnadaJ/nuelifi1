import React from 'react'
import { Home, Settings, CreditCard, User, Bell, BarChart2 } from 'lucide-react'

type Props = { onNavigate: (page: string) => void, current: string }

export default function Sidebar({ onNavigate, current }: Props){
  const item = (label: string, icon: React.ReactNode, key: string) => (
    <button
      onClick={() => onNavigate(key)}
      className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-3 hover:bg-[color:var(--color-bg)] ${current===key? 'bg-[color:var(--color-bg)]' : ''}`}
      aria-current={current===key ? 'page' : undefined}
    >
      <span className="w-5 h-5 text-[color:var(--color-primary)]">{icon}</span>
      <span className="text-sm">{label}</span>
    </button>
  )

  return (
    <aside className="w-64 p-4 border-r border-[color:var(--color-surface)] flex flex-col">
      <div className="mb-6 px-2">
        <div className="w-10 h-10 rounded-md bg-[color:var(--color-primary)] flex items-center justify-center text-white font-bold">N</div>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {item('Home', <Home size={16} />, 'home')}
        {item('Dashboard', <BarChart2 size={16} />, 'dashboard')}
        {item('Analytics', <BarChart2 size={16} />, 'analytics')}
        {item('Billing', <CreditCard size={16} />, 'billing')}
        {item('Profile', <User size={16} />, 'profile')}
        {item('Notifications', <Bell size={16} />, 'notifications')}
        {item('Settings', <Settings size={16} />, 'settings')}
      </nav>

      <div className="mt-auto p-2 text-xs text-muted">
        <div>Plan: Free</div>
      </div>
    </aside>
  )
}
