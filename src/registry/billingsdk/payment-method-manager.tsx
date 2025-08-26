
"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { z } from "zod";

export interface PaymentMethod {
  id: string;
  type: "credit" | "ach";
  last4: string;
  expiry?: string;
  isDefault: boolean;
  routing?: string;
}

export interface PaymentMethodManagerProps {
  paymentMethods: PaymentMethod[];
  onAdd?: (method: PaymentMethod) => void;
  onEdit?: (method: PaymentMethod) => void;
  onRemove?: (id: string) => void;
  onSetDefault?: (id: string) => void;
  className?: string;
}

export function PaymentMethodManager({
  paymentMethods,
  onAdd,
  onEdit,
  onRemove,
  onSetDefault,
  className,
}: PaymentMethodManagerProps) {
  // Dialog states
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

  // Form state
  const [formType, setFormType] = useState<"credit" | "ach">("credit");
  const [formData, setFormData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    routing: "",
    account: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  // Zod schema
  const PaymentSchema = z.object({
    type: z.enum(["credit", "ach"]),
    number: z.string().min(12).max(19),
    expiry: z.string().regex(/^(0[1-9]|1[0-2])\/(\d{2})$/, "Invalid expiry format"),
    cvv: z.string().min(3).max(4),
    routing: z.string().min(9).max(9).optional(),
    account: z.string().min(4).max(17).optional(),
  });

  // Handlers
  const handleAddOpen = () => {
    setFormType("credit");
    setFormData({ number: "", expiry: "", cvv: "", routing: "", account: "" });
    setFormError(null);
    setAddOpen(true);
  };
  const handleEditOpen = (pm: PaymentMethod) => {
    setSelectedMethod(pm);
    setFormType(pm.type);
    setFormData({
      number: pm.last4 ? "" : "",
      expiry: pm.expiry || "",
      cvv: "",
      routing: pm.routing || "",
      account: "",
    });
    setFormError(null);
    setEditOpen(true);
  };
  const handleRemoveOpen = (pm: PaymentMethod) => {
    setSelectedMethod(pm);
    setRemoveOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "type") setFormType(value as "credit" | "ach");
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    // Validate
    try {
      if (formType === "credit") {
        PaymentSchema.pick({ type: true, number: true, expiry: true, cvv: true }).parse({
          type: formType,
          number: formData.number,
          expiry: formData.expiry,
          cvv: formData.cvv,
        });
      } else {
        PaymentSchema.pick({ type: true, routing: true, account: true }).parse({
          type: formType,
          routing: formData.routing,
          account: formData.account,
        });
      }
    } catch (err: any) {
      setFormError(err.errors?.[0]?.message || "Invalid input");
      return;
    }
    // Construct new method
    const newMethod: PaymentMethod = {
      id: Math.random().toString(36).slice(2),
      type: formType,
      last4: formType === "credit" ? formData.number.slice(-4) : formData.account.slice(-4),
      expiry: formType === "credit" ? formData.expiry : undefined,
      isDefault: false,
      routing: formType === "ach" ? formData.routing : undefined,
    };
  if (onAdd) onAdd(newMethod);
  else console.log("Add Payment Method", newMethod);
    setAddOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!selectedMethod) return;
    try {
      if (formType === "credit") {
        PaymentSchema.pick({ type: true, number: true, expiry: true, cvv: true }).parse({
          type: formType,
          number: formData.number,
          expiry: formData.expiry,
          cvv: formData.cvv,
        });
      } else {
        PaymentSchema.pick({ type: true, routing: true, account: true }).parse({
          type: formType,
          routing: formData.routing,
          account: formData.account,
        });
      }
    } catch (err: any) {
      setFormError(err.errors?.[0]?.message || "Invalid input");
      return;
    }
    // Construct updated method
    const updatedMethod: PaymentMethod = {
      ...selectedMethod,
      type: formType,
      last4: formType === "credit" ? formData.number.slice(-4) : formData.account.slice(-4),
      expiry: formType === "credit" ? formData.expiry : undefined,
      routing: formType === "ach" ? formData.routing : undefined,
    };
  if (onEdit) onEdit(updatedMethod);
  else console.log("Edit Payment Method", updatedMethod);
    setEditOpen(false);
  };

  const handleRemoveConfirm = () => {
    if (selectedMethod) {
      if (onRemove) onRemove(selectedMethod.id);
      else console.log("Remove Payment Method", selectedMethod.id);
    }
    setRemoveOpen(false);
  };

  const handleSetDefault = (id: string) => {
    if (onSetDefault) onSetDefault(id);
    else console.log("Set Default Payment Method", id);
  };

  return (
    <div className={cn("p-4 border rounded bg-background", className)}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Payment Methods</h2>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button variant="default" onClick={handleAddOpen} aria-label="Add New Payment Method">
              Add New Method
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Payment Method</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  name="type"
                  value={formType}
                  onChange={handleFormChange}
                  className={cn("border rounded-md px-3 py-2 w-full bg-background")}
                  aria-label="Payment Type"
                >
                  <option value="credit">Credit Card</option>
                  <option value="ach">ACH</option>
                </select>
              </div>
              {formType === "credit" ? (
                <>
                  <div>
                    <Label htmlFor="number">Card Number</Label>
                    <input
                      id="number"
                      name="number"
                      type="text"
                      inputMode="numeric"
                      maxLength={19}
                      minLength={12}
                      value={formData.number}
                      onChange={handleFormChange}
                      className={cn("border rounded-md px-3 py-2 w-full bg-background")}
                      required
                      aria-label="Card Number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiry">Expiry (MM/YY)</Label>
                    <input
                      id="expiry"
                      name="expiry"
                      type="text"
                      pattern="^(0[1-9]|1[0-2])/(\d{2})$"
                      value={formData.expiry}
                      onChange={handleFormChange}
                      className={cn("border rounded-md px-3 py-2 w-full bg-background")}
                      required
                      aria-label="Expiry"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <input
                      id="cvv"
                      name="cvv"
                      type="password"
                      maxLength={4}
                      minLength={3}
                      value={formData.cvv}
                      onChange={handleFormChange}
                      className={cn("border rounded-md px-3 py-2 w-full bg-background")}
                      required
                      aria-label="CVV"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label htmlFor="account">Account Number</Label>
                    <input
                      id="account"
                      name="account"
                      type="text"
                      inputMode="numeric"
                      maxLength={17}
                      minLength={4}
                      value={formData.account}
                      onChange={handleFormChange}
                      className={cn("border rounded-md px-3 py-2 w-full bg-background")}
                      required
                      aria-label="Account Number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="routing">Routing Number</Label>
                    <input
                      id="routing"
                      name="routing"
                      type="text"
                      inputMode="numeric"
                      maxLength={9}
                      minLength={9}
                      value={formData.routing}
                      onChange={handleFormChange}
                      className={cn("border rounded-md px-3 py-2 w-full bg-background")}
                      required
                      aria-label="Routing Number"
                    />
                  </div>
                </>
              )}
              {formError && <div className="text-red-500 text-sm">{formError}</div>}
              <div className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="ghost">Cancel</Button>
                </DialogClose>
                <Button type="submit" variant="default">Add</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {paymentMethods.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No payment methods added yet.
        </div>
      ) : (
        <Table className="w-full text-sm">
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Default</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentMethods.map((pm) => (
              <TableRow key={pm.id} className={cn(pm.isDefault && "bg-accent")}> 
                <TableCell className="capitalize">{pm.type}</TableCell>
                <TableCell>
                  ****{pm.last4}
                  {pm.expiry ? ` • Exp: ${pm.expiry}` : ""}
                </TableCell>
                <TableCell>
                  {pm.isDefault ? (
                    <span title="Default" className="text-green-500 font-bold">✓</span>
                  ) : null}
                </TableCell>
                <TableCell className="space-x-2">
                  <Dialog open={editOpen && selectedMethod?.id === pm.id} onOpenChange={setEditOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => handleEditOpen(pm)} aria-label={`Edit ${pm.type} ending in ${pm.last4}`}>
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Payment Method</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleEditSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="type">Type</Label>
                          <select
                            id="type"
                            name="type"
                            value={formType}
                            onChange={handleFormChange}
                            className={cn("border rounded-md px-3 py-2 w-full bg-background")}
                            aria-label="Payment Type"
                          >
                            <option value="credit">Credit Card</option>
                            <option value="ach">ACH</option>
                          </select>
                        </div>
                        {formType === "credit" ? (
                          <>
                            <div>
                              <Label htmlFor="number">Card Number</Label>
                              <input
                                id="number"
                                name="number"
                                type="text"
                                inputMode="numeric"
                                maxLength={19}
                                minLength={12}
                                value={formData.number}
                                onChange={handleFormChange}
                                className={cn("border rounded-md px-3 py-2 w-full bg-background")}
                                required
                                aria-label="Card Number"
                              />
                            </div>
                            <div>
                              <Label htmlFor="expiry">Expiry (MM/YY)</Label>
                              <input
                                id="expiry"
                                name="expiry"
                                type="text"
                                pattern="^(0[1-9]|1[0-2])/(\d{2})$"
                                value={formData.expiry}
                                onChange={handleFormChange}
                                className={cn("border rounded-md px-3 py-2 w-full bg-background")}
                                required
                                aria-label="Expiry"
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV</Label>
                              <input
                                id="cvv"
                                name="cvv"
                                type="password"
                                maxLength={4}
                                minLength={3}
                                value={formData.cvv}
                                onChange={handleFormChange}
                                className={cn("border rounded-md px-3 py-2 w-full bg-background")}
                                required
                                aria-label="CVV"
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <Label htmlFor="account">Account Number</Label>
                              <input
                                id="account"
                                name="account"
                                type="text"
                                inputMode="numeric"
                                maxLength={17}
                                minLength={4}
                                value={formData.account}
                                onChange={handleFormChange}
                                className={cn("border rounded-md px-3 py-2 w-full bg-background")}
                                required
                                aria-label="Account Number"
                              />
                            </div>
                            <div>
                              <Label htmlFor="routing">Routing Number</Label>
                              <input
                                id="routing"
                                name="routing"
                                type="text"
                                inputMode="numeric"
                                maxLength={9}
                                minLength={9}
                                value={formData.routing}
                                onChange={handleFormChange}
                                className={cn("border rounded-md px-3 py-2 w-full bg-background")}
                                required
                                aria-label="Routing Number"
                              />
                            </div>
                          </>
                        )}
                        {formError && <div className="text-red-500 text-sm">{formError}</div>}
                        <div className="flex justify-end gap-2">
                          <DialogClose asChild>
                            <Button type="button" variant="ghost">Cancel</Button>
                          </DialogClose>
                          <Button type="submit" variant="default">Save</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={removeOpen && selectedMethod?.id === pm.id} onOpenChange={setRemoveOpen}>
                    <DialogTrigger asChild>
                      <Button variant="destructive" size="sm" onClick={() => handleRemoveOpen(pm)} aria-label={`Remove ${pm.type} ending in ${pm.last4}`}>
                        Remove
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Remove Payment Method</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">Are you sure you want to remove <span className="font-bold">{pm.type} ending in {pm.last4}</span>?</div>
                      <div className="flex justify-end gap-2">
                        <DialogClose asChild>
                          <Button type="button" variant="ghost">Cancel</Button>
                        </DialogClose>
                        <Button type="button" variant="destructive" onClick={handleRemoveConfirm}>Remove</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  {!pm.isDefault && (
                    <Button variant="secondary" size="sm" onClick={() => handleSetDefault(pm.id)}>
                      Set Default
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
