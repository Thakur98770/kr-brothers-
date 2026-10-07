import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, Phone } from 'lucide-react'
import BUSINESS_CONFIG from '../config/businessConfig'
import Reveal from './Reveal'

/**
 * Breadcrumb + hero shared by the standalone pages (equipment, service areas,
 * contact, terms) so they all open the same way as the service pages.
 *
 * `crumbs` excludes the current page - it is appended here - and each item is
 * either {label, to} for a link or {label} for the current page.
 */
export function Breadcrumb({ crumbs = [] }) {
  if (crumbs.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-slate-50">
      <ol className="container-kr flex flex-wrap items-center gap-1.5 py-3 text-xs font-semibold text-navy-500">
        <li>
          <Link to="/" className="underline-offset-4 hover:text-navy-900 hover:underline">
            Home
          </Link>
        </li>
        {crumbs.map((crumb) => (
          <li key={crumb.label} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            {crumb.to ? (
              <Link to={crumb.to} className="underline-offset-4 hover:text-navy-900 hover:underline">
                {crumb.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-navy-900">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * Dark hero block for a standalone page.
 *
 * `titleAccent` is rendered in the amber brand colour so the page heading
 * matches the two-tone treatment used across the home page sections. The
 * heading is a real h1 - these pages are their own document, not a section.
 */
export function PageHero({ eyebrow, title, titleAccent, intro, crumbs, children }) {
  return (
    <>
      <Breadcrumb crumbs={crumbs} />

      <header className="relative overflow-hidden bg-navy-950 py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-steel-grid bg-grid opacity-25" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-amber-safety/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="container-kr relative">
          <Reveal variant="fade-up">
            {eyebrow ? (
              <p className="eyebrow mt-0 !text-amber-safety">
                <span aria-hidden="true" className="inline-block h-px w-8 bg-amber-safety/70" />
                {eyebrow}
              </p>
            ) : null}

            <h1 className="section-title mt-3 max-w-3xl text-white">
              {title}
              {titleAccent ? (
                <>
                  {' '}
                  <span className="text-amber-safety">{titleAccent}</span>
                </>
              ) : null}
            </h1>

            {intro ? (
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-navy-300 sm:text-base">
                {intro}
              </p>
            ) : null}

            {children ? <div className="mt-8">{children}</div> : null}
          </Reveal>
        </div>
      </header>
    </>
  )
}

/**
 * Closing "need this on site" band. Repeated verbatim at the foot of every
 * standalone page so the enquiry path is never more than one click away.
 */
export function CtaBand({ title = 'Need a crane', intro }) {
  const { contacts } = BUSINESS_CONFIG

  return (
    <section aria-labelledby="standalone-cta-heading" className="relative overflow-hidden bg-navy-900 py-16">
      <div className="pointer-events-none absolute inset-0 bg-steel-grid bg-grid opacity-20" aria-hidden="true" />
      <div className="container-kr relative text-center">
        <h2 id="standalone-cta-heading" className="section-title text-white">
          {title} <span className="text-amber-safety">on your site?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-navy-300">
          {intro ??
            'Send us the load weight, working radius and site location. We will recommend the right machine and give you a clear written quotation.'}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/#contact" className="btn-primary">
            Request a Quote
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a
            href={contacts.primaryPhoneLink}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-amber-safety hover:text-amber-safety"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {contacts.primaryPhone}
          </a>
        </div>
      </div>
      <div className="hazard-stripe relative mt-12 opacity-90" aria-hidden="true" />
    </section>
  )
}

export default Breadcrumb