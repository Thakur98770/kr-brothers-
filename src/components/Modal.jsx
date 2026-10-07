import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import useScrollLock from '../hooks/useScrollLock'
import useFocusTrap from '../hooks/useFocusTrap'

/**
 * Accessible dialog: portal-rendered, ESC to close, focus trap, restores focus
 * to the trigger on close, locks body scroll, and marks itself aria-modal.
 */
export function Modal({
  isOpen,
  onClose,
  labelledBy,
  describedBy,
  children,
  size = 'lg',
  closeLabel = 'Close dialog',
  className = '',
}) {
  const panelRef = useRef(null)

  useScrollLock(isOpen)

  const onKeyDown = useFocusTrap(panelRef, isOpen, { onEscape: onClose })

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center overflow-y-auto bg-navy-950/80 p-0 backdrop-blur-sm animate-fade-in sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
        onKeyDown={onKeyDown}
        className={`relative w-full ${sizes[size]} animate-scale-in overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl ${className}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full bg-navy-900/85 text-white transition-colors hover:bg-amber-safety hover:text-navy-900"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}

export default Modal