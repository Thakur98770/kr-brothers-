import useReveal from '../hooks/useReveal'

/**
 * Scroll-reveal entrance.
 *
 * `variant` picks the motion (see the `.reveal[data-variant]` rules in
 * index.css): fade-up, fade-down, slide-left, slide-right, scale-in,
 * scale-up, zoom-out, blur-in, lift, swipe-up, tilt-in, fade.
 * `delay` is a millisecond stagger for sibling reveals.
 * `duration` optionally overrides the CSS timing per element.
 */
export function Reveal({
  as: Tag = 'div',
  delay = 0,
  variant = 'fade-up',
  duration,
  className = '',
  children,
  ...rest
}) {
  const ref = useReveal()

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      data-variant={variant}
      style={{
        transitionDelay: `${delay}ms`,
        ...(duration ? { '--reveal-duration': `${duration}ms` } : null),
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Reveal