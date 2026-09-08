import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

function AuthLogo() {
  return (
    <Link className="relative inline-block text-3xl font-bold tracking-[-2px] text-amazon-navy" to="/" aria-label="Amazon.in home">
      amazon<span className="text-xl tracking-[-1px]">.in</span>
      <span className="absolute -bottom-1 left-9 h-1 w-12 rounded-full bg-amazon-orange" aria-hidden="true" />
    </Link>
  )
}

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!identifier.trim() || !password) {
      setError('Enter your email or mobile number and password.')
      return
    }

    try {
      await login(identifier, password)
      navigate('/profile')
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-[350px]">
        <div className="text-center">
          <AuthLogo />
        </div>
        <main className="mt-6 border border-amazon-border p-6 shadow-sm sm:p-7" aria-labelledby="login-heading">
          <h1 id="login-heading" className="text-2xl font-normal text-amazon-text">Sign in</h1>
          <form className="mt-6" onSubmit={handleSubmit} noValidate>
            <label className="block text-sm font-bold text-amazon-text" htmlFor="login-identifier">
              Email or mobile phone number
            </label>
            <input
              autoComplete="username"
              className="mt-2 min-h-11 w-full rounded border border-[#888] px-3 text-sm outline-none focus:border-amazon-focus focus:ring-2 focus:ring-amazon-focus/30"
              id="login-identifier"
              type="text"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
            />
            <div className="mt-5 flex items-center justify-between gap-3">
              <label className="text-sm font-bold text-amazon-text" htmlFor="login-password">
                Password
              </label>
              <span className="text-xs text-amazon-link">Forgot password?</span>
            </div>
            <input
              autoComplete="current-password"
              className="mt-2 min-h-11 w-full rounded border border-[#888] px-3 text-sm outline-none focus:border-amazon-focus focus:ring-2 focus:ring-amazon-focus/30"
              id="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {error && <p className="mt-4 text-sm text-[#b12704]" role="alert">{error}</p>}
            <button className="mt-5 min-h-11 w-full rounded border border-[#a88734] bg-amazon-yellow px-4 py-2 text-sm text-amazon-text hover:bg-[#f3a847]" type="submit">
              Continue
            </button>
          </form>
          <p className="mt-6 text-xs leading-5 text-amazon-muted">
            By continuing, you agree to the Amazon Clone terms and privacy notice. This is a frontend-only mock sign-in.
          </p>
        </main>
        <div className="my-5 flex items-center gap-3 text-xs text-amazon-muted">
          <span className="h-px flex-1 bg-amazon-border" />
          New to Amazon Clone?
          <span className="h-px flex-1 bg-amazon-border" />
        </div>
        <Link className="block min-h-11 rounded border border-amazon-border bg-white px-4 py-3 text-center text-sm text-amazon-text hover:bg-amazon-page" to="/register">
          Create your Amazon Clone account
        </Link>
      </div>
    </div>
  )
}

export default Login
