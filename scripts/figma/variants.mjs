/* Variant axes and interaction states, read from a component's source.

   A kern component takes its axes one of two ways. Props typed as a string
   union, inline or through a type alias (`colour: AccentColour`), where an
   alias may name other aliases and `keyof typeof palette` names the palette's
   accents. Or class-variance-authority: `VariantProps<typeof buttonVariants>`
   gives the keys of that cva call's `variants`, and a component composing
   another's variants (IconButton over buttonVariants) takes them from there.
   Booleans are not compared: in Figma they are as often layer toggles. */

import fs from "node:fs";
import path from "node:path";

const strip = (src) => src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

/** Every type alias in the given sources, as the raw right-hand side. */
export function typeAliases(sources) {
  const raw = {};
  for (const src of sources) {
    const joined = strip(src).replace(/\n\s*\|/g, " |");
    for (const m of joined.matchAll(/^(?:export )?type (\w+)\s*=\s*([^;\n]+);?/gm))
      raw[m[1]] = m[2].trim();
  }
  return raw;
}

/** The palette's accent names, for `keyof typeof palette`. */
export function paletteKeys(tokensSrc) {
  const m = tokensSrc.match(/export const palette\s*=\s*\{([\s\S]*?)\n\}/);
  return m ? [...m[1].matchAll(/^\s{2}(\w+)\s*:/gm)].map((x) => x[1]) : [];
}

/** A type expression as its string values, or null when it is not a string union. */
export function unionValues(type, aliases, palette, depth = 0) {
  if (depth > 8) return null;
  const parts = type
    .split("|")
    .map((t) => t.trim())
    .filter(Boolean);
  const values = [];
  for (const t of parts) {
    const lit = t.match(/^["']([^"']*)["']$/);
    if (lit) values.push(lit[1]);
    else if (/^keyof typeof palette$/.test(t)) values.push(...palette);
    else if (aliases[t]) {
      const inner = unionValues(aliases[t], aliases, palette, depth + 1);
      if (!inner) return null;
      values.push(...inner);
    } else return null;
  }
  return values.length > 1 ? values : null;
}

/** The variants of each cva call in a source: { name: { axis: [values] } }. */
export function cvaVariants(src) {
  const out = {};
  for (const m of src.matchAll(/const (\w+)\s*=\s*cva\(/g)) {
    const start = src.indexOf("variants:", m.index);
    if (start < 0) continue;
    let i = src.indexOf("{", start);
    const open = i;
    let depth = 0;
    for (; i < src.length; i++) {
      if (src[i] === "{") depth++;
      else if (src[i] === "}" && --depth === 0) break;
    }
    // Class strings carry colons (`hover:bg-...`), so string contents go first.
    const body = strip(src.slice(open + 1, i)).replace(/(["'`])(?:\\.|(?!\1)[^\\])*\1/g, '""');
    const axes = {};
    // Top-level keys of `variants`, then the top-level keys of each.
    let d = 0;
    let key = null;
    let values = [];
    const tokens = body.matchAll(/(\{|\}|([\w-]+)\s*:)/g);
    for (const t of tokens) {
      if (t[1] === "{") {
        if (d === 0) values = [];
        d++;
      } else if (t[1] === "}") {
        d--;
        if (d === 0 && key) axes[key] = values;
      } else if (d === 0) {
        key = t[2];
      } else if (d === 1) values.push(t[2]);
    }
    out[m[1]] = axes;
  }
  return out;
}

/** The axes of the component in `file`. */
export function axesOf(file, name, { aliases, palette, cva }) {
  const src = strip(fs.readFileSync(file, "utf8"));
  const axes = {};
  const iface = src.match(new RegExp(`interface\\s+${name}Props\\b([^{]*)\\{([\\s\\S]*?)\\n\\}`));
  if (iface) {
    const variantProps = [...iface[1].matchAll(/VariantProps<typeof (\w+)>/g)].map((x) => x[1]);
    const omitted = new Set(
      [...iface[1].matchAll(/Omit<\w+,\s*([^>]+)>/g)].flatMap((x) =>
        x[1].split("|").map((s) => s.trim().replace(/["']/g, "")),
      ),
    );
    // ButtonProps-style inheritance: Omit<ButtonProps, ...> brings Button's cva.
    for (const base of iface[1].matchAll(/(?:Omit<)?(\w+)Props\b/g)) {
      if (base[1] !== name && cva[`${base[1].charAt(0).toLowerCase()}${base[1].slice(1)}Variants`])
        variantProps.push(`${base[1].charAt(0).toLowerCase()}${base[1].slice(1)}Variants`);
    }
    for (const v of variantProps)
      for (const [axis, values] of Object.entries(cva[v] ?? {}))
        if (!omitted.has(axis)) axes[axis] = values;
    for (const line of iface[2].split("\n")) {
      const p = line.match(/^\s*(\w+)\??\s*:\s*(.+?);?\s*$/);
      if (!p) continue;
      const values = unionValues(p[2], aliases, palette);
      if (values) axes[p[1]] = values;
    }
  }
  return axes;
}

/** States a component styles, from Tailwind variant prefixes in its source and
    in the cva of anything it composes. */
export function statesOf(file, cvaSources, stylesheet) {
  let src = strip(fs.readFileSync(file, "utf8"));
  for (const [name, body] of Object.entries(cvaSources))
    if (new RegExp(`\\b${name}\\b`).test(src) && !src.includes(`const ${name}`)) src += body;
  // A negation excludes rather than styles.
  src = src.replace(/not-\[[^\]]*\]:/g, "");
  const found = new Set();
  // A Tailwind variant prefix sits at the start of a class, or after another
  // variant (`motion-safe:hover:`), and before the utility. `active: boolean` in an interface is not one.
  for (const m of src.matchAll(/(?:^|[\s"'`:])(hover|active|disabled):[\w[(!-]/g)) found.add(m[1]);
  // A component drawn by a hand-written stylesheet (Logo, in styles/logo.css).
  if (stylesheet && fs.existsSync(stylesheet)) {
    const css = fs.readFileSync(stylesheet, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
    for (const m of css.matchAll(/:(hover|active|disabled)\b/g)) found.add(m[1]);
  }
  return [...found];
}

export const componentFiles = (root, tiers) =>
  tiers.flatMap((dir) =>
    fs
      .readdirSync(path.join(root, dir))
      .filter((f) => /^[A-Z]\w*\.tsx$/.test(f) && !/\.(stories|test)\.tsx$/.test(f))
      .map((f) => ({ name: f.replace(/\.tsx$/, ""), file: path.join(root, dir, f) })),
  );
