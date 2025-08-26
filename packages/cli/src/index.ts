#!/usr/bin/env node

import { argv } from "process";

const [,, ...args] = argv;

if (args.includes("--help") || args.length === 0) {
  console.log("Usage: my-cli <command>");
  console.log("Commands:");
  console.log("  greet <name>  - Greets the user");
  process.exit(0);
}

if (args[0] === "greet" && args[1]) {
  console.log(`Hello, ${args[1]}!`);
} else {
  console.log("Unknown command. Try --help");
}
