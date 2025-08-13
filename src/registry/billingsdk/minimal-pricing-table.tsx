'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Plan {
  id: string
  title: string
  description: string
  price: string
  mau: string
  badge?: string
  features: {
    name: string
    icon: React.ReactNode
    iconColor?: string
    included: boolean
    price?: string
    toggleable?: boolean
    defaultChecked?: boolean
  }[]
  highlight?: string
  benefits: string[]
  buttonText: string
  buttonVariant?: 'default' | 'secondary' | 'outline'
}

interface PricingTableProps {
  className?: string
  plans: Plan[]
  onFeatureToggle?: (planId: string, feature: string, enabled: boolean) => void
  onPlanSelect?: (planId: string) => void
  showFooter?: boolean
  footerTitle?: string
  footerSubtitle?: string
  footerButtonText?: string
  onFooterButtonClick?: () => void
}

export function MinimalPricingTable({ className, plans, onFeatureToggle, onPlanSelect, showFooter, footerTitle, footerSubtitle, footerButtonText, onFooterButtonClick }: PricingTableProps) {
  return (
    <div className={cn("mt-10 max-w-7xl mx-auto border-1 rounded-md border-zinc-200 dark:border-zinc-800", className)}>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className={cn(
            "border-none text-zinc-900 dark:text-white flex flex-col rounded-none relative transition-all duration-200",
            plan.highlight === 'pro' 
              ? "bg-zinc-50 dark:bg-zinc-900 -mt-4 shadow-lg" 
              : "bg-white dark:bg-zinc-950"
          )}>
            {plan.badge && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-white px-3 py-1 text-xs">
                {plan.badge}
              </Badge>
            )}
            <CardHeader className="pb-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-left">{plan.title}</h3>
                <p className="text-sm w-2/3 text-left text-zinc-600 dark:text-zinc-400">{plan.description}</p>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold text-left">{plan.price}</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">{plan.mau}</span>
                  <Info className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 flex-1 flex flex-col">
              <div className="space-y-4 flex-1">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {feature.included ? (
                      <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                    ) : (
                      <div className={cn("w-4 h-4", feature.iconColor || "text-zinc-500")}>
                        {feature.icon}
                      </div>
                    )}
                    <span className="text-sm">{feature.name}</span>
                    {/* <Info className="w-4 h-4 text-zinc-400 dark:text-zinc-500" /> */}
                    {feature.included ? (
                      <span className="ml-auto text-sm text-zinc-600 dark:text-zinc-400">Included</span>
                    ) : (
                      <>
                        <span className="ml-auto text-sm text-zinc-600 dark:text-zinc-400">
                          {feature.price || 'Custom'}
                        </span>
                        {feature.toggleable && (
                          <Switch 
                            className="ml-2" 
                            defaultChecked={feature.defaultChecked}
                            onCheckedChange={(checked) => 
                              onFeatureToggle?.(plan.id, feature.name, checked)
                            }
                          />
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>

              <Button 
                className={cn(
                  "w-full mt-auto",
                  plan.highlight === 'pro' 
                    ? "bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-black" 
                    : "bg-zinc-200 hover:bg-zinc-300 text-zinc-900 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-white"
                )}
                variant={plan.buttonVariant}
                onClick={() => onPlanSelect?.(plan.id)}
              >
                {plan.buttonText}
              </Button>

              <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                {plan.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">{benefit}</span>
                    {index < 2 && <Info className="w-4 h-4 text-zinc-500 dark:text-zinc-600" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Section */}
      {showFooter !== false && (
        <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-950 p-6 border-t border-zinc-200 dark:border-zinc-800">
          <div>
            <p className="text-lg font-medium text-zinc-900 dark:text-white text-left">{footerTitle || "Pre-negotiated discounts are available to"}</p>
            <p className="text-lg font-medium text-zinc-900 dark:text-white text-left">{footerSubtitle || "early-stage startups and nonprofits."}</p>
          </div>
          <Button 
            className="bg-zinc-200 hover:bg-zinc-300 text-zinc-900 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-white px-6"
            onClick={onFooterButtonClick}
          >
            {footerButtonText || "Apply now"}
          </Button>
        </div>
      )}
    </div>
  )
}
