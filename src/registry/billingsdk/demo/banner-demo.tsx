import { Banner } from "@/components/billingsdk/banner"
import { Rocket } from "lucide-react"

export default function FreeTrialBannerDemo() {
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <Banner
                title="🎉 Start your free trial today!"
                description="Get 30 days free access to all premium features"
                buttonText="Start Free Trial"
                buttonIcon={<Rocket />}
                buttonLink="https://example.com/signup"
                variant="default" // default, minimal, popup
            />
        </div>

    )
}
