"use client";

import {
  Globe2Icon,
  CreditCardIcon,
  PlugZap2Icon,
  TrendingUpIcon,
  ShieldCheckIcon,
  BellIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import React, { CSSProperties } from "react";

const features = [
  {
    id: 1,
    label: "Customizable",
    title: "<strong>Customizable</strong>",
    description:
      "Easily modify components with props and Tailwind classes to match your brand. Full control over styling, colors, and layout without compromising functionality or accessibility.",
    icon: PlugZap2Icon,
  },
  {
    id: 2,
    label: "Ready to Use",
    title: "<strong>Ready to Use</strong>",
    description:
      "Production-ready components that have been tested across different browsers and devices. No additional setup or configuration required - just import and use.",
    icon: ShieldCheckIcon,
  },
  {
    id: 3,
    label: "Copy & Paste",
    title: "<strong>Copy & Paste</strong>",
    description:
      "No package dependencies or complex installations. Simply copy the component code directly into your project and start using it immediately with full source code access.",
    icon: CreditCardIcon,
  },
  {
    id: 4,
    label: "Open Source",
    title: "<strong>Open Source</strong>",
    description:
      "Completely free to use and modify for personal and commercial projects. Access the full source code, contribute improvements, and customize to your heart's content.",
    icon: Globe2Icon,
  },
  {
    id: 5,
    label: "Fast Development",
    title: "<strong>Fast Development</strong>",
    description:
      "Skip weeks of development time with pre-built billing components. Focus on your core business logic while we handle the complex UI patterns and user flows.",
    icon: TrendingUpIcon,
  },
  {
    id: 6,
    label: "Accessible",
    title: "<strong>Accessible</strong>",
    description:
      "Built with accessibility in mind, ensuring your billing interfaces work for all users. WCAG compliant components with proper ARIA labels and keyboard navigation support.",
    icon: BellIcon,
  },
];

export default function Features() {
  return (
    <div className="flex flex-col my-12 sm:my-16 md:my-20 lg:my-24 xl:my-32 items-center justify-center max-w-7xl mx-auto px-4 sm:px-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-medium text-primary animate-in fade-in slide-in-from-bottom-4 duration-1000 text-center">
        Why choose BillingSDK?
      </h2>
      <p className="text-sm sm:text-base md:text-lg mt-3 sm:mt-4 text-muted-foreground mb-8 sm:mb-10 md:mb-12 max-w-xs sm:max-w-lg md:max-w-xl mx-auto tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 text-center">
        Beautiful, customizable billing components that save you development
        time and effort.
      </p>

      <div className="relative w-full">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={cn(
                  "justify-center min-h-[200px] sm:min-h-[220px] md:min-h-[240px] lg:min-h-[260px] transform-gpu flex flex-col p-6 sm:p-8 md:p-10 lg:p-12 animate-in fade-in slide-in-from-bottom-6 duration-1000",
                  // Mobile borders
                  index > 0 && "border-t-[1.2px] md:border-t-0",
                  // Desktop borders - right border for all except last column in each row
                  "md:border-r-[1.2px] lg:border-r-[1.2px]",
                  // Remove right border for last column in each row
                  (index + 1) % 2 === 0 && "md:border-r-0 lg:border-r-[1.2px]",
                  (index + 1) % 3 === 0 && "lg:border-r-0",
                  // Bottom borders for rows except last
                  index < 2 && "md:border-b-[1.2px] lg:border-b-0",
                  index < 3 && "lg:border-b-[1.2px]"
                )}
                style={{
                  animationDelay: `${500 + index * 150}ms`,
                } as CSSProperties}
              >
                <div className="mt-2">
                  <div className="max-w-full">
                    <div className="flex gap-3">
                      <p
                        className="max-w-lg text-lg sm:text-xl md:text-2xl font-normal tracking-tighter"
                        dangerouslySetInnerHTML={{
                          __html: feature.title,
                        }}
                      />
                    </div>
                  </div>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base text-left text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
