import path from "path";
import fs from "fs";
import { Result } from "../types/registry.js";
import inquirer from "inquirer";
import { exec } from "child_process";

export const addFiles = async (framework: "nextjs" | "express" | "fastify") => {
    const result = await fetch(`http://localhost:3000/tr/${framework}-dodopayments.json`).then(res => res.json()) as Result;

    // check if src folder exists
    let srcExists = fs.existsSync(path.join(process.cwd(), "src"));
    const addToPath = srcExists ? "src" : "";

    for (const file of result.files) {
        const filePath = path.join(process.cwd(), addToPath, file.target);
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
    }
    
    // install dependencies
    if (result.dependencies) {
        console.log(`Installing dependencies...`);
        await exec(`npm install ${result.dependencies.join(" ")}`);
    }
}