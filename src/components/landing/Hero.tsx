"use client"

import React from 'react'
import { Button } from "@/components/ui/button";
import { CustomCodeBlock } from "@/components/code";
import { motion } from "motion/react";
import Link from 'next/link';
const Hero = () => {
  const feature = {
    title: "Plan Upgrades in Seconds",
    description: "Beautiful plan upgrade interface - copy, paste, done!",
    code: `
  import { UpdatePlanCard } from "@/components/billingsdk/update-plan-card"
  import { plans } from "@/lib/billingsdk-config"

  export default function App() {
    return (
      <UpdatePlanCard
        currentPlan={plans[0]}
        plans={plans}
        onPlanChange={(planId) => console.log('Upgraded to:', planId)}
      />
    ) 
  }`,
    language: "tsx",
  };

  return (
    <div className="bg-[radial-gradient(131.66%_199.77%_at_50%_2.25%,transparent_37.41%,rgba(74,0,224,0.44)_69.27%,rgba(0,234,255,0.5)_100%)] dark:bg-[radial-gradient(131.66%_199.77%_at_50%_2.25%,transparent_37.41%,#4a00e070_69.27%,#ff_100%)]">
      {/* Content */}
      <motion.div
        className="relative z-10 pt-[calc(70vh/3)] px-6"
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Main Hero Section */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16 relative">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium font-display text-white mb-3 leading-tight"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              Ship Billing UIs <span className="text-orange-500">10x</span>{" "}
              Faster
            </motion.h1>

            <motion.p
              className="text-neutral-300/80 text-sm sm:text-lg max-w-2xl mx-auto tracking-tighter"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            >
              Stop reinventing the wheel. Use production-ready, accessible
              billing components, from pricing cards to subscription
              dashboards, built for React and ShadCN.
            </motion.p>

            {/* Email Signup */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center my-8 max-w-md mx-auto"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            >
              <Button className='bg-primary text-primary-foreground ring-primary before:from-primary-foreground/20 after:from-primary-foreground/10 relative isolate inline-flex items-center justify-center overflow-hidden rounded-md px-3 text-left text-sm font-medium ring-1 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-b before:opacity-80 before:transition-opacity before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md after:bg-gradient-to-b after:to-transparent after:mix-blend-overlay hover:cursor-pointer' asChild>
                <Link href="/docs">Get Started</Link>
              </Button>
              <Button variant="secondary" className="bg-secondary text-secondary-foreground ring-secondary before:from-secondary-foreground/20 after:from-secondary-foreground/10 relative isolate inline-flex items-center justify-center overflow-hidden rounded-md px-3 text-left text-sm font-medium ring-1 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-b before:opacity-80 before:transition-opacity before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md after:bg-gradient-to-b after:to-transparent after:mix-blend-overlay hover:cursor-pointer">Browse Components</Button>
            </motion.div>

            <motion.div
              className="hidden lg:block absolute -top-1 right-44"
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
            >
              <div className="relative">
                <div className="handwritten text-orange-400 text-base sm:text-lg transform rotate-15 whitespace-nowrap">
                  Fully Open Source
                </div>
              </div>
            </motion.div>
          </div>

          {/* Demo Section */}
          <motion.div
            className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 relative"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
          >
            {/* Handwritten annotations */}
            <motion.div
              className="hidden lg:block absolute -top-5 left-45"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
            >
              <div className="relative">
                <div className="handwritten text-blue-400 text-lg transform -rotate-12 whitespace-nowrap">
                  Easy to Use Components
                </div>
              </div>
            </motion.div>

            {/* Search Card */}
            <motion.div
              className="shadow-lg border-x border-t border-border mx-4 sm:mx-6 md:mx-8 mt-4 h-64 sm:h-72 lg:h-80 overflow-hidden w-full max-w-2xl"
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 }
              }}
              transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
            >
              {/* Window chrome */}
              <div className="py-2 px-4 border-b border-border bg-transparent border-l-foreground">
                <div className="flex items-center gap-1">
                  <div className="size-2 outline rounded-full outline-border"></div>
                  <div className="size-2 outline rounded-full outline-accent"></div>
                </div>
              </div>

              {/* Code block */}
              <CustomCodeBlock
                code={feature.code}
                language={feature.language}
                maxHeight="400px"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default Hero