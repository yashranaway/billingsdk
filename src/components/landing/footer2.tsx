import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaGithub, FaHeart } from "react-icons/fa";
import Image from "next/image";

export function Footer2() {
    return (
        <footer className="bg-background border-t border-border w-full">
            <div className="py-8 sm:py-10 md:py-12 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Top Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
                        <div className="sm:col-span-2 lg:col-span-1">
                            <div className="flex items-center mb-3 sm:mb-4">
                                <div className="flex items-center justify-center">
                                    <Image src="/logo/Logo.svg" alt="BillingSDK Logo" width={160} height={32} className="h-6 sm:h-7 md:h-8 w-auto" />
                                </div>
                            </div>
                            <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                                Open-source React components for modern billing and subscription management.
                            </p>
                            <div className="flex gap-1">
                                <Button variant="ghost" size="sm" asChild className="p-2">
                                    <Link href="https://github.com/dodopayments/billingsdk" target="_blank" rel="noopener noreferrer">
                                        <FaGithub className="h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button variant="ghost" size="sm" asChild className="p-2">
                                    <Link href="https://dodopayments.com/" target="_blank" rel="noopener noreferrer">
                                        <Image src="/logo/logo-dodo.svg" alt="Dodo Payments" width={16} height={16} className="h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button variant="ghost" size="sm" asChild className="p-2">
                                    <Link href="https://x.com/dodopayments" target="_blank" rel="noopener noreferrer">
                                        <BsTwitterX className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        <div className="mt-6 sm:mt-0">
                            <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Components</h4>
                            <ul className="space-y-2 sm:space-y-3 text-sm">
                                <li>
                                    <Link href="/docs/components/pricing-table/pricing-table-one" className="text-muted-foreground hover:text-foreground transition-colors block py-1">
                                        Pricing Tables
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/docs/components/usage-meter/usage-meter-linear" className="text-muted-foreground hover:text-foreground transition-colors block py-1">
                                        Usage Meters
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/docs/components/manage-subscription" className="text-muted-foreground hover:text-foreground transition-colors block py-1">
                                        Subscription Management
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/docs/components/banner" className="text-muted-foreground hover:text-foreground transition-colors block py-1">
                                        Banners
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-6 sm:mt-0">
                            <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Resources</h4>
                            <ul className="space-y-2 sm:space-y-3 text-sm">
                                <li>
                                    <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors block py-1">
                                        Documentation
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/docs/quick-start" className="text-muted-foreground hover:text-foreground transition-colors block py-1">
                                        Quick Start
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/docs/theming" className="text-muted-foreground hover:text-foreground transition-colors block py-1">
                                        Theming Guide
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/docs/interfaces" className="text-muted-foreground hover:text-foreground transition-colors block py-1">
                                        Interfaces
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-6 lg:mt-0">
                            <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Community</h4>
                            <ul className="space-y-2 sm:space-y-3 text-sm">
                                <li>
                                    <Link href="https://github.com/dodopayments/billingsdk/issues" className="text-muted-foreground hover:text-foreground transition-colors block py-1">
                                        GitHub Issues
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://discord.com/invite/bYqAp4ayYh" className="text-muted-foreground hover:text-foreground transition-colors block py-1">
                                        Discord Server
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/docs/contribution-open-source" className="text-muted-foreground hover:text-foreground transition-colors block py-1">
                                        Contributing
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://github.com/dodopayments" className="text-muted-foreground hover:text-foreground transition-colors block py-1">
                                        Dodo Payments Github
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="border-t border-border/50 pt-6 sm:pt-8">
                        <div className="flex flex-col items-center text-center">
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                © {new Date().getFullYear()} BillingSDK. Made with{" "}
                                <FaHeart className="inline h-3 w-3 text-red-500 fill-current" />{" "}
                                by developers at Dodo Payments, for developers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
