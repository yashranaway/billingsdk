'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { Plan } from "@/lib/const"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cva, type VariantProps } from "class-variance-authority"

const sectionVariants = cva("mt-10 max-w-7xl mx-auto", {
  variants: {
    variant: {
      small: "mt-6",
      medium: "mt-8",
      large: "mt-10",
    },
  },
  defaultVariants: {
    variant: "small",
  },
})

const toggleContainerVariants = cva(
  "bg-muted flex h-11 w-fit shrink-0 items-center rounded-md p-1 text-lg",
  {
    variants: {
      variant: {
        small: "h-9 text-base",
        medium: "h-10 text-lg",
        large: "h-11 text-lg",
      },
    },
    defaultVariants: {
      variant: "large",
    },
  }
)

const labelPaddingVariants = cva("px-7", {
  variants: {
    variant: {
      small: "px-5",
      medium: "px-6",
      large: "px-7",
    },
  },
  defaultVariants: {
    variant: "large",
  },
})

const cardTitleVariants = cva("text-xl", {
  variants: {
    variant: {
      small: "text-lg",
      medium: "text-xl",
      large: "text-xl",
    },
  },
  defaultVariants: {
    variant: "large",
  },
})

const cardDescriptionVariants = cva("text-sm", {
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
})

const priceTextVariants = cva("text-4xl font-medium", {
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
})

const featureIconVariants = cva("w-4 h-4", {
  variants: {
    variant: {
      small: "w-3 h-3",
      medium: "w-4 h-4",
      large: "w-4 h-4",
    },
  },
  defaultVariants: {
    variant: "large",
  },
})

const footerWrapperVariants = cva(
  "flex items-center justify-between bg-muted/50 p-6 border-t border-border",
  {
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
  }
)

const footerTextVariants = cva("text-lg font-medium text-card-foreground text-left", {
  variants: {
    variant: {
      small: "text-base",
      medium: "text-lg",
      large: "text-lg",
    },
  },
  defaultVariants: {
    variant: "large",
  },
})

interface PricingTableProps extends VariantProps<typeof sectionVariants> {
  className?: string
  plans: Plan[]
  onPlanSelect?: (planId: string) => void
  showFooter?: boolean
  footerTitle?: string
  footerSubtitle?: string
  footerButtonText?: string
  onFooterButtonClick?: () => void
}

export function PricingTableThree({ className, plans, onPlanSelect, showFooter, footerTitle, footerSubtitle, footerButtonText, onFooterButtonClick, variant }: PricingTableProps) {
  const [isAnnually, setIsAnnually] = useState(false);

  return (
    <div className={cn(sectionVariants({ variant }), className)}>
      {/* Header Section with Toggle */}
      <div className="flex flex-col justify-between gap-10 md:flex-row mb-8">
        <div className={cn(toggleContainerVariants({ variant }))}>
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
                className={cn(
                  "text-muted-foreground peer-data-[state=checked]:text-primary flex h-full cursor-pointer items-center justify-center font-semibold",
                  labelPaddingVariants({ variant })
                )}
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
                className={cn(
                  "text-muted-foreground peer-data-[state=checked]:text-primary flex h-full cursor-pointer items-center justify-center gap-1 font-semibold",
                  labelPaddingVariants({ variant })
                )}
              >
                Yearly
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className={cn(
        "grid gap-4 md:gap-0",
        plans.length === 1 && "grid-cols-1 max-w-md mx-auto",
        plans.length === 2 && "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto",
        plans.length === 3 && "grid-cols-1 md:grid-cols-3",
        plans.length === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        plans.length >= 5 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      )}>
        {plans.map((plan) => (
          <Card key={plan.id} className={cn(
            "border rounded-xl md:border-none md:rounded-none text-card-foreground flex flex-col relative transition-all duration-200 shadow-sm md:shadow-none",
            plan.highlight === true
              ? "bg-muted/30 md:-mt-8 shadow-lg z-10 md:border-t md:rounded-md border-border" 
              : "bg-card"
          )}>
            {plan.badge && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-secondary text-secondary-foreground px-3 py-1 text-xs">
                {plan.badge}
              </Badge>
            )}
            <CardHeader className="pb-4">
              <div className="space-y-2">
                <h3 className={cn(cardTitleVariants({ variant }), "font-semibold text-left")}>{plan.title}</h3>
                <p className={cn(cardDescriptionVariants({ variant }), "w-full text-left text-muted-foreground")}>{plan.description}</p>
              </div>
              <div className="space-y-1 text-left">
                {isAnnually ? (
                  <>
                    <span className={cn(priceTextVariants({ variant }), "text-left")}>{plan.yearlyPrice}</span>
                    <p className="text-muted-foreground">Per year</p>
                  </>
                ) : (
                  <>
                    <span className={cn(priceTextVariants({ variant }), "text-left")}>{plan.monthlyPrice}</span>
                    <p className="text-muted-foreground">Per month</p>
                  </>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6 flex-1 flex flex-col">
              <div className="space-y-4 flex-1">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {feature.icon === "check" ? (
                      <div className="w-2 h-2 bg-primary rounded-sm"></div>
                    ) : (
                      <div className={cn(featureIconVariants({ variant }), feature.iconColor || "text-muted-foreground") }>
                        <Check className={cn(featureIconVariants({ variant }))} />
                      </div>
                    )}
                    <span className="text-sm">{feature.name}</span>
                    <span className="ml-auto text-sm text-muted-foreground">Included</span>
                  </div>
                ))}
              </div>

              <Button 
                className={cn(
                  "w-full mt-auto",
                  plan.highlight === true
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
                    : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                )}
                onClick={() => onPlanSelect?.(plan.id)}
              >
                {plan.buttonText}
              </Button>

              {plan.benefits && (
                <div className="space-y-3 pt-4 border-t border-border">
                  {plan.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                      {index < 2 && <Info className="w-4 h-4 text-muted-foreground" />}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Section */}
      {showFooter !== false && (
        <div className={cn(
          footerWrapperVariants({ variant }),
          plans.length === 1 && "max-w-md mx-auto",
          plans.length === 2 && "max-w-4xl mx-auto"
        )}>
          <div>
            <p className={cn(footerTextVariants({ variant }))}>{footerTitle || "Pre-negotiated discounts are available to"}</p>
            <p className={cn(footerTextVariants({ variant }))}>{footerSubtitle || "early-stage startups and nonprofits."}</p>
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
