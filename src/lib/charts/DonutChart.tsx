import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function DonutChart({ labels = [], data = [] }: { labels?: string[], data?: number[] }){
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: [
          'rgba(124,58,237,0.9)',
          'rgba(6,182,212,0.9)',
          'rgba(99,102,241,0.9)'
        ],
        borderWidth: 0
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom', labels: { color: 'var(--color-muted)' } } }
  }

  return (
    <div style={{ height: 220 }}>
      <Doughnut data={chartData} options={options} />
    </div>
  )
}
