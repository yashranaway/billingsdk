import { ComponentConfig } from "./types";
import { Banner } from "@/components/billingsdk/banner";
import { PricingTableOne } from "@/components/billingsdk/pricing-table-one";
import { PricingTableTwo } from "@/components/billingsdk/pricing-table-two";
import { PricingTableThree } from "@/components/billingsdk/pricing-table-three";
import { CancelSubscriptionCard } from "@/components/billingsdk/cancel-subscription-card";
import { CancelSubscriptionDialog } from "@/components/billingsdk/cancel-subscription-dialog";
import { UpdatePlanCard } from "@/components/billingsdk/update-plan-card";
import { UpdatePlanDialog } from "@/components/billingsdk/update-plan-dialog";
import { SubscriptionManagement } from "@/components/billingsdk/subscription-management";
import { UsageMeter } from "@/components/billingsdk/usage-meter";
import { UsageTable } from "@/components/billingsdk/usage-table";
import { InvoiceHistory } from "@/components/billingsdk/invoice-history";
import { PaymentMethodSelector } from "@/components/billingsdk/payment-method-selector";

export const componentRegistry: ComponentConfig[] = [
  {
    id: "banner",
    name: "Banner",
    description: "Flexible notification banner with multiple variants",
    category: "ui",
    component: Banner,
    imports: ["@/components/billingsdk/banner"],
    defaultCode: `<Banner
  variant="default"
  title="Welcome to Billing SDK"
  description="Start building amazing billing experiences"
  buttonText="Get Started"
  buttonLink="/docs"
/>`,
    defaultProps: {
      variant: "default",
      title: "Welcome to Billing SDK",
      description: "Start building amazing billing experiences",
      buttonText: "Get Started",
      buttonLink: "/docs",
    },
  },
  {
    id: "pricing-table-one",
    name: "Pricing Table One",
    description: "Clean, modern pricing table with feature lists",
    category: "pricing",
    component: PricingTableOne,
    imports: ["@/components/billingsdk/pricing-table-one"],
    defaultCode: `<PricingTableOne
  title="Simple Pricing"
  description="Choose the plan that's right for you"
  plans={[
    {
      id: "starter",
      title: "Starter",
      description: "Perfect for small teams",
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
    description: "Card-based pricing with emphasis on value",
    category: "pricing",
    component: PricingTableTwo,
    imports: ["@/components/billingsdk/pricing-table-two"],
    defaultCode: `<PricingTableTwo
  title="Professional Pricing"
  description="Choose the plan that fits your needs"
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
      description: "Choose the plan that fits your needs",
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
    id: "cancel-subscription-card",
    name: "Cancel Subscription Card",
    description: "Elegant subscription cancellation interface",
    category: "subscription",
    component: CancelSubscriptionCard,
    imports: ["@/components/billingsdk/cancel-subscription-card"],
    defaultCode: `<CancelSubscriptionCard
  planName="Pro Plan"
  nextBillingDate="March 15, 2024"
  amount="$29.00"
  onCancel={() => console.log("Subscription cancelled")}
  onKeep={() => console.log("Subscription kept")}
/>`,
    defaultProps: {
      planName: "Pro Plan",
      nextBillingDate: "March 15, 2024",
      amount: "$29.00",
      onCancel: () => console.log("Subscription cancelled"),
      onKeep: () => console.log("Subscription kept"),
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
  planName="Pro Plan"
  nextBillingDate="March 15, 2024"
  amount="$29.00"
  onCancel={() => console.log("Subscription cancelled")}
  onKeep={() => console.log("Subscription kept")}
/>`,
    defaultProps: {
      planName: "Pro Plan",
      nextBillingDate: "March 15, 2024",
      amount: "$29.00",
      onCancel: () => console.log("Subscription cancelled"),
      onKeep: () => console.log("Subscription kept"),
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
  currentPlan="Basic"
  newPlan="Pro"
  currentPrice="$19"
  newPrice="$49"
  onUpdate={() => console.log("Plan updated")}
  onCancel={() => console.log("Update cancelled")}
/>`,
    defaultProps: {
      currentPlan: "Basic",
      newPlan: "Pro",
      currentPrice: "$19",
      newPrice: "$49",
      onUpdate: () => console.log("Plan updated"),
      onCancel: () => console.log("Update cancelled"),
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
  currentPlan="Basic"
  newPlan="Pro"
  currentPrice="$19"
  newPrice="$49"
  onUpdate={() => console.log("Plan updated")}
  onCancel={() => console.log("Update cancelled")}
/>`,
    defaultProps: {
      currentPlan: "Basic",
      newPlan: "Pro",
      currentPrice: "$19",
      newPrice: "$49",
      onUpdate: () => console.log("Plan updated"),
      onCancel: () => console.log("Update cancelled"),
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
  subscription={{
    status: "active",
    plan: "Pro",
    price: "$49/month",
    nextBilling: "March 15, 2024",
    usage: "75%",
  }}
  onUpdatePlan={() => console.log("Update plan")}
  onCancel={() => console.log("Cancel subscription")}
/>`,
    defaultProps: {
      subscription: {
        status: "active",
        plan: "Pro",
        price: "$49/month",
        nextBilling: "March 15, 2024",
        usage: "75%",
      },
      onUpdatePlan: () => console.log("Update plan"),
      onCancel: () => console.log("Cancel subscription"),
    },
  },
  {
    id: "usage-meter",
    name: "Usage Meter",
    description: "Visual usage tracking with multiple variants",
    category: "usage",
    component: UsageMeter,
    imports: ["@/components/billingsdk/usage-meter"],
    defaultCode: `<UsageMeter
  variant="linear"
  current={75}
  limit={100}
  unit="GB"
  label="Storage Usage"
  description="75 GB of 100 GB used"
/>`,
    defaultProps: {
      variant: "linear",
      current: 75,
      limit: 100,
      unit: "GB",
      label: "Storage Usage",
      description: "75 GB of 100 GB used",
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
  usage={[
    { feature: "API Calls", used: "1.2M", limit: "2M", percentage: 60 },
    { feature: "Storage", used: "75GB", limit: "100GB", percentage: 75 },
    { feature: "Users", used: "45", limit: "50", percentage: 90 },
  ]}
  period="This month"
/>`,
    defaultProps: {
      usage: [
        { feature: "API Calls", used: "1.2M", limit: "2M", percentage: 60 },
        { feature: "Storage", used: "75GB", limit: "100GB", percentage: 75 },
        { feature: "Users", used: "45", limit: "50", percentage: 90 },
      ],
      period: "This month",
    },
  },
  {
    id: "invoice-history",
    name: "Invoice History",
    description: "Complete invoice management table",
    category: "usage",
    component: InvoiceHistory,
    imports: ["@/components/billingsdk/invoice-history"],
    defaultCode: `<InvoiceHistory
  invoices={[
    {
      id: "INV-001",
      date: "2024-02-15",
      amount: "$49.00",
      status: "paid",
      description: "Pro Plan - February 2024",
    },
    {
      id: "INV-002",
      date: "2024-01-15",
      amount: "$49.00",
      status: "paid",
      description: "Pro Plan - January 2024",
    },
  ]}
/>`,
    defaultProps: {
      invoices: [
        {
          id: "INV-001",
          date: "2024-02-15",
          amount: "$49.00",
          status: "paid",
          description: "Pro Plan - February 2024",
        },
        {
          id: "INV-002",
          date: "2024-01-15",
          amount: "$49.00",
          status: "paid",
          description: "Pro Plan - January 2024",
        },
      ],
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
];
