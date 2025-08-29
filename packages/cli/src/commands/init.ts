import { Command } from "commander";
import inquirer from "inquirer";
import { addFiles } from "../scripts/add-files.js";

export const initCommand = new Command()
  .name("init")
  .description("Initialize a new billing project")
  .summary("Set up billing components and framework integration")
  .action(async () => {
    try { 
        const { framework } = await inquirer.prompt([{
          type: "list",
          name: "framework",
          message: "Which framework would you like to use? (Adding more frameworks soon)",
          choices: [
            { name: "Next.js", value: "nextjs" },
          ]
        }]);

        const { provider } = await inquirer.prompt([{
          type: "list",
          name: "provider",
          message: "Which provider would you like to use? (Adding more providers soon)",
          choices: [
            { name: "Dodopayments", value: "dodopayments" },
          ]
        }]);

        await addFiles(framework, provider);
        console.log("Framework setup completed successfully!");
    } catch (error) {
      console.error("Error during initialization");
      process.exit(1);
    }
  });
