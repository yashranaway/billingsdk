import { existsSync, readFileSync } from "node:fs";
import { findUpSync } from "find-up"; // find a directory by walking up parent directories

export const detectFramework = (): "nextjs" | "express" | "react" | null => {
    try {

        const pkgPath = findUpSync("package.json")
        if (!pkgPath) return null;
        const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"))

        function hasFile(file: string) {
            return existsSync(file)
        }
        const deps = {
            ...pkg.dependencies,
            ...pkg.devDependencies,
            ...pkg.peerDependencies
        }
        
        //  nextjs detection
        if (deps.next || hasFile("next.config.js") || hasFile("next.config.mjs") || hasFile("next.config.ts")) {
            return "nextjs";
        }
        //  express detection
        if (deps.express) {
            return "express";
        }
        //  reactjs detection
        if (deps.react) {
            return "react";
        }
        return null;
    } catch {
        return null
    }
}
