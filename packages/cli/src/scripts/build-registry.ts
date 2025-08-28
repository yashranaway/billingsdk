// commands/build-registry.ts
import fs from "fs";
import path from "path";
import { Registry, BackendComponent } from "../types/registry.js";

export const buildRegistry = async (componentName?: string) => {
  try {
    const registryPath = path.join(process.cwd(), "backend-registry.json");
    if (!fs.existsSync(registryPath)) {
      console.error("backend-registry.json not found in root directory");
      process.exit(1);
    }   

    const registry: Registry = JSON.parse(fs.readFileSync(registryPath, "utf-8"));
    
    const outputDir = path.join(process.cwd(), "public/r");
    fs.mkdirSync(outputDir, { recursive: true });

    const componentsToProcess = componentName 
      ? registry.components.filter(c => c.name === componentName)
      : registry.components;

    if (componentName && componentsToProcess.length === 0) {
      console.error(`Component "${componentName}" not found in registry`);
      process.exit(1);
    }

    for (const component of componentsToProcess) {
      console.log(`Building ${component.name}...`);
      
      const processedComponent: BackendComponent = {
        ...component,
        files: []
      };

      for (const file of component.files) {
        const sourcePath = path.join(process.cwd(), file.path);
        
        if (!fs.existsSync(sourcePath)) {
          console.warn(`Warning: Source file not found: ${file.path}`);
          continue;
        }

        const content = fs.readFileSync(sourcePath, "utf-8");
        
        processedComponent.files.push({
          path: file.target,
          content: content,
          target: file.target,
          type: file.type
        });
      }

      const outputPath = path.join(outputDir, `${component.name}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(processedComponent, null, 2), "utf-8");
      
      console.log(`✅ Built ${component.name} -> public/r/${component.name}.json`);
    }

    console.log(`\n🎉 Successfully built ${componentsToProcess.length} component(s)`);
    
  } catch (error) {
    console.error(`Build failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    process.exit(1);
  }
};