/**
 * kern's public API.
 *
 * Everything importable from `kern` is named here, and nothing else is
 * supported. Before this file existed there was no API surface at all:
 * consumers deep-imported `@kern/atoms/ToggleChip`, which made every file path
 * in the library a public contract and meant no file could be renamed or moved
 * without breaking an experiment. `ErrorBoundary` moving from `organisms/` to
 * `utils/` in this release would have been a breaking change under that model;
 * through this barrel it is invisible.
 *
 * Import from the package root:
 *
 *   import { AppShell, ToggleChip, type AccentColour } from 'kern'
 *
 * Layer barrels (`kern/atoms`, `kern/molecules`, …) exist too, for when a
 * consumer wants to be explicit about which tier it is reaching into.
 */

// ─── Tokens ──────────────────────────────────────────────────────────────────
// The token source, for programmatic access to palette and scale values —
// building a colour picker from the palette, driving a canvas with the accents.
export {
  palette,
  accentNames,
  voidScale,
  typeScale,
  typeRoles,
  fonts,
  spacing,
  easing,
  duration,
  semanticRoles,
  bodyTypeRole,
  type AccentName,
  type ColourRamp,
  type VoidStep,
  type TypeStyle,
  type TypeRole,
  type SpacingStep,
  type EasingName,
  type DurationName,
  type SemanticRole,
} from './tokens/tokens'

// ─── Foundations ─────────────────────────────────────────────────────────────
export { cn } from './lib/utils'
export { focusRing } from './lib/focus'
export {
  accentColours,
  accentText,
  accentTint,
  accentTextHover,
  type AccentColour,
} from './lib/accent'

// ─── Atoms ───────────────────────────────────────────────────────────────────
export * from './atoms'

// ─── Molecules ───────────────────────────────────────────────────────────────
export * from './molecules'

// ─── Organisms ───────────────────────────────────────────────────────────────
export * from './organisms'

// ─── Templates ───────────────────────────────────────────────────────────────
export * from './templates'

// ─── Utilities ───────────────────────────────────────────────────────────────
export * from './utils'
