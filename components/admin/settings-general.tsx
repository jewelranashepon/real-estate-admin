"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { useForm, FormProvider } from "react-hook-form"
import { useTranslations } from 'next-intl';

export function SettingsGeneral() {
  const t = useTranslations('dashboard')
  const [isLoading, setIsLoading] = useState(false)
  const methods = useForm({
    defaultValues: {
      siteName: "Real Estate Admin",
      siteDescription: "Admin panel for managing real estate properties",
      contactEmail: "admin@example.com",
      contactPhone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
      timezone: "America/New_York",
      dateFormat: "MM/DD/YYYY",
      currency: "USD",
    },
  })

  const handleSubmit = (data: any) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings updated",
        description: "Your general settings have been updated successfully.",
      })
    }, 1000)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('siteInformation')}</CardTitle>
              <CardDescription>Basic information about your real estate website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="siteName">{t('siteName')}</Label>
                <Input id="siteName" {...methods.register("siteName")} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="siteDescription">{t('siteDescription')}</Label>
                <Textarea id="siteDescription" {...methods.register("siteDescription")} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('contactInformation')}</CardTitle>
              <CardDescription>{t('contactInfoDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="contactEmail">{t('email')}</Label>
                <Input id="contactEmail" type="email" {...methods.register("contactEmail")} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactPhone">{t('contactPhone')}</Label>
                <Input id="contactPhone" {...methods.register("contactPhone")} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">{t('address')}</Label>
                <Textarea id="address" {...methods.register("address")} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('regionalSettings')}</CardTitle>
              <CardDescription>{t('regionalSettingsDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="timezone">{t('timezone')}</Label>
                <Select
                  {...methods.register("timezone")}
                  onValueChange={(value) => methods.setValue("timezone", value)}
                  defaultValue={methods.getValues("timezone")}
                >
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dateFormat">{t('dateFormat')}</Label>
                <Select
                  {...methods.register("dateFormat")}
                  onValueChange={(value) => methods.setValue("dateFormat", value)}
                  defaultValue={methods.getValues("dateFormat")}
                >
                  <SelectTrigger id="dateFormat">
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="currency">{t('currency')}</Label>
                <Select
                  {...methods.register("currency")}
                  onValueChange={(value) => methods.setValue("currency", value)}
                  defaultValue={methods.getValues("currency")}
                >
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">US Dollar ($)</SelectItem>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                    <SelectItem value="GBP">British Pound (£)</SelectItem>
                    <SelectItem value="CAD">Canadian Dollar (C$)</SelectItem>
                    <SelectItem value="AUD">Australian Dollar (A$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </FormProvider>
  )
}

