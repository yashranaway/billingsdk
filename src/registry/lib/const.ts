export interface Plan {
    id: string
    title: string
    description: string
    highlight?: boolean
    type?: 'monthly' | 'yearly'
    monthlyPrice: string
    yearlyPrice: string
    buttonText: string
    badge?: string
    features: {
        name: string
        icon: string
        iconColor?: string
    }[]
}

export const plans: Plan[] = [
    {
        id: 'free',
        title: 'Free',
        description: 'For personal use',
        monthlyPrice: '$0',
        yearlyPrice: '$0',
        buttonText: 'Get Started',
        features: [{
            name: 'Limited access',
            icon: "check",
            iconColor: 'text-green-500'
        }, {
            name: 'Windows, Linux, Mac support',
            icon: "check",
            iconColor: 'text-green-500'
        }, {
            name: '24/7 Support',
            icon: "check",
            iconColor: 'text-green-500'
        }]
    },
    {
        id: 'pro',
        title: 'Pro',
        description: 'For personal use',
        monthlyPrice: '$10',
        yearlyPrice: '$100',
        buttonText: 'Purchase',
        features: [{
            name: 'Everything in Free',
            icon: "check",
            iconColor: 'text-green-500'
        }, {
            name: 'Unlimited access',
            icon: "check",
            iconColor: 'text-green-500'
        }, {
            name: 'Windows, Linux, Mac support',
            icon: "check",
            iconColor: 'text-green-500'
        }]
    }, {
        id: 'enterprise',
        title: 'Enterprise',
        description: 'For enterprise use',
        monthlyPrice: '$100',
        yearlyPrice: '$1000',
        buttonText: 'Purchase',
        features: [{
            name: 'Everything in Pro',
            icon: "check",
            iconColor: 'text-green-500'
        }, {
            name: 'Unlimited access',
            icon: "check",
            iconColor: 'text-green-500'
        }, {
            name: 'Windows, Linux, Mac support',
            icon: "check",
            iconColor: 'text-green-500'
        }]  
    }
]