
"use client";

import React, { useState } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CreditCard,
  Banknote,
  CheckCircle2,
  Pencil,
  Trash2,
  Star,
  Plus,
  AlertCircle,
  Loader2
} from "lucide-react";
import { SiAmericanexpress, SiIcicibank } from "react-icons/si";
import { FaCcVisa } from "react-icons/fa6";
import { RiBankCardFill } from "react-icons/ri";

export interface PaymentMethod {
  id: string;
  type: "credit" | "ach";
  last4: string;
  expiry?: string;
  isDefault: boolean;
  routing?: string;
  brand?: string; // For credit cards (Visa, Mastercard, etc.)
  bankName?: string; // For ACH accounts
}

export interface PaymentMethodManagerProps {
  paymentMethods: PaymentMethod[];
  onAdd?: (method: PaymentMethod) => void;
  onEdit?: (method: PaymentMethod) => void;
  onRemove?: (id: string) => void;
  onSetDefault?: (id: string) => void;
  onRedirect: (type: 'add' | 'edit', methodId?: string) => void;
  className?: string;
  isLoading?: boolean;
  error?: string | null;
}

// Inline brand logo renderer to avoid external assets
function BrandLogo({ type, brand, bankName }: { type: 'credit' | 'ach'; brand?: string; bankName?: string }) {
  const size = 32; // increased for better prominence
  if (type === 'credit') {
    const b = (brand || '').toLowerCase();
    if (b.includes('visa')) return <FaCcVisa size={size} className="text-[#1A1F71] dark:text-[#3B52A3]" aria-label="Visa" />;
    // For Mastercard, use a solid filled card glyph for a cleaner look
    if (b.includes('master')) return <RiBankCardFill size={size} className="text-primary dark:text-primary/90" aria-label="Card" />;
    if (b.includes('american') || b.includes('amex')) return <SiAmericanexpress size={size} className="text-[#2E77BC] dark:text-[#4E8FD0]" aria-label="American Express" />;
    return <CreditCard className="h-6 w-6 text-muted-foreground" aria-hidden />;
  }
  // ACH
  const bn = (bankName || '').toLowerCase();
  // Map ICICI Bank to its icon
  if (bn.includes('icici')) return <SiIcicibank size={size} className="text-[#E55C2B] dark:text-[#F07A4E]" aria-label="ICICI Bank" />;
  // fallback to a neutral bank pill if not available
  const label = bankName && bankName.trim().length > 0 ? bankName : 'Bank';
  return (
    <span className="px-2.5 py-1 text-[10px] font-medium rounded-md bg-background/40 border text-muted-foreground whitespace-nowrap">
      {label}
    </span>
  );
}

function bankInitials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  return initials || 'BK';
}

// Payment Method Card Component
interface PaymentMethodCardProps {
  method: PaymentMethod;
  onEdit: (method: PaymentMethod) => void;
  onRemove: (id: string) => void;
  onSetDefault: (id: string) => void;
  onRedirect: (type: 'add' | 'edit', methodId?: string) => void;
}

