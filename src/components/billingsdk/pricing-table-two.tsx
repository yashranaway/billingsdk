"use client";

import { Check, Minus } from "lucide-react";
import { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "motion/react";

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

  function calculateDiscount(monthlyPrice: string, yearlyPrice: string): number {
    const monthly = parseFloat(monthlyPrice);
    const yearly = parseFloat(yearlyPrice);

    if (
      monthlyPrice.toLowerCase() === "custom" ||
      yearlyPrice.toLowerCase() === "custom" ||
      isNaN(monthly) ||
      isNaN(yearly) ||
      monthly === 0
    ) {
      return 0;
    }

    const discount = ((monthly * 12 - yearly) / (monthly * 12)) * 100;
    return Math.round(discount);
  }

  const yearlyPriceDiscount = plans.length
    ? Math.max(
      ...plans.map((plan) =>
        calculateDiscount(plan.monthlyPrice, plan.yearlyPrice)
      )
    )
    : 0;

  return (
    <section className={cn(sectionVariants({ variant }), className)}>
      <div className="container max-w-5xl">
        <motion.div
          className="flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className={cn(titleVariants({ variant }))}>{title || "We offer 3 plans"}</h2>
          <p className={cn(descriptionVariants({ variant }))}>
            {description || "Lorem ipsum dolor sit amet consectetur adipisicing."}
          </p>
        </motion.div>

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
        <div className="flex justify-center">
          {yearlyPriceDiscount > 0 && (
            <motion.span
              className="text-xs mt-2 text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Save upto {yearlyPriceDiscount}% with yearly plan
            </motion.span>
          )}
        </div>

        <div className={cn(
          plansWrapperVariants({ variant }),
          "gap-4 md:gap-0",
          plans.length === 1 && "flex-col max-w-md mx-auto",
          plans.length === 2 && "flex-col md:flex-row max-w-4xl mx-auto",
          plans.length >= 3 && "flex-col lg:flex-row max-w-7xl mx-auto"
        )}>
          {plans.map((plan: Plan, index: number) => (
            <motion.div
              key={plan.id}
              className={cn(
                cardVariants({ variant }),
                index === 0 && "md:rounded-l-xl md:border-r-0",
                index === plans.length - 1 && "md:rounded-r-xl md:border-l-0",
                index > 0 && index < plans.length - 1 && "md:border-l-0 md:border-r-0",
                plans.length === 1 && "rounded-xl",
                plan.highlight && "bg-muted/30 shadow-lg"
              )}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
            >
              <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6">
                <div className="flex items-center gap-2">
                  <div className="leading-none font-semibold">{plan.title}</div>
                </div>
                <p className="text-muted-foreground text-left">{plan.description}</p>
              </div>

              <div className="px-6">
                <AnimatePresence mode="wait">
                  {isAnnually ? (
                    <motion.div
                      key="yearly"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className={cn(priceTextVariants({ variant }))}>
                        {parseFloat(plan.yearlyPrice) >= 0 && (
                          <>{plan.currency}</>
                        )}
                        {plan.yearlyPrice}
                        {calculateDiscount(plan.monthlyPrice, plan.yearlyPrice) > 0 && (
                          <span className="text-xs ml-2 underline">
                            {calculateDiscount(plan.monthlyPrice, plan.yearlyPrice)}% off
                          </span>
                        )}
                      </span>
                      <p className={cn(priceSubTextVariants({ variant }))}>per year</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="monthly"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className={cn(priceTextVariants({ variant }))}>
                        {parseFloat(plan.monthlyPrice) >= 0 && (
                          <>{plan.currency}</>
                        )}
                        {plan.monthlyPrice}
                      </span>
                      <p className={cn(priceSubTextVariants({ variant }))}>per month</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center px-6">
                <Button
                  className={cn(
                    "w-full hover:cursor-pointer",
                    plan.highlight && "gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow hover:bg-primary/90 h-9 py-2 group bg-primary text-primary-foreground ring-primary before:from-primary-foreground/20 after:from-primary-foreground/10 relative isolate inline-flex w-full items-center justify-center overflow-hidden rounded-md px-3 text-left text-sm font-medium ring-1 transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-b before:opacity-80 before:transition-opacity before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md after:bg-gradient-to-b after:to-transparent after:mix-blend-overlay"
                  )}
                  variant={plan.highlight ? "default" : "secondary"}
                  onClick={() => onPlanSelect?.(plan.id)}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={cn(tableWrapperVariants({ variant }))}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className={firstColWidthVariants({ variant })}></TableHead>
                {plans.map((plan: Plan) => (
                  <TableHead key={plan.id} className="text-center font-bold text-primary">
                    {plan.title}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {(() => {
                const allFeatures = new Set<string>();
                plans.forEach(plan => {
                  plan.features.forEach(feature => {
                    allFeatures.add(feature.name);
                  });
                });
                return Array.from(allFeatures).map((featureName, featureIndex) => (
                  <TableRow key={featureIndex}>
                    <TableCell className="font-medium text-left">{featureName}</TableCell>
                    {plans.map((plan: Plan) => {
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
        </motion.div>
      </div>
    </section>
  );
}
