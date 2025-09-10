import { ComponentConfig } from "./types";
import { Banner } from "@/components/billingsdk/banner";
import { PricingTableOne } from "@/components/billingsdk/pricing-table-one";
import { PricingTableTwo } from "@/components/billingsdk/pricing-table-two";
import { PricingTableThree } from "@/components/billingsdk/pricing-table-three";
import { CancelSubscriptionCard } from "@/components/billingsdk/cancel-subscription-card";
import {CancelSubscriptionCardTwo} from "@/components/billingsdk/cancel-subscription-card-two"
import { CancelSubscriptionDialog } from "@/components/billingsdk/cancel-subscription-dialog";
import { UpdatePlanCard } from "@/components/billingsdk/update-plan-card";
import { UpdatePlanDialog } from "@/components/billingsdk/update-plan-dialog";
import { SubscriptionManagement } from "@/components/billingsdk/subscription-management";
import { UsageMeter } from "@/components/billingsdk/usage-meter";
import { UsageForecast } from "@/components/billingsdk/usage-forecast";
import { UsageTable } from "@/components/billingsdk/usage-table";
import { InvoiceHistory } from "@/components/billingsdk/invoice-history";
import { PaymentMethodSelector } from "@/components/billingsdk/payment-method-selector";
import { PricingTableFive } from "@/components/billingsdk/pricing-table-five";

