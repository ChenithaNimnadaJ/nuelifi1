import React, { useState, useRef, useEffect } from 'react'

export default function Dropdown({ label, children }: { label: React.ReactNode, children: React.ReactNode }){
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(()=>{
    function onDoc(e: MouseEvent){
      if(!ref.current) return
      if(!ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', onDoc)
    return ()=>document.removeEventListener('click', onDoc)
  }, [])

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button aria-haspopup="menu" aria-expanded={open} onClick={()=>setOpen(v=>!v)} className="px-3 py-2 rounded-md bg-transparent hover:bg-[color:var(--color-bg)] transition-base">{label}</button>
      {open && (
        <div role="menu" className="absolute right-0 mt-2 w-48 rounded-md bg-[color:var(--color-surface)] shadow-card p-2">
          {children}
        </div>
      )}
    </div>
  )
}
