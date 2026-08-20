import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

export default function LineChart({ labels = [], data = [] }: { labels?: string[], data?: number[] }){
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Visitors',
        data,
        fill: true,
        backgroundColor: 'rgba(124,58,237,0.12)',
        borderColor: 'rgba(124,58,237,1)',
        tension: 0.3,
        pointRadius: 0,
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: 'var(--color-muted)' } },
      y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: 'var(--color-muted)' } }
    }
  }

  return (
    <div style={{ height: 220 }}>
      <Line data={chartData} options={options} />
    </div>
  )
}
