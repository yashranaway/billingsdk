"use client"

import { PaymentMethodSelector } from "@/components/billingsdk/payment-method-selector"

export function PaymentMethodSelectorDemo() {
    return (
        <div className="w-full max-w-md mx-auto min-h-[600px] flex items-center justify-center">
            <PaymentMethodSelector
                onSelectMethod={(method) => {
                    console.log("Demo: Selected method:", method)
                }}
                onFormSubmit={(data) => {
                    console.log("Demo: Form submitted:", data)
                }}
            />
        </div>
    )
}


