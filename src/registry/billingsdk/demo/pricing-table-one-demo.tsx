import { PricingTableOne } from "@/components/billingsdk/pricing-table-one"
import { plans } from "@/lib/const"

export function PricingTableOneDemo() {
    return <>
        <PricingTableOne className="w-full max-w-4xl mx-auto" plans={plans}
        title="Pricing"
        description="Choose the plan that's right for you"
        onPlanSelect={(planId) => console.log('Selected plan:', planId)}
        variant="medium"
        />
        </>
}