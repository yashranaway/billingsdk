"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Plan } from "@/lib/const";
import { cn } from "@/lib/utils";


interface PricingTableOneProps {
  className?: string;
  plans: Plan[];
  title?: string;
  description?: string;
  onPlanSelect?: (planId: string) => void;
}

export default function PricingTableOne({ className, plans, title, description, onPlanSelect }: PricingTableOneProps) {
  const [isAnnually, setIsAnnually] = useState(false);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <h2 className="text-pretty text-4xl font-bold lg:text-6xl text-left">
            {title || "Pricing"}
          </h2>
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <p className="text-muted-foreground max-w-3xl lg:text-xl text-left">
              {description || "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat odio, expedita neque ipsum pariatur suscipit!"}
            </p>
            <div className="bg-muted flex h-11 w-fit shrink-0 items-center rounded-md p-1 text-lg">
              <RadioGroup
                defaultValue="monthly"
                className="h-full grid-cols-2"
                onValueChange={(value) => {
                  setIsAnnually(value === "annually");
                }}
              >
                <div className='has-[button[data-state="checked"]]:bg-background h-full rounded-md transition-all'>
                  <RadioGroupItem
                    value="monthly"
                    id="monthly"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="monthly"
                    className="text-muted-foreground peer-data-[state=checked]:text-primary flex h-full cursor-pointer items-center justify-center px-7 font-semibold"
                  >
                    Monthly
                  </Label>
                </div>
                <div className='has-[button[data-state="checked"]]:bg-background h-full rounded-md transition-all'>
                  <RadioGroupItem
                    value="annually"
                    id="annually"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="annually"
                    className="text-muted-foreground peer-data-[state=checked]:text-primary flex h-full cursor-pointer items-center justify-center gap-1 px-7 font-semibold"
                  >
                    Yearly
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="flex w-full flex-col items-stretch gap-6 md:flex-row">
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                className={cn(
                  "flex w-full flex-col rounded-lg border p-6 text-left",
                  plan.highlight && "bg-muted"
                )}
              >
                <Badge className="mb-8 block w-fit">{plan.title}</Badge>
                {isAnnually ? (
                  <>
                    <span className="text-4xl font-medium">{plan.yearlyPrice}</span>
                    <p className="text-muted-foreground">Per year</p>
                  </>
                ) : (
                  <>
                    <span className="text-4xl font-medium">{plan.monthlyPrice}</span>
                    <p className="text-muted-foreground">Per month</p>
                  </>
                )}
                <Separator className="my-6" />
                <div className="flex h-full flex-col justify-between gap-20">
                  <ul className="text-muted-foreground space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Check className="size-4" />
                        <span>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" onClick={() => onPlanSelect?.(plan.id)}>{plan.buttonText}</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
