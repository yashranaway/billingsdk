import { Command } from "commander";
import { execFileSync } from "child_process";
import { getInstaller } from "../utils/pm.js";

function isValidComponentName(value: string): boolean {
  // allow letters, numbers, hyphen, slash, and underscore only
  // matches known registry ids like pricing-table/one, usage_meter, etc.
  return /^[A-Za-z0-9-_\/]+$/.test(value);
}
export const addCommand = new Command()
  .name("add")
  .description("Add a billing component to your project")
  .summary("Install and configure billing components")
  .argument("<component>", "Name of the component to add")
  .action(async (component) => {
    try {
      if (!component) {
        console.error("Component name is required");
        console.error("Usage: billingsdk add <component>");
        process.exit(1);
      }

      if (!isValidComponentName(component)) {
        console.error("Invalid component name. Use only letters, numbers, '-', '_', and '/'.");
        process.exit(1);
      }

      const templateRegistry = `@billingsdk/${component}.json`;
      const { cmd, args } = getInstaller("dlx");
      const finalArgs = [...args, "shadcn@latest", "add", templateRegistry];
      execFileSync(cmd, finalArgs, { stdio: "inherit" });
    } catch (error) {
      // console.error(`Failed to add component "${component}"`,);
      process.exit(1);
    }
  });
