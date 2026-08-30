import { useState, useEffect, useRef } from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '../lib/utils'
import { Button, type ButtonProps } from './Button'

export interface CopyButtonProps extends Omit<ButtonProps, 'children' | 'onClick' | 'aria-label'> {
  /** The string written to the clipboard. Also names the control. */
  text: string
  /** How long the confirmed state shows, in milliseconds. */
  feedbackMs?: number
}

/**
 * Copies a string to the clipboard and confirms it did.
 *
 * The confirmation is announced as well as drawn: the icon swap is invisible to
 * a screen reader, so the live region carries the word. The timeout is cleared
 * on unmount so a component that disappears mid-feedback cannot set state on a
 * dead component.
 */
export function CopyButton({ text, feedbackMs = 1500, className, ...props }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      // Clipboard access is refused in insecure contexts and when the user
      // denies permission. Neither is exceptional, and neither should surface
      // a false confirmation, so bail before setting the copied state.
      if (import.meta.env.DEV) console.warn('[CopyButton] clipboard write failed', err)
      return
    }
    setCopied(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setCopied(false), feedbackMs)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      aria-label={copied ? `Copied ${text}` : `Copy ${text}`}
      className={cn('p-0 text-ink-muted hover:bg-transparent', className)}
      {...props}
    >
      {copied
        ? <Check className="w-3.5 h-3.5 text-(--primary)" />
        : <Copy className="w-3.5 h-3.5" />}
      <span aria-live="polite" className="sr-only">{copied ? 'Copied' : ''}</span>
    </Button>
  )
}
