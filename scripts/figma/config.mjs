/* What the Figma parity check compares, and where each side lives.

   kern's Figma file holds the variables (kern/primitives, kern/roles and
   kern/scale), a page per component, and pages of icons and consumers. The
   icons are glyphs, not components with props, and the consumer screens are
   compositions, so neither is compared. kern/roles has a mode per tool; the
   default mode is kern's own and is the one compared. The tool modes mirror
   each tool's index.css, which lives in the tools' repositories. */

export const FIGMA_FILE = { key: "2a7GqQcIxWB3UErg9q4bC6", name: "kern" };

export const PATHS = {
  /* The generated token stylesheet: tokens.ts is its source. */
  tokens: "src/styles/primitives.css",
  /* Where the accent tints and the primary chrome opacities are written as the
     literal classes Tailwind compiles. */
  tintSources: ["src/lib/accent.ts", "src/atoms/Button.tsx"],
  /* The accent palette, for `keyof typeof palette`. */
  tokensSource: "src/tokens/tokens.ts",
  tiers: ["src/atoms", "src/molecules", "src/organisms", "src/templates", "src/utils"],
  snapshot: "figma/snapshot/kern.json",
  baseline: "figma/baseline.json",
  exceptions: "figma/exceptions.json",
};

/* Custom properties Figma holds as variables: the palette, the roles and the
   scale. The theme's bridge names (`--color-surface-page: var(--surface-page)`)
   only expose roles to Tailwind, and type, motion and breakpoints are drawn as
   text styles and specs rather than variables, so they are not compared. */
export const COMPARED_TOKEN = (name) =>
  /^--color-(void-\d+|[a-z]+(-dark|-light)?)$/.test(name) &&
  !/^--color-(surface|ink|line|background|foreground|primary|ring|link)/.test(name)
    ? true
    : /^--(surface|ink|line|background|foreground|primary|ring|link|spacing|radius)(-|$)/.test(
        name,
      );

/* States in Tailwind's variant prefixes, in the words Figma's `State` axis
   uses. Focus is not compared: every interactive element composes the one
   focusRing from lib/focus.ts. */
export const CSS_STATES = { hover: "hover", active: "pressed", disabled: "disabled" };
export const COMPARED_STATES = new Set(Object.values(CSS_STATES));

/* Pages whose components are not kern's components. */
export const PART_PAGES = new Set(["-> Icons", "Consumers"]);

/* A leading underscore or dot, or a slash (`AppSidebar/NavItem`), marks a part. */
export const isPrivateComponent = (name) =>
  name.startsWith("_") || name.startsWith(".") || name.includes("/");
