import path from "path";
import fs from "fs";
import { Result } from "../types/registry.js";
import inquirer from "inquirer";
import { execSync } from "child_process";

export const addFiles = async (framework: "nextjs" | "express", provider: "dopayments") => {
    const result = await fetch(`https://billingsdk.com/tr/${framework}-${provider}.json`)
        .then(res => res.json()) as Result;
    let srcExists = fs.existsSync(path.join(process.cwd(), "src"));
    const addToPath = srcExists ? "src" : "";

    for (const file of result.files) {
        const filePath = path.join(process.cwd(), addToPath, file.target);
        const dirPath = path.dirname(filePath);
        const relativePath = addToPath ? path.join(addToPath, file.target) : file.target;

        try {
            fs.mkdirSync(dirPath, { recursive: true });
            const fileName = path.basename(file.target);

            if (fs.existsSync(filePath)) {
                if (fileName === '.env.example') {
                    const existingContent = fs.readFileSync(filePath, 'utf8');
                    const newContent = existingContent + '\n' + file.content + '\n';
                    fs.writeFileSync(filePath, newContent);
                    console.log(`File ${relativePath} updated (content appended)`);
                } else {
                    const overwrite = await inquirer.prompt([
                        {
                            type: "confirm",
                            name: "overwrite",
                            message: `File ${relativePath} already exists. Do you want to overwrite it?`,
                        },
                    ]);
                    if (overwrite.overwrite) {
                        fs.writeFileSync(filePath, file.content);
                        console.log(`File ${relativePath} added`);
                    } else {
                        console.log(`File ${relativePath} not added`);
                    }
                }
            } else {
                fs.writeFileSync(filePath, file.content);
                console.log(`File ${relativePath} added`);
            }
        } catch (error) {
            console.error(`Failed to add file ${relativePath}:`, error);
        }
    }
    if (result.dependencies) {
        console.log(`Installing dependencies...`);
        try {
            await execSync(`npm install ${result.dependencies.join(" ")}`, { stdio: "inherit" });
        } catch (error) {
            console.error("Failed to install dependencies:", error);
        }
    }
}