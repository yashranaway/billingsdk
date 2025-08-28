import { execSync } from "child_process";
import inquirer from "inquirer";
import { buildRegistry } from "../scripts/build-registry.js";
import { addFiles } from "../scripts/add-files.js";

export const handleCommand = async (command: string, args: string[]) => {
    try {
        switch (command) {
            case "init":
                try {
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
                        execSync(`npx shadcn@latest init`, { stdio: "inherit" });
                    } else if (setupType === "framework") {
                        try {
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
                            if (framework === "nextjs") {
                                await addFiles(framework);
                            }
                        } catch (frameworkError) {
                            process.exit(1);
                        }
                    } else {
                        console.log("Skipping additional setup.");
                    }
                } catch (initError) {
                    process.exit(1);
                }
                break;
            case "add":
                try {
                    const component = args[1];
                    if (!component) {
                        console.error("Component name is required");
                        process.exit(1);
                    }
                    const templateUrl = `https://billingsdk.com/r/${component}.json`;
                    try {
                        console.log(`Fetching component template...`);
                        execSync(`npx shadcn@latest add ${templateUrl}`, { stdio: "inherit" });
                    } catch (fetchError) {
                        process.exit(1);
                    }
                } catch (addError) {
                    process.exit(1);
                }
                break;
            case "build":
                try {
                    await buildRegistry();
                } catch (error) {
                    process.exit(1);
                }
                break;
            default:
                console.error(`Unknown command: ${command}`);
                process.exit(1);
        }
    } catch (error) {
        process.exit(1);
    }
}