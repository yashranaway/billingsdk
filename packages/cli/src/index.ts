#!/usr/bin/env node

import { handleCommand } from "./commands/index.js";

const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  console.log("Usage: billingsdk <command> [args]");
  process.exit(1);
}

if (args.includes("--help") || args.length === 0) {
  console.log("Usage: billingsdk <command>");
  console.log("Commands:");
  console.log("  add <component>  - Adds a new component to the project");
  process.exit(0);
}

handleCommand(command, args);
