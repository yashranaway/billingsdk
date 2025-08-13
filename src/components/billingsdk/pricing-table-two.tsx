"use client";

import { Check, Minus } from "lucide-react";
import { useState } from "react";

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

interface PricingTableTwoProps {
  className?: string;
  plans: Plan[];
  title?: string;
  description?: string;
  onPlanSelect?: (planId: string) => void;
}

export function PricingTableTwo({ className, plans, title, description, onPlanSelect }: PricingTableTwoProps) {
  const [isAnnually, setIsAnnually] = useState(false);

  // Use all plans from const.ts
  const filteredPlans: Plan[] = plans;

  return (
    <section className={cn("py-32", className)}>
      <div className="container max-w-5xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="mb-2 text-3xl font-semibold lg:text-5xl">{title || "We offer 3 plans"}</h2>
          <p className="text-muted-foreground lg:text-lg">
            {description || "Lorem ipsum dolor sit amet consectetur adipisicing."}
          </p>
        </div>
        
        {/* Monthly/Yearly Toggle */}
        <div className="mt-8 flex justify-center items-center gap-3">
          <span className={cn(
            "text-sm font-medium",
            !isAnnually ? "text-foreground" : "text-muted-foreground"
          )}>
            Monthly
          </span>
          <Switch
            checked={isAnnually}
            onCheckedChange={setIsAnnually}
            className="data-[state=checked]:bg-primary"
          />
          <span className={cn(
            "text-sm font-medium",
            isAnnually ? "text-foreground" : "text-muted-foreground"
          )}>
            Yearly
          </span>
        </div>
        
        <div className={cn(
          "mt-10 flex gap-0",
          filteredPlans.length === 1 && "flex-col max-w-md mx-auto",
          filteredPlans.length === 2 && "flex-col md:flex-row max-w-4xl mx-auto",
          filteredPlans.length >= 3 && "flex-col lg:flex-row max-w-7xl mx-auto"
        )}>
          {filteredPlans.map((plan: Plan, index: number) => (
            <div
              key={plan.id}
              className={cn(
                "bg-card text-card-foreground border py-6 shadow-sm flex w-full flex-col justify-between gap-8 text-center",
                // First card: rounded left corners
                index === 0 && "rounded-l-xl border-r-0",
                // Last card: rounded right corners
                index === filteredPlans.length - 1 && "rounded-r-xl border-l-0",
                // Middle cards: no rounded corners, no left border
                index > 0 && index < filteredPlans.length - 1 && "border-l-0 border-r-0",
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
                    <span className="text-5xl font-bold">{plan.yearlyPrice}</span>
                    <p className="mt-3 text-muted-foreground">per year</p>
                  </>
                ) : (
                  <>
                    <span className="text-5xl font-bold">{plan.monthlyPrice}</span>
                    <p className="mt-3 text-muted-foreground">per month</p>
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
        
        <div className="relative w-full overflow-x-auto mt-10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]"></TableHead>
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
                              <Check className="size-5 mx-auto" />
                            ) : feature.icon === "minus" ? (
                              <Minus className="size-5 mx-auto" />
                            ) : (
                              <span className="text-sm text-muted-foreground">{feature.name}</span>
                            )
                          ) : (
                            <Minus className="size-5 mx-auto" />
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