import BUSINESS_CONFIG from '../config/businessConfig'
import { getIcon } from '../lib/icons'

/**
 * Brand colours per platform. White glyphs on these all clear the 3:1
 * non-text contrast minimum, so the icons stay legible for low-vision users.
 */
const BRAND_CLASS = {
  facebook: 'bg-[#1877F2] hover:bg-[#1259C0] focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_#F59E0B]',
  instagram: 'bg-[#E1306C] hover:bg-[#B72559] focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_#F59E0B]',
  youtube: 'bg-[#E62117] hover:bg-[#B81A12] focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_#F59E0B]',
}

/**
 * Social media icon links.
 *
 * Reads `BUSINESS_CONFIG.activeSocial`, which filters out any platform that
 * still has a blank URL — so adding the links later in the config file is the
 * only step needed to switch an icon on. Renders nothing at all when every
 * platform is still empty, which keeps the layout clean until then.
 *
 * Props:
 *   heading  - optional label above the icons
 *   size     - 'md' (default, 44px targets) or 'sm' (40px targets)
 *   className- wrapper classes
 */
export function SocialLinks({ heading = '', size = 'md', className = '' }) {
  const { brand } = BUSINESS_CONFIG
  const social = BUSINESS_CONFIG.activeSocial

  if (!social.length) return null

  const box = size === 'sm' ? 'h-10 w-10' : 'h-11 w-11'
  const glyph = size === 'sm' ? 'h-4 w-4' : 'h-[1.15rem] w-[1.15rem]'

  return (
    <div className={className}>
      {heading && (
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-navy-300">
          {heading}
        </p>
      )}

      <ul className="mt-3 flex flex-wrap items-center gap-2.5">
        {social.map(({ id, label, href, icon }) => {
          const Icon = getIcon(icon)
          return (
            <li key={id}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} — ${brand.name} (opens in a new tab)`}
                title={label}
                className={`grid ${box} place-items-center rounded-lg text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:outline-none ${BRAND_CLASS[id] ?? 'bg-navy-900 hover:bg-navy-800'}`}
              >
                <Icon className={glyph} aria-hidden="true" />
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SocialLinks