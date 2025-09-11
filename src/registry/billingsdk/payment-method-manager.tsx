
"use client";

import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
  Loader2,
  Clock,
  XCircle
} from "lucide-react";

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

  // Helpers: expiry parsing and status
  const expiryStatus = useMemo(() => {
    if (method.type !== "credit" || !method.expiry) return { state: "valid" as const, monthsRemaining: Infinity };
    // Expected format MM/YY
    const match = method.expiry.match(/^(\d{2})\/(\d{2})$/);
    if (!match) return { state: "valid" as const, monthsRemaining: Infinity };
    const mm = parseInt(match[1], 10);
    const yy = parseInt(match[2], 10);
    if (mm < 1 || mm > 12) return { state: "valid" as const, monthsRemaining: Infinity };
    // Convert YY to 20YY (naive but sufficient for UI warning)
    const year = 2000 + yy;
    // Set to last day of month 23:59:59
    const expiryDate = new Date(year, mm, 0, 23, 59, 59, 999);
    const now = new Date();
    const diffMs = expiryDate.getTime() - now.getTime();
    const diffMonths = diffMs / (1000 * 60 * 60 * 24 * 30);
    if (diffMs < 0) return { state: "expired" as const, monthsRemaining: -Math.ceil(Math.abs(diffMonths)) };
    if (diffMonths <= 2) return { state: "expiring" as const, monthsRemaining: Math.ceil(diffMonths) };
    return { state: "valid" as const, monthsRemaining: Math.ceil(diffMonths) };
  }, [method.type, method.expiry]);

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
    onSetDefault(method.id);
  };

  return (
    <motion.div
      layout
      initial={false}
      animate={method.isDefault ? { scale: 1.01, boxShadow: "0 0 0 2px hsl(var(--primary))" } : { scale: 1, boxShadow: "0 0 0 0px transparent" }}
      transition={{ type: "spring", stiffness: 340, damping: 26 }}
      className="rounded-xl"
    >
    <Card
      className="transition-colors duration-200 border-border group rounded-xl hover:bg-muted/40"
      role="group"
      aria-labelledby={`pm-title-${method.id}`}
    >
      <CardHeader className="flex flex-row items-center gap-3 pb-3">
        <div className="flex items-center gap-3">
          {method.type === "credit" ? (
            <div className="p-2 rounded-lg bg-background border shadow-sm">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </div>
          ) : (
            <div className="p-2 rounded-lg bg-background border shadow-sm">
              <Banknote className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
          <div>
            <p id={`pm-title-${method.id}`} className="text-sm font-medium leading-none">
              {method.type === "credit" ? "Credit Card" : "ACH Account"}
            </p>
            {(method.brand || method.bankName) && (
              <div className="mt-1 inline-flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-semibold text-muted-foreground uppercase">
                  {(method.brand || method.bankName || "").slice(0,2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {method.brand || method.bankName}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {method.type === "credit" && method.expiry && expiryStatus.state !== "valid" && (
            <Badge
              variant={expiryStatus.state === "expired" ? "destructive" : "secondary"}
              className="gap-1"
              aria-label={expiryStatus.state === "expired" ? "Card expired" : `Card expiring soon`}
            >
              {expiryStatus.state === "expired" ? (
                <XCircle className="h-3 w-3" />
              ) : (
                <Clock className="h-3 w-3" />
              )}
              {expiryStatus.state === "expired" ? "Expired" : "Expiring"}
            </Badge>
          )}
          {method.isDefault && (
            <Badge variant="secondary" className="gap-1 px-2.5 py-1 shadow-sm text-[11px] md:text-sm" aria-label="Default payment method">
              <CheckCircle2 className="h-3 w-3" />
              Default
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-2 pb-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Last 4:</span>
          <span className="font-mono text-sm">•••• {method.last4}</span>
        </div>
        {method.expiry && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Expiry:</span>
            <span className="font-mono text-sm">{method.expiry}</span>
          </div>
        )}
        {method.routing && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Routing:</span>
            <span className="font-mono text-sm">{method.routing}</span>
          </div>
        )}
      </CardContent>

      <Separator />

      <CardFooter className="flex justify-between items-center pt-3 bg-muted/20 rounded-b-xl px-4 py-3 border-t">
        <div className="flex gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEdit}
                  className="gap-1 h-8 w-8 p-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label={`Edit ${method.type === "credit" ? "credit card" : "ACH account"} ending in ${method.last4}`}
                >
                  <span className="sr-only">Edit</span>
                  <Pencil className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit payment method</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  className="gap-1 h-8 w-8 p-0 focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                  aria-label={`Remove ${method.type === "credit" ? "credit card" : "ACH account"} ending in ${method.last4}`}
                >
                  <span className="sr-only">Remove</span>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Remove payment method</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {!method.isDefault && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSetDefault}
                  className="gap-2 h-8 px-3 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label={`Set as default payment method`}
                >
                  <Star className="h-4 w-4" />
                  <span className="text-xs font-medium">Set Default</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Set as default payment method</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </CardFooter>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pencil className="h-5 w-5" />
              Edit Payment Method
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              {method.type === "credit" ? (
                <CreditCard className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Banknote className="h-5 w-5 text-muted-foreground" />
              )}
              <div>
                <p className="text-sm font-medium">
                  {method.type === "credit" ? "Credit Card" : "ACH Account"}
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
            {method.type === "credit" && method.expiry && (
              <div className="flex items-center gap-2 text-xs">
                {expiryStatus.state === "expired" ? (
                  <XCircle className="h-4 w-4 text-destructive" aria-hidden="true" />
                ) : expiryStatus.state === "expiring" ? (
                  <Clock className="h-4 w-4 text-amber-500" aria-hidden="true" />
                ) : null}
                <span className="text-muted-foreground">Expiry: {method.expiry}</span>
              </div>
            )}
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="default"
              onClick={handleRedirectToEdit}
              className="gap-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
              Remove Payment Method
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <p className="text-sm">
              Are you sure you want to remove this payment method?
            </p>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-destructive/20">
              {method.type === "credit" ? (
                <CreditCard className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Banknote className="h-5 w-5 text-muted-foreground" />
              )}
              <div>
                <p className="text-sm font-medium">
                  {method.type === "credit" ? "Credit Card" : "ACH Account"}
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
          <div className="flex justify-center gap-3 pt-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
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
              className="focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2"
            >
              Remove
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
    </motion.div>
  );
}

// Empty State Component
interface EmptyStateProps {
  onAdd: () => void;
}

function EmptyState({ onAdd }: EmptyStateProps) {
  return (
    <Card className="col-span-full text-center p-10 border-border shadow-sm border-dashed rounded-xl">
      <CardContent className="space-y-5">
        <div className="flex justify-center">
          <div className="rounded-xl bg-gradient-to-b from-muted/70 to-muted p-4 border">
            <CreditCard className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">No payment methods yet</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Add your first payment method to get started with secure payments.
          </p>
        </div>
      </CardContent>
      <CardFooter className="justify-center pt-0">
        <Button onClick={onAdd} className="gap-2" aria-label="Add New Payment Method">
          <Plus className="h-4 w-4" />
          Add Payment Method
        </Button>
      </CardFooter>
    </Card>
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
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleRedirect}
              className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors text-left"
              aria-label="Add credit card via secure gateway"
            >
              <div className="p-2 rounded-lg bg-background border shadow-sm">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Credit Card</p>
                <p className="text-xs text-muted-foreground">Visa, Mastercard, etc.</p>
              </div>
            </button>
            <button
              type="button"
              onClick={handleRedirect}
              className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors text-left"
              aria-label="Add ACH account via secure gateway"
            >
              <div className="p-2 rounded-lg bg-background border shadow-sm">
                <Banknote className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">ACH Account</p>
                <p className="text-xs text-muted-foreground">Bank transfer</p>
              </div>
            </button>
          </div>
          <p className="text-sm text-muted-foreground">
            You will be redirected to our secure payment gateway to add your payment details.
            Your information is encrypted and protected.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="default"
            onClick={handleRedirect}
            className="gap-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
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
                  className="gap-2 w-full sm:w-auto"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="h-5 w-5 bg-muted rounded" />
                    <div className="h-4 w-20 bg-muted rounded" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-3/4 bg-muted rounded" />
                </CardContent>
                <CardFooter>
                  <div className="h-8 w-20 bg-muted rounded" />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Payment Methods Grid */}
        {!isLoading && (
          <>
            {paymentMethods.length === 0 ? (
              <EmptyState onAdd={() => setAddOpen(true)} />
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
                {paymentMethods.map((method) => (
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
