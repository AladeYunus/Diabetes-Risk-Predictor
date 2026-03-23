import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { MapPin, Award, CheckCircle, Users, Calendar, Star, Shield, Clock } from "lucide-react"

export default async function InstallerProfilePage(props: PageProps<"/installers/[slug]">) {
  const { slug } = await props.params

  // Mock data — in production this would be fetched from a database
  const installer = {
    name: "GreenWave Heat Solutions",
    slug,
    initials: "GH",
    location: "Redhill, Surrey",
    rating: 4.9,
    reviewCount: 87,
    mcsNumber: "MCS-0023841",
    trustMark: true,
    tradingSince: 2013,
    teamSize: 12,
    about: `GreenWave Heat Solutions is a Surrey-based renewable energy specialist with over a decade of experience installing air source and hybrid heat pump systems across the South East. Founded by mechanical engineer Tom Barrett, our team of MCS-certified engineers takes a fabric-first approach — assessing your home's insulation and heat loss before recommending the right system.

We are proud to be one of the few installers in the region to carry both MCS certification and TrustMark registration. Every installation is fully commissioned to manufacturer standards, and we handle all Boiler Upgrade Scheme (BUS) grant paperwork on your behalf. Our aftercare package includes annual servicing, remote system monitoring, and a direct phone line to your installation engineer.`,
    heatPumpTypes: ["Air Source Heat Pump", "Hybrid Heat Pump", "Air-to-Water"],
    brands: ["Mitsubishi Electric", "Daikin", "Vaillant", "Worcester Bosch"],
    coverageAreas: ["Surrey", "Kent", "East Sussex", "West Sussex", "South London", "Hampshire"],
    reviews: [
      {
        rating: 5,
        quote:
          "Absolutely brilliant from start to finish. Tom and his team explained everything clearly, the install was tidy, and our heating bills have dropped by about 40%. They handled the BUS grant claim too — we didn't have to lift a finger.",
        author: "Sarah M.",
        location: "Guildford, Surrey",
        installDate: "January 2026",
        system: "Mitsubishi Ecodan 8.5kW",
      },
      {
        rating: 5,
        quote:
          "Highly professional. They completed a thorough heat loss survey before even quoting, which gave me confidence they knew what they were talking about. Installation was completed in three days and passed Building Regulations inspection first time.",
        author: "Richard F.",
        location: "Tunbridge Wells, Kent",
        installDate: "November 2025",
        system: "Daikin Altherma 11kW",
      },
      {
        rating: 4,
        quote:
          "Good experience overall. There was a small delay sourcing a component, but they kept us informed throughout and finished within the revised schedule. The system is running perfectly and the annual service plan is great value.",
        author: "Alison B.",
        location: "Haywards Heath, West Sussex",
        installDate: "September 2025",
        system: "Vaillant arotherm+ 7kW",
      },
    ],
  }

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Profile header */}
        <div className="bg-green-50 border-b border-green-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Logo / initials */}
              <div className="flex-shrink-0 size-20 rounded-xl bg-hpm-primary flex items-center justify-center font-heading font-bold text-white text-2xl shadow-sm">
                {installer.initials}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="font-heading text-2xl font-bold text-hpm-text">
                    {installer.name}
                  </h1>
                  {installer.trustMark && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-hpm-secondary/10 text-hpm-secondary text-xs font-semibold px-2.5 py-1">
                      <CheckCircle className="size-3.5" />
                      TrustMark
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 rounded-full bg-hpm-primary/10 text-hpm-primary text-xs font-semibold px-2.5 py-1">
                    <Award className="size-3.5" />
                    MCS Certified
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-0.5" aria-label={`Rating: ${installer.rating} out of 5`}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`size-4 ${
                          star <= Math.round(installer.rating)
                            ? "fill-hpm-warning text-hpm-warning"
                            : "fill-transparent text-hpm-border-strong"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-hpm-text">{installer.rating.toFixed(1)}</span>
                  <span className="text-sm text-hpm-text-secondary">
                    ({installer.reviewCount} verified reviews)
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-hpm-text-secondary">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-4 text-hpm-text-muted" />
                    {installer.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-4 text-hpm-text-muted" />
                    Trading since {installer.tradingSince}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="size-4 text-hpm-text-muted" />
                    {installer.teamSize}-person team
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Shield className="size-4 text-hpm-text-muted" />
                    MCS No. {installer.mcsNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two-column body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Left column — 2/3 */}
            <div className="flex-1 min-w-0 flex flex-col gap-8">

              {/* About */}
              <section>
                <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">About</h2>
                <div className="bg-white rounded-xl border border-hpm-border p-6">
                  {installer.about.split("\n\n").map((para, i) => (
                    <p key={i} className={`text-hpm-text-secondary leading-relaxed text-sm ${i > 0 ? "mt-4" : ""}`}>
                      {para}
                    </p>
                  ))}
                </div>
              </section>

              {/* Services */}
              <section>
                <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">Services &amp; Brands</h2>
                <div className="bg-white rounded-xl border border-hpm-border p-6">
                  <h3 className="text-sm font-semibold text-hpm-text-secondary uppercase tracking-wide mb-3">
                    Heat pump types installed
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {installer.heatPumpTypes.map((type) => (
                      <span
                        key={type}
                        className="inline-flex items-center rounded-full bg-hpm-primary/10 text-hpm-primary text-sm font-medium px-3 py-1"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-sm font-semibold text-hpm-text-secondary uppercase tracking-wide mb-3">
                    Approved brands
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {installer.brands.map((brand) => (
                      <span
                        key={brand}
                        className="inline-flex items-center rounded-full border border-hpm-border-strong text-hpm-text-secondary text-sm font-medium px-3 py-1"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              {/* Coverage */}
              <section>
                <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">Coverage Area</h2>
                <div className="bg-white rounded-xl border border-hpm-border p-6">
                  <p className="text-sm text-hpm-text-secondary mb-4">
                    {installer.name} cover installations across the following regions:
                  </p>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {installer.coverageAreas.map((area) => (
                      <li key={area} className="flex items-center gap-2 text-sm text-hpm-text">
                        <MapPin className="size-3.5 text-hpm-primary flex-shrink-0" />
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Reviews */}
              <section>
                <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">
                  Customer Reviews
                </h2>
                <div className="flex flex-col gap-4">
                  {installer.reviews.map((review, i) => (
                    <div key={i} className="bg-white rounded-xl border border-hpm-border p-6">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <div
                            className="flex items-center gap-0.5 mb-1"
                            aria-label={`Rating: ${review.rating} out of 5`}
                          >
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`size-4 ${
                                  star <= review.rating
                                    ? "fill-hpm-warning text-hpm-warning"
                                    : "fill-transparent text-hpm-border-strong"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="font-semibold text-sm text-hpm-text">{review.author}</p>
                          <p className="text-xs text-hpm-text-muted">{review.location}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs text-hpm-text-muted">{review.installDate}</p>
                          <p className="text-xs text-hpm-text-secondary mt-0.5">{review.system}</p>
                        </div>
                      </div>
                      <blockquote className="text-sm text-hpm-text-secondary leading-relaxed italic">
                        &ldquo;{review.quote}&rdquo;
                      </blockquote>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right column — 1/3 sticky quote form */}
            <div className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-24">
              <div
                id="get-quote"
                className="bg-white rounded-xl border border-hpm-border shadow-sm overflow-hidden"
              >
                {/* Green top border */}
                <div className="h-1.5 bg-hpm-primary" />

                <div className="p-6">
                  <h3 className="font-heading text-lg font-semibold text-hpm-text mb-1">
                    Request a free quote
                  </h3>
                  <p className="text-sm text-hpm-text-secondary mb-5">
                    No obligation — get a tailored quote from {installer.name} within 24 hours.
                  </p>

                  <form
                    onSubmit={undefined}
                    className="flex flex-col gap-4"
                  >
                    {/* Postcode */}
                    <div>
                      <label className="block text-xs font-semibold text-hpm-text-secondary uppercase tracking-wide mb-1.5" htmlFor="q-postcode">
                        Postcode <span className="text-hpm-error">*</span>
                      </label>
                      <input
                        id="q-postcode"
                        type="text"
                        placeholder="e.g. RH1 1AA"
                        required
                        className="w-full h-9 rounded-lg border border-hpm-border bg-white px-3 text-sm text-hpm-text placeholder:text-hpm-text-muted focus:outline-none focus:ring-2 focus:ring-hpm-primary/30 focus:border-hpm-primary transition-colors"
                      />
                    </div>

                    {/* Property type */}
                    <div>
                      <label className="block text-xs font-semibold text-hpm-text-secondary uppercase tracking-wide mb-1.5" htmlFor="q-property">
                        Property type <span className="text-hpm-error">*</span>
                      </label>
                      <select
                        id="q-property"
                        required
                        className="w-full h-9 rounded-lg border border-hpm-border bg-white px-3 text-sm text-hpm-text focus:outline-none focus:ring-2 focus:ring-hpm-primary/30 focus:border-hpm-primary transition-colors appearance-none"
                      >
                        <option value="">Select type</option>
                        <option>Detached house</option>
                        <option>Semi-detached house</option>
                        <option>Terraced house</option>
                        <option>End-of-terrace house</option>
                        <option>Bungalow</option>
                        <option>Flat / apartment</option>
                        <option>New build</option>
                      </select>
                    </div>

                    {/* Bedrooms */}
                    <div>
                      <label className="block text-xs font-semibold text-hpm-text-secondary uppercase tracking-wide mb-1.5" htmlFor="q-bedrooms">
                        Number of bedrooms <span className="text-hpm-error">*</span>
                      </label>
                      <select
                        id="q-bedrooms"
                        required
                        className="w-full h-9 rounded-lg border border-hpm-border bg-white px-3 text-sm text-hpm-text focus:outline-none focus:ring-2 focus:ring-hpm-primary/30 focus:border-hpm-primary transition-colors appearance-none"
                      >
                        <option value="">Select bedrooms</option>
                        <option>1 bedroom</option>
                        <option>2 bedrooms</option>
                        <option>3 bedrooms</option>
                        <option>4 bedrooms</option>
                        <option>5+ bedrooms</option>
                      </select>
                    </div>

                    {/* Current heating */}
                    <div>
                      <label className="block text-xs font-semibold text-hpm-text-secondary uppercase tracking-wide mb-1.5" htmlFor="q-heating">
                        Current heating system <span className="text-hpm-error">*</span>
                      </label>
                      <select
                        id="q-heating"
                        required
                        className="w-full h-9 rounded-lg border border-hpm-border bg-white px-3 text-sm text-hpm-text focus:outline-none focus:ring-2 focus:ring-hpm-primary/30 focus:border-hpm-primary transition-colors appearance-none"
                      >
                        <option value="">Select current system</option>
                        <option>Gas boiler</option>
                        <option>Oil boiler</option>
                        <option>LPG boiler</option>
                        <option>Electric storage heaters</option>
                        <option>No central heating</option>
                        <option>Other</option>
                      </select>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-hpm-text-secondary uppercase tracking-wide mb-1.5" htmlFor="q-name">
                        Full name <span className="text-hpm-error">*</span>
                      </label>
                      <input
                        id="q-name"
                        type="text"
                        placeholder="Jane Smith"
                        required
                        className="w-full h-9 rounded-lg border border-hpm-border bg-white px-3 text-sm text-hpm-text placeholder:text-hpm-text-muted focus:outline-none focus:ring-2 focus:ring-hpm-primary/30 focus:border-hpm-primary transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-hpm-text-secondary uppercase tracking-wide mb-1.5" htmlFor="q-email">
                        Email address <span className="text-hpm-error">*</span>
                      </label>
                      <input
                        id="q-email"
                        type="email"
                        placeholder="jane@example.com"
                        required
                        className="w-full h-9 rounded-lg border border-hpm-border bg-white px-3 text-sm text-hpm-text placeholder:text-hpm-text-muted focus:outline-none focus:ring-2 focus:ring-hpm-primary/30 focus:border-hpm-primary transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-hpm-text-secondary uppercase tracking-wide mb-1.5" htmlFor="q-phone">
                        Phone number
                      </label>
                      <input
                        id="q-phone"
                        type="tel"
                        placeholder="07700 900000"
                        className="w-full h-9 rounded-lg border border-hpm-border bg-white px-3 text-sm text-hpm-text placeholder:text-hpm-text-muted focus:outline-none focus:ring-2 focus:ring-hpm-primary/30 focus:border-hpm-primary transition-colors"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold text-hpm-text-secondary uppercase tracking-wide mb-1.5" htmlFor="q-message">
                        Additional information
                      </label>
                      <textarea
                        id="q-message"
                        rows={3}
                        placeholder="Anything else we should know — e.g. listed building, underfloor heating..."
                        className="w-full rounded-lg border border-hpm-border bg-white px-3 py-2 text-sm text-hpm-text placeholder:text-hpm-text-muted focus:outline-none focus:ring-2 focus:ring-hpm-primary/30 focus:border-hpm-primary transition-colors resize-none"
                      />
                    </div>

                    {/* Consent */}
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        className="mt-0.5 size-4 rounded border-hpm-border-strong text-hpm-primary focus:ring-hpm-primary/30 flex-shrink-0"
                      />
                      <span className="text-xs text-hpm-text-secondary leading-relaxed">
                        I agree to be contacted by {installer.name} about my heat pump enquiry. View our{" "}
                        <a href="/privacy" className="text-hpm-primary hover:underline">
                          Privacy Policy
                        </a>
                        . <span className="text-hpm-error">*</span>
                      </span>
                    </label>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center rounded-lg bg-hpm-accent hover:bg-hpm-accent-hover text-white font-semibold text-sm px-4 py-2.5 transition-colors"
                    >
                      Send Quote Request
                    </button>
                  </form>

                  {/* Trust strip */}
                  <div className="mt-4 pt-4 border-t border-hpm-border">
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      {["No obligation", "100% free", "MCS verified"].map((item) => (
                        <span key={item} className="flex items-center gap-1 text-xs text-hpm-text-secondary">
                          <Clock className="size-3 text-hpm-primary" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
