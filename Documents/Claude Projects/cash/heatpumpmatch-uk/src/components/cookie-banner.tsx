"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const STORAGE_KEY = "hpm-cookie-preference"

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      setVisible(true)
    }
  }, [])

  function acceptAll() {
    localStorage.setItem(STORAGE_KEY, "accepted")
    setVisible(false)
  }

  function rejectOptional() {
    localStorage.setItem(STORAGE_KEY, "rejected")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-hpm-border shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-hpm-text-secondary leading-relaxed">
              We use cookies to improve your experience. Analytics are provided by{" "}
              <strong className="text-hpm-text font-medium">Plausible</strong> — a privacy-friendly, cookie-free
              analytics tool. We also use essential cookies to keep the site working.{" "}
              <Link href="/privacy-policy" className="text-hpm-primary hover:underline font-medium">
                Learn more
              </Link>
            </p>
          </div>
          <div className="flex flex-shrink-0 items-center gap-2 flex-wrap">
            <Link
              href="/cookie-preferences"
              className="text-sm text-hpm-text-secondary hover:text-hpm-text underline underline-offset-2 transition-colors px-1"
            >
              Manage Preferences
            </Link>
            <button
              type="button"
              onClick={rejectOptional}
              className="inline-flex items-center justify-center rounded-lg border border-hpm-border-strong bg-white text-hpm-text text-sm font-medium px-4 py-2 hover:bg-hpm-surface-muted transition-colors"
            >
              Reject Optional
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="inline-flex items-center justify-center rounded-lg bg-hpm-primary hover:bg-hpm-primary-dark text-white text-sm font-medium px-4 py-2 transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
