"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, CreditCard, Settings } from "lucide-react"
import { CurrentPlan, Plan } from "@/lib/const"
import { cn } from "@/lib/utils"
import { CancelSubscriptionDialog, CancelSubscriptionDialogProps } from "@/components/billingsdk/cancel-subscription-dialog"

interface SubscriptionManagementProps {
    className?: string
    currentPlan: CurrentPlan
    allPlans: Plan[]
    onUpdatePlan: (planId: string) => void
    cancelSubscription: CancelSubscriptionDialogProps
}

export function SubscriptionManagement({ className, currentPlan, allPlans, onUpdatePlan, cancelSubscription }: SubscriptionManagementProps) {

    return (<div className={cn("space-y-6 text-left w-full", className)}>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Current Subscription
                </CardTitle>
                <CardDescription>Manage your billing and subscription settings</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Current Plan Details */}
                <div className="flex items-center justify-between">
                    <div className="w-full">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{currentPlan.plan.title} Plan</h3>
                            <div className="flex items-center gap-2">
                                <Badge variant={currentPlan.status === "active" ? "default" : "outline"}>
                                    {currentPlan.type === `monthly` ? `${currentPlan.plan.monthlyPrice}/month` : currentPlan.type === `yearly` ? `${currentPlan.plan.yearlyPrice}/year` : `${currentPlan.price}`}
                                </Badge>
                                <Badge variant="outline">
                                    {currentPlan.status}
                                </Badge>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{currentPlan.plan.description}</p>
                    </div>
                </div>

                <Separator />

                {/* Billing Information */}
                <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Billing Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-muted-foreground">Next billing date:</span>
                            <div className="font-medium">{currentPlan.nextBillingDate}</div>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Payment method:</span>
                            <div className="font-medium">{currentPlan.paymentMethod}</div>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="flex items-center gap-2" onClick={() => onUpdatePlan(currentPlan.plan.id)}>
                        <Settings className="h-4 w-4" />
                        Update Plan
                    </Button>
                    <CancelSubscriptionDialog
                        className="mx-0"
                        {...cancelSubscription}
                    />
                </div>

                {/* Plan Features */}
                <div className="pt-4">
                    <h4 className="font-medium mb-3">Current Plan Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {currentPlan.plan.features.map((feature, index) => (
                            <div key={index} className="text-sm text-muted-foreground">
                                • {feature.name}
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
    )
}
