import React from 'react'
import Header from './components/Header'
import Button from './components/Button'

export default function App() {
  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-fg)] font-sf-pro">
      <Header />

      <main className="max-w-5xl mx-auto p-6">
        <section className="mt-8">
          <h1 className="text-3xl font-semibold">Nuelifi — Redesigned</h1>
          <p className="mt-3 text-muted">Initial conversion to the Figma visual system (tokens, typography, and base components).</p>

          <div className="mt-6 flex items-center gap-4">
            <Button variant="primary">Primary action</Button>
            <Button variant="ghost">Secondary</Button>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-xl shadow-card bg-[color:var(--color-surface)]">
              <h3 className="text-xl font-medium">Card title</h3>
              <p className="mt-2 text-sm text-muted">Card body matches new tokens.</p>
            </div>
            <div className="p-6 rounded-xl shadow-card bg-[color:var(--color-surface)]">
              <h3 className="text-xl font-medium">Another card</h3>
              <p className="mt-2 text-sm text-muted">Responsive and accessible by default.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
