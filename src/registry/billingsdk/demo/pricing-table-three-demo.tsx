'use client'

import { PricingTableThree } from '@/components/billingsdk/pricing-table-three';
import { plans } from '@/lib/const';

export function PricingTableThreeDemo() {

    return (
        <PricingTableThree 
            plans={plans}
            onPlanSelect={(planId) => console.log('Selected plan:', planId)}
            className={"w-full max-w-4xl mx-auto mt-10"}
            variant="small"
            showFooter={false}
        />
    );
}
