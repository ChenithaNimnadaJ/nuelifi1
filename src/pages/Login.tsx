import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'

export default function Login({ onLogin }: { onLogin: () => void }){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[color:var(--color-surface)] shadow-card">
        <h2 className="text-2xl font-semibold">Sign in to Nuelifi</h2>
        <p className="text-muted mt-2">Enter your credentials to continue</p>

        <form className="mt-6 flex flex-col gap-4" onSubmit={(e)=>{ e.preventDefault(); onLogin() }}>
          <Input label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
          <Input label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />

          <div className="flex items-center justify-between">
            <label className="text-sm text-muted"><input type="checkbox" className="mr-2"/> Remember me</label>
            <a className="text-sm text-muted">Forgot?</a>
          </div>

          <Button variant="primary" type="submit">Sign in</Button>
        </form>
      </div>
    </div>
  )
}
