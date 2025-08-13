import PricingTableOne from "@/components/billingsdk/pricing-table-one"
import { plans } from "@/lib/const"

export default function PricingTableOneDemo() {
    return <PricingTableOne className="w-full max-w-7xl mx-auto" plans={plans} />
}