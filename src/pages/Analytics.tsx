import React from 'react'
import LineChart from '../lib/charts/LineChart'
import BarChart from '../lib/charts/BarChart'
import DonutChart from '../lib/charts/DonutChart'
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

  const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
  const visitors = [120, 150, 170, 160, 190, 220, 240]
  const signups = [20, 32, 18, 25, 40, 60, 50]
  const donutLabels = ['Organic','Paid','Referral']
  const donutData = [65, 25, 10]

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Analytics</h2>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <h4 className="font-medium">Overview</h4>
          <p className="mt-2 text-sm text-muted">High level KPIs and trends.</p>
          <div className="mt-4">
            <DonutChart labels={donutLabels} data={donutData} />
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h4 className="font-medium">Visitors (last 7 days)</h4>
          <div className="mt-4">
            <LineChart labels={labels} data={visitors} />
          </div>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <h4 className="font-medium">Signups</h4>
          <div className="mt-4">
            <BarChart labels={labels} data={signups} />
          </div>
        </Card>

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
