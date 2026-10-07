import Reveal from './Reveal'

/**
 * Standard section heading block with eyebrow, title and optional lead text.
 * `tone`: 'dark' = for navy backgrounds (white text); default 'light' is for
 * white / slate backgrounds. Make sure this matches the section background.
 */
export function SectionHeading({
  eyebrow,
  title,
  titleAccent,
  lead,
  tone = 'light',
  align = 'center',
  variant = 'fade-up',
  className = '',
  titleSpacing = 'mt-3',
  as: Tag = 'h2',
  headingId,
}) {
  const dark = tone === 'dark'
  const centered = align === 'center'

  return (
    <Reveal
      variant={variant}
      className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}
    >
      {eyebrow && (
        <p
          className={`eyebrow ${dark ? '!text-amber-safety' : ''}`}
        >
          <span
            aria-hidden="true"
            className={`inline-block h-px w-8 ${dark ? 'bg-amber-safety/70' : 'bg-amber-deep/50'}`}
          />
          {eyebrow}
        </p>
      )}

      <Tag
        id={headingId}
        className={`section-title ${titleSpacing} ${dark ? 'text-white' : 'text-navy-900'}`}
      >
        {title}
        {/* The space is required: without it the two halves render as one
            run-on word ("Why ChooseKR Brothers?"). Below `sm` the accent is a
            block, so the space collapses harmlessly at the end of the line. */}
        {titleAccent && (
          <>
            {' '}
            <span className={`block sm:inline ${dark ? 'text-amber-safety' : 'text-amber-deepText'}`}>
              {titleAccent}
            </span>
          </>
        )}
      </Tag>

      {lead && (
        <p
          className={`mt-4 text-[15px] leading-relaxed sm:text-base ${
            dark ? 'text-navy-300' : 'text-navy-600'
          }`}
        >
          {lead}
        </p>
      )}
    </Reveal>
  )
}

export default SectionHeading