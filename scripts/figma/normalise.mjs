/* One vocabulary for both sides. Every item is reduced to a string, so the
   diff is plain string equality.

   Item keys:
     token --spacing-card    the token's value, resolved to the end
     token bg-nebula/15      a tint: the class kern writes, as the colour it gives
     component Button        "component"
     axis Button.variant     the axis's values, sorted, joined by |
     states Button           the compared states it styles, sorted, joined by |

   A Figma variable is keyed by its code syntax: `var(--x)` is the property,
   anything else (`bg-nebula/15`) is the class the variable stands for. */

import { COMPARED_STATES, PART_PAGES, isPrivateComponent } from "./config.mjs";

export const joinSet = (values) => [...new Set(values)].sort().join("|");
export const round = (n) => String(Math.round(n * 1000) / 1000);
export const axisName = (name) => name.split("#")[0].replace(/\s+/g, "").toLowerCase();

/** The key a Figma variable is compared under. */
export function variableKey(v) {
  const syntax = v.codeSyntax?.WEB?.trim();
  if (!syntax) return `--${v.name.replace(/\//g, "-")}`;
  return syntax.match(/^var\((--[\w-]+)\)$/)?.[1] ?? syntax;
}

const figmaValue = (value) =>
  value && typeof value === "object" && "hex" in value
    ? value.hex.toLowerCase()
    : typeof value === "number"
      ? round(value)
      : String(value);

/** Items from the exported Figma file, aliases followed to their value. */
export function figmaItems(snapshot) {
  const items = {};
  // Aliases resolve by variable id when the snapshot has ids (Figma names are
  // unique only within a collection), and by name for a snapshot without them.
  const vars = snapshot.variables ?? [];
  const byId = Object.fromEntries(vars.filter((v) => v.id).map((v) => [v.id, v]));
  const byName = Object.fromEntries(vars.map((v) => [v.name, v]));
  const resolve = (v, seen = new Set()) => {
    if (v.value && typeof v.value === "object" && "aliasName" in v.value) {
      const target = byId[v.value.aliasId] ?? byName[v.value.aliasName];
      const id = target?.id ?? target?.name;
      if (!target || seen.has(id)) return `unresolved ${v.value.aliasName}`;
      seen.add(id);
      return resolve(target, seen);
    }
    return figmaValue(v.value);
  };
  for (const v of snapshot.variables ?? []) items[`token ${variableKey(v)}`] = resolve(v);

  for (const c of snapshot.components ?? []) {
    if (c.inSet || PART_PAGES.has(c.page) || isPrivateComponent(c.name)) continue;
    items[`component ${c.name}`] = "component";
    for (const p of c.props) {
      if (p.type !== "VARIANT") continue;
      const name = axisName(p.name);
      const options = p.options.map((o) => o.toLowerCase());
      if (name === "state") {
        const states = options.filter((o) => COMPARED_STATES.has(o));
        if (states.length) items[`states ${c.name}`] = joinSet(states);
        continue;
      }
      if (joinSet(options) === "false|true") continue;
      items[`axis ${c.name}.${name}`] = joinSet(options);
    }
  }
  return items;
}
