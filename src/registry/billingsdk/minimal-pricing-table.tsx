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
    <div className={cn("mt-10 max-w-7xl mx-auto", className)}>
      <div className={cn(
        "grid",
        plans.length === 1 && "grid-cols-1 max-w-md mx-auto",
        plans.length === 2 && "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto",
        plans.length === 3 && "grid-cols-1 md:grid-cols-3",
        plans.length === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        plans.length >= 5 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      )}>
        {plans.map((plan) => (
          <Card key={plan.id} className={cn(
            "border-none text-card-foreground flex flex-col rounded-none relative transition-all duration-200",
            plan.highlight === 'pro' 
              ? "bg-muted/30 -mt-8 shadow-lg z-10 border-t rounded-md border-border" 
              : "bg-card"
          )}>
            {plan.badge && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-secondary text-secondary-foreground px-3 py-1 text-xs">
                {plan.badge}
              </Badge>
            )}
            <CardHeader className="pb-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-left">{plan.title}</h3>
                <p className="text-sm w-2/3 text-left text-muted-foreground">{plan.description}</p>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold text-left">{plan.price}</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 flex-1 flex flex-col">
              <div className="space-y-4 flex-1">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {feature.included ? (
                      <div className="w-2 h-2 bg-primary rounded-sm"></div>
                    ) : (
                      <div className={cn("w-4 h-4", feature.iconColor || "text-muted-foreground")}>
                        {feature.icon}
                      </div>
                    )}
                    <span className="text-sm">{feature.name}</span>
                    {feature.included ? (
                      <span className="ml-auto text-sm text-muted-foreground">Included</span>
                    ) : (
                      <>
                        <span className="ml-auto text-sm text-muted-foreground">
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
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
                    : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                )}
                variant={plan.buttonVariant}
                onClick={() => onPlanSelect?.(plan.id)}
              >
                {plan.buttonText}
              </Button>

              <div className="space-y-3 pt-4 border-t border-border">
                {plan.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                    {index < 2 && <Info className="w-4 h-4 text-muted-foreground" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Section */}
      {showFooter !== false && (
        <div className={cn(
          "flex items-center justify-between bg-muted/50 p-6 border-t border-border",
          plans.length === 1 && "max-w-md mx-auto",
          plans.length === 2 && "max-w-4xl mx-auto"
        )}>
          <div>
            <p className="text-lg font-medium text-card-foreground text-left">{footerTitle || "Pre-negotiated discounts are available to"}</p>
            <p className="text-lg font-medium text-card-foreground text-left">{footerSubtitle || "early-stage startups and nonprofits."}</p>
          </div>
          <Button 
            className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-6"
            onClick={onFooterButtonClick}
          >
            {footerButtonText || "Apply now"}
          </Button>
        </div>
      )}
    </div>
  )
}
