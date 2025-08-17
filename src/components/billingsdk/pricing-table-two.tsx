"use client";

import { Check, Minus } from "lucide-react";
import { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Plan } from "@/lib/const";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

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

const titleVariants = cva("mb-2 font-semibold text-3xl lg:text-5xl", {
  variants: {
    variant: {
      small: "text-2xl lg:text-3xl",
      medium: "text-3xl lg:text-4xl",
      large: "text-3xl lg:text-5xl",
    },
  },
  defaultVariants: {
    variant: "large",
  },
});

const descriptionVariants = cva("text-muted-foreground lg:text-lg", {
  variants: {
    variant: {
      small: "text-sm lg:text-base",
      medium: "text-base lg:text-lg",
      large: "lg:text-lg",
    },
  },
  defaultVariants: {
    variant: "large",
  },
});

const toggleWrapperVariants = cva("flex justify-center items-center gap-3", {
  variants: {
    variant: {
      small: "mt-6",
      medium: "mt-7",
      large: "mt-8",
    },
  },
  defaultVariants: {
    variant: "large",
  },
});

const toggleLabelVariants = cva("font-medium text-sm", {
  variants: {
    variant: {
      small: "text-xs",
      medium: "text-sm",
      large: "text-sm",
    },
  },
  defaultVariants: {
    variant: "large",
  },
});

const switchScaleVariants = cva("", {
  variants: {
    variant: {
      small: "scale-90",
      medium: "scale-95",
      large: "",
    },
  },
  defaultVariants: {
    variant: "large",
  },
});

const plansWrapperVariants = cva("flex", {
  variants: {
    variant: {
      small: "mt-6",
      medium: "mt-8",
      large: "mt-10",
    },
  },
  defaultVariants: {
    variant: "large",
  },
});

const cardVariants = cva(
  "bg-card text-card-foreground border shadow-sm flex w-full flex-col justify-between text-center rounded-xl md:rounded-none",
  {
    variants: {
      variant: {
        small: "py-4 gap-6",
        medium: "py-5 gap-7",
        large: "py-6 gap-8",
      },
    },
    defaultVariants: {
      variant: "large",
    },
  }
);

const priceTextVariants = cva("font-bold text-5xl", {
  variants: {
    variant: {
      small: "text-3xl",
      medium: "text-4xl",
      large: "text-5xl",
    },
  },
  defaultVariants: {
    variant: "large",
  },
});

const priceSubTextVariants = cva("text-muted-foreground mt-3", {
  variants: {
    variant: {
      small: "mt-2",
      medium: "mt-3",
      large: "mt-3",
    },
  },
  defaultVariants: {
    variant: "large",
  },
});

const tableWrapperVariants = cva("relative w-full overflow-x-auto mt-10", {
  variants: {
    variant: {
      small: "mt-6",
      medium: "mt-8",
      large: "mt-10",
    },
  },
  defaultVariants: {
    variant: "large",
  },
});

const featureIconVariants = cva("mx-auto size-5", {
  variants: {
    variant: {
      small: "size-4",
      medium: "size-5",
      large: "size-5",
    },
  },
  defaultVariants: {
    variant: "large",
  },
});

const firstColWidthVariants = cva("w-[200px]", {
  variants: {
    variant: {
      small: "w-[140px]",
      medium: "w-[180px]",
      large: "w-[200px]",
    },
  },
  defaultVariants: {
    variant: "large",
  },
});

interface PricingTableTwoProps extends VariantProps<typeof sectionVariants> {
  className?: string;
  plans: Plan[];
  title?: string;
  description?: string;
  onPlanSelect?: (planId: string) => void;
}

