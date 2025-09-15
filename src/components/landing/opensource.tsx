import { BsDiscord, BsGithub, BsTwitterX } from "react-icons/bs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

export function OpenSource() {
    const socials = [
        {
            name: "GitHub",
            icon: BsGithub,
            href: "https://github.com/dodopayments/billingsdk",
            description: "View our open source code and contribute to the project"
        },
        {
            name: "X/ Twitter",
            icon: BsTwitterX,
            href: "https://x.com/dodopayments",
            description: "Follow us for updates and announcements on our products"
        },
        {
            name: "Discord",
            icon: BsDiscord,
            href: "https://discord.com/invite/bYqAp4ayYh",
            description: "Join our community for support and discussions"
        }
    ]
    return (
        <div className="flex flex-col mt-8 sm:mt-10 md:mt-12 lg:mt-16 w-full max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-medium text-primary text-center mb-3 sm:mb-4">
                Join our community
            </h2>
            <p className="text-sm sm:text-base md:text-lg mt-2 text-muted-foreground max-w-xs sm:max-w-lg md:max-w-2xl mx-auto tracking-tight text-center mb-6 sm:mb-8 leading-relaxed">
                Connect with other developers, get help, and contribute to the project
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch">
            {socials.map((social) => (
                <Card key={social.name} className="w-full max-w-[280px] sm:max-w-xs h-44 sm:h-48 cursor-pointer flex flex-col bg-card/50 hover:bg-card/80 transition-all duration-300 mx-auto sm:mx-0">
                    <Link href={social.href} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full">
                        <CardContent className="flex flex-col gap-2 sm:gap-3 items-center justify-center p-4 sm:p-6 flex-1">
                            <social.icon className="text-2xl sm:text-3xl md:text-4xl text-foreground" />
                            <p className="text-sm sm:text-base font-medium text-foreground">{social.name}</p>
                        </CardContent>
                        <CardFooter className="px-3 sm:px-4 pb-3 sm:pb-4 mt-auto">
                            <p className="text-xs sm:text-sm text-muted-foreground text-center leading-relaxed">
                                {social.description}
                            </p>
                        </CardFooter>
                    </Link>
                </Card>
            ))}
            </div>
        </div>
    )
}