import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CookieBanner from "@/components/cookie-banner"
import InstallerCard from "@/components/installer-card"
import { ChevronLeft, ChevronRight } from "lucide-react"

const mockInstallers = [
  {
    name: "GreenWave Heat Solutions",
    rating: 4.9,
    reviewCount: 87,
    mcsNumber: "MCS-0023841",
    coverageAreas: ["Surrey", "Kent", "East Sussex", "West Sussex"],
    brands: ["Mitsubishi", "Daikin", "Vaillant"],
    types: ["Air Source", "Hybrid"],
    avgInstallDays: 3,
    reviewQuote: "Absolutely brilliant team — professional from first contact to final commissioning.",
    reviewAuthor: "Sarah M., Guildford",
  },
  {
    name: "EcoHeat UK Ltd",
    rating: 4.8,
    reviewCount: 124,
    mcsNumber: "MCS-0019473",
    coverageAreas: ["Greater London", "Hertfordshire", "Essex"],
    brands: ["Samsung", "LG", "Panasonic"],
    types: ["Air Source", "Ground Source"],
    avgInstallDays: 4,
    reviewQuote: "Highly recommend — they handled our planning queries and made the process simple.",
    reviewAuthor: "David T., Enfield",
  },
  {
    name: "Renewable Comfort Ltd",
    rating: 4.7,
    reviewCount: 63,
    mcsNumber: "MCS-0031205",
    coverageAreas: ["West Midlands", "Warwickshire", "Worcestershire"],
    brands: ["Worcester Bosch", "Viessmann", "Vaillant"],
    types: ["Air Source", "Hybrid", "Ground Source"],
    avgInstallDays: 5,
    reviewQuote: "Straightforward quote, no pressure, and the install was finished on time.",
    reviewAuthor: "Priya K., Birmingham",
  },
  {
    name: "ClearSky Energy Services",
    rating: 4.6,
    reviewCount: 42,
    mcsNumber: "MCS-0027896",
    coverageAreas: ["Yorkshire", "Humberside", "Lincolnshire"],
    brands: ["Mitsubishi", "Nibe", "Stiebel Eltron"],
    types: ["Air Source", "Ground Source"],
    avgInstallDays: 4,
    reviewQuote: "Fair pricing and very knowledgeable about the Boiler Upgrade Scheme paperwork.",
    reviewAuthor: "Mark B., Leeds",
  },
  {
    name: "Peak Thermal Engineering",
    rating: 4.5,
    reviewCount: 38,
    mcsNumber: "MCS-0034512",
    coverageAreas: ["Derbyshire", "Nottinghamshire", "Staffordshire"],
    brands: ["Daikin", "Hitachi", "Midea"],
    types: ["Air Source"],
    avgInstallDays: 3,
    reviewQuote: "On budget and on time. Would use again without hesitation.",
    reviewAuthor: "James R., Derby",
  },
  {
    name: "Horizon Heat Pump Specialists",
    rating: 4.8,
    reviewCount: 91,
    mcsNumber: "MCS-0015687",
    coverageAreas: ["Bristol", "Somerset", "Gloucestershire", "Wiltshire"],
    brands: ["Mitsubishi", "Daikin", "Samsung", "Vaillant"],
    types: ["Air Source", "Hybrid", "Ground Source"],
    avgInstallDays: 4,
    reviewQuote: "Excellent after-care service and they helped us claim our BUS grant without any hassle.",
    reviewAuthor: "Helen W., Bristol",
  },
]

