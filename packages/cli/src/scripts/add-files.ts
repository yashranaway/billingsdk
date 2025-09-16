import path from "path";
import fs from "fs";
import { Result } from "../types/registry.js";
import { confirm, isCancel, spinner } from "@clack/prompts";
import { execSync } from "child_process";

export const addFiles = async (framework: "nextjs" | "express" | "fastify" | "react", provider: "dodopayments" | "stripe") => {
    // Allow overriding registry source for local testing
    const localPathBase = process.env.BILLINGSDK_REGISTRY_PATH;
    const urlBase = process.env.BILLINGSDK_REGISTRY_URL ?? "https://billingsdk.com/tr";

    let result: Result;
    if (localPathBase) {
        const p = path.join(localPathBase, `${framework}-${provider}.json`);
        // Check if file exists before reading
        if (!fs.existsSync(p)) {
            throw new Error(`Local template file not found: ${p}`);
        }
        try {
            const raw = fs.readFileSync(p, "utf-8");
            result = JSON.parse(raw) as Result;
        } catch (error) {
            throw new Error(`Failed to parse local template file ${p}: ${error instanceof Error ? error.message : String(error)}`);
        }
    } else {
        const url = `${urlBase}/${framework}-${provider}.json`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch template from ${url}. Status: ${response.status}. Response: ${errorText.substring(0, 200)}`);
            }
            result = await response.json() as Result;
        } catch (error) {
            throw new Error(`Failed to fetch or parse template from ${url}: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
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
                } else {
                    const overwrite = await confirm({
                        message: `File ${relativePath} already exists. Do you want to overwrite it?`,
                    });
                    
                    // Check for cancellation
                    if (isCancel(overwrite)) {
                        console.log(`Skipped ${relativePath} (user cancelled)`);
                        continue;
                    }
                    
                    // Only proceed with overwrite if user explicitly confirmed
                    if (overwrite === true) {
                        fs.writeFileSync(filePath, file.content);
                    }
                }
            } else {
                fs.writeFileSync(filePath, file.content);
            }
        } catch (error) {
            console.error(`Failed to add file ${relativePath}:`, error);
        }
    }
    if (result.dependencies) {
        const s = spinner();
        s.start("Installing dependencies...");
        try {
            await execSync(`npm install ${result.dependencies.join(" ")}`, { stdio: "inherit" });
            s.stop("Dependencies installed successfully!");
        } catch (error) {
            s.stop("Failed to install dependencies!");
            console.error("Failed to install dependencies:", error);
        }
    }
}