'use client'

import UsageMeterLinearDemo from "@/components/usage-meter-liner-demo";
import UsageMeterCircleDemo from "@/components/usage-meter-circle-demo";

export default function HomePage() {

  return (
    <main className="flex flex-1 flex-col justify-center text-center w-full">
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
      <UsageMeterLinearDemo />
      <UsageMeterCircleDemo />

    </main>
  );
}
