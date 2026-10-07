import { getIcon } from '../lib/icons'
import BUSINESS_CONFIG from '../config/businessConfig'

/**
 * KR Brothers brand lockup — original equipment-inspired mark.
 * `tone`: 'light' renders for dark backgrounds, 'dark' for light backgrounds.
 */
export function Logo({ tone = 'light', showText = true, showTagline = true, taglineClassName = '', className = '' }) {
  const light = tone === 'light'
  const { brand } = BUSINESS_CONFIG

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border-2 ${
          light
            ? 'border-amber-safety/60 bg-navy-950 text-amber-safety'
            : 'border-navy-900 bg-navy-900 text-amber-safety'
        }`}
      >
        <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true" focusable="false">
          <path
            d="M16 3.5l1.55 5.2a2.6 2.6 0 0 0 1.63 1.63l5.2 1.55-5.2 1.55a2.6 2.6 0 0 0-1.63 1.63L16 20.3l-1.55-5.2A2.6 2.6 0 0 0 12.82 13.5L7.62 11.95l5.2-1.55a2.6 2.6 0 0 0 1.63-1.63z"
            fill="currentColor"
          />
          <rect x="4" y="24" width="24" height="3.6" rx="1.8" fill="currentColor" />
          <rect x="4" y="21" width="5.5" height="3" rx="1" fill="currentColor" opacity=".75" />
          <rect x="22.5" y="21" width="5.5" height="3" rx="1" fill="currentColor" opacity=".75" />
        </svg>
      </span>

      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display text-xl font-extrabold uppercase leading-none tracking-wide sm:text-2xl ${
              light ? 'text-white' : 'text-navy-900'
            }`}
          >
            {brand.nameUpper}
          </span>
          {showTagline && (
            <span
              className={`mt-1 font-mono text-xs font-bold tracking-[0.12em] ${taglineClassName} ${
                light ? 'text-amber-safety' : 'text-amber-deepText'
              }`}
            >
              {brand.tagline}
            </span>
          )}
        </span>
      )}
    </span>
  )
}

/** Compact safety badge used in headers and hero. */
export function SafetyBadge({ className = '' }) {
  const ShieldCheck = getIcon('ShieldCheck')

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-amber-safety/35 bg-amber-safety/10 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-amber-safety ${className}`}
    >
      <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
      Safe Lift Strong Support
    </span>
  )
}

export default Logo