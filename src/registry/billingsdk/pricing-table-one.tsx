"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Plan } from "@/lib/const";
import { cn } from "@/lib/utils";


const sectionVariants = cva("py-32", {
  variants: {
    variant: {
      small: "py-12",
      medium: "py-20",
      large: "py-32",
    },
  },
  defaultVariants: {
    variant: "medium",
  },
});

const titleVariants = cva("text-pretty text-left font-bold text-4xl lg:text-6xl", {
  variants: {
    variant: {
      small: "text-3xl lg:text-4xl",
      medium: "text-4xl lg:text-5xl",
      large: "text-4xl lg:text-6xl",
    },
  },
  defaultVariants: {
    variant: "large",
  },
});

const descriptionVariants = cva("text-muted-foreground max-w-3xl text-left lg:text-xl", {
  variants: {
    variant: {
      small: "text-base lg:text-lg",
      medium: "text-lg lg:text-xl",
      large: "lg:text-xl",
    },
  },
  defaultVariants: {
    variant: "large",
  },
});

const cardVariants = cva("flex w-full flex-col rounded-lg border text-left p-6", {
  variants: {
    variant: {
      small: "p-4",
      medium: "p-5",
      large: "p-6",
    },
  },
  defaultVariants: {
    variant: "large",
  },
});

const priceTextVariants = cva("font-medium text-4xl", {
  variants: {
    variant: {
      small: "text-3xl",
      medium: "text-4xl",
      large: "text-4xl",
    },
  },
  defaultVariants: {
    variant: "large",
  },
});

const featureIconVariants = cva("size-4", {
  variants: {
    variant: {
      small: "size-3",
      medium: "size-4",
      large: "size-4",
    },
  },
  defaultVariants: {
    variant: "large",
  },
});

interface PricingTableOneProps extends VariantProps<typeof sectionVariants> {
  className?: string;
  plans: Plan[];
  title?: string;
  description?: string;
  onPlanSelect?: (planId: string) => void;
}

export function PricingTableOne({ className, plans, title, description, onPlanSelect, variant }: PricingTableOneProps) {
  const [isAnnually, setIsAnnually] = useState(false);

  return (
    <section className={cn(sectionVariants({ variant }), className)}>
      <div className="container">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <h2 className={cn(titleVariants({ variant }))}>
            {title || "Pricing"}
          </h2>
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <p className={cn(descriptionVariants({ variant }))}>
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
                  cardVariants({ variant }),
                  plan.highlight && "bg-muted"
                )}
              >
                <Badge className="mb-8 block w-fit">{plan.title}</Badge>
                {isAnnually ? (
                  <>
                    <span className={cn(priceTextVariants({ variant }))}>{plan.yearlyPrice}</span>
                    <p className="text-muted-foreground">Per year</p>
                  </>
                ) : (
                  <>
                    <span className={cn(priceTextVariants({ variant }))}>{plan.monthlyPrice}</span>
                    <p className="text-muted-foreground">Per month</p>
                  </>
                )}
                <Separator className="my-6" />
                <div className="flex h-full flex-col justify-between gap-20">
                  <ul className="text-muted-foreground space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Check className={cn(featureIconVariants({ variant }))} />
                        <span>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow hover:bg-primary/90 h-9 py-2 group bg-primary text-primary-foreground ring-primary before:from-primary-foreground/20 after:from-primary-foreground/10 relative isolate inline-flex w-full items-center justify-center overflow-hidden rounded-md px-3 text-left text-sm font-medium ring-1 transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-b before:opacity-80 before:transition-opacity before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md after:bg-gradient-to-b after:to-transparent after:mix-blend-overlay" 
                    onClick={() => onPlanSelect?.(plan.id)}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
