'use client'

import { MinimalPricingTable } from '@/components/billingsdk/minimal-pricing-table';
import { plans } from '@/lib/const';

export default function MinimalPricingTableDemo({ className }: { className?: string }) {

    return (
        <MinimalPricingTable 
            plans={plans}
            onPlanSelect={(planId) => console.log('Selected plan:', planId)}
            className={className}
        />
    );
}
