'use client'

import { SubscriptionManagement } from '@/components/billingsdk/current-subscription';
import { CurrentPlan, plans } from '@/lib/const';
import Link from 'next/link';

export default function HomePage() {
  const currentPlan: CurrentPlan = {
    plan: plans[1],
    type: 'monthly',
    price: '$121',
    nextBillingDate: 'January 15, 2025',
    paymentMethod: 'Credit Card',
    status: 'active'
  }
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      {/* <p className="text-fd-muted-foreground">
        You can open{' '}
        <Link
          href="/docs"
          className="text-fd-foreground font-semibold underline"
        >
          /docs
        </Link>{' '}
        and see the documentation.
      </p> */}
      <SubscriptionManagement
        className="max-w-2xl mx-auto"
        currentPlan={currentPlan}
        allPlans={plans}
        onUpdatePlan={(planId) => { console.log('update plan', planId) }}
        cancelSubscription={{
          title: 'Cancel Subscription',
          description: 'Are you sure you want to cancel your subscription?',
          leftPanelImageUrl: 'https://img.freepik.com/free-vector/abstract-paper-cut-shape-wave-background_474888-4649.jpg?semt=ais_hybrid&w=740&q=80',
          plan: currentPlan.plan,
          onCancel: async (planId) => {
            console.log('cancel subscription', planId)
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(void 0);
              }, 1000);
            });
          },
          onKeepSubscription: async (planId) => { console.log('keep subscription', planId) },
        }}
      />

    </main>
  );
}
