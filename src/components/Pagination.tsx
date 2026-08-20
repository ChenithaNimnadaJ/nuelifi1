import React from 'react'

export default function Pagination({ page, total, onChange }: { page: number, total: number, onChange: (p:number)=>void }){
  const prev = ()=> onChange(Math.max(1, page-1))
  const next = ()=> onChange(Math.min(total, page+1))

  return (
    <div className="flex items-center gap-2">
      <button onClick={prev} className="px-3 py-1 rounded-md bg-transparent border border-[color:var(--color-surface)]">Prev</button>
      <div className="text-sm text-muted">Page {page} of {total}</div>
      <button onClick={next} className="px-3 py-1 rounded-md bg-[color:var(--color-primary)] text-white">Next</button>
    </div>
  )
}
