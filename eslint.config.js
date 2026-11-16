import js from "@eslint/js";
import globals from "globals";
import jsxA11y from "eslint-plugin-jsx-a11y-x";
import reactHooks from "eslint-plugin-react-hooks";
import storybook from "eslint-plugin-storybook";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

/**
 * kern was the only project in the portfolio without a lint config; the three
 * tools each had one. This matches their setup, minus react-refresh
 * (kern ships no app, so the fast-refresh boundary rules do not apply) and plus
 * the Storybook plugin, since most of this repo is stories.
 */
export default defineConfig([
  globalIgnores(["storybook-static", "src/styles/*.css"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      storybook.configs["flat/recommended"],
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    // The recommended accessibility set. eslint-plugin-jsx-a11y does not support
    // ESLint 10, so this is its maintained fork, as in drift.
    files: ["src/**/*.tsx"],
    ...jsxA11y.configs.recommended,
    rules: { ...jsxA11y.configs.recommended.rules },
  },
  {
    // An effect or callback that reads a value it does not list goes stale
    // silently, so a missing dependency fails rather than warns.
    files: ["**/*.{ts,tsx}"],
    rules: { "react-hooks/exhaustive-deps": "error" },
  },
  // Atomic tiers, one direction of dependency only (DESIGN.md, Component
  // hierarchy). Stories and tests are documentation and may compose upwards.
  // Patterns are matched against the import string, not the resolved file, so
  // each tier is banned at any depth of ../ as the barrel ("../molecules") or
  // anything inside it ("../../molecules/Field"). Anchored to the leading
  // ../ so src/lib/utils is not mistaken for the utils tier.
  {
    files: ["src/atoms/**/*.{ts,tsx}"],
    ignores: ["**/*.stories.tsx", "**/*.test.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["@/*"], message: "Imports inside kern are relative, never @/." },
            {
              regex: "^(\\.\\./)+(molecules|organisms|templates|utils)(/|$)",
              message: "Atoms depend on tokens and src/lib only.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/molecules/**/*.{ts,tsx}"],
    ignores: ["**/*.stories.tsx", "**/*.test.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["@/*"], message: "Imports inside kern are relative, never @/." },
            {
              regex: "^(\\.\\./)+(organisms|templates)(/|$)",
              message: "Molecules compose atoms, not organisms or templates.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/organisms/**/*.{ts,tsx}"],
    ignores: ["**/*.stories.tsx", "**/*.test.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["@/*"], message: "Imports inside kern are relative, never @/." },
            {
              regex: "^(\\.\\./)+(templates)(/|$)",
              message: "Organisms do not import templates.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/lib/**/*.{ts,tsx}"],
    ignores: ["**/*.stories.tsx", "**/*.test.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["@/*"], message: "Imports inside kern are relative, never @/." },
            {
              regex: "^(\\.\\./)+(atoms|molecules|organisms|templates|utils)(/|$)",
              message: "src/lib holds foundations components compose; it imports no component.",
            },
          ],
        },
      ],
    },
  },
  {
    // Stories are documentation. Render functions there legitimately use hooks
    // to drive interactive examples, which is not a component boundary the
    // rules-of-hooks lint can recognise.
    files: ["**/*.stories.tsx"],
    rules: {
      "react-hooks/rules-of-hooks": "off",
      // Placeholder handlers in story args exist to declare a signature, so
      // their parameters are deliberately unused. The leading underscore is the
      // convention for that everywhere else in the config's defaults.
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  {
    // The generator runs in Node and imports the TypeScript token source.
    files: ["scripts/**/*.mjs"],
    languageOptions: {
      globals: globals.node,
    },
  },
]);
