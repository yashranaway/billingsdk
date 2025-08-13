import { plans } from "@/registry/lib/const";
import { PricingTableTwo } from "@/components/billingsdk/pricing-table-two";

export function PricingTableTwoDemo() {
    return <PricingTableTwo plans={plans} className="w-full max-w-7xl mx-auto mt-10" />
} 