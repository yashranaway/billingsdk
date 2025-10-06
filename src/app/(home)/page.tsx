"use client";

import React from "react";
import { Footer2 } from "@/components/landing/footer2";
import Hero from "@/components/landing/Hero";
import { ComponentsSection } from "@/components/landing/components";
import Features from "@/components/landing/Features";
import { OpenSource } from "@/components/landing/opensource";
import { Faq } from "@/components/landing/faq";
import { QuickSteps } from "@/components/landing/quick-steps";
import { Footer } from "@/components/landing/footer";
import { QuickIntegration } from "@/components/landing/quick-integrations";

const Page = () => {
  return (
    <main className="w-full container mx-auto relative overflow-hidden p-4">
      <Hero />
      <Features />
      <ComponentsSection />
      {/* <QuickSteps /> */}
      <QuickIntegration />
      <Faq />
      <OpenSource />
      <Footer />
    </main>
  );
};

export default Page;
