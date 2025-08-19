import { Banner } from "@/components/billingsdk/banner"

export default function FreeTrialBannerDemo() {
    return (
        <div className="w-full h-full flex flex-col gap-6 min-h-[500px] border rounded-lg overflow-hidden bg-background-secondary border-2">
            <Banner
                title="🎉 Explore your next destination today!"
                description="Discover the best places to visit in the world"
                variant="minimal" // default, minimal, popup
            />

            {/* minimal hero example */}
            <section className="flex flex-col items-center justify-center text-center gap-4 py-16">
                <h1 className="text-3xl font-bold tracking-tight text-foreground-secondary">
                    Discover the best places to visit in the world
                </h1>
                <div className="flex flex-col gap-2">

                    <p className="text-muted-foreground max-w-md">
                        Explore the best places to visit in the world
                    </p>
                    <a
                        className="underline underline-offset-4 hover:text-primary transition"
                    >
                        Get Started →
                    </a>
                </div>
            </section>
        </div>
    )
}
