import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

const sections = [
  { id: "who-we-are", title: "1. Who We Are" },
  { id: "data-collected", title: "2. Data We Collect" },
  { id: "lawful-basis", title: "3. Lawful Basis for Processing" },
  { id: "how-used", title: "4. How We Use Your Data" },
  { id: "sharing", title: "5. Who We Share Data With" },
  { id: "retention", title: "6. Data Retention" },
  { id: "your-rights", title: "7. Your UK GDPR Rights" },
  { id: "cookies", title: "8. Cookies" },
  { id: "changes", title: "9. Changes to This Policy" },
  { id: "contact", title: "10. How to Contact Us" },
]

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-hpm-surface-muted">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Header */}
          <div className="mb-10">
            <h1 className="font-heading text-4xl font-bold text-hpm-text">Privacy Policy</h1>
            <p className="mt-2 text-sm text-hpm-text-muted">Last updated: March 2026</p>
            <p className="mt-4 text-hpm-text-secondary leading-relaxed">
              This Privacy Policy explains how HeatPumpMatch Ltd (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or
              &ldquo;us&rdquo;) collects, uses, and protects your personal data when you use our website at
              heatpumpmatch.co.uk and related services. We are committed to protecting your privacy and
              complying with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>
          </div>

          {/* Table of contents */}
          <nav
            aria-label="Table of contents"
            className="bg-white rounded-xl border border-hpm-border p-6 mb-10"
          >
            <h2 className="font-heading font-semibold text-hpm-text text-sm uppercase tracking-wide mb-4">
              Contents
            </h2>
            <ol className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm text-hpm-primary hover:underline hover:text-hpm-primary-dark transition-colors"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Policy body */}
          <div className="bg-white rounded-xl border border-hpm-border p-8 space-y-10 prose-sm text-hpm-text-secondary leading-relaxed">

            {/* 1 */}
            <section id="who-we-are">
              <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">1. Who We Are</h2>
              <p>
                HeatPumpMatch Ltd is a company registered in England and Wales (Company No. 14782936) with its
                registered office at 12 Riverside Way, Redhill, Surrey, RH1 1AB. We operate a consumer-facing
                directory that connects homeowners with MCS-certified heat pump installers.
              </p>
              <p className="mt-3">
                For the purposes of UK data protection law, HeatPumpMatch Ltd is the{" "}
                <strong className="text-hpm-text">data controller</strong> for the personal data we collect
                through this website. Our data protection contact is{" "}
                <a href="mailto:privacy@heatpumpmatch.co.uk" className="text-hpm-primary hover:underline">
                  privacy@heatpumpmatch.co.uk
                </a>
                .
              </p>
            </section>

            {/* 2 */}
            <section id="data-collected">
              <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">2. Data We Collect</h2>
              <p>We collect the following categories of personal data:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>
                  <strong className="text-hpm-text">Identity data:</strong> first name, last name, and
                  company name (where applicable).
                </li>
                <li>
                  <strong className="text-hpm-text">Contact data:</strong> email address, telephone number,
                  and postal address or postcode.
                </li>
                <li>
                  <strong className="text-hpm-text">Property data:</strong> property type, number of
                  bedrooms, current heating system, and EPC status provided during quote requests or our grant
                  eligibility checker.
                </li>
                <li>
                  <strong className="text-hpm-text">Account data:</strong> login credentials (email and
                  hashed password) for installer accounts.
                </li>
                <li>
                  <strong className="text-hpm-text">Technical data:</strong> IP address, browser type and
                  version, device type, operating system, pages visited, time and date of visit, and referring
                  URL. This data is collected by our analytics provider (see Section 8).
                </li>
                <li>
                  <strong className="text-hpm-text">Marketing preferences:</strong> whether you have opted
                  in to receive marketing communications from us.
                </li>
              </ul>
              <p className="mt-3">
                We do not collect any special category data (such as health data, ethnic origin, or biometric
                data) and we do not make automated decisions or use profiling in ways that produce legal or
                similarly significant effects.
              </p>
            </section>

            {/* 3 */}
            <section id="lawful-basis">
              <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">3. Lawful Basis for Processing</h2>
              <p>We rely on the following lawful bases under UK GDPR Article 6:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>
                  <strong className="text-hpm-text">Contract (Article 6(1)(b)):</strong> to fulfil our
                  service to you, such as passing your quote request to an installer.
                </li>
                <li>
                  <strong className="text-hpm-text">Legitimate interests (Article 6(1)(f)):</strong> for
                  analytics and site improvement, fraud prevention, and communications about your enquiry. We
                  have assessed that our legitimate interests are not overridden by your rights and freedoms.
                </li>
                <li>
                  <strong className="text-hpm-text">Consent (Article 6(1)(a)):</strong> where you have
                  opted in to receive marketing emails or have accepted optional analytics cookies.
                </li>
                <li>
                  <strong className="text-hpm-text">Legal obligation (Article 6(1)(c)):</strong> where we
                  are required to process data to comply with applicable law, including tax and financial
                  record-keeping obligations.
                </li>
              </ul>
            </section>

            {/* 4 */}
            <section id="how-used">
              <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">4. How We Use Your Data</h2>
              <p>We use your personal data to:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Pass your quote request details to the installer(s) you have selected or who operate in your area.</li>
                <li>Operate and improve our website, including fixing bugs and understanding which pages are popular.</li>
                <li>Create and manage your installer account if you are a registered business user.</li>
                <li>Send you service communications about your enquiry or account (e.g. confirmation emails).</li>
                <li>Send you marketing emails about heat pump news, grant updates, and our services — only where you have given explicit consent.</li>
                <li>Comply with our legal and regulatory obligations.</li>
                <li>Detect and prevent fraud or misuse of our platform.</li>
              </ul>
            </section>

            {/* 5 */}
            <section id="sharing">
              <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">5. Who We Share Data With</h2>
              <p>We share personal data only in the following circumstances:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>
                  <strong className="text-hpm-text">Installers:</strong> When you submit a quote request,
                  your contact and property details are shared with the relevant installer(s). Each installer
                  is bound by their own privacy policy and data protection obligations.
                </li>
                <li>
                  <strong className="text-hpm-text">Service providers:</strong> We use trusted third-party
                  service providers to operate our platform, including cloud hosting (Vercel), transactional
                  email (Resend), and privacy-friendly analytics (Plausible Analytics). These providers are
                  contractually required to handle data securely and in accordance with UK GDPR.
                </li>
                <li>
                  <strong className="text-hpm-text">Legal and regulatory authorities:</strong> Where required
                  to do so by law, court order, or statutory authority.
                </li>
              </ul>
              <p className="mt-3">
                We do not sell, rent, or trade your personal data to any third party for marketing purposes.
                All our core service providers are based in the UK or EEA, or operate under appropriate
                safeguards for international transfers.
              </p>
            </section>

            {/* 6 */}
            <section id="retention">
              <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">6. Data Retention</h2>
              <p>We retain personal data only for as long as necessary for the purposes described in this policy:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>
                  <strong className="text-hpm-text">Quote request data:</strong> Retained for 12 months
                  from submission to allow follow-up, then securely deleted.
                </li>
                <li>
                  <strong className="text-hpm-text">Installer account data:</strong> Retained for the
                  duration of the account plus 6 years after closure, in line with our legal obligations.
                </li>
                <li>
                  <strong className="text-hpm-text">Marketing preferences:</strong> Retained until you
                  withdraw consent or unsubscribe.
                </li>
                <li>
                  <strong className="text-hpm-text">Technical / analytics data:</strong> Aggregated and
                  anonymised — not stored in identifiable form beyond 90 days.
                </li>
              </ul>
            </section>

            {/* 7 */}
            <section id="your-rights">
              <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">7. Your UK GDPR Rights</h2>
              <p>Under UK GDPR, you have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>
                  <strong className="text-hpm-text">Right of access:</strong> You may request a copy of the
                  personal data we hold about you (a Subject Access Request).
                </li>
                <li>
                  <strong className="text-hpm-text">Right to rectification:</strong> You may ask us to
                  correct inaccurate or incomplete data.
                </li>
                <li>
                  <strong className="text-hpm-text">Right to erasure (&ldquo;right to be forgotten&rdquo;):</strong>{" "}
                  You may ask us to delete your personal data, subject to legal retention obligations.
                </li>
                <li>
                  <strong className="text-hpm-text">Right to restriction of processing:</strong> You may
                  ask us to limit how we use your data in certain circumstances.
                </li>
                <li>
                  <strong className="text-hpm-text">Right to data portability:</strong> Where processing is
                  based on consent or contract, you may request your data in a structured, machine-readable format.
                </li>
                <li>
                  <strong className="text-hpm-text">Right to object:</strong> You may object to processing
                  based on our legitimate interests at any time. You may also object to direct marketing at any time.
                </li>
                <li>
                  <strong className="text-hpm-text">Right to withdraw consent:</strong> Where we rely on
                  your consent, you may withdraw it at any time without affecting the lawfulness of prior
                  processing.
                </li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact us at{" "}
                <a href="mailto:privacy@heatpumpmatch.co.uk" className="text-hpm-primary hover:underline">
                  privacy@heatpumpmatch.co.uk
                </a>
                . We will respond within one month. If you are dissatisfied with our response, you have the
                right to lodge a complaint with the{" "}
                <a
                  href="https://ico.org.uk"
                  className="text-hpm-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Information Commissioner&apos;s Office (ICO)
                </a>{" "}
                at ico.org.uk or by calling 0303 123 1113.
              </p>
            </section>

            {/* 8 */}
            <section id="cookies">
              <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">8. Cookies</h2>
              <p>
                We use cookies and similar technologies on our website. Cookies are small text files stored on
                your device that help us provide and improve our services.
              </p>
              <div className="mt-3 space-y-3">
                <div className="rounded-lg bg-hpm-surface-muted p-4">
                  <h3 className="font-semibold text-hpm-text text-sm">Essential cookies</h3>
                  <p className="text-sm mt-1">
                    Required for the website to function — for example, to remember your cookie preferences.
                    These cannot be disabled.
                  </p>
                </div>
                <div className="rounded-lg bg-hpm-surface-muted p-4">
                  <h3 className="font-semibold text-hpm-text text-sm">Analytics cookies</h3>
                  <p className="text-sm mt-1">
                    We use <strong>Plausible Analytics</strong>, a privacy-respecting tool that does not use
                    cookies, does not collect personal data, and is fully compliant with UK GDPR without
                    requiring consent under the UK&apos;s PECR rules. No data is shared with Google or
                    other advertising networks.
                  </p>
                </div>
              </div>
              <p className="mt-3">
                You can manage your cookie preferences at any time using the &ldquo;Cookie Settings&rdquo; link
                in our website footer.
              </p>
            </section>

            {/* 9 */}
            <section id="changes">
              <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. When we do, we will revise the
                &ldquo;last updated&rdquo; date at the top of this page. For significant changes, we will
                provide a more prominent notice — for example, by sending an email notification to registered
                users. We encourage you to review this policy periodically.
              </p>
            </section>

            {/* 10 */}
            <section id="contact">
              <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">10. How to Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or how we handle your personal data, please
                contact our data protection team:
              </p>
              <div className="mt-4 rounded-lg bg-hpm-surface-muted p-5 space-y-1 text-sm">
                <p><strong className="text-hpm-text">HeatPumpMatch Ltd</strong></p>
                <p>12 Riverside Way, Redhill, Surrey, RH1 1AB</p>
                <p>
                  Email:{" "}
                  <a href="mailto:privacy@heatpumpmatch.co.uk" className="text-hpm-primary hover:underline">
                    privacy@heatpumpmatch.co.uk
                  </a>
                </p>
              </div>
            </section>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-hpm-text-muted">
              Related:{" "}
              <Link href="/terms" className="text-hpm-primary hover:underline">
                Terms of Service
              </Link>{" "}
              ·{" "}
              <Link href="/cookie-preferences" className="text-hpm-primary hover:underline">
                Cookie Preferences
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
