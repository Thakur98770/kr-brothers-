import { useEffect, useRef } from 'react'

const REVEAL_CONFIG = { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }

/**
 * Reveal-on-scroll wrapper.
 * Adds `is-visible` to the returned ref element once it enters the viewport,
 * which triggers the CSS transition defined in `index.css`. Content is made
 * visible immediately when the user prefers reduced motion.
 */
function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible')
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      REVEAL_CONFIG,
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return ref
}

export default useReveal