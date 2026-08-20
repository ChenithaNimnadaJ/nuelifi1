import React from 'react'

type ModalProps = {
  open: boolean
  title?: string
  onClose: () => void
  children?: React.ReactNode
}

export default function Modal({ open, title, onClose, children }: ModalProps){
  if(!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[color:var(--color-surface)] rounded-xl p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-muted">Close</button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}
