"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"

interface BannerProps {
  variant?: "default" | "minimal" | "popup"
  title: string
  description?: string
  buttonText?: string
  buttonIcon?: React.ReactNode
  buttonLink?: string
  className?: string
  autoDismiss?: number // in ms
  onDismiss?: () => void
}

export function Banner({
  variant = "default",
  title,
  description,
  buttonText,
  buttonIcon,
  buttonLink,
  className,
  autoDismiss,
  onDismiss,
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (isVisible && autoDismiss) {
      const timer = setTimeout(() => handleDismiss(), autoDismiss)
      return () => clearTimeout(timer)
    }
  }, [isVisible, autoDismiss])

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  const getVariantStyles = () => {
    switch (variant) {
      case "minimal":
        return {
          container:
            "sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60",
          wrapper:
            "relative container mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-center px-3 sm:px-4 py-2 gap-2 sm:gap-4 max-w-2xl",
          content: "flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2",
          title: "text-sm font-medium text-card-foreground leading-tight",
          description: "text-xs text-muted-foreground sm:ml-2",
          actions: "flex items-center gap-2 self-end sm:self-auto",
        }
      case "popup":
        return {
          container:
            "fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-sm sm:max-w-md w-[90%] sm:w-auto bg-popover border border-border rounded-lg shadow-lg",
          wrapper:
            "relative flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-4 py-3 gap-3 sm:gap-4",
          content: "flex flex-col sm:flex-row items-start sm:items-center gap-2 flex-1",
          title: "text-sm font-medium text-popover-foreground leading-snug",
          description: "text-xs text-muted-foreground",
          actions: "flex items-center gap-2 self-end sm:self-auto flex-shrink-0 pr-8",
        }
      default:
        return {
          container:
            "sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground shadow-sm text-left",
          wrapper:
            "relative container mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-4 py-2 sm:py-3 gap-2 sm:gap-4",
          content: "flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full",
          title: "text-sm font-medium text-primary-foreground leading-tight",
          description: "text-xs text-primary-foreground/80",
          actions: "flex items-center gap-2 self-end sm:self-auto pr-8",
        }
    }
  }

  const styles = getVariantStyles()

  const getAnimationProps = () => {
    switch (variant) {
      case "popup":
        return {
          initial: { opacity: 0, scale: 0.95, y: -20 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.95, y: -20 },
        }
      default:
        return {
          initial: { opacity: 0, y: -12 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -12 },
        }
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          {...getAnimationProps()}
          transition={{ duration: 0.25 }}
          className={cn(styles.container, className)}
        >
          <div className={styles.wrapper}>
            {/* Content */}
            <div className={styles.content}>
              <div className={variant === "minimal" ? "flex flex-row gap-2" : ""}>
                <p className={styles.title}>{title}</p>
                {description && <p className={styles.description}>{description}</p>}
              </div>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              {buttonText && variant !== "minimal" && (
                <Button
                  variant={variant === "default" ? "secondary" : "default"}
                  size="sm"
                  onClick={() => window.open(buttonLink, "_blank")}
                  className={"h-8"}
                >
                  {buttonIcon && <div className="flex-shrink-0 mr-1">{buttonIcon}</div>}
                  {buttonText}
                </Button>
              )}
            </div>

            {/* Close button (always top-right) */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDismiss}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8",
                variant === "default" && "hover:bg-primary-foreground/20 text-primary-foreground",
                variant === "popup" && "hover:bg-accent text-popover-foreground",
                variant === "minimal" && "hover:bg-accent text-card-foreground",
              )}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