export const componentRegistry: ComponentConfig[] = [
  {
    id: "banner",
    name: "Banner",
    description: "Flexible notification banner with multiple variants and animations",
    category: "ui",
    component: Banner,
    imports: ["@/components/billingsdk/banner"],
    defaultCode: `<Banner
  variant="default"
  title="Welcome to Billing SDK"
  description="Start building amazing billing experiences"
  buttonText="Get Started"
  buttonLink="/docs"
  autoDismiss={5000}
  onDismiss={() => console.log("Banner dismissed")}
/>`,
    defaultProps: {
      variant: "default",
      title: "Welcome to Billing SDK",
      description: "Start building amazing billing experiences",
      buttonText: "Get Started",
      buttonLink: "/docs",
      autoDismiss: 5000,
      onDismiss: () => console.log("Banner dismissed"),
    },
  },
  {
    id: "pricing-table-one",
    name: "Pricing Table One",
    description: "Clean, modern pricing table with feature lists and animations",
    category: "pricing",
    component: PricingTableOne,
    imports: ["@/components/billingsdk/pricing-table-one"],
    defaultCode: `<PricingTableOne
  title="Simple Pricing"
  description="Choose the plan that's right for you"
  size="medium"
  theme="minimal"
  onPlanSelect={(planId) => console.log("Selected plan:", planId)}
  plans={[
    {
      id: "starter",
      title: "Starter",
      description: "Perfect for small teams",
      currency: "$",
      monthlyPrice: "9",
      yearlyPrice: "99",
      buttonText: "Get Started",
      highlight: false,
      features: [
        {
          name: "Up to 5 users",
          icon: "check",
          iconColor: "text-green-500"
        },
        {
          name: "Basic analytics",
          icon: "check",
          iconColor: "text-blue-500"
        },
        {
          name: "Email support",
          icon: "check",
          iconColor: "text-orange-500"
        }
      ]
    },
    {
      id: "pro",
      title: "Pro",
      description: "Best for growing businesses",
      currency: "$",
      monthlyPrice: "29",
      yearlyPrice: "299",
      buttonText: "Start Free Trial",
      highlight: true,
      features: [
        {
          name: "Up to 25 users",
          icon: "check",
          iconColor: "text-green-500"
        },
        {
          name: "Advanced analytics",
          icon: "check",
          iconColor: "text-blue-500"
        },
        {
          name: "Priority support",
          icon: "check",
          iconColor: "text-orange-500"
        },
        {
          name: "Custom integrations",
          icon: "check",
          iconColor: "text-purple-500"
        }
      ]
    }
  ]}
/>`,
    defaultProps: {
      title: "Simple Pricing",
      description: "Choose the plan that's right for you",
      size: "medium",
      theme: "minimal",
      onPlanSelect: (planId: string) => console.log("Selected plan:", planId),
      plans: [
        {
          id: "starter",
          title: "Starter",
          description: "Perfect for small teams",
          currency: "$",
          monthlyPrice: "9",
          yearlyPrice: "99",
          buttonText: "Get Started",
          highlight: false,
          features: [
            {
              name: "Up to 5 users",
              icon: "check",
              iconColor: "text-green-500"
            },
            {
              name: "Basic analytics",
              icon: "check",
              iconColor: "text-blue-500"
            },
            {
              name: "Email support",
              icon: "check",
              iconColor: "text-orange-500"
            }
          ]
        },
        {
          id: "pro",
          title: "Pro",
          description: "Best for growing businesses",
          currency: "$",
          monthlyPrice: "29",
          yearlyPrice: "299",
          buttonText: "Start Free Trial",
          highlight: true,
          features: [
            {
              name: "Up to 25 users",
              icon: "check",
              iconColor: "text-green-500"
            },
            {
              name: "Advanced analytics",
              icon: "check",
              iconColor: "text-blue-500"
            },
            {
              name: "Priority support",
              icon: "check",
              iconColor: "text-orange-500"
            },
            {
              name: "Custom integrations",
              icon: "check",
              iconColor: "text-purple-500"
            }
          ]
        }
      ]
    },
  },
  {
    id: "pricing-table-two",
    name: "Pricing Table Two",
    description: "Table-based pricing comparison with feature matrix",
    category: "pricing",
    component: PricingTableTwo,
    imports: ["@/components/billingsdk/pricing-table-two"],
    defaultCode: `<PricingTableTwo
  title="Professional Pricing"
  description="Compare features across all plans"
  size="medium"
  theme="minimal"
  onPlanSelect={(planId) => console.log("Selected plan:", planId)}
  plans={[
    {
      id: "basic",
      title: "Basic",
      description: "Essential features for startups",
      currency: "$",
      monthlyPrice: "19",
      yearlyPrice: "199",
      buttonText: "Start Free Trial",
      highlight: false,
      features: [
        {
          name: "Unlimited users",
          icon: "check",
          iconColor: "text-green-500"
        },
        {
          name: "Basic reporting",
          icon: "check",
          iconColor: "text-blue-500"
        },
        {
          name: "Community support",
          icon: "check",
          iconColor: "text-orange-500"
        }
      ]
    },
    {
      id: "professional",
      title: "Professional",
      description: "Advanced features for teams",
      currency: "$",
      monthlyPrice: "49",
      yearlyPrice: "499",
      buttonText: "Start Free Trial",
      highlight: true,
      features: [
        {
          name: "Everything in Basic",
          icon: "check",
          iconColor: "text-green-500"
        },
        {
          name: "Advanced analytics",
          icon: "check",
          iconColor: "text-blue-500"
        },
        {
          name: "Priority support",
          icon: "check",
          iconColor: "text-orange-500"
        },
        {
          name: "API access",
          icon: "check",
          iconColor: "text-purple-500"
        }
      ]
    }
  ]}
/>`,
    defaultProps: {
      title: "Professional Pricing",
      description: "Compare features across all plans",
      size: "medium",
      theme: "minimal",
      onPlanSelect: (planId: string) => console.log("Selected plan:", planId),
      plans: [
        {
          id: "basic",
          title: "Basic",
          description: "Essential features for startups",
          currency: "$",
          monthlyPrice: "19",
          yearlyPrice: "199",
          buttonText: "Start Free Trial",
          highlight: false,
          features: [
            {
              name: "Unlimited users",
              icon: "check",
              iconColor: "text-green-500"
            },
            {
              name: "Basic reporting",
              icon: "check",
              iconColor: "text-blue-500"
            },
            {
              name: "Community support",
              icon: "check",
              iconColor: "text-orange-500"
            }
          ]
        },
        {
          id: "professional",
          title: "Professional",
          description: "Advanced features for teams",
          currency: "$",
          monthlyPrice: "49",
          yearlyPrice: "499",
          buttonText: "Start Free Trial",
          highlight: true,
          features: [
            {
              name: "Everything in Basic",
              icon: "check",
              iconColor: "text-blue-500"
            },
            {
              name: "Advanced analytics",
              icon: "check",
              iconColor: "text-blue-500"
            },
            {
              name: "Priority support",
              icon: "check",
              iconColor: "text-orange-500"
            },
            {
              name: "API access",
              icon: "check",
              iconColor: "text-purple-500"
            }
          ]
        }
      ]
    },
  },
  {
    id: "pricing-table-three",
    name: "Pricing Table Three",
    description: "Minimalist pricing with focus on conversion",
    category: "pricing",
    component: PricingTableThree,
    imports: ["@/components/billingsdk/pricing-table-three"],
    defaultCode: `<PricingTableThree
  title="Minimal Pricing"
  description="Simple plans for everyone"
  variant="medium"
  onPlanSelect={(planId) => console.log("Selected plan:", planId)}
  plans={[
    {
      id: "free",
      title: "Free",
      description: "For personal projects",
      currency: "$",
      monthlyPrice: "0",
      yearlyPrice: "0",
      buttonText: "Get Started",
      highlight: false,
      features: [
        {
          name: "1 project",
          icon: "check",
          iconColor: "text-green-500"
        },
        {
          name: "Basic templates",
          icon: "check",
          iconColor: "text-blue-500"
        },
        {
          name: "Community support",
          icon: "check",
          iconColor: "text-orange-500"
        }
      ]
    },
    {
      id: "team",
      title: "Team",
      description: "For professional teams",
      currency: "$",
      monthlyPrice: "99",
      yearlyPrice: "999",
      buttonText: "Start Free Trial",
      highlight: true,
      features: [
        {
          name: "Unlimited projects",
          icon: "check",
          iconColor: "text-green-500"
        },
        {
          name: "Premium templates",
          icon: "check",
          iconColor: "text-blue-500"
        },
        {
          name: "Priority support",
          icon: "check",
          iconColor: "text-orange-500"
        },
        {
          name: "Team collaboration",
          icon: "check",
          iconColor: "text-purple-500"
        }
      ]
    }
  ]}
/>`,
    defaultProps: {
      title: "Minimal Pricing",
      description: "Simple plans for everyone",
      variant: "medium",
      onPlanSelect: (planId: string) => console.log("Selected plan:", planId),
      plans: [
        {
          id: "free",
          title: "Free",
          description: "For personal projects",
          currency: "$",
          monthlyPrice: "0",
          yearlyPrice: "0",
          buttonText: "Get Started",
          highlight: false,
          features: [
            {
              name: "1 project",
              icon: "check",
              iconColor: "text-green-500"
            },
            {
              name: "Basic templates",
              icon: "check",
              iconColor: "text-blue-500"
            },
            {
              name: "Community support",
              icon: "check",
              iconColor: "text-orange-500"
            }
          ]
        },
        {
          id: "team",
          title: "Team",
          description: "For professional teams",
          currency: "$",
          monthlyPrice: "99",
          yearlyPrice: "999",
          buttonText: "Start Free Trial",
          highlight: true,
          features: [
            {
              name: "Unlimited projects",
              icon: "check",
              iconColor: "text-green-500"
            },
            {
              name: "Premium templates",
              icon: "check",
              iconColor: "text-blue-500"
            },
            {
              name: "Priority support",
              icon: "check",
              iconColor: "text-orange-500"
            },
            {
              name: "Team collaboration",
              icon: "check",
              iconColor: "text-purple-500"
            }
          ]
        }
      ]
    },
  },
  {
    id: "pricing-table-five",
    name: "Pricing Table Five",
    description: "Modern pricing table with contact us plan",
    category: "pricing",
    component: PricingTableFive,
    imports: ["@/components/billingsdk/pricing-table-five"],
    defaultCode: `<PricingTableFive
  plans={ [
    {
        id: 'starter',
        title: 'Starter',
        description: 'For developers testing out Liveblocks locally.',
        currency: '$',
        monthlyPrice: '0',
        yearlyPrice: '0',
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
    },
    {
        id: 'pro',
        title: 'Pro',
        description: 'For companies adding collaboration in production.',
        currency: '$',
        monthlyPrice: '20',
        yearlyPrice: '199',
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
    },
    {
        id: 'enterprise',
        title: 'Enterprise',
        description: 'For organizations that need more support and compliance features.',
        currency: '$',
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
    }
];}
  title="Pricing Plans"
  description="Find the right plan for your business"
  onPlanSelect={(planId) => console.log('Selected plan:', planId)}
/>`,
    defaultProps: {
      plans:  [
        {
            id: 'starter',
            title: 'Starter',
            description: 'For developers testing out Liveblocks locally.',
            currency: '$',
            monthlyPrice: '0',
            yearlyPrice: '0',
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
        },
        {
            id: 'pro',
            title: 'Pro',
            description: 'For companies adding collaboration in production.',
            currency: '$',
            monthlyPrice: '20',
            yearlyPrice: '199',
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
        },
        {
            id: 'enterprise',
            title: 'Enterprise',
            description: 'For organizations that need more support and compliance features.',
            currency: '$',
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
        }
    ],
      title: "Pricing Plans",
      description: "Find the right plan for your business",
      onPlanSelect: (planId: string) => console.log('Selected plan:', planId),
    },
  },
  {
    id: "cancel-subscription-card",
    name: "Cancel Subscription Card",
    description: "Elegant subscription cancellation interface with confirmation flow",
    category: "subscription",
    component: CancelSubscriptionCard,
    imports: ["@/components/billingsdk/cancel-subscription-card"],
    defaultCode: `<CancelSubscriptionCard
  title="Cancel Subscription"
  description="We're sorry to see you go. Your subscription will remain active until the end of your billing period."
  plan={{
    id: "pro",
    title: "Pro",
    description: "Best for growing businesses",
    currency: "$",
    monthlyPrice: "29",
    yearlyPrice: "299",
    buttonText: "Get Started",
    highlight: true,
    features: [
      {
        name: "Up to 25 users",
        icon: "check",
        iconColor: "text-green-500"
      },
      {
        name: "Advanced analytics",
        icon: "check",
        iconColor: "text-blue-500"
      },
      {
        name: "Priority support",
        icon: "check",
        iconColor: "text-orange-500"
      }
    ]
  }}
  warningTitle="What happens when you cancel?"
  warningText="You'll lose access to all premium features at the end of your current billing period."
  keepButtonText="Keep My Subscription"
  continueButtonText="Continue Cancellation"
  onCancel={(planId) => console.log("Subscription cancelled for plan:", planId)}
  onKeepSubscription={(planId) => console.log("Subscription kept for plan:", planId)}
/>`,
    defaultProps: {
      title: "Cancel Subscription",
      description: "We're sorry to see you go. Your subscription will remain active until the end of your billing period.",
      plan: {
        id: "pro",
        title: "Pro",
        description: "Best for growing businesses",
        currency: "$",
        monthlyPrice: "29",
        yearlyPrice: "299",
        buttonText: "Get Started",
        highlight: true,
        features: [
          {
            name: "Up to 25 users",
            icon: "check",
            iconColor: "text-green-500"
          },
          {
            name: "Advanced analytics",
            icon: "check",
            iconColor: "text-blue-500"
          },
          {
            name: "Priority support",
            icon: "check",
            iconColor: "text-orange-500"
          }
        ]
      },
      warningTitle: "What happens when you cancel?",
      warningText: "You'll lose access to all premium features at the end of your current billing period.",
      keepButtonText: "Keep My Subscription",
      continueButtonText: "Continue Cancellation",
      onCancel: (planId: string) => console.log("Subscription cancelled for plan:", planId),
      onKeepSubscription: (planId: string) => console.log("Subscription kept for plan:", planId),
    },
  },
  {
    id: "cancel-subscription-card-two",
    name: "Cancel Subscription Card Two",
    description: "Elegant Subscription cancellation ui component",
    category: "subscription",
    component: CancelSubscriptionCardTwo,
    imports: ["@/components/billingsdk/cancel-subscription-card-two"],
    defaultCode: `<CancelSubscriptionCardTwo
  title="We're sorry to see you go..."
  description="Before you cancel, we hope you'll consider upgrading to a Pro plan again."
  plan={{
    id: "pro",
    title: "Pro",
    description: "Best for growing businesses and startups",
    currency: "$",
    monthlyPrice: "29",
    yearlyPrice: "299",
    buttonText: "Get Started",
    highlight: true,
    features: [
      {
        name: "Up to 25 users",
        icon: "check",
        iconColor: "text-green-500"
      },
      {
        name: "Advanced analytics",
        icon: "check",
        iconColor: "text-blue-500"
      },
      {
        name: "Priority support",
        icon: "check",
        iconColor: "text-orange-500"
      }
    ]
  }}
  warningText="You'll lose access to all premium features at the end of your current billing period."
  keepButtonText="Keep My Subscription"
  continueButtonText="Continue Cancellation"
  onCancel={(planId) => console.log("Subscription cancelled for plan:", planId)}
  onKeepSubscription={(planId) => console.log("Subscription kept for plan:", planId)}
/>`,
    defaultProps: {
      title: "We're sorry to see you go...",
      description: "Before you cancel, we hope you'll consider upgrading to a Pro plan again.",
      plan: {
        id: "pro",
        title: "Pro",
        description: "Best for growing businesses",
        currency: "$",
        monthlyPrice: "29",
        yearlyPrice: "299",
        buttonText: "Get Started",
        highlight: true,
        features: [
          {
            name: "Up to 25 users",
            icon: "check",
            iconColor: "text-green-500"
          },
          {
            name: "Advanced analytics",
            icon: "check",
            iconColor: "text-blue-500"
          },
          {
            name: "Priority support",
            icon: "check",
            iconColor: "text-orange-500"
          }
        ]
      },
      supportText:"Need help? Our team is here to assist you.",
      keepButtonText: "Keep My Subscription",
      continueButtonText: "Continue Cancellation",
      onCancel: (planId: string) => console.log("Subscription cancelled for plan:", planId),
      onKeepSubscription: (planId: string) => console.log("Subscription kept for plan:", planId),
    },
  },
  {
    id: "cancel-subscription-dialog",
    name: "Cancel Subscription Dialog",
    description: "Modal dialog for subscription cancellation",
    category: "subscription",
    component: CancelSubscriptionDialog,
    imports: ["@/components/billingsdk/cancel-subscription-dialog"],
    defaultCode: `<CancelSubscriptionDialog
  title="Cancel Subscription"
  description="Are you sure you want to cancel your subscription?"
  plan={{
    id: "pro",
    title: "Pro",
    description: "For companies adding collaboration in production.",
    currency: "$",
    monthlyPrice: "20",
    yearlyPrice: "199",
    buttonText: "Sign up",
    features: [
      { name: "Presence", icon: "check", iconColor: "text-green-500" },
      { name: "Comments", icon: "check", iconColor: "text-orange-500" },
      { name: "Notifications", icon: "check", iconColor: "text-teal-500" }
    ]
  }}
  onCancel={(planId) => console.log("Subscription cancelled for plan:", planId)}
  onKeepSubscription={(planId) => console.log("Subscription kept for plan:", planId)}
/>`,
    defaultProps: {
      title: "Cancel Subscription",
      description: "Are you sure you want to cancel your subscription?",
      plan: {
        id: "pro",
        title: "Pro",
        description: "For companies adding collaboration in production.",
        currency: "$",
        monthlyPrice: "20",
        yearlyPrice: "199",
        buttonText: "Sign up",
        features: [
          { name: "Presence", icon: "check", iconColor: "text-green-500" },
          { name: "Comments", icon: "check", iconColor: "text-orange-500" },
          { name: "Notifications", icon: "check", iconColor: "text-teal-500" }
        ]
      },
      onCancel: (planId: string) => console.log("Subscription cancelled for plan:", planId),
      onKeepSubscription: (planId: string) => console.log("Subscription kept for plan:", planId),
    },
  },
  {
    id: "update-plan-card",
    name: "Update Plan Card",
    description: "Card interface for plan upgrades/downgrades",
    category: "subscription",
    component: UpdatePlanCard,
    imports: ["@/components/billingsdk/update-plan-card"],
    defaultCode: `<UpdatePlanCard
  currentPlan={{
    id: "starter",
    title: "Starter",
    description: "For developers testing out Liveblocks locally.",
    currency: "$",
    monthlyPrice: "0",
    yearlyPrice: "0",
    buttonText: "Start today for free",
    features: [
      { name: "Presence", icon: "check", iconColor: "text-green-500" },
      { name: "Comments", icon: "check", iconColor: "text-orange-500" }
    ]
  }}
  plans={[
    {
      id: "pro",
      title: "Pro",
      description: "For companies adding collaboration in production.",
      currency: "$",
      monthlyPrice: "20",
      yearlyPrice: "199",
      buttonText: "Sign up",
      features: [
        { name: "Presence", icon: "check", iconColor: "text-green-500" },
        { name: "Comments", icon: "check", iconColor: "text-orange-500" }
      ]
    }
  ]}
  onPlanChange={(planId) => console.log("Plan changed to:", planId)}
/>`,
    defaultProps: {
      currentPlan: {
        id: "starter",
        title: "Starter",
        description: "For developers testing out Liveblocks locally.",
        currency: "$",
        monthlyPrice: "0",
        yearlyPrice: "0",
        buttonText: "Start today for free",
        features: [
          { name: "Presence", icon: "check", iconColor: "text-green-500" },
          { name: "Comments", icon: "check", iconColor: "text-orange-500" }
        ]
      },
      plans: [
        {
          id: "pro",
          title: "Pro",
          description: "For companies adding collaboration in production.",
          currency: "$",
          monthlyPrice: "20",
          yearlyPrice: "199",
          buttonText: "Sign up",
          features: [
            { name: "Presence", icon: "check", iconColor: "text-green-500" },
            { name: "Comments", icon: "check", iconColor: "text-orange-500" }
          ]
        }
      ],
      onPlanChange: (planId: string) => console.log("Plan changed to:", planId),
    },
  },
  {
    id: "update-plan-dialog",
    name: "Update Plan Dialog",
    description: "Modal dialog for plan changes",
    category: "subscription",
    component: UpdatePlanDialog,
    imports: ["@/components/billingsdk/update-plan-dialog"], 
    defaultCode: `<UpdatePlanDialog
  currentPlan={{
    id: "starter",
    title: "Starter",
    description: "For developers testing out Liveblocks locally.",
    currency: "$",
    monthlyPrice: "0",
    yearlyPrice: "0",
    buttonText: "Start today for free",
    features: [
      { name: "Presence", icon: "check", iconColor: "text-green-500" },
      { name: "Comments", icon: "check", iconColor: "text-orange-500" }
    ]
  }}
  plans={[
    {
      id: "pro",
      title: "Pro",
      description: "For companies adding collaboration in production.",
      currency: "$",
      monthlyPrice: "20",
      yearlyPrice: "199",
      buttonText: "Sign up",
      features: [
        { name: "Presence", icon: "check", iconColor: "text-green-500" },
        { name: "Comments", icon: "check", iconColor: "text-orange-500" }
      ]
    }
  ]}
  triggerText="Change Plan"
  onPlanChange={(planId) => console.log("Plan changed to:", planId)}
/>`,
    defaultProps: {
      currentPlan: {
        id: "starter",
        title: "Starter",
        description: "For developers testing out Liveblocks locally.",
        currency: "$",
        monthlyPrice: "0",
        yearlyPrice: "0",
        buttonText: "Start today for free",
        features: [
          { name: "Presence", icon: "check", iconColor: "text-green-500" },
          { name: "Comments", icon: "check", iconColor: "text-orange-500" }
        ]
      },
      plans: [
        {
          id: "pro",
          title: "Pro",
          description: "For companies adding collaboration in production.",
          currency: "$",
          monthlyPrice: "20",
          yearlyPrice: "199",
          buttonText: "Sign up",
          features: [
            { name: "Presence", icon: "check", iconColor: "text-green-500" },
            { name: "Comments", icon: "check", iconColor: "text-orange-500" }
          ]
        }
      ],
      triggerText: "Change Plan",
      onPlanChange: (planId: string) => console.log("Plan changed to:", planId),
    },
  },
  {
    id: "subscription-management",
    name: "Subscription Management",
    description: "Comprehensive subscription control panel",
    category: "subscription",
    component: SubscriptionManagement,
    imports: ["@/components/billingsdk/subscription-management"],
    defaultCode: `<SubscriptionManagement
  currentPlan={{
    plan: {
      id: "pro",
      title: "Pro",
      description: "For companies adding collaboration in production.",
      currency: "$",
      monthlyPrice: "20",
      yearlyPrice: "199",
      buttonText: "Sign up",
      highlight: true,
      features: [
        {
          name: "Presence",
          icon: "check",
          iconColor: "text-green-500"
        },
        {
          name: "Comments",
          icon: "check",
          iconColor: "text-orange-500"
        },
        {
          name: "Notifications",
          icon: "check",
          iconColor: "text-teal-500"
        },
        {
          name: "Text Editor",
          icon: "check",
          iconColor: "text-blue-500"
        },
        {
          name: "Sync Datastore",
          icon: "check",
          iconColor: "text-zinc-500"
        }
      ]
    },
    type: "monthly",
    nextBillingDate: "March 15, 2024",
    paymentMethod: "**** 4242",
    status: "active"
  }}
  cancelSubscription={{
    title: "Cancel Subscription",
    description: "Are you sure you want to cancel your subscription?",
    plan: {
      id: "pro",
      title: "Pro",
      description: "For companies adding collaboration in production.",
      currency: "$",
      monthlyPrice: "20",
      yearlyPrice: "199",
      buttonText: "Sign up",
      features: [
        { name: "Presence", icon: "check", iconColor: "text-green-500" },
        { name: "Comments", icon: "check", iconColor: "text-orange-500" }
      ]
    },
    onCancel: (planId) => console.log("Subscription cancelled for plan:", planId),
    onKeepSubscription: (planId) => console.log("Subscription kept for plan:", planId)
  }}
  updatePlan={{
    currentPlan: {
      id: "pro",
      title: "Pro",
      description: "For companies adding collaboration in production.",
      currency: "$",
      monthlyPrice: "20",
      yearlyPrice: "199",
      buttonText: "Sign up",
      features: [
        { name: "Presence", icon: "check", iconColor: "text-green-500" },
        { name: "Comments", icon: "check", iconColor: "text-orange-500" }
      ]
    },
    plans: [
      {
        id: "starter",
        title: "Starter",
        description: "For developers testing out Liveblocks locally.",
        currency: "$",
        monthlyPrice: "0",
        yearlyPrice: "0",
        buttonText: "Start today for free",
        features: [
          { name: "Presence", icon: "check", iconColor: "text-green-500" },
          { name: "Comments", icon: "check", iconColor: "text-orange-500" }
        ]
      },
      {
        id: "enterprise",
        title: "Enterprise",
        description: "For organizations that need more support and compliance features.",
        currency: "$",
        monthlyPrice: "Custom",
        yearlyPrice: "Custom",
        buttonText: "Contact sales",
        features: [
          { name: "Presence", icon: "check", iconColor: "text-green-500" },
          { name: "Comments", icon: "check", iconColor: "text-orange-500" }
        ]
      }
    ],
    triggerText: "Change Plan",
    onPlanChange: (planId) => console.log("Plan changed to:", planId)
  }}
/>`,
    defaultProps: {
      currentPlan: {
        plan: {
          id: "pro",
          title: "Pro",
          description: "For companies adding collaboration in production.",
          currency: "$",
          monthlyPrice: "20",
          yearlyPrice: "199",
          buttonText: "Sign up",
          highlight: true,
          features: [
            {
              name: "Presence",
              icon: "check",
              iconColor: "text-green-500"
            },
            {
              name: "Comments",
              icon: "check",
              iconColor: "text-orange-500"
            },
            {
              name: "Notifications",
              icon: "check",
              iconColor: "text-teal-500"
            },
            {
              name: "Text Editor",
              icon: "check",
              iconColor: "text-blue-500"
            },
            {
              name: "Sync Datastore",
              icon: "check",
              iconColor: "text-zinc-500"
            }
          ]
        },
        type: "monthly",
        nextBillingDate: "March 15, 2024",
        paymentMethod: "**** 4242",
        status: "active"
      },
      cancelSubscription: {
        title: "Cancel Subscription",
        description: "Are you sure you want to cancel your subscription?",
        plan: {
          id: "pro",
          title: "Pro",
          description: "For companies adding collaboration in production.",
          currency: "$",
          monthlyPrice: "20",
          yearlyPrice: "199",
          buttonText: "Sign up",
          features: [
            { name: "Presence", icon: "check", iconColor: "text-green-500" },
            { name: "Comments", icon: "check", iconColor: "text-orange-500" }
          ]
        },
        onCancel: (planId: string) => console.log("Subscription cancelled for plan:", planId),
        onKeepSubscription: (planId: string) => console.log("Subscription kept for plan:", planId)
      },
      updatePlan: {
        currentPlan: {
          id: "pro",
          title: "Pro",
          description: "For companies adding collaboration in production.",
          currency: "$",
          monthlyPrice: "20",
          yearlyPrice: "199",
          buttonText: "Sign up",
          features: [
            { name: "Presence", icon: "check", iconColor: "text-green-500" },
            { name: "Comments", icon: "check", iconColor: "text-orange-500" }
          ]
        },
        plans: [
          {
            id: "starter",
            title: "Starter",
            description: "For developers testing out Liveblocks locally.",
            currency: "$",
            monthlyPrice: "0",
            yearlyPrice: "0",
            buttonText: "Start today for free",
            features: [
              { name: "Presence", icon: "check", iconColor: "text-green-500" },
              { name: "Comments", icon: "check", iconColor: "text-orange-500" }
            ]
          },
          {
            id: "enterprise",
            title: "Enterprise",
            description: "For organizations that need more support and compliance features.",
            currency: "$",
            monthlyPrice: "Custom",
            yearlyPrice: "Custom",
            buttonText: "Contact sales",
            features: [
              { name: "Presence", icon: "check", iconColor: "text-green-500" },
              { name: "Comments", icon: "check", iconColor: "text-orange-500" }
            ]
          }
        ],
        triggerText: "Change Plan",
        onPlanChange: (planId: string) => console.log("Plan changed to:", planId)
      }
    },
  },
  {
    id: "usage-meter",
    name: "Usage Meter",
    description: "Visual usage tracking with linear and circle variants",
    category: "usage",
    component: UsageMeter,
    imports: ["@/components/billingsdk/usage-meter"],
    defaultCode: `<UsageMeter
  variant="linear"
  size="md"
  title="Usage Overview"
  description="Track your current usage across different features"
  progressColor="usage"
  usage={[
    {
      name: "API Calls",
      usage: 1200000,
      limit: 2000000
    },
    {
      name: "Storage",
      usage: 75,
      limit: 100
    },
    {
      name: "Users",
      usage: 45,
      limit: 50
    }
  ]}
/>`,
    defaultProps: {
      variant: "linear",
      size: "md",
      title: "Usage Overview",
      description: "Track your current usage across different features",
      progressColor: "usage",
      usage: [
        {
          name: "API Calls",
          usage: 1200000,
          limit: 2000000
        },
        {
          name: "Storage",
          usage: 75,
          limit: 100
        },
        {
          name: "Users",
          usage: 45,
          limit: 50
        }
      ]
    },
  },
  {
    id: "usage-table",
    name: "Usage Table",
    description: "Detailed usage breakdown table",
    category: "usage",
    component: UsageTable,
    imports: ["@/components/billingsdk/usage-table"],
    defaultCode: `<UsageTable
  usageHistory={[
    {
      model: 'gpt-5',
      inputWithCache: 0,
      inputWithoutCache: 518131,
      cacheRead: 1646080,
      output: 103271,
      totalTokens: 2267482,
    },
    {
      model: 'claude-3.5-sonnet',
      inputWithCache: 176177,
      inputWithoutCache: 28413,
      cacheRead: 434612,
      output: 8326,
      totalTokens: 647528,
      costToYou: 1.00
    },
    {
      model: 'gemini-2.0-flash-exp',
      inputWithCache: 176100,
      inputWithoutCache: 28432,
      cacheRead: 434612,
      output: 8326,
      totalTokens: 647528,
      apiCost: 1,
      costToYou: 0
    },
    {
      model: 'gemini-2.5-pro',
      inputWithCache: 176177,
      inputWithoutCache: 28413,
      cacheRead: 434612,
      output: 7000,
      totalTokens: 647528,
      apiCost: 1,
      costToYou: 0
    },
    {
      model: 'claude-4-sonnet',
      inputWithCache: 68415,
      inputWithoutCache: 902,
      cacheRead: 864450,
      output: 12769,
      totalTokens: 946536,
      apiCost: 0.71,
      costToYou: 0.71
    },
    {
      model: 'claude-3.7-sonnet',
      inputWithCache: 68415,
      inputWithoutCache: 902,
      cacheRead: 864450,
      output: 12769,
      totalTokens: 946536,
      apiCost: 0.71,
    },
    {
      model: 'auto',
      inputWithCache: 84551,
      inputWithoutCache: 0,
      cacheRead: 284876,
      output: 9458,
      totalTokens: 378885,
      apiCost: 0.23,
      costToYou: 0
    },
    {
      model: 'sonic',
      inputWithCache: 0,
      inputWithoutCache: 149484,
      cacheRead: 4354855,
      output: 23569,
      totalTokens: 4527908,
      costToYou: 2
    }
  ]}
  title="Usage Summary"
/>`,
    defaultProps: {
      usageHistory: [
        {
          model: 'gpt-5',
          inputWithCache: 0,
          inputWithoutCache: 518131,
          cacheRead: 1646080,
          output: 103271,
          totalTokens: 2267482,
        },
        {
          model: 'claude-3.5-sonnet',
          inputWithCache: 176177,
          inputWithoutCache: 28413,
          cacheRead: 434612,
          output: 8326,
          totalTokens: 647528,
          costToYou: 1.00
        },
        {
          model: 'gemini-2.0-flash-exp',
          inputWithCache: 176100,
          inputWithoutCache: 28432,
          cacheRead: 434612,
          output: 8326,
          totalTokens: 647528,
          apiCost: 1,
          costToYou: 0
        },
        {
          model: 'gemini-2.5-pro',
          inputWithCache: 176177,
          inputWithoutCache: 28413,
          cacheRead: 434612,
          output: 7000,
          totalTokens: 647528,
          apiCost: 1,
          costToYou: 0
        },
        {
          model: 'claude-4-sonnet',
          inputWithCache: 68415,
          inputWithoutCache: 902,
          cacheRead: 864450,
          output: 12769,
          totalTokens: 946536,
          apiCost: 0.71,
          costToYou: 0.71
        },
        {
          model: 'claude-3.7-sonnet',
          inputWithCache: 68415,
          inputWithoutCache: 902,
          cacheRead: 864450,
          output: 12769,
          totalTokens: 946536,
          apiCost: 0.71,
        },
        {
          model: 'auto',
          inputWithCache: 84551,
          inputWithoutCache: 0,
          cacheRead: 284876,
          output: 9458,
          totalTokens: 378885,
          apiCost: 0.23,
          costToYou: 0
        },
        {
          model: 'sonic',
          inputWithCache: 0,
          inputWithoutCache: 149484,
          cacheRead: 4354855,
          output: 23569,
          totalTokens: 4527908,
          costToYou: 2
        }
      ],
      title: "Usage Summary",
    },
  },
  {
    id: "invoice-history",
    name: "Invoice History",
    description: "Display past invoices and payment history with download actions",
    category: "billing",
    component: InvoiceHistory,
    imports: ["@/components/billingsdk/invoice-history"],
    defaultCode: `<InvoiceHistory
  title="Invoice History"
  description="Your past invoices and payment receipts."
  invoices={[
    {
      id: "INV-001",
      date: "2024-02-15",
      amount: "$49.00",
      status: "paid",
      description: "Pro Plan - February 2024",
      invoiceUrl: "https://example.com/invoice/INV-001"
    },
    {
      id: "INV-002",
      date: "2024-01-15",
      amount: "$49.00",
      status: "paid",
      description: "Pro Plan - January 2024",
      invoiceUrl: "https://example.com/invoice/INV-002"
    }
  ]}
  onDownload={(invoiceId) => console.log("Download invoice:", invoiceId)}
/>`,
    defaultProps: {
      title: "Invoice History",
      description: "Your past invoices and payment receipts.",
      invoices: [
        {
          id: "INV-001",
          date: "2024-02-15",
          amount: "$49.00",
          status: "paid",
          description: "Pro Plan - February 2024",
          invoiceUrl: "https://example.com/invoice/INV-001"
        },
        {
          id: "INV-002",
          date: "2024-01-15",
          amount: "$49.00",
          status: "paid",
          description: "Pro Plan - January 2024",
          invoiceUrl: "https://example.com/invoice/INV-002"
        }
      ],
      onDownload: (invoiceId: string) => console.log("Download invoice:", invoiceId)
    },
  },
  {
    id: "payment-method-selector",
    name: "Payment Method Selector",
    description: "Secure payment method selection interface",
    category: "ui",
    component: PaymentMethodSelector,
    imports: ["@/components/billingsdk/payment-method-selector"],
    defaultCode: `<PaymentMethodSelector
  methods={[
    { id: "card_1", type: "card", last4: "4242", brand: "visa", expiry: "12/25" },
    { id: "card_2", type: "card", last4: "5555", brand: "mastercard", expiry: "06/26" },
  ]}
  selectedMethod="card_1"
  onSelect={(id) => console.log("Selected:", id)}
  onAddNew={() => console.log("Add new method")}
/>`,
    defaultProps: {
      methods: [
        { id: "card_1", type: "card", last4: "4242", brand: "visa", expiry: "12/25" },
        { id: "card_2", type: "card", last4: "5555", brand: "mastercard", expiry: "06/26" },
      ],
      selectedMethod: "card_1",
      onSelect: (id: string) => console.log("Selected:", id),
      onAddNew: () => console.log("Add new method"),
    },
  },
  {
    id: "usage-forecast",
    name: "Usage Forecast",
    description: "Smart usage forecasting with trend analysis",
    category: "usage",
    component: UsageForecast,
    imports: ["@/components/billingsdk/usage-forecast"],
    defaultCode: `<UsageForecast
  title="Usage Forecast"
  description="Predictions based on usage patterns"
  showChart={true}
  metrics={[
    {
      name: "API Calls",
      currentUsage: 45000,
      limit: 50000,
      unitCost: 0.001,
      currency: "$",
      unitName: "calls",
      historicalData: [
        { date: "2024-01-01", usage: 35000, cost: 35 },
        { date: "2024-01-02", usage: 36000, cost: 36 },
        { date: "2024-01-03", usage: 37000, cost: 37 }
      ]
    },
    {
      name: "Storage",
      currentUsage: 750,
      limit: 1000,
      unitCost: 0.1,
      currency: "$",
      unitName: "GB",
      historicalData: [
        { date: "2024-01-01", usage: 900, cost: 90 },
        { date: "2024-01-02", usage: 850, cost: 85 },
        { date: "2024-01-03", usage: 800, cost: 80 }
      ]
    }
  ]}
/>`,
    defaultProps: {
      title: "Usage Forecast",
      description: "Predictions based on usage patterns",
      showChart: true,
      metrics: [
        {
          name: "API Calls",
          currentUsage: 45000,
          limit: 50000,
          unitCost: 0.001,
          currency: "$",
          unitName: "calls",
          historicalData: [
            { date: "2024-01-01", usage: 35000, cost: 35 },
            { date: "2024-01-02", usage: 36000, cost: 36 },
            { date: "2024-01-03", usage: 37000, cost: 37 }
          ]
        },
        {
          name: "Storage",
          currentUsage: 750,
          limit: 1000,
          unitCost: 0.1,
          currency: "$",
          unitName: "GB",
          historicalData: [
            { date: "2024-01-01", usage: 900, cost: 90 },
            { date: "2024-01-02", usage: 850, cost: 85 },
            { date: "2024-01-03", usage: 800, cost: 80 }
          ]
        }
      ]
    },
  },
];
