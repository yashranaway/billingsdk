'use client'

import { UsageMeter } from "@/components/billingsdk/usage-meter";

export default function UsageMeterLinearDemo() {

  return (
    <div className="flex flex-col gap-4 max-w-lg mx-auto">
      <UsageMeter 
      usage={75} 
      limit={100} 
      title="Usage" 
      description="Lorem ipsum dolor sit amet" 
      variant="linear" 
      size="md" 
      className="mx-auto" />
    </div>

  );
}
