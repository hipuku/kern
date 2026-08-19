/**
 * The focus ring, in one place.
 *
 * This exact string was repeated in six components. Repetition is how a focus
 * treatment quietly diverges: one component gets a ring-offset, another keeps
 * the default outline, and keyboard users meet three different systems. Any
 * interactive element in kern composes this rather than spelling it out.
 *
 * `ring-(--ring)` tracks the semantic role, so an experiment that retints
 * `--ring` in its own `index.css` retints every focus ring kern renders.
 *
 * Note the Tailwind v4 parenthesis syntax: `ring-(--ring)`, never
 * `ring-[--ring]`. The bracket form generates invalid CSS in v4 and is silently
 * dropped.
 */
export const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)'
