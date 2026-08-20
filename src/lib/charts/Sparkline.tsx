import React from 'react'

export default function Sparkline({ data = [], width = 200, height = 40 }: { data?: number[], width?: number, height?: number }){
  if(!data || data.length===0) return null
  const max = Math.max(...data)
  const min = Math.min(...data)
  const len = data.length
  const points = data.map((d,i)=>{
    const x = (i/(len-1)) * width
    const y = height - ((d - min) / (max - min || 1)) * height
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke="#7c3aed" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
