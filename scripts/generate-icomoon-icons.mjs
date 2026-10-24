#!/usr/bin/env node
// Reads `icomoon/selection.json` (the IcoMoon project file — re-import it at
// https://icomoon.io/app to keep editing the same icon set) and writes the
// typed `IcomoonIconName` union consumed by `IcomoonIcon`. Run via
// `npm run icons:generate` any time selection.json changes. Plain Node ESM,
// no build step and no new dependency — see icomoon/README.md for the full
// workflow (exporting the SVG sprite, regenerating this file).

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(SCRIPT_DIR, "..");
export const SELECTION_PATH = join(ROOT_DIR, "icomoon", "selection.json");
export const OUTPUT_PATH = join(ROOT_DIR, "src", "components", "atoms", "IcomoonIcon", "icomoon-icon-names.generated.ts");

const GENERATED_HEADER = `// GENERATED FILE — do not edit by hand.
// Regenerate with \`npm run icons:generate\` after updating icomoon/selection.json
// (re-import that file at https://icomoon.io/app to keep editing the same icon set).
`;

/** Pure: the icon names declared in a parsed `selection.json`, deduplicated and sorted for a stable diff. */
export function extractIconNames(selection) {
  const icons = Array.isArray(selection?.icons) ? selection.icons : [];
  const names = icons.map((icon) => icon?.properties?.name).filter((name) => typeof name === "string" && name.length > 0);
  return [...new Set(names)].sort();
}

/** Pure: the generated TypeScript source for a given (deduplicated, sorted) icon name list. */
export function buildGeneratedFileContent(names) {
  if (names.length === 0) {
    return `${GENERATED_HEADER}
/** No custom icons exported yet — add some in the IcoMoon app, re-export, then run \`npm run icons:generate\` again. */
export type IcomoonIconName = never;

export const ICOMOON_ICON_NAMES: readonly IcomoonIconName[] = [];
`;
  }

  return `${GENERATED_HEADER}
export type IcomoonIconName =
${names.map((name) => `  | "${name}"`).join("\n")};

export const ICOMOON_ICON_NAMES: readonly IcomoonIconName[] = [
${names.map((name) => `  "${name}",`).join("\n")}
];
`;
}

function main() {
  const raw = readFileSync(SELECTION_PATH, "utf8");
  const selection = JSON.parse(raw);
  const names = extractIconNames(selection);
  writeFileSync(OUTPUT_PATH, buildGeneratedFileContent(names));
  console.log(`icons:generate — wrote ${names.length} icon name(s) to ${OUTPUT_PATH}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
