import React from 'react'

export default function Landing(){
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-[color:var(--color-surface)] shadow-card">
        <h1 className="text-4xl font-bold">Welcome to Nuelifi</h1>
        <p className="mt-4 text-muted">Fast, beautiful interfaces for your PWA.</p>

        <div className="mt-6 flex gap-4">
          <a className="px-4 py-2 rounded-md bg-[color:var(--color-primary)] text-white">Get started</a>
          <a className="px-4 py-2 rounded-md border border-[color:var(--color-muted)]">Learn more</a>
        </div>
      </div>
    </div>
  )
}
