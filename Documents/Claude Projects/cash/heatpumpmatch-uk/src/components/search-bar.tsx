"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const HEAT_PUMP_TYPES = [
  { value: "", label: "All types" },
  { value: "air-source", label: "Air Source" },
  { value: "ground-source", label: "Ground Source" },
  { value: "hybrid", label: "Hybrid" },
  { value: "water-source", label: "Water Source" },
]

export default function SearchBar() {
  const router = useRouter()
  const [postcode, setPostcode] = useState("")
  const [type, setType] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const trimmed = postcode.trim().toUpperCase()
    if (!trimmed) {
      setError("Please enter a postcode")
      return
    }

    const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?(\s?\d[A-Z]{2})?$/i
    if (!postcodeRegex.test(trimmed)) {
      setError("Please enter a valid UK postcode")
      return
    }

    setError("")

    const params = new URLSearchParams()
    params.set("postcode", trimmed)
    if (type) params.set("type", type)

    router.push(`/installers?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Search heat pump installers">
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Postcode input */}
        <div className="flex-1 min-w-0">
          <label htmlFor="postcode-input" className="sr-only">
            Your postcode
          </label>
          <input
            id="postcode-input"
            type="text"
            value={postcode}
            onChange={(e) => {
              setPostcode(e.target.value)
              if (error) setError("")
            }}
            placeholder="Enter postcode e.g. SW1A 1AA"
            autoComplete="postal-code"
            className={`w-full h-12 rounded-lg border px-4 font-mono text-hpm-text text-sm placeholder:font-sans placeholder:text-hpm-text-muted bg-white outline-none transition-colors focus:ring-2 focus:ring-hpm-primary/40 ${
              error
                ? "border-hpm-error focus:border-hpm-error focus:ring-hpm-error/30"
                : "border-hpm-border focus:border-hpm-primary"
            }`}
            aria-describedby={error ? "postcode-error" : undefined}
            aria-invalid={!!error}
          />
        </div>

        {/* Type select */}
        <div className="sm:w-48">
          <label htmlFor="type-select" className="sr-only">
            Heat pump type
          </label>
          <select
            id="type-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full h-12 rounded-lg border border-hpm-border bg-white px-3 text-sm text-hpm-text outline-none transition-colors focus:border-hpm-primary focus:ring-2 focus:ring-hpm-primary/40 cursor-pointer"
          >
            {HEAT_PUMP_TYPES.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="h-12 inline-flex items-center justify-center gap-2 rounded-lg bg-hpm-accent hover:bg-hpm-accent-hover text-white text-sm font-medium px-6 transition-colors whitespace-nowrap sm:w-auto w-full"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          Search Installers
        </button>
      </div>

      {error && (
        <p id="postcode-error" role="alert" className="mt-2 text-sm text-hpm-error">
          {error}
        </p>
      )}
    </form>
  )
}
