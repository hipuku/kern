import type { ReactNode } from 'react'

export interface ViewportGateProps {
  /** The app. Shown only at the `lg` breakpoint and above. */
  children: ReactNode
  /**
   * Shown *instead* of the app below `lg`. Defaults to a plain desktop-only
   * message; pass your own node for on-brand copy. It is placed centred on a
   * full-height page — supply just the content, not the layout.
   */
  notice?: ReactNode
}

/**
 * A desktop-only gate: the app at `lg`+, a notice below it.
 *
 * These tools are built for a wide canvas, not a phone. Rather than each one
 * degrading its layout — or kern carrying a responsive collapse it does not want
 * — the whole app is gated: below `lg`, the viewer gets a short "come back on a
 * desktop" message in place of the interface.
 *
 * **Pure CSS, on purpose.** The switch is `lg:` / `max-lg:`, not a `matchMedia`
 * read in state. There is no resize listener to leak, no flash of the wrong
 * branch on first paint, and it works before hydration — the browser simply
 * paints whichever branch the current width selects. Both branches are always in
 * the DOM; the hidden one is display-none, not unmounted.
 */
export function ViewportGate({ children, notice }: ViewportGateProps) {
  return (
    <>
      {/* The app — `contents` so this wrapper adds no box around a full-height layout. */}
      <div className="hidden lg:contents">{children}</div>

      {/* The small-screen notice. */}
      <div className="lg:hidden min-h-screen flex items-center justify-center bg-background text-foreground p-8">
        {notice ?? (
          <div className="flex flex-col gap-2 text-center max-w-xs">
            <p className="type-h4 text-ink-title">Desktop only, for now</p>
            <p className="type-p-sm text-ink-body">
              This tool needs a wider screen. Open it on a desktop, or widen your window.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
