
"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Banknote, CheckCircle2, Pencil, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
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

  // Form schemas
  const formSchema = z.discriminatedUnion('type', [
    z.object({
      type: z.literal('credit'),
      number: z.string().length(19, 'Enter a valid card number (e.g., 4242 4242 4242 4242)'),
      expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Enter valid MM/YY'),
      cvv: z.string().regex(/^\d{3,4}$/, 'Enter valid CVV'),
    }),
    z.object({
      type: z.literal('ach'),
      account: z.string().min(4, 'Enter valid account number'),
      routing: z.string().length(9, 'Enter valid 9-digit routing number'),
    })
  ]);

  type FormValues =
    | { type: 'credit'; number: string; expiry: string; cvv: string }
    | { type: 'ach'; account: string; routing: string };

  // Form state
  const [editing, setEditing] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues:
      editing && selectedMethod
        ? selectedMethod.type === 'credit'
          ? {
              type: 'credit',
              number: `**** **** **** ${selectedMethod.last4}`,
              expiry: selectedMethod.expiry || '',
              cvv: '',
            }
          : {
              type: 'ach',
              account: `**** ${selectedMethod.last4}`,
              routing: selectedMethod.routing || '',
            }
        : {
            type: 'credit',
            number: '',
            expiry: '',
            cvv: '',
          },
    mode: 'onChange',
  });

  // Handlers
  const handleAddOpen = () => {
    setEditing(false);
    setAddOpen(true);
    form.reset({ type: "credit", number: "", expiry: "", cvv: "" });
  };
  const handleEditOpen = (pm: PaymentMethod) => {
    setSelectedMethod(pm);
    setEditing(true);
    setEditOpen(true);
    if (pm.type === "credit") {
      form.reset({
        type: "credit",
        number: `**** **** **** ${pm.last4}`,
        expiry: pm.expiry || "",
        cvv: "",
      });
    } else {
      form.reset({
        type: "ach",
        account: `**** ${pm.last4}`,
        routing: pm.routing || "",
      });
    }
  };
  const handleRemoveOpen = (pm: PaymentMethod) => {
    setSelectedMethod(pm);
    setRemoveOpen(true);
  };

  const handleFormSubmit = (values: FormValues) => {
    const last4 = values.type === 'credit'
      ? values.number.replace(/\s/g, '').slice(-4)
      : values.account.slice(-4);
    const method: PaymentMethod = {
      id: editing ? selectedMethod?.id ?? crypto.randomUUID() : crypto.randomUUID(),
      type: values.type,
      last4,
      isDefault: editing ? selectedMethod?.isDefault ?? false : false,
      ...(values.type === 'credit'
        ? { expiry: values.expiry }
        : { routing: values.routing }),
    };
    if (editing) {
      onEdit?.(method);
    } else {
      onAdd?.(method);
    }
    form.reset();
    setAddOpen(false);
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
                <FormField name="type" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Type</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange} defaultValue="credit">
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="credit">Credit Card</SelectItem>
                          <SelectItem value="ach">ACH</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )} />
                {(() => {
                  const type = form.watch('type');
                  if (type === 'credit') {
                    return (
                      <>
                        <FormField name="number" control={form.control} render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Card Number</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="4242 4242 4242 4242" {...field} className="mt-1" />
                            </FormControl>
                            <FormDescription className="text-muted-foreground text-xs mt-1">Enter a valid 19-character card number.</FormDescription>
                            <FormMessage className="text-destructive text-xs mt-1" />
                          </FormItem>
                        )} />
                        <FormField name="expiry" control={form.control} render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Expiry</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="MM/YY" {...field} className="mt-1" />
                            </FormControl>
                            <FormDescription className="text-muted-foreground text-xs mt-1">Format: MM/YY</FormDescription>
                            <FormMessage className="text-destructive text-xs mt-1" />
                          </FormItem>
                        )} />
                        <FormField name="cvv" control={form.control} render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">CVV</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="CVV" {...field} className="mt-1" />
                            </FormControl>
                            <FormDescription className="text-muted-foreground text-xs mt-1">3 or 4 digits</FormDescription>
                            <FormMessage className="text-destructive text-xs mt-1" />
                          </FormItem>
                        )} />
                      </>
                    );
                  } else {
                    return (
                      <>
                        <FormField name="account" control={form.control} render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Account Number</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="Account Number" {...field} className="mt-1" />
                            </FormControl>
                            <FormDescription className="text-muted-foreground text-xs mt-1">Enter your bank account number.</FormDescription>
                            <FormMessage className="text-destructive text-xs mt-1" />
                          </FormItem>
                        )} />
                        <FormField name="routing" control={form.control} render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Routing Number</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="Routing Number" {...field} className="mt-1" />
                            </FormControl>
                            <FormDescription className="text-muted-foreground text-xs mt-1">9-digit routing number.</FormDescription>
                            <FormMessage className="text-destructive text-xs mt-1" />
                          </FormItem>
                        )} />
                      </>
                    );
                  }
                })()}
                <div className="flex justify-end gap-2">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" variant="default" disabled={form.formState.isSubmitting || !form.formState.isValid}>Save</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      {paymentMethods.length === 0 ? (
        <Card className="col-span-full text-center p-6 border-border shadow-sm">
          <CardContent>
            No payment methods added yet.
          </CardContent>
          <CardFooter className="justify-center">
            <Button onClick={() => setAddOpen(true)} aria-label="Add New Payment Method">Add New Method</Button>
          </CardFooter>
        </Card>
      ) : (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
          {paymentMethods.map((method) => (
            <Card key={method.id} className="hover:shadow-md transition-shadow border-border">
              <CardHeader className="flex flex-row items-center space-x-2 pb-2">
                {method.type === "credit" ? (
                  <CreditCard size={20} className="text-muted-foreground" aria-label="Credit Card" />
                ) : (
                  <Banknote size={20} className="text-muted-foreground" aria-label="ACH" />
                )}
                <p className="text-md font-semibold">{method.type === "credit" ? "Credit Card" : "ACH Account"}</p>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last 4:</span>
                  <span>{method.last4}</span>
                </div>
                {method.expiry && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expiry:</span>
                    <span>{method.expiry}</span>
                  </div>
                )}
                {method.routing && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Routing:</span>
                    <span>{method.routing}</span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between items-center pt-2 border-t border-border">
                {method.isDefault ? (
                  <Badge variant="secondary" className="gap-1"><CheckCircle2 className="h-3 w-3" aria-label="Default" /> Default</Badge>
                ) : <span />}
                <div className="flex gap-2">
                  <Dialog open={editOpen && selectedMethod?.id === method.id} onOpenChange={setEditOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => handleEditOpen(method)} className="gap-1" aria-label="Edit payment method">
                        <Pencil className="h-3 w-3" aria-label="Edit" /> Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Payment Method</DialogTitle>
                      </DialogHeader>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
                          <FormField name="type" control={form.control} render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Type</FormLabel>
                              <FormControl>
                                <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="credit">Credit Card</SelectItem>
                                    <SelectItem value="ach">ACH</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )} />
                          {form.watch("type") === "credit" ? (
                            <>
                              <FormField name="number" control={form.control} render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">Card Number</FormLabel>
                                  <FormControl>
                                    <Input type="text" placeholder="**** **** **** ****" {...field} className="mt-1" />
                                  </FormControl>
                                  <FormDescription className="text-muted-foreground text-xs mt-1">Enter a valid 16-digit card number.</FormDescription>
                                  <FormMessage className="text-destructive text-xs mt-1" />
                                </FormItem>
                              )} />
                              <FormField name="expiry" control={form.control} render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">Expiry</FormLabel>
                                  <FormControl>
                                    <Input type="text" placeholder="MM/YY" {...field} className="mt-1" />
                                  </FormControl>
                                  <FormDescription className="text-muted-foreground text-xs mt-1">Format: MM/YY</FormDescription>
                                  <FormMessage className="text-destructive text-xs mt-1" />
                                </FormItem>
                              )} />
                              <FormField name="cvv" control={form.control} render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">CVV</FormLabel>
                                  <FormControl>
                                    <Input type="password" placeholder="CVV" {...field} className="mt-1" />
                                  </FormControl>
                                  <FormDescription className="text-muted-foreground text-xs mt-1">3 or 4 digits</FormDescription>
                                  <FormMessage className="text-destructive text-xs mt-1" />
                                </FormItem>
                              )} />
                            </>
                          ) : (
                            <>
                              <FormField name="account" control={form.control} render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">Account Number</FormLabel>
                                  <FormControl>
                                    <Input type="text" placeholder="Account Number" {...field} className="mt-1" />
                                  </FormControl>
                                  <FormDescription className="text-muted-foreground text-xs mt-1">Enter your bank account number.</FormDescription>
                                  <FormMessage className="text-destructive text-xs mt-1" />
                                </FormItem>
                              )} />
                              <FormField name="routing" control={form.control} render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">Routing Number</FormLabel>
                                  <FormControl>
                                    <Input type="text" placeholder="Routing Number" {...field} className="mt-1" />
                                  </FormControl>
                                  <FormDescription className="text-muted-foreground text-xs mt-1">9-digit routing number.</FormDescription>
                                  <FormMessage className="text-destructive text-xs mt-1" />
                                </FormItem>
                              )} />
                            </>
                          )}
                          <div className="flex justify-end gap-2">
                            <DialogClose asChild>
                              <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" variant="default" disabled={form.formState.isSubmitting || !form.formState.isValid}>Save</Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={removeOpen && selectedMethod?.id === method.id} onOpenChange={setRemoveOpen}>
                    <DialogTrigger asChild>
                      <Button variant="destructive" size="sm" onClick={() => handleRemoveOpen(method)} className="gap-1" aria-label="Remove payment method">
                        <Trash2 className="h-3 w-3" aria-label="Remove" /> Remove
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Remove Payment Method</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">Are you sure you want to remove <span className="font-bold">{method.type === "credit" ? "Credit Card" : "ACH Account"} ending in {method.last4}</span>?</div>
                      <div className="flex justify-end gap-2">
                        <DialogClose asChild>
                          <Button type="button" variant="ghost">Cancel</Button>
                        </DialogClose>
                        <Button type="button" variant="destructive" onClick={handleRemoveConfirm}>Remove</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  {!method.isDefault && (
                    <Button variant="default" size="sm" onClick={() => onSetDefault?.(method.id)} className="gap-1" aria-label="Set default payment method">
                      <Star className="h-3 w-3" aria-label="Set Default" /> Set Default
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
