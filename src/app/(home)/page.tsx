'use client'

import { CurrentPlan, plans } from '@/lib/const';
import { CurrentSubscriptionDemo } from '@/components/current-subscription-demo';

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
      <CurrentSubscriptionDemo />
    </main>
  );
}
