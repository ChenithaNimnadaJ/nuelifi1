import React from 'react'

export default function Billing(){
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Billing</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-[color:var(--color-surface)] shadow-card">
          <h4 className="font-medium">Current plan</h4>
          <p className="text-sm text-muted mt-2">Free • Up to 3 projects</p>
          <div className="mt-4"><button className="px-4 py-2 rounded-md bg-[color:var(--color-primary)] text-white">Upgrade</button></div>
        </div>
        <div className="p-4 rounded-xl bg-[color:var(--color-surface)] shadow-card">
          <h4 className="font-medium">Payment method</h4>
          <p className="text-sm text-muted mt-2">No payment method on file.</p>
        </div>
      </div>
    </div>
  )
}
