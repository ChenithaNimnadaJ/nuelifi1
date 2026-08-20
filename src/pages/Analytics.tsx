import React from 'react'
import Card from '../components/Card'
import Table from '../components/Table'

export default function Analytics(){
  const columns = [
    { key: 'metric', title: 'Metric' },
    { key: 'value', title: 'Value' },
    { key: 'change', title: 'Change' },
  ]
  const data = [
    { metric: 'Active users', value: '1,250', change: '+3.2%' },
    { metric: 'New signups', value: '420', change: '+8.1%' },
    { metric: 'Crash rate', value: '0.02%', change: '-0.5%' },
  ]

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Analytics</h2>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <h4 className="font-medium">Overview</h4>
          <p className="mt-2 text-sm text-muted">High level KPIs and trends.</p>
        </Card>
        <Card>
          <h4 className="font-medium">Traffic</h4>
          <p className="mt-2 text-sm text-muted">Graph and traffic breakdowns.</p>
        </Card>
        <Card>
          <h4 className="font-medium">Retention</h4>
          <p className="mt-2 text-sm text-muted">Retention metrics and cohorts.</p>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <h4 className="font-medium">Recent metrics</h4>
          <div className="mt-4">
            <Table columns={columns} data={data} />
          </div>
        </Card>
      </div>
    </div>
  )
}
