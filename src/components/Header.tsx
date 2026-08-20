import React from 'react'
import Button from '../components/Button'

export default function Header(){
  return (
    <header className="w-full border-b border-[color:var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-[color:var(--color-primary)] flex items-center justify-center text-white font-bold">N</div>
          <span className="font-semibold text-lg">Nuelifi</span>
        </div>

        <nav className="flex items-center gap-4">
          <a className="text-sm text-muted hover:text-[color:var(--color-fg)]">Docs</a>
          <a className="text-sm text-muted hover:text-[color:var(--color-fg)]">Pricing</a>
          <a className="text-sm text-muted hover:text-[color:var(--color-fg)]">Dashboard</a>
          <Button variant="ghost">Sign in</Button>
        </nav>
      </div>
    </header>
  )
}
