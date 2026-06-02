import { useState, useEffect, useRef } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  const handle = () => {
    navigator.clipboard.writeText(text).catch((err) => {
      if (import.meta.env.DEV) console.warn('[CopyButton] clipboard write failed', err)
    })
    setCopied(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      onClick={handle}
      aria-label={`Copy ${text}`}
      className="cursor-pointer text-void-50 hover:text-void-90 transition-colors duration-150"
    >
      {copied
        ? <Check className="w-3.5 h-3.5 text-[--primary]" />
        : <Copy className="w-3.5 h-3.5" />}
      <span aria-live="polite" className="sr-only">{copied ? 'Copied' : ''}</span>
    </button>
  )
}
