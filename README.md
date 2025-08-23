# Billing SDK

A comprehensive collection of modern billing and subscription management components built with React, TypeScript, and Tailwind CSS. Perfect companion for shadcn/ui.

## Features

- **Ready-to-use Components**: Comprehensive billing components and blocks
- **Multiple Themes**: Classic, minimal, and custom theme support
- **Responsive Design**: Works seamlessly across all device sizes
- **TypeScript Ready**: Full type safety and better development experience
- **Easy Integration**: Single command installation with shadcn/ui

## Components

- **Pricing Tables** - Beautiful pricing designs with multiple variants
- **Subscription Management** - Complete subscription management interfaces
- **Usage Meters** - Linear and circular progress indicators for quota tracking
- **Banner Notifications** - Promotional banners and announcements
- **Plan Updates** - Upgrade/downgrade plan interfaces
- **Cancellation Flow** - User-friendly cancellation with retention features

## Quick Example

```tsx
import { PricingTableOne } from "@/components/billingsdk/pricing-table-one";

const plans = [
  {
    id: "starter",
    title: "Starter",
    price: 9,
    period: "month",
    features: ["100 requests", "Basic support", "1 project"],
    popular: false
  },
  {
    id: "pro",
    title: "Pro",
    price: 29,
    period: "month",
    features: ["Unlimited requests", "Priority support", "10 projects"],
    popular: true
  }
];

export default function App() {
  return (
    <PricingTableOne
      plans={plans}
      title="Choose your plan"
      description="Select the plan that works best for you"
      onPlanSelect={(planId) => {
        console.log("Selected plan:", planId);
        // Handle plan selection
      }}
      theme="classic"
      size="medium"
    />
  );
}
```

## Tech Stack

- React 19
- TypeScript
- Tailwind CSS
- Next.js 15
- shadcn/ui components
- Motion (animations)

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Documentation

Visit [https://billingsdk.com/docs](https://billingsdk.com/docs) for comprehensive documentation and interactive component examples.

## Installation in Your Project

Add Billing SDK components to your existing shadcn/ui project:

```bash
npx shadcn@latest add https://billingsdk.com/r/[component-name].json
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup, project structure, and contribution guidelines.

## License

GNU General Public License (GPL)
