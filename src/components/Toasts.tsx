import React from 'react'

type Toast = { id: string, title?: string, message: string }

export function useToasts(){
  const [toasts, setToasts] = React.useState<Toast[]>([])

  function push(message: string, title?: string){
    const id = Math.random().toString(36).slice(2)
    setToasts(s => [...s, { id, title, message }])
    setTimeout(() => {
      setToasts(s => s.filter(t => t.id !== id))
    }, 4000)
  }

  return { toasts, push }
}

export default function Toasts({ toasts }: { toasts: Toast[] }){
  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3">
      {toasts.map(t => (
        <div key={t.id} className="min-w-[240px] p-3 rounded-md bg-[color:var(--color-surface)] shadow-card">
          {t.title && <div className="font-medium">{t.title}</div>}
          <div className="text-sm text-muted mt-1">{t.message}</div>
        </div>
      ))}
    </div>
  )
}
