/* The code side of the parity check: kern's tokens, its accent tints, and its
   components' variant axes and states.

   Tokens are read from the generated primitives.css and resolved here: every
   value is a hex colour, a px or rem length, or a var() of another token, so
   there is no cascade to apply. A tint is a class Tailwind compiles from a
   colour and an opacity (`bg-nebula/15`); kern writes them literally in
   lib/accent.ts and Button, and each is compared as the colour it gives. */

import fs from "node:fs";
import path from "node:path";
import { COMPARED_TOKEN, CSS_STATES, PATHS } from "./config.mjs";
import { joinSet, round } from "./normalise.mjs";
import {
  axesOf,
  componentFiles,
  cvaVariants,
  paletteKeys,
  statesOf,
  typeAliases,
} from "./variants.mjs";

const ROOT_PX = 16;

/* Props that choose an element, not a look: `as` (the heading level or the
   label element) and `type` (an input's HTML type). Figma has no axis for
   them, rightly. */
const NON_VISUAL_PROPS = new Set(["as", "type"]);
const read = (root, p) => fs.readFileSync(path.join(root, p), "utf8");

/** Every custom property primitives.css declares, unresolved. */
export function declarations(css) {
  const out = {};
  for (const m of css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g))
    out[m[1]] = m[2].trim();
  return out;
}

/** A declared value followed through var() to a hex, a px number, or a string. */
export function resolve(name, decls, seen = new Set()) {
  const v = decls[name];
  if (v === undefined || seen.has(name)) return undefined;
  seen.add(name);
  const alias = v.match(/^var\((--[\w-]+)\)$/);
  if (alias) return resolve(alias[1], decls, seen);
  if (/^#[0-9a-f]{3,8}$/i.test(v)) return v.toLowerCase();
  const len = v.match(/^(-?[\d.]+)(px|rem)$/);
  if (len) return round(Number(len[1]) * (len[2] === "rem" ? ROOT_PX : 1));
  return v;
}

/** `bg-nebula/15` as the colour it compiles to: the token at that opacity. */
export function tintValue(cls, decls) {
  const m = cls.match(/^(?:bg|border|text)-(?:\((--[\w-]+)\)|([a-z]+))\/(\d+)$/);
  if (!m) return undefined;
  const base = resolve(m[1] ?? `--color-${m[2]}`, decls);
  if (!base || !/^#[0-9a-f]{6}$/.test(base)) return undefined;
  return (
    base +
    Math.round((Number(m[3]) / 100) * 255)
      .toString(16)
      .padStart(2, "0")
  );
}

export function codeTokens(root = ".") {
  const decls = declarations(read(root, PATHS.tokens));
  const items = {};
  for (const name of Object.keys(decls).sort())
    if (COMPARED_TOKEN(name)) items[`token ${name}`] = resolve(name, decls);
  for (const src of PATHS.tintSources.map((p) => read(root, p)))
    for (const [cls] of src.matchAll(/(?:bg|border)-(?:\(--[\w-]+\)|[a-z]+)\/\d+/g)) {
      const value = tintValue(cls, decls);
      if (value) items[`token ${cls}`] = value;
    }
  return items;
}

/** Every component file in the tiers, with its axes and compared states. */
export function codeComponents(root = ".") {
  const files = componentFiles(root, PATHS.tiers);
  const sources = files.map((f) => fs.readFileSync(f.file, "utf8"));
  const libSources = ["src/lib/accent.ts", PATHS.tokensSource].map((p) => read(root, p));
  const aliases = typeAliases([...sources, ...libSources]);
  const palette = paletteKeys(read(root, PATHS.tokensSource));
  const cva = Object.assign({}, ...sources.map(cvaVariants));
  /* The text of each cva call, for the states of a component that composes it. */
  const cvaSources = {};
  for (const src of sources)
    for (const m of src.matchAll(/const (\w+)\s*=\s*cva\(([\s\S]*?)\n\);/g))
      cvaSources[m[1]] = m[2];

  const items = {};
  for (const { name, file } of files) {
    if (name === "Icons") continue; // glyphs, compared as Figma's Icons page is not
    items[`component ${name}`] = "component";
    for (const [axis, values] of Object.entries(axesOf(file, name, { aliases, palette, cva })))
      if (
        !NON_VISUAL_PROPS.has(axis) &&
        joinSet(values.map((v) => v.toLowerCase())) !== "false|true"
      )
        items[`axis ${name}.${axis.toLowerCase()}`] = joinSet(values.map((v) => v.toLowerCase()));
    const states = statesOf(
      file,
      cvaSources,
      path.join(root, "src/styles", `${name.toLowerCase()}.css`),
    )
      .map((s) => CSS_STATES[s])
      .filter(Boolean);
    if (states.length) items[`states ${name}`] = joinSet(states);
  }
  return items;
}

export const codeItems = async (root = ".") => ({ ...codeTokens(root), ...codeComponents(root) });
