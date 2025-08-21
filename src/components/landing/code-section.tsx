"use client";

import { CustomCodeBlock } from '@/components/code';

interface Code {
  title: string;
  description: string;
  code: string;
  language: string;
}

const features: Code[] = [
  {
    title: "Pricing Component",
    description: "Pricing component with classic theme",
    code: `"use client"

import { PricingTableOne } from "@/components/billingsdk/pricing-table-one"
import { plans } from "@/lib/billing-sdk-const"

export function PricingTableOneDemo() {
    return <>
        <PricingTableOne plans={plans}
        title="Pricing"
        description="Choose the plan that's right for you"
        onPlanSelect={(planId) => console.log('Selected plan:', planId)}
        size="medium" // small, medium, large
        theme="classic" // minimal or classic
        />
        </>
}`,
    language: "typescript",
  },
  {
    title: "Pricing Component",
    description: "Pricing component with classic theme",
    code: `"use client"

import { PricingTableOne } from "@/components/billingsdk/pricing-table-one"
import { plans } from "@/lib/billing-sdk-const"

export function PricingTableOneDemo() {
    return <>
        <PricingTableOne plans={plans}
        title="Pricing"
        description="Choose the plan that's right for you"
        onPlanSelect={(planId) => console.log('Selected plan:', planId)}
        size="medium" // small, medium, large
        theme="classic" // minimal or classic
        />
        </>
}`,
    language: "typescript",
  },

];

export function CodeSection() {
  return (
    <div className="grid grid-cols-1 md:divide-x divide-accent-900 list-none md:grid-cols-2 border-none border-border h-full w-full">
      {features.map((feature, index) => (
        <div
          key={index}
          className="h-160 bg-[radial-gradient(131.66%_109.77%_at_50%_2.25%,transparent_37.41%,rgba(74,0,224,0.44)_69.27%,rgba(0,234,255,0.5)_100%)] dark:bg-[radial-gradient(131.66%_109.77%_at_50%_2.25%,transparent_37.41%,#4a00e070_69.27%,#00eaff_100%)] border-t border-card p-8 pt-24 pb-0 relative overflow-hidden"
        >
          <div className="text-center">
            <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-zinc-800 dark:text-zinc-300 font-display">
              {feature.title}
            </h2>
            <p className="text-base mt-4 text-muted-foreground text-balance">
              {feature.description}
            </p>
          </div>

          <div className="shadow-lg border border-border mt-12 relative h-full">
            {/* Window chrome */}
            <div className="py-2 px-4 border-b border-border bg-transparent border-l-foreground">
              <div className="flex items-center gap-1">
                <div className="size-2 outline rounded-full outline-border"></div>
                <div className="size-2 outline rounded-full outline-muted-foreground"></div>
                <div className="size-2 outline rounded-full outline-accent"></div>
              </div>
            </div>

            {/* Code block */}
            <CustomCodeBlock code={feature.code} language={feature.language} />
          </div>
        </div>
      ))}
    </div>
  );
}




