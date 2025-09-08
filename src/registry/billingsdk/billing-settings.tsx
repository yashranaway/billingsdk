"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, CreditCard, Plus } from "lucide-react"

const tabs = [
  { id: "general", label: "General" },
  { id: "payment", label: "Payment" },
  { id: "invoices", label: "Invoices" },
  { id: "limits", label: "Limits" },
]

interface CardInfo {
  id: string
  last4: string
  brand: string
  expiry: string
  primary?: boolean
}

interface BillingSettingsProps {
  activeTab?: string
  onTabChange?: (tab: string) => void

  emailNotifications?: boolean
  onEmailNotificationsChange?: (value: boolean) => void

  usageAlerts?: boolean
  onUsageAlertsChange?: (value: boolean) => void

  invoiceReminders?: boolean
  onInvoiceRemindersChange?: (value: boolean) => void

  cards?: CardInfo[]
  onAddCard?: () => void

  invoiceFormat?: "PDF" | "HTML"
  onInvoiceFormatChange?: (format: "PDF" | "HTML") => void
  onEditBillingAddress?: () => void

  overageProtection?: boolean
  onOverageProtectionChange?: (value: boolean) => void

  usageLimitAlerts?: boolean
  onUsageLimitAlertsChange?: (value: boolean) => void
  usageLimit?: string
  onUsageLimitChange?: (value: string) => void
  className?: string
}

interface SettingItemProps {
  title: string
  description: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

function SettingItem({ title, description, checked, onCheckedChange }: SettingItemProps) {
  return (
    <div className="flex items-start justify-between py-4 gap-4 w-full">
      <div className="space-y-1 flex-1 min-w-0">
        <h3 className="font-medium text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} className="flex-shrink-0" />
    </div>
  )
}

interface TabNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex flex-wrap gap-1 rounded-lg bg-muted p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            try {
              if (typeof onTabChange === 'function') {
                onTabChange(tab.id);
              }
            } catch (_error) {
              // Silently handle errors in playground mode
            }
          }}
          className={`flex-1 min-w-0 rounded-md px-2 py-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
            activeTab === tab.id
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
          }`}
        >
          <span className="truncate">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}

