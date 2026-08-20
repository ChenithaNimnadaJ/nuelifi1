import React from 'react'

export default function Footer(){
  return (
    <footer className="w-full border-t border-[color:var(--color-surface)] mt-12">
      <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-muted flex justify-between items-center">
        <span>© {new Date().getFullYear()} Nuelifi</span>
        <nav className="flex gap-4">
          <a className="hover:text-[color:var(--color-fg)]">Terms</a>
          <a className="hover:text-[color:var(--color-fg)]">Privacy</a>
        </nav>
      </div>
    </footer>
  )
}
