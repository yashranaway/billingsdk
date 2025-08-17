'use client'

import { UpdatePlanDialog } from '@/components/billingsdk/update-plan-dialog';
import { plans } from '@/lib/const';

export default function UpdatePlanDialogDemo() {

  return (
    <div className="flex flex-1 flex-col justify-center text-center p-4 w-full mx-auto">
      <UpdatePlanDialog
        currentPlan={plans[1]}
        plans={plans}
        onPlanChange={(planId) => {
          console.log(planId)
        }}
        triggerText="Update Plan"
      />
    </div>
  );
}
