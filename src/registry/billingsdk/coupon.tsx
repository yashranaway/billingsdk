"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Copy, ArrowLeft, Share2, Scissors } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface CouponGeneratorProps {
    companyName: string
    applicableOptions?: { label: string; value: string }[]
    onGenerate: (couponData: {
        code: string
        discount: number
        rule: string
        startDate?: string
        endDate?: string
    }) => void
    onCopy?: (code: string) => void
    onShare?: (code: string) => void
    className?: string
    cardClassName?: string
    generateButtonClassName?: string
    defaultCode?: string
}



export default function CouponGenerator({
    companyName,
    applicableOptions = [],
    onGenerate,
    onCopy,
    onShare,
    className,
    cardClassName,
    generateButtonClassName,
    defaultCode,
}: CouponGeneratorProps) {
    const [enabled, setEnabled] = useState(false)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [generated, setGenerated] = useState(false)
    const [customCode, setCustomCode] = useState("DODO20")
    const [discount, setDiscount] = useState(20)
    const [selectedRule, setSelectedRule] = useState("")
    const [generatedCouponCode, setGeneratedCouponCode] = useState("")

    const isFormValid = selectedRule.trim() !== "" && startDate.trim() !== "" && endDate.trim() !== ""

    const handleGenerate = () => {
        console.log("[v0] Form validation check:", { selectedRule, startDate, endDate, isFormValid })

        if (!selectedRule.trim() || !startDate.trim() || !endDate.trim()) {
            console.log("[v0] Validation failed - missing required fields")
            alert("Please fill in all required fields: Applicable rule, Start date, and End date")
            return
        }

        let code: string
        if (enabled && customCode.trim()) {
            code = customCode.trim()
        } else if (defaultCode) {
            code = defaultCode
        } else {
            code = `COUPON${Math.floor(Math.random() * 10000)}`
        }

        console.log("[v0] Generating coupon with code:", code)

        const couponData = {
            code,
            discount,
            rule: selectedRule,
            startDate,
            endDate,
        }

        setGeneratedCouponCode(code)
        onGenerate(couponData)
        setGenerated(true)
    }

    const safeApplicableOptions = applicableOptions || [];

    return (
        <div
            className={`min-h-screen w-full flex justify-center items-center p-4 bg-zinc-50 dark:bg-zinc-950 ${className || ""}`}
        >
            {generated ? (
                <Card
                    className={`w-full max-w-md animate-in fade-in-0 slide-in-from-bottom-4 duration-700 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl ${cardClassName || ""}`}
                >
                    <CardContent className="p-0">
                        <div className="relative overflow-hidden">
                            <div className="bg-zinc-900 dark:bg-zinc-100 p-6 relative">
                                <div className="absolute top-0 left-0 w-full h-full opacity-5">
                                    <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)]"></div>
                                </div>
                                <div className="relative z-10 text-center">
                                    <div className="inline-flex items-center gap-2 mb-2">
                                        <Scissors className="w-4 h-4 text-white dark:text-zinc-900" />
                                        <span className="text-xs font-medium text-zinc-400 dark:text-zinc-600 uppercase tracking-wider">
                                            Coupon
                                        </span>
                                    </div>
                                    <div className="text-3xl font-bold text-white dark:text-zinc-900 tracking-tight mb-1">
                                        {generatedCouponCode}
                                    </div>
                                    <div className="text-sm text-zinc-300 dark:text-zinc-700 font-medium">{companyName}</div>
                                </div>
                            </div>

                            <div className="p-6 bg-white dark:bg-zinc-900">
                                <div className="text-center space-y-2">
                                    <div className="text-2xl font-bold text-zinc-900 dark:text-white">{discount}% OFF</div>
                                    <div className="text-sm text-zinc-600 dark:text-zinc-400">Valid until selected date</div>
                                </div>
                            </div>

                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-zinc-50 dark:bg-zinc-950 rounded-full -ml-3 border-2 border-zinc-200 dark:border-zinc-800"></div>
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-zinc-50 dark:bg-zinc-950 rounded-full -mr-3 border-2 border-zinc-200 dark:border-zinc-800"></div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-between items-center p-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setGenerated(false)}
                            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Back
                        </Button>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onCopy?.(generatedCouponCode)}
                                className="border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors bg-transparent"
                            >
                                <Copy className="w-4 h-4 mr-1" />
                                Copy
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onShare?.(generatedCouponCode)}
                                className="border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors bg-transparent"
                            >
                                <Share2 className="w-4 h-4 mr-1" />
                                Share
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            ) : (
                <Card
                    className={`w-full max-w-md animate-in fade-in-0 slide-in-from-bottom-4 duration-700 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl ${cardClassName || ""}`}
                >
                    <CardHeader className="pb-4">
                        <CardTitle className="text-xl font-semibold text-zinc-900 dark:text-white text-center">
                            Create Coupon Code
                        </CardTitle>
                    </CardHeader>

                    <div className="h-px bg-zinc-200 dark:bg-zinc-800 mx-6"></div>

                    <CardContent className="space-y-6 p-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="discount" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Discount (%)
                                </Label>
                                <Input
                                    type="number"
                                    id="discount"
                                    value={discount}
                                    onChange={(e) => setDiscount(Number(e.target.value))}
                                    min={0}
                                    className="transition-all duration-200 hover:border-zinc-400 dark:hover:border-zinc-600 focus:scale-[1.01]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="applicable" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Applicable to <span className="text-red-500">*</span>
                                </Label>
                                <Select value={selectedRule} onValueChange={setSelectedRule}>
                                    <SelectTrigger className="transition-all duration-200 hover:border-zinc-400 dark:hover:border-zinc-600">
                                        <SelectValue placeholder="Select rule" />
                                    </SelectTrigger>
                                    <SelectContent className="border-zinc-200 dark:border-zinc-700">
                                        <SelectGroup>
                                            <SelectLabel className="text-zinc-600 dark:text-zinc-400">Rules</SelectLabel>
                                            {safeApplicableOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-3 animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-200">
                            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Validity Period <span className="text-red-500">*</span>
                            </Label>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label htmlFor="start-date" className="text-xs text-zinc-500 dark:text-zinc-500">
                                        Start Date
                                    </Label>
                                    <Input
                                        type="date"
                                        id="start-date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="transition-all duration-200 hover:border-zinc-400 dark:hover:border-zinc-600 focus:scale-[1.01]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="end-date" className="text-xs text-zinc-500 dark:text-zinc-500">
                                        End Date
                                    </Label>
                                    <Input
                                        type="date"
                                        id="end-date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="transition-all duration-200 hover:border-zinc-400 dark:hover:border-zinc-600 focus:scale-[1.01]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <Switch
                                    id="custom-code"
                                    checked={enabled}
                                    onCheckedChange={setEnabled}
                                    className="data-[state=checked]:bg-zinc-900 dark:data-[state=checked]:bg-zinc-100"
                                />
                                <Label htmlFor="custom-code" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Custom Code
                                </Label>
                            </div>
                            {enabled && (
                                <Input
                                    className="animate-in fade-in-0 slide-in-from-top-2 duration-300 transition-all hover:border-zinc-400 dark:hover:border-zinc-600"
                                    placeholder="DODO20"
                                    value={customCode}
                                    onChange={(e) => setCustomCode(e.target.value)}
                                />
                            )}
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-end p-6 pt-0">
                        <Button
                            onClick={handleGenerate}
                            disabled={!isFormValid}
                            className={`bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-200 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:bg-zinc-900 dark:disabled:bg-zinc-100 ${generateButtonClassName || ""}`}
                        >
                            Generate Coupon
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </div>
    )
}