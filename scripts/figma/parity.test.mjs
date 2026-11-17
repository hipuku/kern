import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { diff } from "./diff.mjs";
import { figmaItems, variableKey } from "./normalise.mjs";
import { axesOf, cvaVariants, paletteKeys, statesOf, unionValues } from "./variants.mjs";
import { declarations, resolve, tintValue } from "./code.mjs";

const tmp = (name, body) => {
  const p = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "parity-")), name);
  fs.writeFileSync(p, body);
  return p;
};

describe("tokens", () => {
  const decls = declarations(
    "@theme { --color-pulsar: #7193ED; --spacing-card: 0.75rem; --radius-pill: 9999px; } :root { --primary: var(--color-pulsar); }",
  );

  it("follows var() and turns rem into px", () => {
    expect(resolve("--primary", decls)).toBe("#7193ed");
    expect(resolve("--spacing-card", decls)).toBe("12");
    expect(resolve("--radius-pill", decls)).toBe("9999");
  });

  it("reads a tint class as the colour it compiles to", () => {
    expect(tintValue("bg-pulsar/15", decls)).toBe("#7193ed26");
    expect(tintValue("border-(--primary)/40", decls)).toBe("#7193ed66");
  });
});

describe("figmaItems", () => {
  it("keys a variable by its property, or by the class it stands for", () => {
    expect(variableKey({ codeSyntax: { WEB: "var(--line)" } })).toBe("--line");
    expect(variableKey({ codeSyntax: { WEB: "bg-nebula/15" } })).toBe("bg-nebula/15");
  });

  it("follows an alias by Figma name, and skips parts, icons and booleans", () => {
    const items = figmaItems({
      variables: [
        {
          name: "color/pulsar/base",
          codeSyntax: { WEB: "var(--color-pulsar)" },
          value: { hex: "#7193ED" },
        },
        {
          name: "accent/primary",
          codeSyntax: { WEB: "var(--primary)" },
          value: { alias: "--color-pulsar", aliasName: "color/pulsar/base" },
        },
      ],
      components: [
        {
          name: "Card",
          page: "-> Card",
          inSet: false,
          props: [{ name: "Padding", type: "VARIANT", options: ["md", "sm"] }],
        },
        { name: "lucide/x", page: "-> Icons", inSet: false, props: [] },
        { name: "AppSidebar/NavItem", page: "-> AppSidebar", inSet: false, props: [] },
        {
          name: "SocialBar",
          page: "-> SocialBar",
          inSet: false,
          props: [{ name: "GitHub", type: "VARIANT", options: ["true", "false"] }],
        },
      ],
    });
    expect(items["token --primary"]).toBe("#7193ed");
    expect(Object.keys(items).filter((k) => !k.startsWith("token"))).toEqual([
      "component Card",
      "axis Card.padding",
      "component SocialBar",
    ]);
  });
});

describe("variants", () => {
  it("expands aliases and keyof typeof palette", () => {
    const aliases = { AccentName: "keyof typeof palette", AccentColour: 'AccentName | "neutral"' };
    expect(unionValues("AccentColour", aliases, ["nebula", "pulsar"])).toEqual([
      "nebula",
      "pulsar",
      "neutral",
    ]);
    expect(
      paletteKeys("export const palette = {\n  nebula: {},\n  pulsar: {},\n} as const;"),
    ).toEqual(["nebula", "pulsar"]);
  });

  it("reads cva variant keys, ignoring colons inside class strings", () => {
    const src =
      'const buttonVariants = cva("base", {\n  variants: {\n    variant: { surface: "hover:bg-x", accent: "a" },\n    size: { sm: "p-1", md: "p-2" },\n  },\n});';
    expect(cvaVariants(src)).toEqual({
      buttonVariants: { variant: ["surface", "accent"], size: ["sm", "md"] },
    });
  });

  it("keeps a quoted cva key", () => {
    const src =
      'const chipVariants = cva("b", {\n  variants: {\n    size: { "icon-sm": "p-1", md: "p-2" },\n  },\n});';
    expect(cvaVariants(src)).toEqual({ chipVariants: { size: ["icon-sm", "md"] } });
  });

  it("finds Tailwind state prefixes, stacked ones included, and not a prop named active", () => {
    const file = tmp(
      "X.tsx",
      'interface XProps { active: boolean }\nconst c = "motion-safe:hover:scale-125 disabled:opacity-50";',
    );
    expect(statesOf(file, {}).sort()).toEqual(["disabled", "hover"]);
  });
});

describe("multi-line props", () => {
  it("reads a prop whose union Prettier wrapped onto several lines", () => {
    const file = tmp("Chip.tsx", 'interface ChipProps {\n  size?:\n    | "sm"\n    | "md";\n}\n');
    expect(axesOf(file, "Chip", { aliases: {}, palette: [], cva: {} })).toEqual({
      size: ["sm", "md"],
    });
  });
});

describe("diff", () => {
  it("fails code ahead of Figma, and figma-later waives it", () => {
    const args = {
      code: { "token --a": "14" },
      figma: { "token --a": "12" },
      baseline: { "token --a": { code: "12", figma: "12" } },
    };
    expect(diff(args).failing).toHaveLength(1);
    expect(diff({ ...args, figmaLater: true }).failing).toHaveLength(0);
  });
});
