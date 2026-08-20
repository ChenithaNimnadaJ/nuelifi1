import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost'
}

export default function Button({ variant = 'primary', children, className = '', ...rest }: ButtonProps) {
  const base = 'px-4 py-2 rounded-lg font-medium transition-[background-color,transform] ease-in-out duration-150'
  const styles = variant === 'primary'
    ? `bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary-600)] text-white ${base}`
    : `bg-transparent border border-[color:var(--color-muted)] text-[color:var(--color-fg)] ${base}`

  return (
    <button className={`${styles} ${className}`} {...rest}>{children}</button>
  )
}
