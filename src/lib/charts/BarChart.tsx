import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export default function BarChart({ labels = [], data = [] }: { labels?: string[], data?: number[] }){
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Signups',
        data,
        backgroundColor: 'rgba(6,182,212,0.9)'
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: 'var(--color-muted)' } },
      y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: 'var(--color-muted)' } }
    }
  }

  return (
    <div style={{ height: 220 }}>
      <Bar data={chartData} options={options} />
    </div>
  )
}
