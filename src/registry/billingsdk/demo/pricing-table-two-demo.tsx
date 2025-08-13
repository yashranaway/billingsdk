import { plans } from "@/lib/const";
import { PricingTableTwo } from "@/components/billingsdk/pricing-table-two";

export function PricingTableTwoDemo() {
    return <>
    <PricingTableTwo plans={plans} className="w-full max-w-4xl mx-auto mt-10"
        title={`We offer ${plans.length} plans`}
        description="Choose the plan that's right for you"
        onPlanSelect={(planId) => console.log('Selected plan:', planId)}
        variant="medium"
        />
        </>
} 