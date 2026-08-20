import React from 'react'

export default function Card({ children, className = '' }: React.PropsWithChildren<{ className?: string }>){
  return (
    <div className={`p-6 rounded-xl shadow-card bg-[color:var(--color-surface)] ${className}`}>
      {children}
    </div>
  )
}
