export type Installer = {
  cmd: string;
  args: string[];
};

function getUserAgent(): string {
  return process.env.npm_config_user_agent || "";
}

export function getInstaller(mode: "dlx" | "install" = "dlx"): Installer {
  const userAgent = getUserAgent();

  const isBun = userAgent.startsWith("bun");
  const isPnpm = userAgent.startsWith("pnpm");
  const isYarn = userAgent.startsWith("yarn");

  if (mode === "dlx") {
    if (isBun) return { cmd: "bunx", args: [] };
    if (isPnpm) return { cmd: "pnpm", args: ["dlx"] };
    if (isYarn) return { cmd: "yarn", args: ["dlx"] };
    return { cmd: "npx", args: [] };
  }

  // install mode
  if (isBun) return { cmd: "bun", args: ["add"] };
  if (isPnpm) return { cmd: "pnpm", args: ["add"] };
  if (isYarn) return { cmd: "yarn", args: ["add"] };
  return { cmd: "npm", args: ["install"] };
}


