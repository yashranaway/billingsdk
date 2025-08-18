'use client'

import { UsageMeter } from "@/components/billingsdk/usage-meter";

export default function UsageMeterCircleDemo() {

  return (
    <div className="flex flex-col gap-4 max-w-lg mx-auto">
      <UsageMeter 
      usage={75} 
      limit={100} 
      title="Usage" 
      description="Lorem ipsum dolor sit amet" 
      variant="circle" 
      size="md" 
      className="mx-auto" />
    </div>

  );
}
