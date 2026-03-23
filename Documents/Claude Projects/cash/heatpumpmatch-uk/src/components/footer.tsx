import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center font-heading font-extrabold text-xl mb-3">
              <span className="text-hpm-primary-light">Heat</span>
              <span className="text-white">Pump</span>
              <span className="text-white">Match</span>
            </Link>
            <p className="text-sm leading-relaxed">
              The UK&apos;s trusted directory for MCS-certified heat pump installers. Find, compare, and connect with
              qualified professionals near you.
            </p>
          </div>

          {/* Directory */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm mb-4">Directory</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/installers" className="hover:text-white transition-colors">Browse Installers</Link></li>
              <li><Link href="/installers?type=air-source" className="hover:text-white transition-colors">Air Source Heat Pumps</Link></li>
              <li><Link href="/installers?type=ground-source" className="hover:text-white transition-colors">Ground Source Heat Pumps</Link></li>
              <li><Link href="/installers?type=hybrid" className="hover:text-white transition-colors">Hybrid Systems</Link></li>
              <li><Link href="/grant-checker" className="hover:text-white transition-colors">Grant Checker</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/guides/boiler-upgrade-scheme" className="hover:text-white transition-colors">Boiler Upgrade Scheme</Link></li>
              <li><Link href="/guides/mcs-certification" className="hover:text-white transition-colors">MCS Certification Guide</Link></li>
              <li><Link href="/guides/costs" className="hover:text-white transition-colors">Heat Pump Costs</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/for-installers" className="hover:text-white transition-colors">For Installers</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>&copy; 2026 HeatPumpMatch Ltd. All rights reserved.</p>
          <button
            type="button"
            className="hover:text-slate-300 transition-colors underline underline-offset-2"
          >
            Cookie Settings
          </button>
        </div>
      </div>
    </footer>
  )
}
