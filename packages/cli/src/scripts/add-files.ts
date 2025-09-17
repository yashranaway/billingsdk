import path from "path";
import fs from "fs";
import { Result } from "../types/registry.js";
import { SupportedFramework, SupportedProvider, transportNameFor } from "../config/matrix.js";
import { confirm, spinner, isCancel } from "@clack/prompts";
import { spawnSync } from "child_process";

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
            throw new Error(`Transport not found at ${filePath}. Did you build templates?`);
        }
        const json = fs.readFileSync(filePath, "utf-8");
        result = JSON.parse(json) as Result;
    } else {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Failed to fetch transport from ${url} (status ${res.status}).`);
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
        if (path.isAbsolute(file.target) || file.target.split(path.sep).some((seg) => seg === "..")) {
            throw new Error(`Refusing to write outside project: invalid target '${file.target}'`);
        }
        const combined = path.join(addToPath, file.target);
        const resolved = path.resolve(cwd, combined);
        const resolvedCwd = path.resolve(cwd);
        if (!resolved.startsWith(resolvedCwd + path.sep) && resolved !== resolvedCwd) {
            throw new Error(`Resolved path escapes project directory: '${resolved}'`);
        }
        const dirPath = path.dirname(resolved);
        const relativePath = path.relative(cwd, resolved) || path.basename(resolved);

        try {
            const fileName = path.basename(file.target);

            if (options.dryRun) {
                console.log(`[dry-run] mkdir ${path.relative(cwd, dirPath) || "."}`);
                console.log(`[dry-run] write ${relativePath}`);
                continue;
            }

            fs.mkdirSync(dirPath, { recursive: true });

            if (fs.existsSync(resolved)) {
                if (fileName === '.env.example') {
                    const existingContent = fs.readFileSync(resolved, 'utf8');
                    const newContent = existingContent + '\n' + file.content + '\n';
                    fs.writeFileSync(resolved, newContent);
                } else {
                    if (options.forceOverwrite) {
                        fs.writeFileSync(resolved, file.content);
                    } else {
                        const overwrite = await confirm({
                            message: `File ${relativePath} already exists. Do you want to overwrite it?`,
                        });
                        if (isCancel(overwrite)) {
                            throw new Error("Setup cancelled by user during overwrite prompt");
                        } else if (overwrite === true) {
                            fs.writeFileSync(resolved, file.content);
                        }
                    }
                }
            } else {
                fs.writeFileSync(resolved, file.content);
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
        const runner = resolvePackageManagerRunner(options.packageManager);
        const [cmdRaw, ...baseArgs] = runner.split(" ");
        const cmd = cmdRaw || "npm";
        const args = [...baseArgs, ...result.dependencies];
        if (options.verbose) {
            console.log(`Installing with: ${cmd} ${args.join(" ")}`);
        }
        const res = spawnSync(cmd, args, { stdio: "inherit", shell: false });
        if (res.error || (typeof res.status === "number" && res.status !== 0)) {
            s.stop("Failed to install dependencies!");
            throw res.error || new Error(`Installer exited with status ${res.status}`);
        }
        s.stop("Dependencies installed successfully!");
    } else if (options.dryRun && result.dependencies?.length) {
        console.log(`[dry-run] install ${result.dependencies.join(" ")}`);
    }
}
