"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { plans } from "@/lib/const"
import { cn } from "@/lib/utils"

export default function PricingTableOne({ className }: { className?: string }) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const gridCols =
    plans.length === 1
      ? "grid-cols-1"
      : plans.length === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : plans.length === 3
      ? "grid-cols-1 md:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"


  return (
    <div className={cn("bg-background/50 border border-border max-w-7xl mx-auto p-8 rounded-md", className)}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-5xl font-bold text-foreground mb-4 text-left">Pricing</h1>
            <p className="text-muted-foreground text-lg max-w-md text-left">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat odio, expedita neque ipsum pariatur
              suscipit!
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </Button>
            <Button
              variant="outline"
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                billingCycle === "yearly" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
            </Button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className={cn("grid gap-6", gridCols)}>
          {plans.map((plan, index) => (
            <Card key={plan.id} className="relative border border-border bg-card hover:bg-card/80 transition-colors">
              <CardHeader className="pb-8">
                <Badge variant="secondary" className="w-fit bg-primary text-primary-foreground hover:bg-primary/90 text-left">
                  {plan.title}
                </Badge>
                <div className="mt-4 text-left">
                  <div className="text-4xl font-bold text-foreground">
                    {billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                  </div>
                  <div className="text-muted-foreground text-sm mt-1">
                    {billingCycle === "monthly" ? "per month" : "per year"}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className={cn("h-4 w-4 flex-shrink-0", feature.iconColor)} />
                      <span
                        className={`text-sm`}
                      >
                        {typeof feature === "string" ? feature : feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
                    {plan.buttonText}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
