import React from 'react'

export default function Modal({ open, title, onClose, children }: { open: boolean, title?: string, onClose: () => void, children?: React.ReactNode }){
  if(!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" role="presentation" onClick={onClose}>
      <div className="bg-[color:var(--color-surface)] rounded-xl p-6 w-full max-w-2xl" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 id="modal-title" className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} aria-label="Close dialog" className="text-muted">Close</button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}
