import Link from "next/link"
import {
  MapPin,
  ClipboardCheck,
  MessageSquare,
  ChevronRight,
  Star,
  Shield,
  Award,
} from "lucide-react"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CookieBanner from "@/components/cookie-banner"
import SearchBar from "@/components/search-bar"
import InstallerCard from "@/components/installer-card"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

// ---------------------------------------------------------------------------
// Mock data for featured installers
// ---------------------------------------------------------------------------
const FEATURED_INSTALLERS = [
  {
    name: "GreenHeat Solutions",
    rating: 4.9,
    reviewCount: 214,
    mcsNumber: "MCS-H-23741",
    coverageAreas: ["London", "Surrey", "Kent", "Essex"],
    brands: ["Vaillant", "Mitsubishi Electric", "Daikin"],
    types: ["Air Source", "Hybrid"],
    avgInstallDays: 3,
    reviewQuote:
      "Fantastic installation from start to finish. The team explained every step and left the house spotless. Already saving on our energy bills.",
    reviewAuthor: "Sarah T., Bromley",
  },
  {
    name: "EcoPump Midlands",
    rating: 4.8,
    reviewCount: 187,
    mcsNumber: "MCS-H-19852",
    coverageAreas: ["Birmingham", "Coventry", "Leicester", "Wolverhampton"],
    brands: ["Samsung", "Bosch", "Panasonic"],
    types: ["Air Source", "Ground Source"],
    avgInstallDays: 4,
    reviewQuote:
      "Professional, knowledgeable, and great value. They handled the BUS grant paperwork for us which made the whole process completely stress-free.",
    reviewAuthor: "James R., Coventry",
  },
  {
    name: "Northern Renewables",
    rating: 4.7,
    reviewCount: 163,
    mcsNumber: "MCS-H-31056",
    coverageAreas: ["Manchester", "Leeds", "Sheffield", "Bradford"],
    brands: ["Nibe", "Vaillant", "Grant"],
    types: ["Air Source", "Ground Source", "Hybrid"],
    avgInstallDays: 5,
    reviewQuote:
      "Went above and beyond to ensure the system was optimised for our Victorian terrace. Excellent aftercare service too — highly recommend.",
    reviewAuthor: "Priya S., Manchester",
  },
]

