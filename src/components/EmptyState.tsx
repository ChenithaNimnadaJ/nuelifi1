import React from 'react'

export default function EmptyState({ title, description }: { title: string, description?: string }){
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-[color:var(--color-surface)] shadow-card text-center">
      <div className="text-2xl font-semibold">{title}</div>
      {description && <p className="mt-2 text-sm text-muted">{description}</p>}
    </div>
  )
}
