"use client";

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { type Plan } from "@/lib/billingsdk-config";
import { cn } from "@/lib/utils";
import { X, Circle } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import { getThemeStyles } from "@/lib/themes";

export interface CancelSubscriptionDialogProps {
    title?: string;
    description?: string;
    plan?: Plan;
    triggerButtonText?: string;
    leftPanelImageUrl?: string;
    warningTitle?: string;
    warningText?: string;
    keepButtonText?: string;
    continueButtonText?: string;
    finalTitle?: string;
    finalSubtitle?: string;
    finalWarningText?: string;
    goBackButtonText?: string;
    confirmButtonText?: string;
    onCancel?: (planId: string) => Promise<void> | void;
    onKeepSubscription?: (planId: string) => Promise<void> | void;
    onDialogClose?: () => void;
    className?: string;
}

export function CancelSubscriptionDialog({
    title = "Cancel Subscription",
    description = "We're sorry to see you go. Please review the details below.",
    plan,
    triggerButtonText = "Cancel Subscription",
    leftPanelImageUrl,
    warningTitle = "Are you sure?",
    warningText = "You'll lose access to all premium features immediately.",
    keepButtonText = "Keep Subscription",
    continueButtonText = "Continue Cancellation",
    finalTitle = "Final Confirmation",
    finalSubtitle = "This action cannot be undone",
    finalWarningText = "Your subscription will be cancelled immediately.",
    goBackButtonText = "Go Back",
    confirmButtonText = "Confirm Cancellation",
    onCancel = () => {},
    onKeepSubscription = () => {},
    onDialogClose = () => {},
    className,
}: CancelSubscriptionDialogProps) {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { currentTheme, previewDarkMode } = useTheme();
    const themeStyles = getThemeStyles(currentTheme, previewDarkMode);

    const handleContinueCancellation = () => {
        setShowConfirmation(true);
        setError(null);
    };

    const handleKeepSubscription = async () => {
        try {
            setIsLoading(true);
            setError(null);
            if (typeof onKeepSubscription === 'function' && plan?.id) {
                await onKeepSubscription(plan.id);
            }
            setIsOpen(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmCancellation = async () => {
        try {
            setIsLoading(true);
            setError(null);
            if (typeof onCancel === 'function' && plan?.id) {
                await onCancel(plan.id);
            }
            handleDialogClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to cancel subscription');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDialogClose = () => {
        setIsOpen(false);
        setShowConfirmation(false);
        setError(null);
        try {
            if (typeof onDialogClose === 'function') {
                onDialogClose();
            }
        } catch (error) {
            // Silently handle errors in playground mode
        }
    };

    const handleGoBack = () => {
        setShowConfirmation(false);
        setError(null);
    };

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isOpen) return;

            if (event.key === 'Escape') {
                event.preventDefault();
                handleDialogClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (open) {
                setIsOpen(true);
            } else {
                handleDialogClose();
            }
        }}>
            <DialogTrigger asChild>
                <Button variant="outline">{triggerButtonText || "Cancel Subscription"}</Button>
            </DialogTrigger>
            <DialogContent className={cn("sm:max-w-[1000px] flex flex-col md:flex-row p-0 overflow-hidden text-foreground w-[95%] md:w-[100%]", leftPanelImageUrl ? "" : "sm:max-w-[500px]", className)} style={themeStyles}>
                <DialogTitle className="sr-only">{title}</DialogTitle>
                <DialogClose
                    className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                    onClick={handleDialogClose}
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>
                {leftPanelImageUrl && (
                    <div className="w-full md:w-1/2 min-h-[500px] relative hidden md:block overflow-hidden">
                        <img src={leftPanelImageUrl} alt="Cancel Subscription" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/30 to-background/90 dark:block hidden"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/20 dark:block hidden"></div>
                    </div>
                )}
                <div className={cn("py-6 px-4 flex flex-col gap-4", leftPanelImageUrl ? "w-full md:w-1/2" : "w-full")}>
                    <div className="flex flex-col gap-2 text-center md:text-left">
                        <h2 className="md:text-2xl text-xl font-semibold">{title}</h2>
                        <p className="md:text-sm text-xs text-muted-foreground">{description}</p>
                        {error && (
                            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                                <p className="text-sm text-destructive">{error}</p>
                            </div>
                        )}
                    </div>

                    {/* Plan Details */}
                    {!showConfirmation && (
                        <div className="flex flex-col gap-4 p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-lg font-semibold">{plan?.title || 'Plan'}</h3>
                                    <span className="text-sm text-muted-foreground">Current subscription</span>
                                </div>
                                <Badge variant="secondary">
                                    {
                                        plan?.monthlyPrice && parseFloat(plan.monthlyPrice) >= 0 ?
                                            `${plan?.currency || '$'}${plan.monthlyPrice}/monthly` :
                                            `${plan?.monthlyPrice || '0'}/monthly`
                                    }
                                </Badge>
                            </div>
                            {Array.isArray(plan?.features) && plan.features.length > 0 && (
                                <ul className="space-y-2">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <Circle className="h-1.5 w-1.5 fill-current" />
                                            <span className="text-sm">{feature?.name || 'Feature'}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

                    {/* Warning Section */}
                    {!showConfirmation && (warningTitle || warningText) && (
                        <div className="p-4 bg-muted/30 border border-border rounded-lg">
                            {warningTitle && (
                                <h3 className="font-semibold text-foreground mb-2">
                                    {warningTitle}
                                </h3>
                            )}
                            {warningText && (
                                <p className="text-sm text-muted-foreground mb-2">
                                    {warningText}
                                </p>
                            )}
                            <p className="text-2xl font-bold">
                                ${plan?.monthlyPrice || '0'}
                                <span className="text-sm font-normal text-muted-foreground">/month</span>
                            </p>
                        </div>
                    )}
                    {/* Action Buttons */}
                    {!showConfirmation ? (
                        <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                            <Button
                                className="flex-1"
                                onClick={handleKeepSubscription}
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : (keepButtonText || "Keep My Subscription")}
                            </Button>
                            <Button
                                variant="destructive"
                                className="flex-1"
                                onClick={handleContinueCancellation}
                                disabled={isLoading}
                            >
                                {continueButtonText || "Continue Cancellation"}
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 mt-auto">
                            <div className="text-center p-4 bg-muted/50 rounded-lg">
                                <h3 className="font-semibold mb-2 text-foreground">
                                    {finalTitle || "Final Confirmation"}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                    {finalSubtitle || "Are you sure you want to cancel your subscription?"}
                                </p>
                                <p className="text-sm text-destructive">
                                    {finalWarningText || "This action cannot be undone and you'll lose access to all premium features."}
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={handleGoBack}
                                    disabled={isLoading}
                                >
                                    {goBackButtonText || "Go Back"}
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="flex-1"
                                    onClick={handleConfirmCancellation}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Cancelling..." : (confirmButtonText || "Yes, Cancel Subscription")}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}