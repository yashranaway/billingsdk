// "use client";

// import Hero from "@/components/landing/Hero";
// import Features from "@/components/landing/Features";
// import { CodeSection } from "@/components/landing/code-section";
// import { Footer } from "@/components/landing/footer";
// import { ComponentsSection } from "@/components/landing/components";
// import { Footer2 } from "@/components/landing/footer2";

// export default function HomePage() {
//   return (
//     <main className="max-w-6xl bg-background 2xl:max-w-[1400px] mx-auto border-x flex flex-col items-end border-t border-border">
//       <Hero />
//       <Features />
//       <ComponentsSection />
//       <CodeSection />
//       <Footer />
//       <Footer2 />
//     </main>
//   );
// }


import React from "react";
import { Footer2 } from "@/components/landing/footer2";
import Hero from "@/components/landing_v2/Hero";
import { ComponentsSection } from "@/components/landing/components";
import Features from "@/components/landing/Features";
import { Footer } from "@/components/landing/footer";

const Page = () => {
  return (
    <main className="w-full relative overflow-hidden p-4">
      <Hero />
      <Features />
      <ComponentsSection />
      <Footer />
      <Footer2 />
    </main>
  );
};

export default Page;