export default function InstallersPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-hpm-surface-muted">
        {/* Page header */}
        <div className="bg-white border-b border-hpm-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="font-heading text-3xl font-bold text-hpm-text">
              Heat pump installers in South East England
            </h1>
            <p className="mt-2 text-hpm-text-secondary">
              Showing <strong className="text-hpm-text">6</strong> MCS-accredited installers near you
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8 items-start">

            {/* Sidebar filters — hidden on mobile */}
            <aside className="hidden lg:block w-64 flex-shrink-0 bg-white rounded-xl border border-hpm-border p-5 sticky top-24 self-start">
              <h2 className="font-heading font-semibold text-hpm-text text-sm mb-4">Filter results</h2>

              {/* Postcode */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-hpm-text-secondary uppercase tracking-wide mb-1.5">
                  Postcode
                </label>
                <input
                  type="text"
                  placeholder="e.g. RH1 1AA"
                  defaultValue="RH1"
                  className="w-full h-9 rounded-lg border border-hpm-border bg-white px-3 text-sm text-hpm-text placeholder:text-hpm-text-muted focus:outline-none focus:ring-2 focus:ring-hpm-primary/30 focus:border-hpm-primary transition-colors"
                />
              </div>

              {/* Radius */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-hpm-text-secondary uppercase tracking-wide mb-1.5">
                  Search radius
                </label>
                <select defaultValue="25 miles" className="w-full h-9 rounded-lg border border-hpm-border bg-white px-3 text-sm text-hpm-text focus:outline-none focus:ring-2 focus:ring-hpm-primary/30 focus:border-hpm-primary transition-colors appearance-none">
                  <option>10 miles</option>
                  <option>25 miles</option>
                  <option>50 miles</option>
                  <option>100 miles</option>
                </select>
              </div>

              {/* Heat pump type */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-hpm-text-secondary uppercase tracking-wide mb-2">
                  Heat pump type
                </p>
                <div className="space-y-2">
                  {["Air Source", "Ground Source", "Hybrid System", "Water Source"].map((type) => (
                    <label key={type} className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        className="size-4 rounded border-hpm-border-strong text-hpm-primary focus:ring-hpm-primary/30"
                        defaultChecked={type === "Air Source"}
                      />
                      <span className="text-sm text-hpm-text">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Minimum rating */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-hpm-text-secondary uppercase tracking-wide mb-1.5">
                  Minimum rating
                </label>
                <select defaultValue="4+ stars" className="w-full h-9 rounded-lg border border-hpm-border bg-white px-3 text-sm text-hpm-text focus:outline-none focus:ring-2 focus:ring-hpm-primary/30 focus:border-hpm-primary transition-colors appearance-none">
                  <option>Any rating</option>
                  <option>3+ stars</option>
                  <option>4+ stars</option>
                  <option>4.5+ stars</option>
                </select>
              </div>

              {/* Accreditations */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-hpm-text-secondary uppercase tracking-wide mb-2">
                  Accreditations
                </p>
                <div className="space-y-2">
                  {["MCS Certified", "TrustMark Registered", "Which? Trusted Trader"].map((acc) => (
                    <label key={acc} className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        className="size-4 rounded border-hpm-border-strong text-hpm-primary focus:ring-hpm-primary/30"
                        defaultChecked={acc === "MCS Certified"}
                      />
                      <span className="text-sm text-hpm-text">{acc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-hpm-text-secondary uppercase tracking-wide mb-2">
                  Brand
                </p>
                <div className="space-y-2">
                  {["Mitsubishi", "Daikin", "Samsung", "Vaillant", "Worcester Bosch", "Nibe"].map((brand) => (
                    <label key={brand} className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        className="size-4 rounded border-hpm-border-strong text-hpm-primary focus:ring-hpm-primary/30"
                      />
                      <span className="text-sm text-hpm-text">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="w-full inline-flex items-center justify-center rounded-lg border border-hpm-border-strong text-hpm-text-secondary text-sm font-medium px-4 py-2 hover:bg-hpm-surface-muted transition-colors"
              >
                Clear all filters
              </button>
            </aside>

            {/* Results column */}
            <div className="flex-1 min-w-0">
              {/* Sort bar */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-hpm-text-secondary">6 results</p>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-hpm-text-secondary" htmlFor="sort-select">
                    Sort by:
                  </label>
                  <select
                    id="sort-select"
                    className="h-9 rounded-lg border border-hpm-border bg-white px-3 text-sm text-hpm-text focus:outline-none focus:ring-2 focus:ring-hpm-primary/30 focus:border-hpm-primary transition-colors appearance-none pr-8"
                  >
                    <option>Recommended</option>
                    <option>Highest Rated</option>
                    <option>Nearest</option>
                  </select>
                </div>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-4">
                {mockInstallers.map((installer) => (
                  <InstallerCard key={installer.name} {...installer} />
                ))}
              </div>

              {/* Pagination */}
              <nav
                aria-label="Search results pagination"
                className="mt-8 flex items-center justify-center gap-1"
              >
                <button
                  type="button"
                  aria-label="Previous page"
                  disabled
                  className="inline-flex items-center justify-center size-9 rounded-lg border border-hpm-border text-hpm-text-muted disabled:opacity-40 hover:bg-hpm-surface-muted transition-colors"
                >
                  <ChevronLeft className="size-4" />
                </button>
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    type="button"
                    aria-current={page === 1 ? "page" : undefined}
                    className={`inline-flex items-center justify-center size-9 rounded-lg border text-sm font-medium transition-colors ${
                      page === 1
                        ? "border-hpm-primary bg-hpm-primary text-white"
                        : "border-hpm-border text-hpm-text-secondary hover:bg-hpm-surface-muted"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <span className="inline-flex items-center justify-center size-9 text-hpm-text-muted text-sm">
                  ...
                </span>
                <button
                  type="button"
                  className="inline-flex items-center justify-center size-9 rounded-lg border border-hpm-border text-sm font-medium text-hpm-text-secondary hover:bg-hpm-surface-muted transition-colors"
                >
                  5
                </button>
                <button
                  type="button"
                  aria-label="Next page"
                  className="inline-flex items-center justify-center size-9 rounded-lg border border-hpm-border text-hpm-text-secondary hover:bg-hpm-surface-muted transition-colors"
                >
                  <ChevronRight className="size-4" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </>
  )
}
