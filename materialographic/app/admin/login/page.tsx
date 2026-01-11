'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Auto-focus email field on mount and restore remember me state
  useEffect(() => {
    // Check if user previously selected remember me
    const remembered = localStorage.getItem('admin_remember_me')
    if (remembered === 'true') {
      setRememberMe(true)
      const savedEmail = localStorage.getItem('admin_email')
      if (savedEmail) {
        setEmail(savedEmail)
      }
    }
    
    // Focus email field (or password if email is already filled)
    if (email) {
      // If email is pre-filled, focus password
      const passwordInput = document.getElementById('password') as HTMLInputElement
      passwordInput?.focus()
    } else {
      emailInputRef.current?.focus()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const supabase = createClient()
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message)
        setLoading(false)
        return
      }

      if (data.user) {
        // Store remember me preference
        if (rememberMe) {
          localStorage.setItem('admin_remember_me', 'true')
          localStorage.setItem('admin_email', email)
        } else {
          localStorage.removeItem('admin_remember_me')
          localStorage.removeItem('admin_email')
        }
        
        router.push('/admin')
        router.refresh()
      }
    } catch (err) {
      setError('An unexpected error occurred')
      setLoading(false)
    }
  }

  const isEmailValid = email.includes('@') && email.includes('.')
  const isPasswordValid = password.length >= 6

  return (
    <div className="w-full max-w-md px-4 sm:px-6">
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-8 sm:p-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-4">
            <Image
              src="/images/pace/tri-structure.png"
              alt="PACE Technologies"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Admin Login
          </h2>
          <p className="text-sm text-gray-600">
            Sign in to access the admin dashboard
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 ${emailFocused ? 'text-primary-600' : 'text-gray-400'} transition-colors`} />
                </div>
                <input
                  ref={emailInputRef}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`w-full pl-10 pr-10 py-2.5 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all sm:text-sm ${
                    emailFocused 
                      ? 'border-primary-500' 
                      : error && !email 
                        ? 'border-red-300' 
                        : 'border-gray-300'
                  }`}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
                {email && isEmailValid && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${passwordFocused ? 'text-primary-600' : 'text-gray-400'} transition-colors`} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className={`w-full pl-10 pr-10 py-2.5 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all sm:text-sm ${
                    passwordFocused 
                      ? 'border-primary-500' 
                      : error && !password 
                        ? 'border-red-300' 
                        : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {password && !isPasswordValid && (
                <p className="mt-1.5 text-xs text-amber-600">
                  Password must be at least 6 characters
                </p>
              )}
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
              Remember me
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-800">
                    {error}
                  </p>
                  {error.toLowerCase().includes('password') && (
                    <p className="text-xs text-red-600 mt-1">
                      Please check your password and try again.
                    </p>
                  )}
                  {error.toLowerCase().includes('email') && (
                    <p className="text-xs text-red-600 mt-1">
                      Please check your email address and try again.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <>
                <div className="mr-3">
                  <LoadingSpinner size="sm" />
                </div>
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        {/* Help Text */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500">
            Having trouble? Contact your administrator for assistance.
          </p>
        </div>
      </div>
    </div>
  )
}

