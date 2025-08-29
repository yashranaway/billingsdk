#!/usr/bin/env node

import { Command } from "commander";
import { initCommand } from "./commands/init.js";
import { addCommand } from "./commands/add.js";
import { buildCommand } from "./commands/build.js";

const program = new Command();

program
  .name("billingsdk")
  .description("Billing SDK CLI for managing billing components")
  .version("1.0.0");

// Register commands
program.addCommand(initCommand);
program.addCommand(addCommand);
program.addCommand(buildCommand);

// Parse arguments
program.parse();