// ---------------------------------------------------------------------------
// FAQ data
// ---------------------------------------------------------------------------
const FAQS = [
  {
    id: "faq-cost",
    question: "How much does a heat pump installation cost in the UK?",
    answer:
      "A typical air source heat pump installation costs between £8,000 and £15,000 in the UK before any grants. After applying the Boiler Upgrade Scheme (BUS) grant of £7,500, many homeowners pay between £3,000 and £7,000. Ground source systems tend to cost more — usually £15,000–£35,000 — due to the groundwork required. Running costs depend on your home's insulation and your energy tariff, but most households see significant savings versus a gas boiler when on a smart heat pump tariff.",
  },
  {
    id: "faq-bus",
    question: "What is the Boiler Upgrade Scheme and am I eligible?",
    answer:
      "The Boiler Upgrade Scheme (BUS) is a UK government grant that gives homeowners £7,500 towards the cost of an air source or ground source heat pump. To be eligible, your property must be in England or Wales, have a valid Energy Performance Certificate (EPC) with no outstanding cavity wall or loft insulation recommendations, and you must use an MCS-certified installer. The grant is applied by the installer directly, so you simply pay the net amount. Our grant checker tool can confirm your eligibility in under two minutes.",
  },
  {
    id: "faq-mcs",
    question: "What does MCS-certified mean and why does it matter?",
    answer:
      "MCS (Microgeneration Certification Scheme) is the industry standard for renewable energy products and installations in the UK. An MCS-certified installer has been independently assessed for competence, insurance, and compliance with installation best practice. Using an MCS-certified installer is a legal requirement to claim the Boiler Upgrade Scheme grant — the grant cannot be applied if the installation is carried out by an uncertified contractor. All 3,000+ installers listed on HeatPumpMatch hold current MCS certification, which we verify regularly.",
  },
  {
    id: "faq-time",
    question: "How long does a heat pump installation take?",
    answer:
      "Most air source heat pump installations take between two and five days. Day one typically covers pipework and mounting the outdoor unit; days two to three cover the indoor unit, hot water cylinder, and controls; and the final day is for commissioning, testing, and handover. Ground source systems take longer — usually one to three weeks — because they require groundwork to lay the ground collector loops. Your installer will give you a detailed programme during the survey visit before any work begins.",
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* ------------------------------------------------------------------ */}
        {/* 1. HERO */}
        {/* ------------------------------------------------------------------ */}
        <section className="relative bg-gradient-to-br from-hpm-primary-dark to-hpm-primary py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Decorative circles */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-white/5 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative max-w-3xl mx-auto text-center">
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/20 px-4 py-1.5 text-sm font-medium text-green-200 mb-6">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              3,000+ MCS-Certified Installers
            </span>

            {/* Heading */}
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-white leading-tight tracking-tight mb-5">
              Find trusted heat pump installers near you
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl mx-auto">
              Compare MCS-certified installers, check your £7,500 grant eligibility, and get free
              quotes — all in one place.
            </p>

            {/* Search */}
            <div className="flex justify-center mb-10">
              <SearchBar />
            </div>

            {/* Trust strip */}
            <ul className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-white/70">
              {[
                "Free, no-obligation quotes",
                "MCS-certified installers only",
                "BUS grant assistance included",
              ].map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-green-300 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 2. SOCIAL PROOF BAR */}
        {/* ------------------------------------------------------------------ */}
        <section className="bg-hpm-surface-muted border-y border-hpm-border py-5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-sm text-hpm-text-secondary">
            {/* Homeowners */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-hpm-text">2,400+</span>
              UK homeowners served
            </div>

            <div className="hidden sm:block w-px h-6 bg-hpm-border" aria-hidden="true" />

            {/* Rating */}
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
              <span className="font-semibold text-hpm-text ml-1">4.8</span>
              average installer rating
            </div>

            <div className="hidden sm:block w-px h-6 bg-hpm-border" aria-hidden="true" />

            {/* Badges */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 font-medium text-hpm-text">
                <Shield className="w-4 h-4 text-hpm-primary" aria-hidden="true" />
                MCS
              </div>
              <div className="flex items-center gap-1.5 font-medium text-hpm-text">
                <Award className="w-4 h-4 text-hpm-secondary" aria-hidden="true" />
                TrustMark
              </div>
              <div className="flex items-center gap-1.5 font-medium text-hpm-text">
                <Shield className="w-4 h-4 text-hpm-accent" aria-hidden="true" />
                RECC
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 3. HOW IT WORKS */}
        {/* ------------------------------------------------------------------ */}
        <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-hpm-text mb-4">
              Get quotes in 3 simple steps
            </h2>
            <p className="text-hpm-text-secondary text-lg mb-12 max-w-xl mx-auto">
              From postcode to confirmed quote in minutes — no pushy sales calls.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-hpm-border bg-white hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-full bg-hpm-primary/10 flex items-center justify-center mb-5">
                  <MapPin className="w-7 h-7 text-hpm-primary" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold text-hpm-text-muted uppercase tracking-widest mb-2">
                  Step 1
                </span>
                <h3 className="font-heading font-bold text-hpm-text text-lg mb-2">
                  Enter your postcode
                </h3>
                <p className="text-hpm-text-secondary text-sm leading-relaxed">
                  Tell us where you are and we&apos;ll instantly show you MCS-certified installers
                  that cover your area — sorted by rating and distance.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-hpm-border bg-white hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-full bg-hpm-primary/10 flex items-center justify-center mb-5">
                  <ClipboardCheck className="w-7 h-7 text-hpm-primary" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold text-hpm-text-muted uppercase tracking-widest mb-2">
                  Step 2
                </span>
                <h3 className="font-heading font-bold text-hpm-text text-lg mb-2">
                  Tell us about your home
                </h3>
                <p className="text-hpm-text-secondary text-sm leading-relaxed">
                  Answer a few quick questions about your property — heating system, size, and
                  insulation — so installers can prepare accurate, tailored quotes.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-hpm-border bg-white hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-full bg-hpm-primary/10 flex items-center justify-center mb-5">
                  <MessageSquare className="w-7 h-7 text-hpm-primary" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold text-hpm-text-muted uppercase tracking-widest mb-2">
                  Step 3
                </span>
                <h3 className="font-heading font-bold text-hpm-text text-lg mb-2">
                  Get free quotes
                </h3>
                <p className="text-hpm-text-secondary text-sm leading-relaxed">
                  Up to three vetted installers will get in touch with free, no-obligation quotes.
                  Compare, choose, and book — entirely on your terms.
                </p>
              </div>
            </div>

            <div className="mt-10">
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-1 text-hpm-primary hover:text-hpm-primary-dark font-medium text-sm transition-colors"
              >
                Learn more about how it works
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 4. GRANT TEASER */}
        {/* ------------------------------------------------------------------ */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl border-l-4 border-hpm-success bg-white shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-5">
                {/* Text */}
                <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-hpm-success uppercase tracking-widest mb-3">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Boiler Upgrade Scheme
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-hpm-text mb-3">
                    Could you get £7,500 off your heat pump?
                  </h3>
                  <p className="text-hpm-text-secondary leading-relaxed mb-6">
                    The UK government&apos;s Boiler Upgrade Scheme pays £7,500 towards the cost of
                    an air or ground source heat pump for eligible homeowners in England and Wales.
                    Our free eligibility checker takes less than two minutes — no personal details
                    required.
                  </p>
                  <Link
                    href="/grant-checker"
                    className="inline-flex items-center gap-2 self-start rounded-lg bg-hpm-success hover:bg-hpm-primary text-white font-semibold px-6 py-3 transition-colors text-sm"
                  >
                    Check Eligibility
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>

                {/* Visual */}
                <div
                  className="md:col-span-2 bg-gradient-to-br from-hpm-primary to-hpm-primary-dark flex flex-col items-center justify-center py-12 md:py-0 gap-4"
                  aria-hidden="true"
                >
                  <span className="text-7xl md:text-8xl" role="img" aria-label="House">
                    🏡
                  </span>
                  <div className="text-center px-6">
                    <p className="text-white/70 text-sm font-medium">Government grant</p>
                    <p className="text-white font-heading font-extrabold text-3xl">£7,500</p>
                    <p className="text-white/70 text-sm mt-0.5">off your installation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 5. FEATURED INSTALLERS */}
        {/* ------------------------------------------------------------------ */}
        <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-hpm-text mb-2">
                  Top-rated installers
                </h2>
                <p className="text-hpm-text-secondary">
                  Verified MCS-certified professionals with outstanding customer reviews.
                </p>
              </div>
              <Link
                href="/installers"
                className="inline-flex items-center gap-1 text-hpm-primary hover:text-hpm-primary-dark font-medium text-sm transition-colors whitespace-nowrap"
              >
                View all 3,000+ installers
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FEATURED_INSTALLERS.map((installer) => (
                <InstallerCard key={installer.name} {...installer} />
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 6. FAQ */}
        {/* ------------------------------------------------------------------ */}
        <section className="bg-hpm-surface-muted py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-hpm-text mb-3">
                Common questions about heat pumps
              </h2>
              <p className="text-hpm-text-secondary">
                Straightforward answers to help you make an informed decision.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-hpm-border shadow-sm overflow-hidden px-2">
              <Accordion>
                {FAQS.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="px-4 py-4 text-base font-semibold text-hpm-text">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <p className="text-hpm-text-secondary leading-relaxed">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <p className="text-center text-sm text-hpm-text-muted mt-6">
              Still have questions?{" "}
              <Link
                href="/contact"
                className="text-hpm-primary hover:text-hpm-primary-dark font-medium underline underline-offset-2 transition-colors"
              >
                Get in touch with our team
              </Link>
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 7. CTA */}
        {/* ------------------------------------------------------------------ */}
        <section className="bg-hpm-secondary py-20 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white mb-4">
              Ready to find your installer?
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Join thousands of UK homeowners who have already switched to cleaner, cheaper heat
              with a heat pump. Compare installers and get your free quotes today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/get-quotes"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-hpm-accent hover:bg-hpm-accent-hover text-white font-semibold px-8 py-3.5 transition-colors text-base w-full sm:w-auto"
              >
                Get Free Quotes
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                href="/grant-checker"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/40 hover:border-white/70 text-white font-semibold px-8 py-3.5 transition-colors text-base w-full sm:w-auto"
              >
                Check Grant Eligibility
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner />
    </>
  )
}
