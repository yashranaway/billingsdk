"use client";

import { LimitedOfferDialog } from "@/components/billingsdk/limited-offer-dialog";

// Sample offer data
const sampleOffer = {
  id: "limited-offer-dialog",
  title: "Special Offer",
  description: "Limited time deal",
  discount: "50% OFF",
  features: [
    { name: "50% off your first month" },
    { name: "Valid until December 31, 2024" },
    { name: "First 100 users only" }
  ]
};

export function LimitedOfferDialogDemo() {
  const handleClaimOffer = async (offerId: string) => {
    console.log("Claiming offer:", offerId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert("Offer claimed successfully!");
  };

  const handleDeclineOffer = async (offerId: string) => {
    console.log("Declining offer:", offerId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    alert("Offer declined. You can always come back later!");
  };

  const handleDialogClose = () => {
    console.log("Dialog closed");
  };

  return (
    <div className="flex flex-1 flex-col justify-center text-center p-4 mx-auto min-h-[300px]">
      <LimitedOfferDialog
        title="🎉 Black Friday Special!"
        description="Don't miss out on our biggest discount of the year"
        offer={sampleOffer}
        triggerButtonText="View Special Offer"
        warningTitle="Limited Time Only!"
        warningText="This exclusive Black Friday deal expires in 48 hours. Secure your discount now before it's gone forever."
        claimButtonText="🚀 Claim 75% Discount"
        declineButtonText="Maybe later"
        onClaimOffer={handleClaimOffer}
        onDeclineOffer={handleDeclineOffer}
        onDialogClose={handleDialogClose}
        className="w-auto"
      />
    </div>
  );
}
