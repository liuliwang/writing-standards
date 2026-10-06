#!/usr/bin/env node
/**
 * writing-standards installer
 * Copies skills/writing-standards/ from this package into the local
 * OpenCode-compatible skills directory. Zero dependencies.
 *
 * Usage:
 *   npx writing-standards            install/refresh (default ~/.agents/skills)
 *   npx writing-standards --dir PATH install into a custom skills root
 */
const fs = require("fs");
const path = require("path");
const os = require("os");

const SOURCE = path.join(__dirname, "..", "skills", "writing-standards");
const DEFAULT_TARGET_ROOT = path.join(os.homedir(), ".agents", "skills");
const pkg = require("../package.json");

function parseArgs(argv) {
  const args = { dir: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--dir" && argv[i + 1]) {
      args.dir = argv[i + 1];
      i++;
    } else if (argv[i] === "--help" || argv[i] === "-h") {
      args.help = true;
    }
  }
  return args;
}

function expandTilde(p) {
  return p.replace(/^~(?=\/|\\|$)/, os.homedir());
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(
      "Usage: npx writing-standards [--dir <skills-root>]\n" +
        "  default skills-root: ~/.agents/skills"
    );
    return;
  }
  if (!fs.existsSync(path.join(SOURCE, "SKILL.md"))) {
    console.error("Error: SKILL.md not found in package - package is broken.");
    process.exit(1);
  }
  const targetRoot = args.dir
    ? path.resolve(expandTilde(args.dir))
    : DEFAULT_TARGET_ROOT;
  const target = path.join(targetRoot, "writing-standards");
  copyDir(SOURCE, target);
  console.log(`writing-standards v${pkg.version} installed -> ${target}`);
  console.log(
    "Invoke the skill in OpenCode with @writing-standards (restart OpenCode if the skill does not appear)."
  );
}

main();
