"use client";

import Image from "next/image";

export function PlaygroundLogo() {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-1.5">
      <Image
        src="/logo/logo-dodo.svg"
        alt="Billing SDK"
        width={32}
        height={32}
        className="w-6 h-6 sm:w-7 sm:h-7"
      />
      <span className="text-lg sm:text-xl font-display text-foreground">/</span>
      <Image 
        src="/logo/Logo.svg" 
        alt="Billing SDK" 
        width={120} 
        height={120} 
        className="w-24 h-auto sm:w-28"
      />
    </div>
  );
}
