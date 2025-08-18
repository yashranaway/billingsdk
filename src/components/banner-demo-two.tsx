import { Banner } from "@/components/billingsdk/banner"
import { Rocket } from "lucide-react"

export default function FreeTrialBannerDemoTwo() {
    return (
        <div className="w-full h-full flex flex-col gap-4 min-h-[500px] justify-center items-center border rounded-lg">
            <Banner
                title="🎉 Start your free trial today!"
                description="Get 30 days free access to all premium features"
                buttonText="Start Free Trial"
                buttonIcon={<Rocket />}
                buttonLink="https://example.com/signup"
                variant="minimal" // default, minimal, popup
            />
        </div>

    )
}
