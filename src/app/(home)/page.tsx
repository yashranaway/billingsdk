"use client"

import { PricingTableThreeDemo } from '@/components/pricing-table-three-demo';
import { PricingTableOneDemo } from '@/components/pricing-table-one-demo';
import { PricingTableTwoDemo } from '@/components/pricing-table-two-demo';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      {/* <HelloWorld /> */}
      <p className="text-fd-muted-foreground">
        You can open{' '}
        <Link
          href="/docs"
          className="text-fd-foreground font-semibold underline"
        >
          /docs
        </Link>{' '}
        and see the documentation.
      </p>

      <PricingTableOneDemo />
      <PricingTableTwoDemo />
      <PricingTableThreeDemo />

    </main>
  );
}
