'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Calendar, CreditCard } from 'lucide-react';

export type BillingSummaryPlan = {
	name: string;
	price: string;
	period: 'month' | 'year';
	renewalDate: string;
	paymentMethod: string;
};

export interface BillingSummaryCardProps {
	className?: string;
	plan: BillingSummaryPlan;
	onUpgrade?: () => void;
}

export function BillingSummaryCard({
	className,
	plan,
	onUpgrade,
}: BillingSummaryCardProps) {
	return (
		<Card className={cn('w-full', className)}>
			<CardHeader className="pb-3 sm:pb-4">
				<CardTitle className="flex items-center gap-2 text-base sm:text-lg">
					<CreditCard
						aria-hidden="true"
						focusable="false"
						className="h-4 w-4 sm:h-5 sm:w-5 text-primary"
					/>
					Billing Summary
				</CardTitle>
				<CardDescription className="text-sm">
					Your current plan and billing information
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4 sm:space-y-6">
				<div className="rounded-lg border bg-muted/20 p-3 sm:p-4">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
						<div className="flex-1">
							<h3 className="text-lg sm:text-xl font-bold">{plan.name} Plan</h3>
							<p className="text-xl sm:text-2xl font-bold mt-1">
								{plan.price}
								<span className="text-sm sm:text-base font-normal text-muted-foreground">
									/{plan.period}
								</span>
							</p>
						</div>
						<Button
							type="button"
							onClick={onUpgrade}
							disabled={!onUpgrade}
							aria-disabled={!onUpgrade}
							className="whitespace-nowrap w-full sm:w-auto"
							size="sm"
						>
							Upgrade Plan
						</Button>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
					<div className="flex items-center gap-2 sm:gap-3 rounded-lg border p-3 sm:p-4">
						<Calendar
							aria-hidden="true"
							focusable="false"
							className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0"
						/>
						<div className="min-w-0">
							<p className="text-xs sm:text-sm text-muted-foreground">Renewal Date</p>
							<p className="font-medium text-sm sm:text-base truncate">{plan.renewalDate}</p>
						</div>
					</div>
					<div className="flex items-center gap-2 sm:gap-3 rounded-lg border p-3 sm:p-4">
						<CreditCard
							aria-hidden="true"
							focusable="false"
							className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0"
						/>
						<div className="min-w-0">
							<p className="text-xs sm:text-sm text-muted-foreground">Payment Method</p>
							<p className="font-medium text-sm sm:text-base truncate">{plan.paymentMethod}</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
