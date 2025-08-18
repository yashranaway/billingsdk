"use client"

import { cn } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, useSpring, useMotionValue, useTransform } from "motion/react"
import { useEffect } from "react"

interface UsageMeterProps {
    usage: number
    limit: number
    className?: string
    variant?: "linear" | "circle"
    size?: "sm" | "md" | "lg"
    title?: string
    description?: string
}

export function UsageMeter({
    usage,
    limit,
    className,
    variant = "linear",
    size = "md",
    title,
    description,
}: UsageMeterProps) {
    const percentage = Math.min((usage / limit) * 100, 100)
    const remaining = Math.max(limit - usage, 0)

    // Smooth count-up animation for percentage
    const motionValue = useMotionValue(0)
    const springValue = useSpring(motionValue, { stiffness: 100, damping: 20 })
    const display = useTransform(springValue, (latest) => `${Math.round(latest)}%`)

    useEffect(() => {
        motionValue.set(percentage)
    }, [percentage, motionValue])

    const getStatus = () => {
        if (percentage >= 90) {
            return <Badge variant="destructive">Critical</Badge>
        }
        if (percentage >= 75) {
            return <Badge variant="secondary">High</Badge>
        }
        return null
    }

    if (variant === "circle") {
        const sizeConfig = {
            sm: { circle: 80, stroke: 6, text: "text-base", label: "text-xs" },
            md: { circle: 120, stroke: 8, text: "text-xl", label: "text-sm" },
            lg: { circle: 160, stroke: 10, text: "text-2xl", label: "text-base" },
        }

        const config = sizeConfig[size]
        const radius = (config.circle - config.stroke) / 2
        const circumference = radius * 2 * Math.PI

        return (
            <Card className={cn("text-left mx-auto w-full max-w-sm", className)}>
                <CardHeader className="pb-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <CardTitle className="text-sm font-medium flex-1 min-w-0 truncate">{title}</CardTitle>
                        <span className="text-xs text-muted-foreground shrink-0">
                            {remaining.toLocaleString()} / {limit.toLocaleString()} left
                        </span>
                    </div>
                    {description && (
                        <CardDescription className="text-xs text-muted-foreground">
                            {description}
                        </CardDescription>
                    )}
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex justify-center">
                        <div className="relative">
                            <svg
                                width={config.circle}
                                height={config.circle}
                                className="transform -rotate-90"
                            >
                                {/* background ring */}
                                <circle
                                    cx={config.circle / 2}
                                    cy={config.circle / 2}
                                    r={radius}
                                    stroke="currentColor"
                                    strokeWidth={config.stroke}
                                    fill="transparent"
                                    className="text-muted"
                                />

                                {/* animated progress ring */}
                                <motion.circle
                                    cx={config.circle / 2}
                                    cy={config.circle / 2}
                                    r={radius}
                                    stroke="currentColor"
                                    strokeWidth={config.stroke}
                                    fill="transparent"
                                    strokeDasharray={circumference}
                                    strokeLinecap="round"
                                    className="text-primary"
                                    initial={{ strokeDashoffset: circumference }}
                                    animate={{ strokeDashoffset: circumference - (percentage / 100) * circumference }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                />

                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <motion.span
                                    className={cn("font-bold text-foreground", config.text)}
                                >
                                    {display}
                                </motion.span>
                                <span className="text-xs text-muted-foreground">used</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">{getStatus()}</div>
                </CardContent>
            </Card>
        )
    }

    // linear variant
    const sizeConfig = {
        sm: { bar: "h-2", text: "text-xs" },
        md: { bar: "h-3", text: "text-sm" },
        lg: { bar: "h-4", text: "text-base" },
    }

    const config = sizeConfig[size]

    return (
        <Card className={cn("text-left mx-auto w-full max-w-sm", className)}>
            <CardHeader className="pb-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <CardTitle className="text-sm font-medium flex-1 min-w-0 truncate">{title}</CardTitle>
                    <motion.span className="text-xs text-muted-foreground shrink-0">
                        {display}
                    </motion.span>
                </div>
                {description && (
                    <CardDescription className="text-xs text-muted-foreground">
                        {description}
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent className="space-y-3">
                <div className={cn("w-full bg-muted rounded-full overflow-hidden", config.bar)}>
                    <motion.div
                        className={cn(
                            "rounded-full bg-gradient-to-r from-primary to-primary/80",
                            config.bar
                        )}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={cn("text-muted-foreground flex-1 min-w-0 truncate", config.text)}>
                        {remaining.toLocaleString()} / {limit.toLocaleString()} left
                    </span>
                    {getStatus()}
                </div>
            </CardContent>
        </Card>
    )
}
