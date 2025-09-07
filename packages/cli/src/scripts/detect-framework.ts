import fs from "fs";
import { findUpSync } from "find-up"; // find a directory by walking up parent directories

export const detectFramework = (): "nextjs" | "express" | null => {
    try {

        const pkgPath = findUpSync("package.json")
        if (!pkgPath) return null
        const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))

        if (pkg.dependencies?.next || pkg.devDependencies?.next) {
            return "nextjs"
        }
        if (pkg.dependencies?.express || pkg.devDependencies?.express) {
            return "express"
        }
        return null;
    } catch {
        return null
    }
}