export function BillingSettings({
  activeTab = "general",
  onTabChange = () => {},
  emailNotifications = true,
  onEmailNotificationsChange = () => {},
  usageAlerts = false,
  onUsageAlertsChange = () => {},
  invoiceReminders = true,
  onInvoiceRemindersChange = () => {},
  cards = [],
  onAddCard = () => {},
  invoiceFormat = "PDF",
  onInvoiceFormatChange = () => {},
  onEditBillingAddress = () => {},
  overageProtection = false,
  onOverageProtectionChange = () => {},
  usageLimitAlerts = false,
  onUsageLimitAlertsChange = () => {},
  usageLimit: _usageLimit = "1000",
  onUsageLimitChange: _onUsageLimitChange = () => {},
  className,
}: BillingSettingsProps) {
  const renderGeneralContent = () => (
    <div className="space-y-0 divide-y divide-border">
      <SettingItem
        title="Email notifications"
        description="Receive billing updates via email"
        checked={emailNotifications}
        onCheckedChange={(value) => {
          try {
            if (typeof onEmailNotificationsChange === 'function') {
              onEmailNotificationsChange(value);
            }
          } catch (_error) {
            // Silently handle errors in playground mode
          }
        }}
      />
      <SettingItem
        title="Usage alerts"
        description="Get notified when approaching limits"
        checked={usageAlerts}
        onCheckedChange={(value) => {
          try {
            if (typeof onUsageAlertsChange === 'function') {
              onUsageAlertsChange(value);
            }
          } catch (_error) {
            // Silently handle errors in playground mode
          }
        }}
      />
      <SettingItem
        title="Invoice reminders"
        description="Remind me before auto-renewal"
        checked={invoiceReminders}
        onCheckedChange={(value) => {
          try {
            if (typeof onInvoiceRemindersChange === 'function') {
              onInvoiceRemindersChange(value);
            }
          } catch (_error) {
            // Silently handle errors in playground mode
          }
        }}
      />
    </div>
  )

  const renderPaymentContent = () => (
    <div className="space-y-4">
      {Array.isArray(cards) && cards.map((card) => (
        <div key={card.id} className="flex items-center justify-between rounded-lg border p-3 sm:p-4 gap-3">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <CreditCard className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs sm:text-sm truncate">•••• •••• •••• {card.last4}</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                {card.brand} • Expires {card.expiry}
              </p>
            </div>
          </div>
          {card.primary && <Badge variant="secondary" className="flex-shrink-0 text-xs">Primary</Badge>}
        </div>
      ))}
      <Button variant="outline" className="w-full bg-transparent" onClick={() => {
        try {
          if (typeof onAddCard === 'function') {
            onAddCard();
          }
        } catch (_error) {
          // Silently handle errors in playground mode
        }
      }}>
        <Plus className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">Add new card</span>
        <span className="sm:hidden">Add card</span>
      </Button>
    </div>
  )

  const renderInvoicesContent = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="space-y-1 min-w-0 flex-1">
          <h3 className="font-medium text-foreground">Invoice format</h3>
          <p className="text-sm text-muted-foreground">Choose PDF or HTML format</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-20 bg-transparent">
              {invoiceFormat}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => {
              try {
                if (typeof onInvoiceFormatChange === 'function') {
                  onInvoiceFormatChange("PDF");
                }
              } catch (_error) {
                // Silently handle errors in playground mode
              }
            }}>PDF</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              try {
                if (typeof onInvoiceFormatChange === 'function') {
                  onInvoiceFormatChange("HTML");
                }
              } catch (_error) {
                // Silently handle errors in playground mode
              }
            }}>HTML</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="space-y-1 min-w-0 flex-1">
          <h3 className="font-medium text-foreground">Billing address</h3>
          <p className="text-sm text-muted-foreground">Update your billing address</p>
        </div>
        <Button variant="outline" onClick={() => {
          try {
            if (typeof onEditBillingAddress === 'function') {
              onEditBillingAddress();
            }
          } catch (_error) {
            // Silently handle errors in playground mode
          }
        }} className="w-full sm:w-auto">
          Edit
        </Button>
      </div>
    </div>
  )

  const renderLimitsContent = () => (
    <div className="space-y-0 divide-y divide-border">
      <SettingItem
        title="Overage protection"
        description="Prevent accidental overages"
        checked={overageProtection}
        onCheckedChange={(value) => {
          try {
            if (typeof onOverageProtectionChange === 'function') {
              onOverageProtectionChange(value);
            }
          } catch (_error) {
            // Silently handle errors in playground mode
          }
        }}
      />
      <SettingItem
        title="Usage limit alerts"
        description="Alert at 80% and 95% usage"
        checked={usageLimitAlerts}
        onCheckedChange={(value) => {
          try {
            if (typeof onUsageLimitAlertsChange === 'function') {
              onUsageLimitAlertsChange(value);
            }
          } catch (_error) {
            // Silently handle errors in playground mode
          }
        }}
      />
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralContent()
      case "payment":
        return renderPaymentContent()
      case "invoices":
        return renderInvoicesContent()
      case "limits":
        return renderLimitsContent()
      default:
        return renderGeneralContent()
    }
  }

  return (
    <Card className={`mx-auto md:min-w-xl max-w-2xl overflow-hidden ${className || ''}`}>
      <CardHeader className="space-y-4">
        <CardTitle className="text-lg sm:text-xl">Billing settings</CardTitle>
        <TabNavigation activeTab={activeTab} onTabChange={onTabChange} />
      </CardHeader>
      <CardContent className="px-3 sm:px-6 overflow-hidden">
        <div className="w-full">
          {renderTabContent()}
        </div>
      </CardContent>
    </Card>
  )
}