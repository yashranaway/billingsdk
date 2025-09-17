import path from "path";
import fs from "fs";
import { Result } from "../types/registry.js";
import { SupportedFramework, SupportedProvider, transportNameFor } from "../config/matrix.js";
import { confirm, spinner } from "@clack/prompts";
import { execSync } from "child_process";

type AddFilesOptions = {
    registryBase?: string;
    cwd?: string;
    installDeps?: boolean;
};

export const addFiles = async (
    framework: SupportedFramework,
    provider: SupportedProvider,
    options: AddFilesOptions = {}
) => {
    const base = options.registryBase || process.env.BILLINGSDK_REGISTRY_BASE || "https://billingsdk.com/tr";
    const name = transportNameFor(framework, provider);
    const url = `${base.replace(/\/$/, "")}/${name}.json`;

    const result = await fetch(url).then(res => res.json()) as Result;

    const cwd = options.cwd || process.cwd();
    let srcExists = fs.existsSync(path.join(cwd, "src"));
    const addToPath = srcExists ? "src" : "";

    for (const file of result.files) {
        const filePath = path.join(cwd, addToPath, file.target);
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
                    if (overwrite) {
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
    if (result.dependencies && options.installDeps !== false) {
        const s = spinner();
        s.start("Installing dependencies...");
        try {
            await execSync(`npm install ${result.dependencies.join(" ")}`, { stdio: "inherit" });
            s.stop("Dependencies installed successfully!");
        } catch (error) {
            console.error("Failed to install dependencies:", error);
        }
    }
}
