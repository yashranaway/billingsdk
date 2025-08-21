"use client";

import Hero from "@/components/landing/Hero";
import { cn } from "@/lib/utils";
import { HTMLProps, useState } from "react";
import { UpdatePlanCardDemo } from "@/components/update-plan-card-demo";
import { SubscriptionManagementDemo } from "@/components/subscription-management-demo";
import { plans } from "@/lib/billing-sdk-const";
import { Banner } from "@/components/billingsdk/banner";
import { UsageMeter } from "@/components/billingsdk/usage-meter";
import { CancelSubscriptionCard } from "@/registry/billingsdk/cancel-subscription-card";
import Features from "@/components/landing/Features";
import { PricingTableOne } from "@/components/billingsdk/pricing-table-one";
import { CodeSection } from "@/components/landing/code-section";

export default function HomePage() {
  return (
    <main className="max-w-6xl bg-background 2xl:max-w-[1400px] mx-auto border-x flex flex-col items-end border-t border-border mb-12">
      <Hero />
      <Features />
      <Components />
      <CodeSection />
    </main>
  );
}
function ComponentPanel(props: HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "duration-700 animate-in fade-in text-sm max-w-none w-full",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}

function Components() {
  return (
    <div className="relative w-full overflow-hidden border-x border-t p-2">
      <ComponentsShowcase />
    </div>
  );
}

function ComponentsShowcase() {
  const [active, setActive] = useState("Pricing");
  const components = [
    "Pricing",
    "Subscription Management",
    "Banner Notifications",
    "Usage Meters",
    "Plan Updates",
    "Cancellation Flow",
  ];

  return (
    <div
      id="components-showcase"
      className="flex flex-col-reverse gap-3 md:flex-row md:min-h-[800px] my-auto"
    >
      <div className="flex flex-col">
        {components.map((item, i) => (
          <button
            key={item}
            type="button"
            className={cn(
              "transition-colors text-nowrap border border-transparent rounded-lg px-3 py-2.5 text-start text-sm text-fd-muted-foreground font-medium",
              item === active
                ? "text-fd-primary bg-fd-primary/10 border-fd-primary/10"
                : "hover:text-fd-accent-foreground/80"
            )}
            onClick={() => {
              setActive(item);
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex flex-col p-4 border border-fd-primary/10 bg-background rounded-lg shadow-lg w-full items-center justify-center">
        {active === "Pricing" ? (
          <ComponentPanel>
            <PricingTableOne
              plans={plans}
              title="Pricing"
              description="Choose the plan that's right for you"
              onPlanSelect={(planId) => console.log("Selected plan:", planId)}
              size="small" // small, medium, large
              theme="classic" // minimal or classic
            />
          </ComponentPanel>
        ) : null}

        {active === "Banner Notifications" ? (
          <ComponentPanel>
            <Banner
              title="🎉 Start your free trial today!"
              description="Get 30 days free access to all premium features"
              buttonText="Start Free Trial"
              buttonLink="https://example.com/signup"
              gradientColors={[
                "rgba(0,149,255,0.56)",
                "rgba(231,77,255,0.77)",
                "rgba(255,0,0,0.73)",
                "rgba(131,255,166,0.66)",
              ]}
              variant="default" // default, minimal, popup
            />
          </ComponentPanel>
        ) : null}

        {active === "Usage Meters" ? (
          <ComponentPanel>
            <UsageMeter
              usage={[
                {
                  name: "Claude Sonnet 4",
                  usage: 75,
                  limit: 100,
                },
                {
                  name: "ChatGPT 5",
                  usage: 12,
                  limit: 100,
                },
              ]}
              title="LLM Usage"
              description="Your usage of the LLM models"
              variant="linear"
              size="md"
              className="mx-auto"
            />
          </ComponentPanel>
        ) : null}

        {active === "Subscription Management" ? (
          <ComponentPanel>
            <div className="mt-4">
              <SubscriptionManagementDemo />
            </div>
          </ComponentPanel>
        ) : null}

        {active === "Plan Updates" ? (
          <ComponentPanel>
            <div className="mt-4 w-full">
              <UpdatePlanCardDemo />
            </div>
          </ComponentPanel>
        ) : null}

        {active === "Cancellation Flow" ? (
          <ComponentPanel>
            <div className=" flex items-center justify-center w-full">
              <CancelSubscriptionCard
                title="We're sorry to see you go..."
                description={`Before you cancel, we hope you'll consider upgrading to a ${plans[1].title} plan again.`}
                plan={plans[1]}
                leftPanelImageUrl="https://framerusercontent.com/images/GWE8vop9hubsuh3uWWn0vyuxEg.webp"
                warningTitle="You will lose access to your account"
                warningText="If you cancel your subscription, you will lose access to your account and all your data will be deleted."
                keepButtonText={`Keep My ${plans[1].title} Plan`}
                continueButtonText="Continue with Cancellation"
                finalTitle="Final Step - Confirm Cancellation"
                finalSubtitle="This action will immediately cancel your subscription"
                finalWarningText="You'll lose access to all Pro features and your data will be permanently deleted after 30 days."
                goBackButtonText="Wait, Go Back"
                confirmButtonText="Yes, Cancel My Subscription"
                onCancel={async (planId) => {
                  console.log("Cancelling subscription for plan:", planId);
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve(void 0);
                    }, 1000);
                  });
                }}
                onKeepSubscription={async (planId) => {
                  console.log("Keeping subscription for plan:", planId);
                }}
                className="max-w-4xl"
              />
            </div>
          </ComponentPanel>
        ) : null}
      </div>
    </div>
  );
}
