import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-[radial-gradient(131.66%_109.77%_at_50%_2.25%,transparent_37.41%,rgba(74,0,224,0.44)_69.27%,rgba(0,234,255,0.5)_100%)] dark:bg-[radial-gradient(131.66%_109.77%_at_50%_2.25%,transparent_37.41%,#4a00e070_69.27%,#00eaff_100%)] w-full my-5 py-20 rounded-b-xl">
            <div className="flex flex-col items-center justify-center h-full my-12 space-y-10 px-6">
                <div className="relative flex flex-col items-center justify-center">
                    <p className="text-zinc-800 dark:text-zinc-300 mt-3 tracking-tight text-xl md:text-3xl text-center">
                        Ready to use billing components and blocks for your next
                        project?
                    </p>
                    <p className="text-sm pt-2 text-muted-foreground text-center max-w-xl mx-auto">
                        Free Billing components and blocks built with React,
                        Typescript, Tailwind CSS, and Motion. Perfect companion for
                        shadcn/ui.
                    </p>
                    <div className="flex py-4 gap-2 mt-4">
                        <Button asChild className="bg-primary text-primary-foreground ring-primary before:from-primary-foreground/20 after:from-primary-foreground/10 relative isolate inline-flex items-center justify-center overflow-hidden rounded-md px-3 text-left text-sm font-medium ring-1 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-b before:opacity-80 before:transition-opacity before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md after:bg-gradient-to-b after:to-transparent after:mix-blend-overlay hover:cursor-pointer">
                            <Link href="/docs">Get Started</Link>
                        </Button>
                        <Button variant="secondary" asChild className="bg-secondary text-secondary-foreground ring-secondary before:from-secondary-foreground/20 after:from-secondary-foreground/10 relative isolate inline-flex items-center justify-center overflow-hidden rounded-md px-3 text-left text-sm font-medium ring-1 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-b before:opacity-80 before:transition-opacity before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md after:bg-gradient-to-b after:to-transparent after:mix-blend-overlay hover:cursor-pointer">
                            <Link href="/docs/components">Browse Components</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    )
}