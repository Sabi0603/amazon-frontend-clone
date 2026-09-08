import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({ name: '', identifier: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')

  function updateField(field, value) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!form.name.trim() || !form.identifier.trim() || !form.password || !form.confirmPassword) {
      setError('Complete all required fields.')
      return
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      await register({ identifier: form.identifier, name: form.name, password: form.password })
      navigate('/profile')
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-[390px]">
        <div className="text-center">
          <Link className="relative inline-block text-3xl font-bold tracking-[-2px] text-amazon-navy" to="/" aria-label="Amazon.in home">
            amazon<span className="text-xl tracking-[-1px]">.in</span>
            <span className="absolute -bottom-1 left-9 h-1 w-12 rounded-full bg-amazon-orange" aria-hidden="true" />
          </Link>
        </div>
        <main className="mt-6 border border-amazon-border p-6 shadow-sm sm:p-7" aria-labelledby="register-heading">
          <h1 id="register-heading" className="text-2xl font-normal text-amazon-text">Create account</h1>
          <form className="mt-6" onSubmit={handleSubmit} noValidate>
            <label className="block text-sm font-bold text-amazon-text" htmlFor="register-name">Your name</label>
            <input autoComplete="name" className="mt-2 min-h-11 w-full rounded border border-[#888] px-3 text-sm outline-none focus:border-amazon-focus focus:ring-2 focus:ring-amazon-focus/30" id="register-name" type="text" value={form.name} onChange={(event) => updateField('name', event.target.value)} />
            <label className="mt-5 block text-sm font-bold text-amazon-text" htmlFor="register-identifier">Email or mobile phone number</label>
            <input autoComplete="username" className="mt-2 min-h-11 w-full rounded border border-[#888] px-3 text-sm outline-none focus:border-amazon-focus focus:ring-2 focus:ring-amazon-focus/30" id="register-identifier" type="text" value={form.identifier} onChange={(event) => updateField('identifier', event.target.value)} />
            <label className="mt-5 block text-sm font-bold text-amazon-text" htmlFor="register-password">Password</label>
            <input autoComplete="new-password" className="mt-2 min-h-11 w-full rounded border border-[#888] px-3 text-sm outline-none focus:border-amazon-focus focus:ring-2 focus:ring-amazon-focus/30" id="register-password" type="password" value={form.password} onChange={(event) => updateField('password', event.target.value)} />
            <p className="mt-1 text-xs text-amazon-muted">Passwords must be at least 6 characters.</p>
            <label className="mt-5 block text-sm font-bold text-amazon-text" htmlFor="register-confirm-password">Confirm password</label>
            <input autoComplete="new-password" className="mt-2 min-h-11 w-full rounded border border-[#888] px-3 text-sm outline-none focus:border-amazon-focus focus:ring-2 focus:ring-amazon-focus/30" id="register-confirm-password" type="password" value={form.confirmPassword} onChange={(event) => updateField('confirmPassword', event.target.value)} />
            {error && <p className="mt-4 text-sm text-[#b12704]" role="alert">{error}</p>}
            <button className="mt-5 min-h-11 w-full rounded border border-[#a88734] bg-amazon-yellow px-4 py-2 text-sm text-amazon-text hover:bg-[#f3a847]" type="submit">Create your Amazon Clone account</button>
          </form>
          <p className="mt-6 text-xs leading-5 text-amazon-muted">This creates a temporary frontend-only session. No real account is created.</p>
        </main>
        <p className="mt-6 text-sm text-amazon-muted">
          Already have an account? <Link className="text-amazon-link hover:underline" to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
