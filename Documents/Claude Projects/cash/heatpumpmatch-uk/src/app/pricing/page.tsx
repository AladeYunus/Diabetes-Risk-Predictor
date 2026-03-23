import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { CheckCircle, Zap } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const plans = [
  {
    name: "Starter",
    price: null,
    priceLabel: "Free",
    description: "Get your business listed and visible to homeowners searching in your area.",
    cta: "Create Free Listing",
    ctaHref: "/signup",
    ctaVariant: "outline" as const,
    popular: false,
    features: [
      "Basic company listing",
      "MCS badge displayed",
      "Link to your website",
      "Contact form",
      "Coverage area display",
      "Up to 3 heat pump types",
    ],
    missing: ["Enhanced profile photos", "Customer reviews", "Lead notifications", "Coverage area map", "Analytics dashboard"],
  },
  {
    name: "Professional",
    price: 49,
    priceLabel: "£49/month",
    description: "Everything you need to win new heat pump customers and grow your pipeline.",
    cta: "Start Free 14-Day Trial",
    ctaHref: "/signup?plan=professional",
    ctaVariant: "accent" as const,
    popular: true,
    features: [
      "Everything in Starter",
      "Enhanced profile with photos",
      "Customer reviews & ratings",
      "Up to 20 leads per month",
      "Interactive coverage area map",
      "Lead email notifications",
      "Priority listing in search results",
      "Dedicated account manager",
      "Phone & email support",
    ],
    missing: ["Unlimited leads", "Featured badge", "Advanced analytics", "Top placement guarantee"],
  },
  {
    name: "Premium",
    price: 149,
    priceLabel: "£149/month",
    description: "Maximum visibility and unlimited leads for high-volume installers.",
    cta: "Contact Sales",
    ctaHref: "/contact?plan=premium",
    ctaVariant: "outline" as const,
    popular: false,
    features: [
      "Everything in Professional",
      "Unlimited leads per month",
      "Featured badge on listings",
      "Advanced analytics dashboard",
      "Top placement in search results",
      "Branded installer profile page",
      "Direct phone line to sales team",
      "Quarterly business review",
      "Co-marketing opportunities",
    ],
    missing: [],
  },
]

const faqs = [
  {
    question: "How do I get my business listed on HeatPumpMatch?",
    answer:
      "Simply create a free account and complete your installer profile. You will need your MCS certificate number to verify your accreditation. Your listing will be reviewed and published within one working day. Upgrading to Professional or Premium unlocks additional features and increases your visibility to homeowners.",
  },
  {
    question: "How do leads work on the Professional and Premium plans?",
    answer:
      "When a homeowner submits a quote request for an installer in your coverage area, we send you their contact details and project information by email in real time. On the Professional plan you receive up to 20 qualified leads per month; on Premium there is no cap. You only pay for the subscription — there are no additional per-lead charges.",
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes. You may cancel your Professional or Premium subscription at any time from your account settings. Your listing will revert to the free Starter tier at the end of your current billing period. There are no cancellation fees or long-term contracts. The 14-day free trial for the Professional plan requires no credit card upfront.",
  },
]

export default function PricingPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <div className="bg-white border-b border-hpm-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="font-heading text-4xl font-bold text-hpm-text">
              Grow your heat pump business
            </h1>
            <p className="mt-4 text-lg text-hpm-text-secondary max-w-2xl mx-auto">
              Join hundreds of MCS-certified installers who use HeatPumpMatch to connect with qualified
              homeowners actively seeking heat pump installations.
            </p>
          </div>
        </div>

        {/* Pricing grid */}
        <div className="bg-hpm-surface-muted py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative bg-white rounded-2xl border shadow-sm flex flex-col ${
                    plan.popular ? "border-hpm-accent ring-2 ring-hpm-accent/30" : "border-hpm-border"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 bg-hpm-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                        <Zap className="size-3" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="p-6 border-b border-hpm-border">
                    <h2 className="font-heading text-lg font-bold text-hpm-text">{plan.name}</h2>
                    <div className="mt-3 flex items-end gap-1">
                      {plan.price !== null ? (
                        <>
                          <span className="font-heading text-3xl font-extrabold text-hpm-text">
                            £{plan.price}
                          </span>
                          <span className="text-hpm-text-muted text-sm mb-1">/month</span>
                        </>
                      ) : (
                        <span className="font-heading text-3xl font-extrabold text-hpm-text">Free</span>
                      )}
                    </div>
                    <p className="mt-3 text-sm text-hpm-text-secondary leading-relaxed">{plan.description}</p>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <ul className="space-y-2.5 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-hpm-text">
                          <CheckCircle className="size-4 text-hpm-primary flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6">
                      <Link
                        href={plan.ctaHref}
                        className={`w-full inline-flex items-center justify-center rounded-lg font-semibold text-sm px-4 py-2.5 transition-colors ${
                          plan.ctaVariant === "accent"
                            ? "bg-hpm-accent hover:bg-hpm-accent-hover text-white"
                            : "border border-hpm-border-strong bg-white text-hpm-text hover:bg-hpm-surface-muted"
                        }`}
                      >
                        {plan.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-hpm-text-muted mt-6">
              All prices exclude VAT at the standard rate. Annual billing options available on request.
            </p>
          </div>
        </div>

        {/* Trust strip */}
        <div className="bg-white border-y border-hpm-border py-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { stat: "2,400+", label: "Homeowner enquiries monthly" },
                { stat: "480+", label: "MCS installers listed" },
                { stat: "£7,500", label: "Average BUS grant value" },
                { stat: "4.8★", label: "Average installer rating" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-heading text-2xl font-extrabold text-hpm-primary">{item.stat}</p>
                  <p className="text-xs text-hpm-text-secondary mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-hpm-surface-muted py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h2 className="font-heading text-2xl font-bold text-hpm-text text-center mb-8">
              Frequently asked questions
            </h2>
            <div className="bg-white rounded-2xl border border-hpm-border shadow-sm overflow-hidden">
              <Accordion>
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={i} className={i > 0 ? "border-t border-hpm-border" : ""}>
                    <AccordionTrigger className="px-6 py-4 text-sm font-semibold text-hpm-text hover:no-underline text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 text-sm text-hpm-text-secondary leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-hpm-text-secondary">
                Have more questions?{" "}
                <Link href="/contact" className="text-hpm-primary hover:underline font-medium">
                  Contact our team
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
