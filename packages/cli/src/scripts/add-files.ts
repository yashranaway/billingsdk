import path from "path";
import fs from "fs";
import { Result } from "../types/registry.js";
import inquirer from "inquirer";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export const addFiles = async (framework: "nextjs" | "express", provider: "dopayments") => {
    const result = await fetch(`http://localhost:3000/tr/${framework}-${provider}.json`).then(res => res.json()) as Result;
    // check if src folder exists
    let srcExists = fs.existsSync(path.join(process.cwd(), "src"));
    const addToPath = srcExists ? "src" : "";

    for (const file of result.files) {
        const filePath = path.join(process.cwd(), addToPath, file.target);
        const dirPath = path.dirname(filePath);
        try {
            // ensure parent directories exist
            fs.mkdirSync(dirPath, { recursive: true });

            // check if file exists
            if (fs.existsSync(filePath)) {
                console.log(`File ${filePath} already exists`);
                // ask if user wants to overwrite
                const overwrite = await inquirer.prompt([
                    {
                        type: "confirm",
                        name: "overwrite",
                        message: `File ${filePath} already exists. Do you want to overwrite it?`,
                    },
                ]);
                if (overwrite.overwrite) {
                    fs.writeFileSync(filePath, file.content);
                    console.log(`File ${filePath} added`);
                } else {
                    console.log(`File ${filePath} not added`);
                }
            } else {
                fs.writeFileSync(filePath, file.content);
                console.log(`File ${filePath} added`);
            }
        } catch (error) {
            console.error(`Failed to add file ${filePath}:`, error);
        }
    }
    
    // install dependencies
    if (result.dependencies) {
        console.log(`Installing dependencies...`);
        try {
            await execAsync(`npm install ${result.dependencies.join(" ")}`);
        } catch (error) {
            console.error("Failed to install dependencies:", error);
        }
    }
}