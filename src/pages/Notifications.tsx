import React from 'react'
import EmptyState from '../components/EmptyState'

export default function Notifications(){
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Notifications</h2>
      <div className="mt-6">
        <EmptyState title="No notifications" description="You're all caught up — we'll show notifications here." />
      </div>
    </div>
  )
}
