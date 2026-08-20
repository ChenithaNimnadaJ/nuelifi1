import React from 'react'

export default function Avatar({ name, src, size = 32 }: { name?: string, src?: string, size?: number }){
  const initials = name ? name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase() : 'NU'
  return (
    <div style={{ width: size, height: size }} className="rounded-full bg-[color:var(--color-primary)] text-white flex items-center justify-center font-medium">
      {src ? <img src={src} alt={name || 'avatar'} className="w-full h-full rounded-full object-cover" /> : <span>{initials}</span>}
    </div>
  )
}
