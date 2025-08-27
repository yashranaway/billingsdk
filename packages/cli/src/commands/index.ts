import { execSync } from "child_process";
import inquirer from "inquirer";

export const handleCommand = async (command: string, args: string[]) => {
    switch (command) {
        case "init":
            const { setupType } = await inquirer.prompt([
                {
                    type: "list",
                    name: "setupType",
                    message: "What would you like to set up?",
                    choices: [
                        { name: "UI Components (shadcn/ui)", value: "ui" },
                        { name: "Framework Setup", value: "framework" },
                    ]
                }
            ]);

            if (setupType === "ui") {
                console.log("Initializing UI components...");
                execSync(`npx shadcn init`, { stdio: "inherit" });
            } else if (setupType === "framework") {
                const { framework } = await inquirer.prompt([
                    {
                        type: "list",
                        name: "framework",
                        message: "Which framework would you like to use?",
                        choices: [
                            { name: "Express.js", value: "express" },
                            { name: "Next.js", value: "nextjs" },
                            { name: "React.js", value: "reactjs" }
                        ]
                    }
                ]);

                console.log(`Selected framework: ${framework}`);
                // Add framework-specific initialization logic here
            } else {
                console.log("Skipping additional setup.");
            }
            break;
        case "add":
            const component = args[1];
            if (!component) {
                console.error("Component name is required");
                process.exit(1);
            }
            const templateUrl = `https://billingsdk.com/r/${component}.json`;
            try {
                console.log(`Fetching component template...`);
                execSync(`npx shadcn add ${templateUrl}`, { stdio: "inherit" });
            } catch (error) {
                console.error(`Failed to fetch component template: ${error}`);
                process.exit(1);
            }
            break;
        default:
            console.error(`Unknown command: ${command}`);
            process.exit(1);
    }
}