function PaymentMethodCard({
  method,
  onEdit,
  onRemove,
  onSetDefault,
  onRedirect
}: PaymentMethodCardProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);
  const [isSettingDefault, setIsSettingDefault] = useState(false);

  // Determine brand label for display
  const brandLabel = method.brand
    ? method.brand
    : method.type === "credit"
      ? "Card"
      : (method.bankName ?? "Bank");

  // Compute expiry status
  const isExpired = (() => {
    if (!method.expiry) return false;
    const [mm, yy] = method.expiry.split("/");
    if (!mm || !yy) return false;
    const month = parseInt(mm, 10);
    const year = 2000 + parseInt(yy, 10);
    if (isNaN(month) || isNaN(year)) return false;
    const lastDay = new Date(year, month, 0);
    const now = new Date();
    // consider expired if end of month is before today
    return lastDay < new Date(now.getFullYear(), now.getMonth(), now.getDate());
  })();

  const isExpiringSoon = (() => {
    if (!method.expiry) return false;
    const [mm, yy] = method.expiry.split("/");
    if (!mm || !yy) return false;
    const month = parseInt(mm, 10);
    const year = 2000 + parseInt(yy, 10);
    if (isNaN(month) || isNaN(year)) return false;
    const lastDay = new Date(year, month, 0);
    const now = new Date();
    const diff = lastDay.getTime() - now.getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    return days > 0 && days <= 60;
  })();

  const handleEdit = () => {
    onEdit(method);
    setEditOpen(true);
  };

  const handleRemove = () => {
    setRemoveOpen(true);
  };

  const handleRedirectToEdit = () => {
    onRedirect('edit', method.id);
    setEditOpen(false);
  };

  const handleSetDefault = () => {
    setIsSettingDefault(true);
    try {
      onSetDefault(method.id);
    } finally {
      // simulate brief processing so disabled state is visible
      setTimeout(() => setIsSettingDefault(false), 300);
    }
  };

  return (
    <Card className="group border border-border/80 rounded-xl bg-card transition-colors">
      <div
        className="flex items-center gap-3 p-4 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-xl"
        tabIndex={0}
      >
        {/* Brand chip */}
        <div className="shrink-0 rounded-md border bg-background/70 dark:bg-muted/40 px-3 py-2 flex items-center justify-center w-20 h-14">
          <BrandLogo type={method.type} brand={method.brand} bankName={method.bankName} />
        </div>

        {/* Title and subtitle */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium truncate">
              {brandLabel} ending in {method.last4}
            </p>
            {method.isDefault && (
              <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-xs flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Default
              </Badge>
            )}
            {!method.isDefault && isExpired && (
              <Badge variant="destructive" className="rounded-full px-2 py-0.5 text-xs">Expired</Badge>
            )}
            {!method.isDefault && !isExpired && isExpiringSoon && (
              <span className="rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-500 text-white border border-amber-500 shadow-sm dark:bg-amber-400/15 dark:text-amber-300 dark:border-amber-400/20">
                Expiring soon
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {method.expiry ? `Exp. date ${method.expiry}` : method.routing ? `Routing ${method.routing}` : ''}
          </p>
        </div>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-4">
          {/* Edit */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleEdit}
                  className="h-8 w-8 rounded-md"
                  aria-label={`Edit ${method.type === "credit" ? "credit card" : "ACH account"} ending in ${method.last4}`}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Set as Default */}
          {!method.isDefault && !isExpired && (
            <Button
              onClick={handleSetDefault}
              disabled={isSettingDefault}
              variant="secondary"
              size="sm"
              className={cn(
                "h-8 px-3 rounded-full text-sm",
                isSettingDefault && "opacity-60 cursor-not-allowed"
              )}
              aria-label="Set as Default"
            >
              {isSettingDefault ? "Setting…" : "Set as Default"}
            </Button>
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemove}
                  className="h-8 w-8 rounded-md"
                  aria-label={`Remove ${method.type === "credit" ? "credit card" : "ACH account"} ending in ${method.last4}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Remove</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pencil className="h-5 w-5" />
              {`Edit ${brandLabel} ending in ${method.last4}`}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <BrandLogo type={method.type} brand={method.brand} bankName={method.bankName} />
              <div>
                <p className="text-sm font-medium">
                  {method.type === "credit" ? (method.brand ?? "Credit Card") : (method.bankName ?? "ACH Account")}
                </p>
                <p className="text-xs text-muted-foreground">
                  Ending in {method.last4}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              You will be redirected to the payment gateway to update your payment details securely.
              No sensitive payment information is handled directly in this interface.
            </p>
          </div>
          <div className="flex justify-center gap-3">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="default"
              onClick={handleRedirectToEdit}
              className="gap-2"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              Redirect to Gateway
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Remove Dialog */}
      <Dialog open={removeOpen} onOpenChange={setRemoveOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              {`Remove ${brandLabel} ending in ${method.last4}`}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <p className="text-sm">
              Are you sure you want to remove this payment method?
            </p>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-destructive/20">
              <BrandLogo type={method.type} brand={method.brand} bankName={method.bankName} />
              <div>
                <p className="text-sm font-medium">
                  {method.type === "credit" ? (method.brand ?? "Credit Card") : (method.bankName ?? "ACH Account")}
                </p>
                <p className="text-xs text-muted-foreground">
                  Ending in {method.last4}
                </p>
              </div>
            </div>
            {method.isDefault && (
              <p className="text-xs text-amber-600 dark:text-amber-400">
                ⚠️ This is your default payment method. Removing it will require you to set a new default.
              </p>
            )}
          </div>
          <div className="flex justify-center gap-3">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                onRemove(method.id);
                setRemoveOpen(false);
              }}
            >
              Remove
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

// Empty State Component
interface EmptyStateProps {
  onAdd: () => void;
}

function EmptyState({ onAdd }: EmptyStateProps) {
  return (
    <div className="col-span-full text-center p-8 border border-dashed rounded-xl">
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="rounded-full bg-muted p-3">
            <CreditCard className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium">No payment methods yet</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Add your first payment method to get started with secure payments.
          </p>
        </div>
      </div>
      <div className="flex justify-center pt-4">
        <Button onClick={onAdd} className="gap-2" aria-label="Add New Payment Method">
          <Plus className="h-4 w-4" />
          Add Payment Method
        </Button>
      </div>
    </div>
  );
}

// Add Payment Method Dialog Component
interface AddPaymentMethodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRedirect: () => void;
}

function AddPaymentMethodDialog({
  open,
  onOpenChange,
  onRedirect
}: AddPaymentMethodDialogProps) {
  const handleRedirect = () => {
    onRedirect();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Payment Method
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-3 place-items-center">
              <div className="flex flex-col items-center justify-center gap-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer w-36">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-sm font-medium">Credit Card</p>
                  <p className="text-xs text-muted-foreground">Visa, Mastercard, etc.</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer w-36">
                <Banknote className="h-5 w-5 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-sm font-medium">ACH Account</p>
                  <p className="text-xs text-muted-foreground">Bank transfer</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            You will be redirected to our secure payment gateway to add your payment details.
            Your information is encrypted and protected.
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="default"
            onClick={handleRedirect}
            className="gap-2"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            Continue to Gateway
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function PaymentMethodManager({
  paymentMethods,
  onAdd: _onAdd,
  onEdit: _onEdit,
  onRemove,
  onSetDefault,
  onRedirect,
  className,
  isLoading = false,
  error = null,
}: PaymentMethodManagerProps) {
  // Dialog states
  const [addOpen, setAddOpen] = useState(false);
  // Auto-animate list container for subtle reordering animations
  const [listRef] = useAutoAnimate({ duration: 180, easing: 'ease-in-out' });

  // Handlers
  const handleAddRedirect = () => {
    onRedirect('add');
  };

  const handleEdit = (method: PaymentMethod) => {
    if (_onEdit) _onEdit(method);
  };

  const handleRemoveById = (id: string) => {
    if (onRemove) onRemove(id);
  };



  const handleSetDefault = (id: string) => {
    if (onSetDefault) onSetDefault(id);
  };

  return (
    <TooltipProvider>
      <div className={cn("space-y-6", className)}>
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 justify-center text-center">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight">Payment Methods</h2>
            <p className="text-sm text-muted-foreground">
              Manage your saved payment methods for quick and secure transactions.
            </p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="default"
                  onClick={() => setAddOpen(true)}
                  className="gap-2"
                  aria-label="Add New Payment Method"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  Add Payment Method
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add a new payment method</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Error State */}
        {error && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-destructive">Error loading payment methods</p>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && paymentMethods.length === 0 && (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-16 bg-muted/40 rounded-xl animate-pulse" />
            ))}
          </div>
        )}

        {/* Payment Methods Grid */}
        {!isLoading && (
          <>
            {paymentMethods.length === 0 ? (
              <EmptyState onAdd={() => setAddOpen(true)} />
            ) : (
              <div className="space-y-3" ref={listRef}>
                {paymentMethods
                  .slice()
                  .sort((a, b) => Number(b.isDefault) - Number(a.isDefault))
                  .map((method) => (
                  <PaymentMethodCard
                    key={method.id}
                    method={method}
                    onEdit={handleEdit}
                    onRemove={handleRemoveById}
                    onSetDefault={handleSetDefault}
                    onRedirect={onRedirect}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Add Payment Method Dialog */}
        <AddPaymentMethodDialog
          open={addOpen}
          onOpenChange={setAddOpen}
          onRedirect={handleAddRedirect}
        />
      </div>
    </TooltipProvider>
  );
};
