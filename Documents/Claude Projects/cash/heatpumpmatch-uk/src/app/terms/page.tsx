import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

const sections = [
  { id: "about-terms", title: "1. About These Terms" },
  { id: "our-service", title: "2. Our Service" },
  { id: "accounts", title: "3. Accounts" },
  { id: "quote-requests", title: "4. Quote Requests" },
  { id: "installer-listings", title: "5. Installer Listings" },
  { id: "intellectual-property", title: "6. Intellectual Property" },
  { id: "liability", title: "7. Limitation of Liability" },
  { id: "governing-law", title: "8. Governing Law" },
  { id: "changes", title: "9. Changes to These Terms" },
  { id: "contact", title: "10. Contact Us" },
]

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-hpm-surface-muted">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Header */}
          <div className="mb-10">
            <h1 className="font-heading text-4xl font-bold text-hpm-text">Terms of Service</h1>
            <p className="mt-2 text-sm text-hpm-text-muted">Last updated: March 2026</p>
            <p className="mt-4 text-hpm-text-secondary leading-relaxed">
              Please read these Terms of Service carefully before using the HeatPumpMatch website or services.
              By accessing or using our platform, you agree to be bound by these terms. If you do not agree,
              please do not use our services.
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

          {/* Terms body */}
          <div className="bg-white rounded-xl border border-hpm-border p-8 space-y-10 text-hpm-text-secondary leading-relaxed text-sm">

            {/* 1 */}
            <section id="about-terms">
              <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">1. About These Terms</h2>
              <p>
                These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the website
                located at heatpumpmatch.co.uk (the &ldquo;Site&rdquo;) and any services provided by
                HeatPumpMatch Ltd (&ldquo;HeatPumpMatch&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
                &ldquo;our&rdquo;).
              </p>
              <p className="mt-3">
                HeatPumpMatch Ltd is registered in England and Wales (Company No. 14782936) with its
                registered office at 12 Riverside Way, Redhill, Surrey, RH1 1AB.
              </p>
              <p className="mt-3">
                These Terms apply to all users of the Site, including homeowners seeking heat pump installation
                quotes (&ldquo;Consumers&rdquo;) and businesses listed as installers (&ldquo;Installers&rdquo;).
                Where terms apply specifically to one group, this is indicated.
              </p>
              <p className="mt-3">
                References to &ldquo;you&rdquo; or &ldquo;your&rdquo; mean you as the individual or
                organisation accessing the Site.
              </p>
            </section>

            {/* 2 */}
            <section id="our-service">
              <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">2. Our Service</h2>
              <p>
                HeatPumpMatch operates an online directory and lead generation platform that connects
                homeowners with MCS-certified heat pump installers. We provide:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>A searchable directory of heat pump installers across the United Kingdom.</li>
                <li>A grant eligibility checker to help homeowners understand potential financial support.</li>
                <li>A quote request mechanism to connect homeowners with relevant installers.</li>
                <li>Paid listing and lead generation services for installer businesses.</li>
              </ul>
              <p className="mt-3">
                HeatPumpMatch is an introducer service only. We are not a party to any contract entered into
                between a Consumer and an Installer, and we are not responsible for the quality, safety,
                timeliness, or legality of any installation work carried out. All contracts for installation
                are solely between the Consumer and the Installer.
              </p>
              <p className="mt-3">
                We do not guarantee that any installer will respond to a quote request, or that any quoted
                price will be the most competitive available.
              </p>
            </section>

            {/* 3 */}
            <section id="accounts">
              <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">3. Accounts</h2>
              <p>
                Installers wishing to create an enhanced listing must register for an account. When creating
                an account, you must provide accurate and complete information. You are responsible for
                maintaining the security of your account credentials and must notify us immediately if you
                suspect unauthorised access.
              </p>
              <p className="mt-3">
                You must be at least 18 years old to create an account. Installer accounts must be operated
                by an authorised representative of the registered business. You may not create an account on
                behalf of another person or entity without authorisation.
              </p>
              <p className="mt-3">
                We reserve the right to suspend or terminate any account that we reasonably believe has been
                used in breach of these Terms, is providing false information, or is engaging in fraudulent
                or deceptive behaviour.
              </p>
            </section>

            {/* 4 */}
            <section id="quote-requests">
              <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">4. Quote Requests</h2>
              <p>
                When you submit a quote request through our Site, you consent to your contact and property
                details being shared with the relevant installer(s) for the purpose of providing you with a
                quotation. Full details of how we handle this data are set out in our{" "}
                <Link href="/privacy" className="text-hpm-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
              <p className="mt-3">
                Quote requests must be genuine enquiries for property at which you have the authority to
                authorise installation work. You must not submit false, speculative, or malicious enquiries.
              </p>
              <p className="mt-3">
                Any quotation you receive from an installer is provided by that installer acting as an
                independent business. HeatPumpMatch does not guarantee the accuracy, completeness, or
                competitiveness of any quote.
              </p>
            </section>

            {/* 5 */}
            <section id="installer-listings">
              <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">5. Installer Listings</h2>
              <p>
                Installers who create or upgrade a listing on HeatPumpMatch warrant that all information
                provided, including MCS certification number, company registration, coverage area, and service
                offerings, is accurate, current, and not misleading.
              </p>
              <p className="mt-3">
                Paid subscription plans (Professional and Premium) are subject to a separate subscription
                agreement and our billing terms. Monthly subscriptions are billed in advance. The 14-day free
                trial for Professional plans does not require payment information upfront; a payment method
                must be provided before the trial expires to continue uninterrupted service.
              </p>
              <p className="mt-3">
                We reserve the right to remove any listing that:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Contains false or materially misleading information;</li>
                <li>Is associated with a business that loses MCS accreditation;</li>
                <li>Violates applicable law or regulation; or</li>
                <li>Is the subject of sustained and credible complaints from consumers.</li>
              </ul>
              <p className="mt-3">
                Reviews submitted by consumers are moderated by HeatPumpMatch. We reserve the right to remove
                reviews that are defamatory, fraudulent, or in breach of these Terms.
              </p>
            </section>

            {/* 6 */}
            <section id="intellectual-property">
              <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">6. Intellectual Property</h2>
              <p>
                All content on the HeatPumpMatch Site — including text, images, logos, graphics, software, and
                page layout — is owned by or licensed to HeatPumpMatch Ltd and is protected by copyright,
                trade mark, and other intellectual property laws.
              </p>
              <p className="mt-3">
                You may view, download, and print pages from the Site for personal, non-commercial use only.
                You may not reproduce, distribute, modify, create derivative works from, publicly display, or
                commercially exploit any content without our prior written consent.
              </p>
              <p className="mt-3">
                By submitting content to us — including installer profile information, photos, or review
                responses — you grant HeatPumpMatch a non-exclusive, royalty-free, perpetual licence to
                display, reproduce, and distribute that content in connection with our service.
              </p>
            </section>

            {/* 7 */}
            <section id="liability">
              <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">7. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by applicable law, HeatPumpMatch Ltd shall not be liable for
                any indirect, incidental, special, consequential, or punitive damages arising from your use
                of, or inability to use, the Site or our services, even if we have been advised of the
                possibility of such damages.
              </p>
              <p className="mt-3">
                Our total aggregate liability to you in connection with these Terms or your use of the Site
                shall not exceed the greater of (a) the amount you have paid to us in the 12 months
                preceding the event giving rise to the claim, or (b) £100.
              </p>
              <p className="mt-3">
                Nothing in these Terms excludes or limits our liability for death or personal injury caused by
                our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be
                excluded or limited under the laws of England and Wales, including liability under the Consumer
                Rights Act 2015.
              </p>
              <p className="mt-3">
                HeatPumpMatch is not responsible for the actions, omissions, or work quality of any installer
                listed on our platform. Any dispute arising from an installation contract must be resolved
                directly between you and the installer, or through an appropriate Alternative Dispute
                Resolution (ADR) scheme.
              </p>
            </section>

            {/* 8 */}
            <section id="governing-law">
              <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">8. Governing Law</h2>
              <p>
                These Terms and any dispute or claim arising out of or in connection with them (including
                non-contractual disputes or claims) shall be governed by and construed in accordance with the
                laws of England and Wales.
              </p>
              <p className="mt-3">
                Both parties irrevocably agree that the courts of England and Wales shall have exclusive
                jurisdiction to settle any dispute or claim arising out of or in connection with these Terms
                or their subject matter or formation.
              </p>
              <p className="mt-3">
                If you are a consumer resident in Scotland or Northern Ireland, you may also have the right
                to bring proceedings in the courts of your home jurisdiction under applicable consumer
                protection legislation.
              </p>
            </section>

            {/* 9 */}
            <section id="changes">
              <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">9. Changes to These Terms</h2>
              <p>
                We may update these Terms from time to time to reflect changes to our services, applicable
                law, or best practice. When we do, we will update the &ldquo;last updated&rdquo; date at the
                top of this page.
              </p>
              <p className="mt-3">
                For material changes, we will provide at least 30 days&apos; notice by email to registered
                account holders before the new terms take effect. Your continued use of the Site after the
                effective date of any changes constitutes acceptance of the revised Terms.
              </p>
              <p className="mt-3">
                If you do not agree to the revised Terms, you should stop using our services and, if you hold
                a paid subscription, cancel before the changes take effect.
              </p>
            </section>

            {/* 10 */}
            <section id="contact">
              <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">10. Contact Us</h2>
              <p>
                If you have any questions about these Terms or wish to contact us for any reason relating to
                your use of the platform, please reach us at:
              </p>
              <div className="mt-4 rounded-lg bg-hpm-surface-muted p-5 space-y-1">
                <p><strong className="text-hpm-text">HeatPumpMatch Ltd</strong></p>
                <p>12 Riverside Way, Redhill, Surrey, RH1 1AB</p>
                <p>
                  Email:{" "}
                  <a href="mailto:legal@heatpumpmatch.co.uk" className="text-hpm-primary hover:underline">
                    legal@heatpumpmatch.co.uk
                  </a>
                </p>
              </div>
            </section>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-hpm-text-muted">
              Related:{" "}
              <Link href="/privacy" className="text-hpm-primary hover:underline">
                Privacy Policy
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
