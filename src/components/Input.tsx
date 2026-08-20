import React from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: string }

export default function Input({ label, className = '', id, ...rest }: InputProps){
  const fieldId = id || `input-${Math.random().toString(36).slice(2,7)}`
  return (
    <label htmlFor={fieldId} className={`flex flex-col gap-2 text-sm ${className}`}>
      {label && <span className="text-muted">{label}</span>}
      <input
        id={fieldId}
        {...rest}
        className="px-3 py-2 rounded-md bg-[color:var(--color-bg)] border border-[color:var(--color-surface)] text-[color:var(--color-fg)] focus:ring-2 focus:ring-[color:var(--color-primary)] outline-none transition-base"
      />
    </label>
  )
}
