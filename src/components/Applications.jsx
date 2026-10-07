import { ArrowRight } from 'lucide-react'
import BUSINESS_CONFIG from '../config/businessConfig'
import { getIcon } from '../lib/icons'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export function Applications({ onRequestQuote }) {
  const { applications, operations } = BUSINESS_CONFIG

  return (
    <section
      id="applications"
      aria-labelledby="applications-heading"
      className="relative bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="container-kr">
        <SectionHeading
          eyebrow="Industry Sectors"
          title="Applications We"
          titleAccent="Serve Every Day"
          lead="Six core sectors, one accountable lifting partner — whether it is a single truck unload or a full site erection package."
          headingId="applications-heading"
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((item, i) => {
            const Icon = getIcon(item.icon)
            const amber = item.accent === 'amber'

            return (
              <Reveal as="li" key={item.id} variant="zoom-out" delay={i * 60} className="h-full">
                <article
                  className={`card card-hover group relative flex h-full flex-col overflow-hidden p-6 ${
                    amber ? 'bg-navy-900 text-white' : ''
                  }`}
                >
                  {amber && (
                    <div
                      className="pointer-events-none absolute inset-0 bg-steel-grid bg-grid opacity-25"
                      aria-hidden="true"
                    />
                  )}

                  <div className="relative flex items-start justify-between gap-4">
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-xl transition-all duration-300 ${
                        amber
                          ? 'bg-amber-safety text-navy-900'
                          : 'bg-navy-900 text-amber-safety group-hover:bg-amber-safety group-hover:text-navy-900'
                      }`}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-display text-4xl font-extrabold leading-none opacity-10"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3
                    className={`relative mt-5 font-display text-lg font-bold leading-tight tracking-tight ${
                      amber ? 'text-white' : 'text-navy-900'
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`relative mt-2.5 flex-1 text-sm leading-relaxed ${
                      amber ? 'text-navy-300' : 'text-navy-600'
                    }`}
                  >
                    {item.description}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </ul>

        <Reveal className="mt-12">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8 text-center shadow-card sm:px-10">
            <p className="max-w-2xl text-sm leading-relaxed text-navy-600">
              <span className="font-semibold text-navy-900">
                Serving {operations.primaryRegionLabel}.
              </span>{' '}
              If your project does not fit a standard box, tell us the load and
              location — we customise the plan around your site.
            </p>
            <button type="button" onClick={onRequestQuote} className="btn-primary">
              Discuss Your Project
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Applications