

"use client"

import React, { useState } from "react";
import { PaymentMethodManager, PaymentMethod } from "@/components/billingsdk/payment-method-manager";

const initialMethods: PaymentMethod[] = [
  {
    id: "pm1",
    type: "credit",
    brand: "Visa",
    last4: "7830",
    expiry: "06/26",
    isDefault: true,
  },
  {
    id: "pm2",
    type: "credit",
    brand: "Visa",
    last4: "5775",
    expiry: "08/25", // expired example (relative to current date)
    isDefault: false,
  },
  {
    id: "pm3",
    type: "credit",
    brand: "Mastercard",
    last4: "1075",
    expiry: "10/25", // expiring soon
    isDefault: false,
  },
  {
    id: "pm4",
    type: "ach",
    last4: "3321",
    isDefault: false,
    routing: "021000021",
    bankName: "ICICI Bank",
  },
];

export function PaymentMethodManagerDemo() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialMethods);

  const handleAdd = (method: PaymentMethod) => {
    setPaymentMethods((prev) => [...prev, method]);
  };

  const handleEdit = (updated: PaymentMethod) => {
    setPaymentMethods((prev) => prev.map((pm) => pm.id === updated.id ? updated : pm));
  };

  const handleRemove = (id: string) => {
    setPaymentMethods((prev) => prev.filter((pm) => pm.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods((prev) => prev.map((pm) => ({ ...pm, isDefault: pm.id === id })));
  };

  const handleRedirect = (type: 'add' | 'edit', methodId?: string) => {
    console.log("Redirecting...", { type, methodId });
  };

  return (
    <PaymentMethodManager
      paymentMethods={paymentMethods}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onRemove={handleRemove}
      onSetDefault={handleSetDefault}
      onRedirect={handleRedirect}
      className="w-full"
    />
  );
}
