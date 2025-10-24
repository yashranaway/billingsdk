"use client"

import { BillingScreen } from "@/components/billingsdk/billing-screen"

export function BillingScreenDemo() {
  return (
    <div className="flex flex-1 flex-col justify-center text-center p-4 mx-auto min-h-[300px]">
      <BillingScreen
        planName="Premium Plan"
        planPrice="$20/mo"
        renewalDate="Oct 7, 2025"
        totalBalance="$6.59"
        username="rajoninternet"
        giftedCredits="$1.73"
        monthlyCredits="$3.13"
        monthlyCreditsLimit="$20.00"
        purchasedCredits="$0.00"
        resetDays={4}
        autoRechargeEnabled={false}
        onViewPlans={() => console.log("View Plans clicked")}
        onCancelPlan={() => console.log("Cancel Plan clicked")}
        onBuyCredits={() => console.log("Buy Credits clicked")}
        onEnableAutoRecharge={() => console.log("Enable Auto-recharge clicked")}
        className="w-auto"
      />
    </div>
  )
}
