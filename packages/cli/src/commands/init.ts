import { Command } from "commander";
import inquirer from "inquirer";
import { execSync } from "child_process";
import { addFiles } from "../scripts/add-files.js";

export const initCommand = new Command()
  .name("init")
  .description("Initialize a new billing project")
  .summary("Set up billing components and framework integration")
  .action(async () => {
    try {
      const { setupType } = await inquirer.prompt([{
        type: "list",
        name: "setupType",
        message: "What would you like to set up?",
        choices: [
          { name: "UI Components (shadcn/ui)", value: "ui" },
          { name: "Framework Setup", value: "framework" },
        ]
      }]);

      if (setupType === "ui") {
        console.log("Initializing UI components...");
        execSync(`npx shadcn@latest init`, { stdio: "inherit" });
      } else if (setupType === "framework") {
        const { framework } = await inquirer.prompt([{
          type: "list",
          name: "framework",
          message: "Which framework would you like to use?",
          choices: [
            { name: "Next.js", value: "nextjs" },
          ]
        }]);

        const { provider } = await inquirer.prompt([{
          type: "list",
          name: "provider",
          message: "Which provider would you like to use?",
          choices: [
            { name: "Dopayments", value: "dodopayments" },
          ]
        }]);

        await addFiles(framework, provider);
        console.log("Framework setup completed successfully!");
      } else {
        console.log("Setup cancelled.");
      }
    } catch (error) {
      console.error("Error during initialization");
      process.exit(1);
    }
  });
