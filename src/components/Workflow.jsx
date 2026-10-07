import BUSINESS_CONFIG from '../config/businessConfig'
import { getIcon } from '../lib/icons'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export function Workflow() {
  const { workflow } = BUSINESS_CONFIG

  return (
    <section
      id="how-it-works"
      aria-labelledby="workflow-heading"
      className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-steel-grid bg-grid opacity-40" aria-hidden="true" />

      <div className="container-kr relative">
        <SectionHeading
          eyebrow="How It Works"
          title="4 Simple Steps to"
          titleAccent="Get Your Lift Done"
          lead="A clear process from the first phone call to the final sign-off — so you always know what happens next."
          headingId="workflow-heading"
        />

        <ol className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {workflow.map((step, i) => {
            const Icon = getIcon(step.icon)
            const isLast = i === workflow.length - 1

            return (
              <Reveal
                as="li"
                key={step.number}
                variant={i % 2 === 0 ? 'slide-right' : 'slide-left'}
                delay={i * 90}
                className="relative h-full"
              >
                <div className="card card-hover group relative flex h-full flex-col p-6 pt-8">
                  <span
                    className="absolute -top-5 left-6 grid h-12 w-12 place-items-center rounded-xl bg-amber-safety font-display text-lg font-extrabold text-navy-900 shadow-card transition-transform duration-300 group-hover:-translate-y-1"
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>

                  <span className="mt-3 grid h-11 w-11 place-items-center rounded-lg bg-navy-900 text-amber-safety">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <h3 className="mt-4 font-display text-base font-bold leading-tight tracking-tight text-navy-900">
                    <span className="sr-only">Step {step.number}: </span>
                    {step.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-navy-600">
                    {step.description}
                  </p>
                </div>

                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-navy-300 xl:block"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 12h14m0 0l-5-5m5 5l-5 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default Workflow