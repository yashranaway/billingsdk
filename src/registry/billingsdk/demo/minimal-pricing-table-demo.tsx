'use client'

import { MinimalPricingTable, Plan } from '@/components/billingsdk/minimal-pricing-table';
import { Square, Bell, Type, Database } from 'lucide-react';

export default function PricingTableDemoMinimal({ className }: { className?: string }) {
    const plans: Plan[] = [
        {
            id: 'starter',
            title: 'Starter',
            description: 'For developers testing out Liveblocks locally.',
            price: 'Free',
            mau: '50 MAU',
            features: [
                {
                    name: 'Presence',
                    icon: <div className="w-2 h-2 bg-green-500 rounded-sm"></div>,
                    included: true
                },
                {
                    name: 'Comments',
                    icon: <Square className="w-4 h-4 text-orange-500" />,
                    included: false
                },
                {
                    name: 'Notifications',
                    icon: <Bell className="w-4 h-4 text-teal-500" />,
                    included: false
                },
                {
                    name: 'Text Editor',
                    icon: <Type className="w-4 h-4 text-blue-500" />,
                    included: false
                },
                {
                    name: 'Sync Datastore',
                    icon: <Database className="w-4 h-4 text-zinc-500" />,
                    included: false
                }
            ],
            benefits: ['WebSocket infrastructure', 'Pre-built components', 'Community support'],
            buttonText: 'Start today for free'
        },
        {
            id: 'pro',
            title: 'Pro',
            description: 'For companies adding collaboration in production.',
            price: '$720/month',
            mau: '1,000 MAU',
            badge: 'Most popular',
            highlight: 'pro',
            features: [
                {
                    name: 'Presence',
                    icon: <div className="w-2 h-2 bg-green-500 rounded-sm"></div>,
                    included: true
                },
                {
                    name: 'Comments',
                    icon: <Square className="w-4 h-4 text-orange-500" />,
                    included: false,
                    price: '$360/mo',
                    toggleable: true
                },
                {
                    name: 'Notifications',
                    icon: <Bell className="w-4 h-4 text-teal-500" />,
                    included: false,
                    price: '$180/mo',
                    toggleable: true,
                    defaultChecked: true
                },
                {
                    name: 'Text Editor',
                    icon: <Type className="w-4 h-4 text-blue-500" />,
                    included: false,
                    price: '$480/mo',
                    toggleable: true,
                    defaultChecked: true
                },
                {
                    name: 'Sync Datastore',
                    icon: <Database className="w-4 h-4 text-zinc-500" />,
                    included: false,
                    price: '$480/mo',
                    toggleable: true,
                    defaultChecked: true
                }
            ],
            benefits: ['WebSocket infrastructure', 'Pre-built components', 'Email support'],
            buttonText: 'Sign up'
        },
        {
            id: 'enterprise',
            title: 'Enterprise',
            description: 'For organizations that need more support and compliance features.',
            price: 'Custom',
            mau: 'Up to 100M MAU',
            features: [
                {
                    name: 'Presence',
                    icon: <div className="w-2 h-2 bg-green-500 rounded-sm"></div>,
                    included: true
                },
                {
                    name: 'Comments',
                    icon: <Square className="w-4 h-4 text-orange-500" />,
                    included: false,
                    price: 'Custom'
                },
                {
                    name: 'Notifications',
                    icon: <Bell className="w-4 h-4 text-teal-500" />,
                    included: false,
                    price: 'Custom'
                },
                {
                    name: 'Text Editor',
                    icon: <Type className="w-4 h-4 text-blue-500" />,
                    included: false,
                    price: 'Custom'
                },
                {
                    name: 'Sync Datastore',
                    icon: <Database className="w-4 h-4 text-zinc-500" />,
                    included: false,
                    price: 'Custom'
                }
            ],
            benefits: ['WebSocket infrastructure', 'Pre-built components', 'Premium support'],
            buttonText: 'Contact us'
        }
    ];

    const handleFeatureToggle = (planId: string, feature: string, enabled: boolean) => {
        console.log(`Plan: ${planId}, Feature: ${feature}, Enabled: ${enabled}`);
    };

    const handlePlanSelect = (planId: string) => {
        console.log(`Selected plan: ${planId}`);
    };

    const handleFooterButtonClick = () => {
        console.log('Footer button clicked');
    };

    return (
        <MinimalPricingTable
            className={className}
            plans={plans}
            onFeatureToggle={handleFeatureToggle}
            onPlanSelect={handlePlanSelect}
            showFooter={true}
            footerTitle="Pre-negotiated discounts are available to"
            footerSubtitle="early-stage startups and nonprofits."
            footerButtonText="Apply now"
            onFooterButtonClick={handleFooterButtonClick}
        />
    );
}
