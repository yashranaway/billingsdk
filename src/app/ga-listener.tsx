"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { pageview } from "@/lib/gtag";

export function GALoader(): null {
  const pathname = usePathname();

  useEffect(() => {
    const search = typeof window !== "undefined" ? window.location.search : "";
    const url = `${pathname}${search}`;
    pageview(url);
  }, [pathname]);

  return null;
}


