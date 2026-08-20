import React from 'react'

export default function Settings(){
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Settings</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-[color:var(--color-surface)] shadow-card">
          <h4 className="font-medium">Profile</h4>
          <p className="text-sm text-muted mt-2">Name, email, and avatar settings.</p>
        </div>
        <div className="p-4 rounded-xl bg-[color:var(--color-surface)] shadow-card">
          <h4 className="font-medium">Billing</h4>
          <p className="text-sm text-muted mt-2">Manage subscription and invoices.</p>
        </div>
      </div>
    </div>
  )
}
