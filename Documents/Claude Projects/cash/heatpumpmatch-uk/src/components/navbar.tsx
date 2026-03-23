"use client"

import { useState } from "react"
import Link from "next/link"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Browse Installers", href: "/installers" },
    { label: "Grant Checker", href: "/grant-checker" },
    { label: "For Installers", href: "/for-installers" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-hpm-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center font-heading font-extrabold text-xl">
            <span className="text-hpm-primary">Heat</span>
            <span className="text-hpm-text">Pump</span>
            <span className="text-hpm-text">Match</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-hpm-text-secondary hover:text-hpm-text transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/get-quotes"
              className="ml-2 inline-flex items-center justify-center rounded-lg bg-hpm-accent hover:bg-hpm-accent-hover text-white text-sm font-medium px-4 py-2 transition-colors"
            >
              Get Free Quotes
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-hpm-text-secondary hover:text-hpm-text hover:bg-hpm-surface-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile slide-out */}
      {mobileOpen && (
        <div className="md:hidden border-t border-hpm-border bg-white">
          <div className="px-4 py-3 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-sm font-medium text-hpm-text-secondary hover:text-hpm-text hover:bg-hpm-surface-muted transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/get-quotes"
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-hpm-accent hover:bg-hpm-accent-hover text-white text-sm font-medium px-4 py-2 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Get Free Quotes
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
