import React from 'react'
import Card from '../components/Card'

export default function Dashboard(){
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <h4 className="text-lg font-medium">Active users</h4>
          <p className="mt-2 text-muted">1,250</p>
        </Card>
        <Card>
          <h4 className="text-lg font-medium">Conversion</h4>
          <p className="mt-2 text-muted">3.2%</p>
        </Card>
        <Card>
          <h4 className="text-lg font-medium">Revenue</h4>
          <p className="mt-2 text-muted">$4,200</p>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <h4 className="text-lg font-medium">Activity</h4>
          <p className="mt-2 text-muted">Recent events and logs would show here.</p>
        </Card>
      </div>
    </div>
  )
}
