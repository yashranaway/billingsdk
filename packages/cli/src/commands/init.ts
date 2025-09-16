import { Command } from "commander";
import { cancel, intro, isCancel, outro, select, spinner } from "@clack/prompts";
import { addFiles } from "../scripts/add-files.js";
import { detectFramework } from "../scripts/detect-framework.js";

export const initCommand = new Command()
  .name("init")
  .description("Initialize a new billing project")
  .summary("Set up billing components and framework integration")
  .option("--framework <framework>", "Framework to use (nextjs|express|hono|react)")
  .option("--provider <provider>", "Payment provider (dodopayments|stripe)")
  .action(async (opts: { framework?: string; provider?: string }) => {
    try {
      intro("Welcome to Billing SDK Setup!");

      const detectedFramework = detectFramework();
      let framework: string | symbol | undefined = opts.framework as any;
      if (!framework) {
        framework = await select({
          message: "Which framework you are using? (Adding more frameworks soon)",
          options: [
            { value: "nextjs", label: detectedFramework === "nextjs" ? "Next.js (detected)" : "Next.js", hint: "React framework with App Router" },
            { value: "express", label: detectedFramework === "express" ? "Express.js (detected)" : "Express.js", hint: "Node.js web framework" },
            { value: "react", label: detectedFramework === "react" ? "React.js (detected)" : "React.js", hint: "Client-side React app template" },
            { value: "hono", label: detectedFramework === "hono" ? "Hono.js (detected)" : "Hono.js", hint: "Lightweight web framework for edge runtimes" }
          ],
          initialValue: detectedFramework ?? undefined
        });
      }
      // Normalize to string and validate
      const frameworkStr = typeof framework === 'string' ? framework : String(framework);
      if (!["nextjs","express","react","hono"].includes(frameworkStr)) {
        cancel("Invalid or missing framework. Use --framework nextjs|express|hono|react");
        process.exit(1);
      }

      let providerChoice: string | symbol | undefined = opts.provider as any;
      if (!providerChoice) {
        providerChoice = await select({
          message: "Which payment provider would you like to use? (Adding more providers soon)",
          options: [
            { value: "dodopayments", label: "Dodo Payments" },
            { value: "stripe", label: "Stripe payments" }
          ],
        });
      }
      const providerStr = typeof providerChoice === 'string' ? providerChoice : String(providerChoice);
      if (isCancel(providerStr)) {
        cancel("Setup cancelled.");
        process.exit(0);
      }
      const provider = providerStr as "dodopayments" | "stripe";

      const s = spinner();
      s.start("Setting up your billing project...");
      try {
        await addFiles(frameworkStr as "nextjs" | "express" | "react" | "hono", provider);
        s.stop("Setup completed successfully!");
      } catch (error) {
        s.stop("Setup failed!");
        process.exit(1);
      }

      outro("Your billing project is ready! Happy coding! 🎉");

    } catch (error) {
      process.exit(1);
    }
  });