"use client"

import { useMemo, useRef, useState } from "react"
import { motion, useMotionValueEvent, useSpring, useTransform } from "motion/react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

export type UsageBasedPricingProps = {
  className?: string
  min?: number
  max?: number
  step?: number
  defaultValue?: number
  currency?: string
  basePrice?: number // flat monthly base that includes includedCredits
  includedCredits?: number
  unitPricePerCredit?: number // price per extra credit beyond includedCredits
  title?: string
  subtitle?: string
}

// Utility: clamp to [min,max]
function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max)
}

// Utility: compact number formatting with thousands separators
function formatNumber(n: number) {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n)
}

export function UsageBasedPricing({
  className,
  min = 4000,
  max = 25000,
  step = 250,
  defaultValue = 4000,
  currency = "$",
  basePrice = 39.99,
  includedCredits = 4000,
  unitPricePerCredit = 0.01,
  title = "Pay only for what you automate",
  subtitle = "Start with a flat monthly rate that includes 4,000 credits.",
}: UsageBasedPricingProps) {
  const [value, setValue] = useState(clamp(defaultValue, min, max))
  const trackRef = useRef<HTMLDivElement | null>(null)

  // Derived price
  const price = useMemo(() => {
    const extra = Math.max(0, value - includedCredits)
    const extraCost = extra * unitPricePerCredit
    return basePrice + extraCost
  }, [value, includedCredits, unitPricePerCredit, basePrice])

  // Animated price using spring
  const priceSpring = useSpring(price, { stiffness: 140, damping: 18, mass: 0.6 })
  const priceRounded = useTransform(priceSpring, (p: number) => Math.max(0, p))
  const [priceText, setPriceText] = useState(price.toFixed(2))
  useMotionValueEvent(priceRounded, "change", (v) => {
    setPriceText((v as number).toFixed(2))
  })

  // Percent across track for fill and thumb
  const pct = ((value - min) / (max - min)) * 100

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.target as Element).setPointerCapture?.(e.pointerId)
    updateFromEvent(e)
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return
    updateFromEvent(e)
  }
  const updateFromEvent = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const x = clamp(e.clientX - rect.left, 0, rect.width)
    const raw = min + (x / rect.width) * (max - min)
    const snapped = Math.round(raw / step) * step
    setValue(clamp(snapped, min, max))
  }

  // Marks: compute labels for start and end
  const startLabel = `${formatNumber(min)} credits`
  const endLabel = `${formatNumber(max + 1)} credits`

  return (
    <div className={cn("w-full text-center", className)}>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-display tracking-tight text-3xl md:text-5xl">{title}</h2>
          <p className="text-sm md:text-base text-muted-foreground">{subtitle} <span className="inline-block align-middle">🛈</span></p>
        </div>

        <Card className="mx-auto max-w-md shadow-xl">
          <CardContent className="py-6">
            <div className="mx-auto inline-flex items-end gap-2 rounded-2xl border border-border/60 bg-background px-8 py-5 shadow-inner">
              <span className="text-muted-foreground text-2xl">{currency}</span>
              <motion.span className="font-semibold leading-none tracking-tight text-5xl md:text-6xl tabular-nums"
                aria-live="polite" aria-atomic="true">
                {priceText}
              </motion.span>
            </div>
            <p className="mt-6 text-sm text-muted-foreground max-w-xl mx-auto">
              This pricing scales as your automations do. No surprises – just usage. Use the slider to preview your monthly cost. Custom pricing available.
            </p>
          </CardContent>
        </Card>

        <div className="mx-auto max-w-3xl">
          {/* Bubble value */}
          <div className="mb-2 flex justify-start" style={{ paddingLeft: `${pct}%` }}>
            <div className="-translate-x-1/2 rounded-full border bg-background px-3 py-1 text-xs shadow-sm">
              {formatNumber(value)}
            </div>
          </div>

          {/* Ruler Slider */}
          <div
            ref={trackRef}
            className="relative h-12 select-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
          >
            {/* Track with ticks - light gray, with repeating ticks */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-muted overflow-hidden">
              {/* Left filled track */}
              <div
                className="h-full bg-primary"
                style={{ width: `${pct}%` }}
              />
              {/* Tick marks overlay */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    `repeating-linear-gradient(to right, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 8px)`,
                  maskImage:
                    `linear-gradient(to right, black, black)`,
                }}
              />
            </div>

            {/* Thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${pct}%` }}
            >
              <div className="-translate-x-1/2 h-8 w-2 rounded-full bg-primary shadow-[0_0_0_2px_theme(colors.primary.DEFAULT)_inset]" />
              {/* Ruler stem below track for emphasis */}
              <div className="-translate-x-1/2 mt-1 h-3 w-0.5 bg-primary/80" />
            </div>
          </div>

          {/* Scale labels */}
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>{startLabel}</span>
            <span>{endLabel}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsageBasedPricing
