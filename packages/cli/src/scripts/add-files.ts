import path from "path";
import fs from "fs";
import { Result } from "../types/registry.js";
import { SupportedFramework, SupportedProvider, transportNameFor } from "../config/matrix.js";
import { confirm, spinner } from "@clack/prompts";
import { execSync } from "child_process";

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

type AddFilesOptions = {
    registryBase?: string;
    cwd?: string;
    installDeps?: boolean;
    forceOverwrite?: boolean;
    dryRun?: boolean;
    verbose?: boolean;
    packageManager?: PackageManager;
};

function resolvePackageManagerRunner(override?: PackageManager): string {
    if (override) {
        if (override === "bun") return "bun add";
        if (override === "pnpm") return "pnpm add";
        if (override === "yarn") return "yarn add";
        return "npm install";
    }
    const ua = process.env.npm_config_user_agent || "";
    if (ua.startsWith("bun")) return "bun add";
    if (ua.startsWith("pnpm")) return "pnpm add";
    if (ua.startsWith("yarn")) return "yarn add";
    return "npm install";
}

export const addFiles = async (
    framework: SupportedFramework,
    provider: SupportedProvider,
    options: AddFilesOptions = {}
) => {
    const base = options.registryBase || process.env.BILLINGSDK_REGISTRY_BASE || "https://billingsdk.com/tr";
    const name = transportNameFor(framework, provider);
    const url = `${base.replace(/\/$/, "")}/${name}.json`;

    if (options.verbose) {
        console.log(`Using registry: ${url}`);
    }

    let result: Result;
    if (base.startsWith("file://")) {
        const filePath = url.replace("file://", "");
        if (!fs.existsSync(filePath)) {
            console.error(`Transport not found at ${filePath}. Did you build templates?`);
            process.exit(1);
        }
        const json = fs.readFileSync(filePath, "utf-8");
        result = JSON.parse(json) as Result;
    } else {
        const res = await fetch(url);
        if (!res.ok) {
            console.error(`Failed to fetch transport from ${url} (status ${res.status}).`);
            process.exit(1);
        }
        result = await res.json() as Result;
    }

    const cwd = options.cwd || process.cwd();
    let srcExists = fs.existsSync(path.join(cwd, "src"));
    const addToPath = srcExists ? "src" : "";
    if (options.verbose) {
        console.log(`Placing files under: ${addToPath || "."}`);
    }

    for (const file of result.files) {
        const filePath = path.join(cwd, addToPath, file.target);
        const dirPath = path.dirname(filePath);
        const relativePath = addToPath ? path.join(addToPath, file.target) : file.target;

        try {
            fs.mkdirSync(dirPath, { recursive: true });
            const fileName = path.basename(file.target);

            if (options.dryRun) {
                console.log(`[dry-run] write ${relativePath}`);
                continue;
            }

            if (fs.existsSync(filePath)) {
                if (fileName === '.env.example') {
                    const existingContent = fs.readFileSync(filePath, 'utf8');
                    const newContent = existingContent + '\n' + file.content + '\n';
                    fs.writeFileSync(filePath, newContent);
                } else {
                    if (options.forceOverwrite) {
                        fs.writeFileSync(filePath, file.content);
                    } else {
                        const overwrite = await confirm({
                            message: `File ${relativePath} already exists. Do you want to overwrite it?`,
                        });
                        if (overwrite) {
                            fs.writeFileSync(filePath, file.content);
                        }
                    }
                }
            } else {
                fs.writeFileSync(filePath, file.content);
            }
            if (options.verbose) {
                console.log(`wrote ${relativePath}`);
            }
        } catch (error) {
            console.error(`Failed to add file ${relativePath}:`, error);
        }
    }
    if (result.dependencies && options.installDeps !== false && !options.dryRun) {
        const s = spinner();
        s.start("Installing dependencies...");
        try {
            const runner = resolvePackageManagerRunner(options.packageManager);
            if (options.verbose) {
                console.log(`Installing with: ${runner} ${result.dependencies.join(" ")}`);
            }
            await execSync(`${runner} ${result.dependencies.join(" ")}`, { stdio: "inherit" });
            s.stop("Dependencies installed successfully!");
        } catch (error) {
            console.error("Failed to install dependencies:", error);
        }
    } else if (options.dryRun && result.dependencies?.length) {
        console.log(`[dry-run] install ${result.dependencies.join(" ")}`);
    }
}
