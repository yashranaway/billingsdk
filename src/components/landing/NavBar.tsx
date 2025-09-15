"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import GitHubStarBadge from "./GitHubStarBadge";

export const Logo = () => {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 cursor-pointer">
      <Image
        src="/logo/logo-dodo.svg"
        alt="Billing SDK"
        width={24}
        height={24}
        className="w-6 h-6 sm:w-7 sm:h-7"
      />
      <span className="text-2xl sm:text-3xl font-display">/</span>
      <Image 
        src="/logo/Logo.svg" 
        alt="Billing SDK" 
        width={120} 
        height={120}
        className="w-20 h-auto sm:w-[120px]"
      />
    </div>
  );
};

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const isHome = pathname === "/";
  
  useMotionValueEvent(scrollY, "change", (current) =>
    setIsScrolled(current >= 20)
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={cn(
        `fixed left-0 right-0 top-0 z-50 flex justify-center transition-all duration-300`,
        isScrolled ? "py-0" : "p-2 sm:p-5"
      )}
    >
      <div className="max-w-[1920px] mx-auto w-full">
        <div
          className={cn(
            `flex items-center w-full justify-between transition-all duration-300`,
            `px-4 py-3 sm:px-6`,
            isScrolled &&
              "bg-white/10 backdrop-blur-md border border-white/20 rounded-b-lg"
          )}
        >
          <Link href="/" className="inline-flex items-center" aria-label="Go to home">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <GitHubStarBadge />
            <Button
              size="sm"
              className="bg-primary text-primary-foreground ring-primary before:from-primary-foreground/20 after:from-primary-foreground/10 relative isolate inline-flex items-center justify-center overflow-hidden rounded-md px-3 py-2 text-left text-sm font-medium ring-1 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-b before:opacity-80 before:transition-opacity before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md after:bg-gradient-to-b after:to-transparent after:mix-blend-overlay hover:cursor-pointer"
              asChild
            >
              <Link href="/docs">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            {/* Show GitHub star badge outside the dropdown/sidebar */}
            <GitHubStarBadge />
            {!isHome && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="p-2"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <HiX className="h-5 w-5" />
                ) : (
                  <HiMenu className="h-5 w-5" />
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown (hidden on homepage) */}
        {isMobileMenuOpen && !isHome && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border border-white/20 rounded-b-lg mx-4 sm:mx-6 mt-1 p-4 space-y-3">
            {/* Add mobile-only links here if needed; kept empty per request to avoid duplicates */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
