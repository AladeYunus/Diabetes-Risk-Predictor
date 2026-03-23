"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [tosAccepted, setTosAccepted] = useState(false)
  const [marketingOptIn, setMarketingOptIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log("Sign up attempt:", { email, tosAccepted, marketingOptIn })
    setSubmitted(true)
  }

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-hpm-surface-muted flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">

          {/* Logo wordmark */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center font-heading font-extrabold text-2xl">
              <span className="text-hpm-primary">Heat</span>
              <span className="text-hpm-text">Pump</span>
              <span className="text-hpm-text">Match</span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-hpm-border shadow-sm p-8">
            <div className="text-center mb-7">
              <h2 className="font-heading text-2xl font-bold text-hpm-text">Create your account</h2>
              <p className="mt-2 text-sm text-hpm-text-secondary">
                Join HeatPumpMatch to manage your installer listing
              </p>
            </div>

            {submitted ? (
              <div className="rounded-xl bg-green-50 border border-green-200 p-5 text-center">
                <p className="text-sm font-semibold text-hpm-primary mb-1">Check your inbox</p>
                <p className="text-sm text-hpm-text-secondary">
                  We&apos;ve sent a confirmation email to <strong>{email}</strong>. Please verify your
                  address to complete registration.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs text-hpm-text-muted hover:text-hpm-text underline underline-offset-2 transition-colors"
                >
                  Use a different email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-hpm-text-secondary uppercase tracking-wide mb-1.5"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full h-10 rounded-lg border border-hpm-border bg-white px-3 text-sm text-hpm-text placeholder:text-hpm-text-muted focus:outline-none focus:ring-2 focus:ring-hpm-primary/30 focus:border-hpm-primary transition-colors"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold text-hpm-text-secondary uppercase tracking-wide mb-1.5"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      className="w-full h-10 rounded-lg border border-hpm-border bg-white px-3 pr-10 text-sm text-hpm-text placeholder:text-hpm-text-muted focus:outline-none focus:ring-2 focus:ring-hpm-primary/30 focus:border-hpm-primary transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-hpm-text-muted hover:text-hpm-text-secondary transition-colors"
                    >
                      {showPassword ? (
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-hpm-text-muted">Must be at least 8 characters.</p>
                </div>

                {/* TOS checkbox (required) */}
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={tosAccepted}
                    onChange={(e) => setTosAccepted(e.target.checked)}
                    className="mt-0.5 size-4 rounded border-hpm-border-strong text-hpm-primary focus:ring-hpm-primary/30 flex-shrink-0"
                  />
                  <span className="text-xs text-hpm-text-secondary leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-hpm-primary hover:underline" target="_blank">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-hpm-primary hover:underline" target="_blank">
                      Privacy Policy
                    </Link>
                    . <span className="text-hpm-error">*</span>
                  </span>
                </label>

                {/* Marketing checkbox (optional) */}
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={marketingOptIn}
                    onChange={(e) => setMarketingOptIn(e.target.checked)}
                    className="mt-0.5 size-4 rounded border-hpm-border-strong text-hpm-primary focus:ring-hpm-primary/30 flex-shrink-0"
                  />
                  <span className="text-xs text-hpm-text-secondary leading-relaxed">
                    I&apos;d like to receive occasional emails about heat pump industry news, grant updates,
                    and tips to improve my listing. <span className="text-hpm-text-muted">(Optional)</span>
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center rounded-lg bg-hpm-accent hover:bg-hpm-accent-hover text-white font-semibold text-sm px-4 py-2.5 transition-colors mt-1"
                >
                  Create Account
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-hpm-border" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-3 text-xs text-hpm-text-muted">or</span>
                  </div>
                </div>

                {/* Google */}
                <button
                  type="button"
                  onClick={() => console.log("Continue with Google")}
                  className="w-full inline-flex items-center justify-center gap-2.5 rounded-lg border border-hpm-border-strong bg-white text-hpm-text font-medium text-sm px-4 py-2.5 hover:bg-hpm-surface-muted transition-colors"
                >
                  <svg className="size-4" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </button>
              </form>
            )}

            {/* Footer link */}
            {!submitted && (
              <p className="mt-6 text-center text-sm text-hpm-text-secondary">
                Already have an account?{" "}
                <Link href="/login" className="text-hpm-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
