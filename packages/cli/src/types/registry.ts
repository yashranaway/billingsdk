export interface BackendComponent {
    name: string;
    description: string;
    type: "api-route" | "middleware" | "utility" | "service" | "schema";
    framework: "nextjs" | "express" | "fastify";
    files: Array<{
        path: string;
        content: string;
        target: string;
        type: "template" | "config" | "types";
    }>;
    dependencies?: string[];
    devDependencies?: string[];
}

export interface Registry {
    $schema: string;
    components: BackendComponent[];
    meta: {
        version: string;
        lastUpdated: string;
    };
}