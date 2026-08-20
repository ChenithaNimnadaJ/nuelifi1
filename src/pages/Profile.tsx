import React from 'react'

export default function Profile(){
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Profile</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-xl bg-[color:var(--color-surface)] shadow-card">
          <h4 className="font-medium">Personal</h4>
          <p className="text-sm text-muted mt-2">Update your name, email and avatar.</p>
          <div className="mt-4 flex flex-col gap-3">
            <label className="text-sm text-muted">Name <input className="ml-2 bg-transparent border border-[color:var(--color-surface)] rounded-md px-2 py-1" defaultValue="Nuelifi User" /></label>
            <label className="text-sm text-muted">Email <input className="ml-2 bg-transparent border border-[color:var(--color-surface)] rounded-md px-2 py-1" defaultValue="user@example.com" /></label>
            <button className="mt-3 px-4 py-2 rounded-md bg-[color:var(--color-primary)] text-white">Save</button>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-[color:var(--color-surface)] shadow-card">
          <h4 className="font-medium">Security</h4>
          <p className="text-sm text-muted mt-2">Change your password and two-factor settings.</p>
          <div className="mt-4">
            <button className="px-4 py-2 rounded-md border border-[color:var(--color-surface)]">Change password</button>
          </div>
        </div>
      </div>
    </div>
  )
}
