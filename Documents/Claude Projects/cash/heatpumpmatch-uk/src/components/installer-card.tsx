import Link from "next/link"

interface InstallerCardProps {
  name: string
  rating: number
  reviewCount: number
  mcsNumber: string
  coverageAreas: string[]
  brands: string[]
  types: string[]
  avgInstallDays: number
  reviewQuote: string
  reviewAuthor: string
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= Math.round(rating) ? "text-hpm-warning" : "text-hpm-border-strong"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function InstallerCard({
  name,
  rating,
  reviewCount,
  mcsNumber,
  coverageAreas,
  brands,
  types,
  avgInstallDays,
  reviewQuote,
  reviewAuthor,
}: InstallerCardProps) {
  const slug = slugify(name)
  const initials = getInitials(name)

  return (
    <div className="bg-white border border-hpm-border rounded-xl p-5 flex flex-col gap-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-hpm-secondary flex items-center justify-center">
          <span className="font-heading font-bold text-white text-sm">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-hpm-text text-base leading-tight truncate">{name}</h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <StarRating rating={rating} />
            <span className="text-sm text-hpm-text-secondary">
              {rating.toFixed(1)} ({reviewCount} reviews)
            </span>
          </div>
        </div>
        <span className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-medium bg-hpm-primary/10 text-hpm-primary-dark border border-hpm-primary/20 rounded-full px-2 py-0.5">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          MCS
        </span>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div>
          <p className="text-hpm-text-muted text-xs font-medium uppercase tracking-wide">MCS Number</p>
          <p className="font-mono text-hpm-text font-medium">{mcsNumber}</p>
        </div>
        <div>
          <p className="text-hpm-text-muted text-xs font-medium uppercase tracking-wide">Avg Install Time</p>
          <p className="text-hpm-text font-medium">{avgInstallDays} days</p>
        </div>
        <div>
          <p className="text-hpm-text-muted text-xs font-medium uppercase tracking-wide">Coverage</p>
          <p className="text-hpm-text font-medium truncate">{coverageAreas.slice(0, 2).join(", ")}{coverageAreas.length > 2 ? ` +${coverageAreas.length - 2}` : ""}</p>
        </div>
        <div>
          <p className="text-hpm-text-muted text-xs font-medium uppercase tracking-wide">Brands</p>
          <p className="text-hpm-text font-medium truncate">{brands.slice(0, 2).join(", ")}{brands.length > 2 ? ` +${brands.length - 2}` : ""}</p>
        </div>
      </div>

      {/* Types */}
      <div className="flex flex-wrap gap-1.5">
        {types.map((type) => (
          <span
            key={type}
            className="inline-flex items-center text-xs font-medium bg-hpm-surface-muted text-hpm-text-secondary rounded-md px-2 py-0.5 border border-hpm-border"
          >
            {type}
          </span>
        ))}
      </div>

      {/* Review quote */}
      <blockquote className="border-l-2 border-hpm-primary-light pl-3">
        <p className="text-sm text-hpm-text-secondary italic leading-relaxed">&ldquo;{reviewQuote}&rdquo;</p>
        <footer className="mt-1 text-xs text-hpm-text-muted font-medium">&mdash; {reviewAuthor}</footer>
      </blockquote>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <Link
          href={`/installers/${slug}`}
          className="flex-1 inline-flex items-center justify-center rounded-lg border border-hpm-border-strong bg-white text-hpm-text text-sm font-medium px-4 py-2 hover:bg-hpm-surface-muted transition-colors"
        >
          View Profile
        </Link>
        <Link
          href={`/installers/${slug}#get-quote`}
          className="flex-1 inline-flex items-center justify-center rounded-lg bg-hpm-accent hover:bg-hpm-accent-hover text-white text-sm font-medium px-4 py-2 transition-colors"
        >
          Get Free Quote &rarr;
        </Link>
      </div>
    </div>
  )
}