export function PricingTableTwo({ className, plans, title, description, onPlanSelect, variant }: PricingTableTwoProps) {
  const [isAnnually, setIsAnnually] = useState(false);

  // Use all plans from const.ts
  const filteredPlans: Plan[] = plans;

  return (
    <section className={cn(sectionVariants({ variant }), className)}>
      <div className="container max-w-5xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className={cn(titleVariants({ variant }))}>{title || "We offer 3 plans"}</h2>
          <p className={cn(descriptionVariants({ variant }))}>
            {description || "Lorem ipsum dolor sit amet consectetur adipisicing."}
          </p>
        </div>
        
        {/* Monthly/Yearly Toggle */}
        <div className={cn(toggleWrapperVariants({ variant }))}> 
          <span className={cn(
            toggleLabelVariants({ variant }),
            !isAnnually ? "text-foreground" : "text-muted-foreground"
          )}>
            Monthly
          </span>
          <Switch
            checked={isAnnually}
            onCheckedChange={setIsAnnually}
            className={cn(switchScaleVariants({ variant }))}
          />
          <span className={cn(
            toggleLabelVariants({ variant }),
            isAnnually ? "text-foreground" : "text-muted-foreground"
          )}>
            Yearly
          </span>
        </div>
        
        <div className={cn(
          plansWrapperVariants({ variant }),
          "gap-4 md:gap-0",
          filteredPlans.length === 1 && "flex-col max-w-md mx-auto",
          filteredPlans.length === 2 && "flex-col md:flex-row max-w-4xl mx-auto",
          filteredPlans.length >= 3 && "flex-col lg:flex-row max-w-7xl mx-auto"
        )}>
          {filteredPlans.map((plan: Plan, index: number) => (
            <div
              key={plan.id}
              className={cn(
                cardVariants({ variant }),
                // First card: rounded left corners
                index === 0 && "md:rounded-l-xl md:border-r-0",
                // Last card: rounded right corners
                index === filteredPlans.length - 1 && "md:rounded-r-xl md:border-l-0",
                // Middle cards: no rounded corners, no left border
                index > 0 && index < filteredPlans.length - 1 && "md:border-l-0 md:border-r-0",
                // Single card: all corners rounded
                filteredPlans.length === 1 && "rounded-xl",
                plan.highlight && "bg-muted/30 shadow-lg"
              )}
            >
              <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6">
                <div className="flex items-center gap-2">
                  <div className="leading-none font-semibold">{plan.title}</div>
                </div>
                <p className="text-muted-foreground text-left">{plan.description}</p>
              </div>
              
              <div className="px-6">
                {isAnnually ? (
                  <>
                    <span className={cn(priceTextVariants({ variant }))}>{plan.yearlyPrice}</span>
                    <p className={cn(priceSubTextVariants({ variant }))}>per year</p>
                  </>
                ) : (
                  <>
                    <span className={cn(priceTextVariants({ variant }))}>{plan.monthlyPrice}</span>
                    <p className={cn(priceSubTextVariants({ variant }))}>per month</p>
                  </>
                )}
              </div>
              
              <div className="flex items-center px-6">
                <Button 
                  className={cn(
                    "w-full",
                    plan.highlight && "shadow-lg"
                  )}
                  variant={plan.highlight ? "default" : "secondary"}
                onClick={() => onPlanSelect?.(plan.id)}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className={cn(tableWrapperVariants({ variant }))}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className={firstColWidthVariants({ variant })}></TableHead>
                {filteredPlans.map((plan: Plan) => (
                  <TableHead key={plan.id} className="text-center font-bold text-primary">
                    {plan.title}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Get all unique features from all plans */}
              {(() => {
                const allFeatures = new Set<string>();
                filteredPlans.forEach(plan => {
                  plan.features.forEach(feature => {
                    allFeatures.add(feature.name);
                  });
                });
                return Array.from(allFeatures).map((featureName, featureIndex) => (
                  <TableRow key={featureIndex}>
                    <TableCell className="font-medium text-left">{featureName}</TableCell>
                    {filteredPlans.map((plan: Plan) => {
                      const feature = plan.features.find(f => f.name === featureName);
                      return (
                        <TableCell key={plan.id} className="text-left">
                          {feature ? (
                            feature.icon === "check" ? (
                              <Check className={cn(featureIconVariants({ variant }))} />
                            ) : feature.icon === "minus" ? (
                              <Minus className={cn(featureIconVariants({ variant }))} />
                            ) : (
                              <span className="text-sm text-muted-foreground">{feature.name}</span>
                            )
                          ) : (
                            <Minus className={cn(featureIconVariants({ variant }))} />
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ));
              })()}
              
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}