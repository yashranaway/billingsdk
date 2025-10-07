"use client";

import React from "react";
import Hero from "@/components/landing/Hero";
import { ComponentsSection } from "@/components/landing/components";
import Features from "@/components/landing/Features";
import { OpenSource } from "@/components/landing/opensource";
import { Faq } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";
import { QuickIntegration } from "@/components/landing/quick-integrations";

const Page = () => {
  return (
    <main className="w-full container mx-auto relative overflow-hidden p-4">
      <Hero />
      <Features />
      <ComponentsSection />
      <QuickIntegration />
      <Faq />
      <OpenSource />
      <Footer />
    </main>
  );
};

export default Page;
