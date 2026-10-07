import { useCallback, useEffect, useRef } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Keeps Tab focus inside an open overlay and handles Escape.
 * The dialog and the mobile drawer need the same trap, so they share it instead of
 * each keeping their own copy. Attach the returned handler to the panel element.
 *
 * Pass `restore: false` when the caller places focus itself on close - the drawer
 * sends focus to the section you clicked, not back to its toggle.
 */
function useFocusTrap(panelRef, active, { onEscape, restore = true } = {}) {
  const escapeRef = useRef(onEscape)
  escapeRef.current = onEscape

  useEffect(() => {
    if (!active) return undefined
    const opener = document.activeElement

    const raf = requestAnimationFrame(() => {
      const panel = panelRef.current
      const first = panel?.querySelector(FOCUSABLE)
      ;(first ?? panel)?.focus()
    })

    return () => {
      cancelAnimationFrame(raf)
      if (restore && opener instanceof HTMLElement) opener.focus()
    }
  }, [active, panelRef, restore])

  return useCallback(
    (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        escapeRef.current?.()
        return
      }
      if (event.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return

      // getClientRects drops anything display:none, unlike offsetParent which is
      // null for every element inside a position:fixed ancestor.
      const nodes = Array.from(panel.querySelectorAll(FOCUSABLE)).filter(
        (el) => el.getClientRects().length > 0 || el === document.activeElement,
      )
      if (!nodes.length) {
        event.preventDefault()
        return
      }

      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    },
    [panelRef],
  )
}

export default useFocusTrap