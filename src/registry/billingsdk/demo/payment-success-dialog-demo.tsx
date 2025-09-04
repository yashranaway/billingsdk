'use client';

import { useState } from "react";
import { PaymentSuccessDialog } from "@/components/billingsdk/payment-success-dialog";
import { Card, CardContent } from "@/components/ui/card";

export function PaymentSuccessDialogDemo() {
  const [, setLastAction] = useState<string>("");

  return (
    <Card className="border-muted/40">
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="text-sm text-muted-foreground">
          Click the button to preview the success dialog.
        </div>
        <PaymentSuccessDialog
          price="29"
          currencySymbol="$"
          productName="Pro Plan (Monthly)"
          triggerText="Complete Purchase"
          proceedButtonText="Go to Dashboard"
          backButtonText="Back to Pricing"
          onProceed={() => setLastAction("proceed")}
          onBack={() => setLastAction("back")}
        />
      </CardContent>
    </Card>
  );
}


