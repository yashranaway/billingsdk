import { execSync } from "child_process";

export const handleCommand = (command: string, args: string[]) => {
    switch (command) {
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