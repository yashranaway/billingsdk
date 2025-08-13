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
    }[],
    benefits?: string[]
}


export const plans: Plan[] = [
    {
        id: 'starter',
        title: 'Starter',
        description: 'For developers testing out Liveblocks locally.',
        monthlyPrice: '$0',
        yearlyPrice: '$0',
        buttonText: 'Start today for free',
        features: [
            {
                name: 'Presence',
                icon: "check",
                iconColor: 'text-green-500'
            },
            {
                name: 'Comments',
                icon: "check",
                iconColor: 'text-orange-500'
            },
            {
                name: 'Notifications',
                icon: "check",
                iconColor: 'text-teal-500'
            },
            {
                name: 'Text Editor',
                icon: "check",
                iconColor: 'text-blue-500'
            },
            {
                name: 'Sync Datastore',
                icon: "check",
                iconColor: 'text-zinc-500'
            }
        ],
        benefits: ['WebSocket infrastructure', 'Pre-built components', 'Community support']
    },
    {
        id: 'pro',
        title: 'Pro',
        description: 'For companies adding collaboration in production.',
        monthlyPrice: '$10',
        yearlyPrice: '$100',
        buttonText: 'Sign up',
        badge: 'Most popular',
        highlight: true,
        features: [
            {
                name: 'Presence',
                icon: "check",
                iconColor: 'text-green-500'
            },
            {
                name: 'Comments',
                icon: "check",
                iconColor: 'text-orange-500'
            },
            {
                name: 'Notifications',
                icon: "check",
                iconColor: 'text-teal-500'
            },
            {
                name: 'Text Editor',
                icon: "check",
                iconColor: 'text-blue-500'
            },
            {
                name: 'Sync Datastore',
                icon: "check",
                iconColor: 'text-zinc-500'
            }
        ],
        benefits: ['WebSocket infrastructure', 'Pre-built components', 'Email support']
    },
    {
        id: 'enterprise',
        title: 'Enterprise',
        description: 'For organizations that need more support and compliance features.',
        monthlyPrice: 'Custom',
        yearlyPrice: 'Custom',
        buttonText: 'Contact sales',
        features: [
            {
                name: 'Presence',
                icon: "check",
                iconColor: 'text-green-500'
            },
            {
                name: 'Comments',
                icon: "check",
                iconColor: 'text-orange-500'
            },
            {
                name: 'Notifications',
                icon: "check",
                iconColor: 'text-teal-500'
            },
            {
                name: 'Text Editor',
                icon: "check",
                iconColor: 'text-blue-500'
            },
            {
                name: 'Sync Datastore',
                icon: "check",
                iconColor: 'text-zinc-500'
            }
        ],
        benefits: ['WebSocket infrastructure', 'Pre-built components', 'Priority support']
    }
];
