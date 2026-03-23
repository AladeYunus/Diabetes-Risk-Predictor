"use client"

import { useState } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { CheckCircle, AlertCircle, ChevronRight, ChevronLeft } from "lucide-react"

type Region = "england" | "wales" | "scotland" | "northern-ireland" | ""
type HeatingSystem = "gas" | "oil" | "lpg" | "electric" | "other" | ""
type Ownership = "own" | "rent" | ""
type EpcStatus = "yes" | "no" | "unsure" | ""

interface WizardState {
  region: Region
  heatingSystem: HeatingSystem
  ownership: Ownership
  epcStatus: EpcStatus
}

const TOTAL_STEPS = 4

function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center gap-2 mb-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
          const step = i + 1
          const isComplete = step < currentStep
          const isCurrent = step === currentStep
          return (
            <div key={step} className="flex items-center flex-1 gap-2">
              <div
                className={`flex-shrink-0 size-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-colors ${
                  isComplete
                    ? "bg-hpm-primary border-hpm-primary text-white"
                    : isCurrent
                    ? "bg-white border-hpm-primary text-hpm-primary"
                    : "bg-white border-hpm-border text-hpm-text-muted"
                }`}
              >
                {isComplete ? <CheckCircle className="size-4" /> : step}
              </div>
              {step < TOTAL_STEPS && (
                <div
                  className={`flex-1 h-1 rounded-full transition-colors ${
                    step < currentStep ? "bg-hpm-primary" : "bg-hpm-border"
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
      <p className="text-xs text-hpm-text-muted text-center">Step {currentStep} of {TOTAL_STEPS}</p>
    </div>
  )
}

function RadioOption({
  id,
  name,
  value,
  checked,
  onChange,
  label,
  note,
}: {
  id: string
  name: string
  value: string
  checked: boolean
  onChange: () => void
  label: string
  note?: string
}) {
  return (
    <label
      htmlFor={id}
      className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
        checked
          ? "border-hpm-primary bg-hpm-primary/5"
          : "border-hpm-border hover:border-hpm-border-strong hover:bg-hpm-surface-muted"
      }`}
    >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="mt-0.5 flex-shrink-0 accent-hpm-primary size-4"
      />
      <div>
        <span className="text-sm font-medium text-hpm-text">{label}</span>
        {note && <p className="text-xs text-hpm-text-muted mt-0.5">{note}</p>}
      </div>
    </label>
  )
}

export default function GrantCheckerPage() {
  const [step, setStep] = useState(1)
  const [state, setState] = useState<WizardState>({
    region: "",
    heatingSystem: "",
    ownership: "",
    epcStatus: "",
  })

  const isEligible =
    (state.region === "england" || state.region === "wales") &&
    state.ownership === "own" &&
    (state.epcStatus === "yes" || state.epcStatus === "unsure")

  function canAdvance(): boolean {
    if (step === 1) return state.region !== ""
    if (step === 2) return state.heatingSystem !== ""
    if (step === 3) return state.ownership !== "" && state.epcStatus !== ""
    return false
  }

  function handleNext() {
    if (canAdvance()) setStep((s) => s + 1)
  }

  function handleBack() {
    setStep((s) => s - 1)
  }

  function handleReset() {
    setStep(1)
    setState({ region: "", heatingSystem: "", ownership: "", epcStatus: "" })
  }

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-hpm-surface-muted">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">

          {/* Page title */}
          <div className="text-center mb-10">
            <h1 className="font-heading text-3xl font-bold text-hpm-text">
              Check your grant eligibility
            </h1>
            <p className="mt-3 text-hpm-text-secondary">
              Answer a few quick questions to find out if you qualify for the{" "}
              <strong className="text-hpm-text">£7,500 Boiler Upgrade Scheme</strong> grant.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-hpm-border shadow-sm p-8">
            <ProgressBar currentStep={step} />

            {/* Step 1: Region */}
            {step === 1 && (
              <div>
                <h2 className="font-heading text-xl font-semibold text-hpm-text mb-6">
                  Where is your property located?
                </h2>
                <div className="flex flex-col gap-3">
                  <RadioOption
                    id="region-england"
                    name="region"
                    value="england"
                    checked={state.region === "england"}
                    onChange={() => setState((s) => ({ ...s, region: "england" }))}
                    label="England"
                  />
                  <RadioOption
                    id="region-wales"
                    name="region"
                    value="wales"
                    checked={state.region === "wales"}
                    onChange={() => setState((s) => ({ ...s, region: "wales" }))}
                    label="Wales"
                  />
                  <RadioOption
                    id="region-scotland"
                    name="region"
                    value="scotland"
                    checked={state.region === "scotland"}
                    onChange={() => setState((s) => ({ ...s, region: "scotland" }))}
                    label="Scotland"
                    note="Scotland has separate schemes — Home Energy Scotland and the Warmer Homes Scotland programme."
                  />
                  <RadioOption
                    id="region-ni"
                    name="region"
                    value="northern-ireland"
                    checked={state.region === "northern-ireland"}
                    onChange={() => setState((s) => ({ ...s, region: "northern-ireland" }))}
                    label="Northern Ireland"
                    note="Northern Ireland has separate energy efficiency schemes — the BUS does not apply."
                  />
                </div>
              </div>
            )}

            {/* Step 2: Current heating */}
            {step === 2 && (
              <div>
                <h2 className="font-heading text-xl font-semibold text-hpm-text mb-6">
                  What is your current heating system?
                </h2>
                <div className="flex flex-col gap-3">
                  <RadioOption
                    id="heat-gas"
                    name="heatingSystem"
                    value="gas"
                    checked={state.heatingSystem === "gas"}
                    onChange={() => setState((s) => ({ ...s, heatingSystem: "gas" }))}
                    label="Gas boiler"
                  />
                  <RadioOption
                    id="heat-oil"
                    name="heatingSystem"
                    value="oil"
                    checked={state.heatingSystem === "oil"}
                    onChange={() => setState((s) => ({ ...s, heatingSystem: "oil" }))}
                    label="Oil boiler"
                    note="Oil-to-heat pump replacements are a priority for the BUS grant."
                  />
                  <RadioOption
                    id="heat-lpg"
                    name="heatingSystem"
                    value="lpg"
                    checked={state.heatingSystem === "lpg"}
                    onChange={() => setState((s) => ({ ...s, heatingSystem: "lpg" }))}
                    label="LPG boiler"
                  />
                  <RadioOption
                    id="heat-electric"
                    name="heatingSystem"
                    value="electric"
                    checked={state.heatingSystem === "electric"}
                    onChange={() => setState((s) => ({ ...s, heatingSystem: "electric" }))}
                    label="Electric storage heaters or direct electric"
                  />
                  <RadioOption
                    id="heat-other"
                    name="heatingSystem"
                    value="other"
                    checked={state.heatingSystem === "other"}
                    onChange={() => setState((s) => ({ ...s, heatingSystem: "other" }))}
                    label="No central heating / other"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Ownership + EPC */}
            {step === 3 && (
              <div>
                <div className="mb-7">
                  <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">
                    Do you own the property?
                  </h2>
                  <div className="flex flex-col gap-3">
                    <RadioOption
                      id="own-yes"
                      name="ownership"
                      value="own"
                      checked={state.ownership === "own"}
                      onChange={() => setState((s) => ({ ...s, ownership: "own" }))}
                      label="Yes, I own the property (or have a long leasehold)"
                    />
                    <RadioOption
                      id="own-rent"
                      name="ownership"
                      value="rent"
                      checked={state.ownership === "rent"}
                      onChange={() => setState((s) => ({ ...s, ownership: "rent" }))}
                      label="No, I rent the property"
                      note="Landlords can apply for the BUS grant on behalf of a rented property."
                    />
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-xl font-semibold text-hpm-text mb-4">
                    Does your property have a valid Energy Performance Certificate (EPC)?
                  </h2>
                  <div className="flex flex-col gap-3">
                    <RadioOption
                      id="epc-yes"
                      name="epcStatus"
                      value="yes"
                      checked={state.epcStatus === "yes"}
                      onChange={() => setState((s) => ({ ...s, epcStatus: "yes" }))}
                      label="Yes, it has a current EPC"
                    />
                    <RadioOption
                      id="epc-no"
                      name="epcStatus"
                      value="no"
                      checked={state.epcStatus === "no"}
                      onChange={() => setState((s) => ({ ...s, epcStatus: "no" }))}
                      label="No, it does not have an EPC"
                      note="You will need an EPC before applying. We can recommend local assessors."
                    />
                    <RadioOption
                      id="epc-unsure"
                      name="epcStatus"
                      value="unsure"
                      checked={state.epcStatus === "unsure"}
                      onChange={() => setState((s) => ({ ...s, epcStatus: "unsure" }))}
                      label="I&apos;m not sure"
                      note="You can check the government EPC register free of charge."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Result */}
            {step === 4 && (
              <div>
                {isEligible ? (
                  <div className="rounded-xl bg-green-50 border border-green-200 p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <CheckCircle className="size-6 text-hpm-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h2 className="font-heading text-xl font-semibold text-hpm-primary">
                          You&apos;re likely eligible!
                        </h2>
                        <p className="text-sm text-hpm-text-secondary mt-1">
                          Based on your answers, you could qualify for the{" "}
                          <strong className="text-hpm-text">£7,500 Boiler Upgrade Scheme (BUS)</strong>{" "}
                          grant towards the cost of an air source heat pump.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border border-green-200 p-4 mb-5">
                      <h3 className="font-semibold text-hpm-text text-sm mb-3">What this means for you</h3>
                      <ul className="space-y-2 text-sm text-hpm-text-secondary">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="size-4 text-hpm-primary flex-shrink-0 mt-0.5" />
                          <span>£7,500 off the installed cost of an air source heat pump</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="size-4 text-hpm-primary flex-shrink-0 mt-0.5" />
                          <span>Grant is paid directly to your MCS-certified installer</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="size-4 text-hpm-primary flex-shrink-0 mt-0.5" />
                          <span>No repayment required — it&apos;s a voucher, not a loan</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="size-4 text-hpm-primary flex-shrink-0 mt-0.5" />
                          <span>Your installer handles the BUS application on your behalf</span>
                        </li>
                      </ul>
                    </div>

                    <h3 className="font-semibold text-hpm-text text-sm mb-3">Next steps</h3>
                    <ol className="space-y-2 text-sm text-hpm-text-secondary mb-6 list-decimal list-inside">
                      <li>Find an MCS-certified installer near you</li>
                      <li>Request a free, no-obligation survey and quote</li>
                      <li>Your installer will confirm eligibility and apply for the grant</li>
                      <li>Installation takes place and grant is deducted from your invoice</li>
                    </ol>

                    <Link
                      href="/installers"
                      className="inline-flex items-center justify-center w-full rounded-lg bg-hpm-accent hover:bg-hpm-accent-hover text-white font-semibold text-sm px-6 py-3 transition-colors gap-2"
                    >
                      Find Installers Near You
                      <ChevronRight className="size-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="rounded-xl bg-amber-50 border border-amber-200 p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <AlertCircle className="size-6 text-hpm-warning flex-shrink-0 mt-0.5" />
                      <div>
                        <h2 className="font-heading text-xl font-semibold text-amber-800">
                          You may not qualify for the BUS grant
                        </h2>
                        <p className="text-sm text-amber-700 mt-1">
                          Based on your answers, you may not currently qualify for the Boiler Upgrade Scheme.
                          However, there are other schemes that may help.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border border-amber-200 p-4 mb-5">
                      <h3 className="font-semibold text-hpm-text text-sm mb-3">Alternative schemes</h3>
                      <ul className="space-y-3 text-sm text-hpm-text-secondary">
                        {state.region === "scotland" && (
                          <li className="flex items-start gap-2">
                            <ChevronRight className="size-4 text-hpm-warning flex-shrink-0 mt-0.5" />
                            <span>
                              <strong className="text-hpm-text">Home Energy Scotland:</strong> Free, impartial advice and interest-free loans up to £15,000 for renewables.
                            </span>
                          </li>
                        )}
                        {state.region === "northern-ireland" && (
                          <li className="flex items-start gap-2">
                            <ChevronRight className="size-4 text-hpm-warning flex-shrink-0 mt-0.5" />
                            <span>
                              <strong className="text-hpm-text">Affordable Warmth Scheme (NI):</strong> Support for low-income households in Northern Ireland.
                            </span>
                          </li>
                        )}
                        {state.ownership === "rent" && (
                          <li className="flex items-start gap-2">
                            <ChevronRight className="size-4 text-hpm-warning flex-shrink-0 mt-0.5" />
                            <span>
                              <strong className="text-hpm-text">Speak to your landlord:</strong> Landlords can apply for the BUS grant — ask your landlord about improving your heating system.
                            </span>
                          </li>
                        )}
                        {state.epcStatus === "no" && (
                          <li className="flex items-start gap-2">
                            <ChevronRight className="size-4 text-hpm-warning flex-shrink-0 mt-0.5" />
                            <span>
                              <strong className="text-hpm-text">Get an EPC:</strong> An EPC is required for the BUS. A domestic EPC typically costs £60–£120 and lasts 10 years.
                            </span>
                          </li>
                        )}
                        <li className="flex items-start gap-2">
                          <ChevronRight className="size-4 text-hpm-warning flex-shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-hpm-text">ECO4 Scheme:</strong> Government-backed energy efficiency improvements for lower-income households.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="size-4 text-hpm-warning flex-shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-hpm-text">VAT reduction:</strong> Heat pump installations currently attract 0% VAT, reducing your overall cost regardless of grant eligibility.
                          </span>
                        </li>
                      </ul>
                    </div>

                    <Link
                      href="/installers"
                      className="inline-flex items-center justify-center w-full rounded-lg border border-hpm-border-strong text-hpm-text font-semibold text-sm px-6 py-3 hover:bg-hpm-surface-muted transition-colors gap-2"
                    >
                      Browse MCS Installers Anyway
                      <ChevronRight className="size-4" />
                    </Link>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 w-full text-sm text-hpm-text-muted hover:text-hpm-text transition-colors underline underline-offset-2"
                >
                  Start over
                </button>
              </div>
            )}

            {/* Navigation buttons */}
            {step < 4 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-hpm-border">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 1}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-hpm-text-secondary hover:text-hpm-text disabled:opacity-40 disabled:pointer-events-none transition-colors"
                >
                  <ChevronLeft className="size-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canAdvance()}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-hpm-primary hover:bg-hpm-primary-dark text-white text-sm font-semibold px-6 py-2.5 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                >
                  {step === 3 ? "Check Eligibility" : "Next"}
                  <ChevronRight className="size-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
