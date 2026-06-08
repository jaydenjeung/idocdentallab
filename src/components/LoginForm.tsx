'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { EVIDENT_DENTIST_PORTAL_URL } from '@/lib/portal'

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError('Please enter your email and password.')
      return
    }

    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    if (authError) {
      setError('Invalid email or password.')
      setLoading(false)
      return
    }

    const next = searchParams.get('next')
    const dest =
      next && next.startsWith('/') && !next.startsWith('//') ? next : '/dashboard'
    router.push(dest)
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">IDOC Dental Lab</h1>
          <p className="text-sm text-gray-500 mt-1">Account sign-in</p>
        </div>

        <div className="mb-6 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-900">
          <p className="font-medium mb-1">Existing Evident customers</p>
          <p className="text-green-800/90 text-[13px] leading-relaxed">
            Use the{' '}
            <a
              href={EVIDENT_DENTIST_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline hover:text-green-950"
            >
              dentist portal on Evident
            </a>{' '}
            to submit cases and track orders — same as before.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="doctor@practice.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  )
}
