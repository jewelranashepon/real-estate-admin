"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"
import { Loader2, ExternalLink } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useForm, FormProvider } from "react-hook-form"

export function SettingsIntegrations() {
  const [isLoading, setIsLoading] = useState(false)
  const [integrations, setIntegrations] = useState({
    googleMaps: {
      enabled: true,
      apiKey: "AIzaSyA1234567890abcdefghijklmnopqrstuv",
    },
    stripe: {
      enabled: true,
      publicKey: "pk_test_1234567890abcdefghijklmnopqrstuv",
      secretKey: "sk_test_1234567890abcdefghijklmnopqrstuv",
    },
    mailchimp: {
      enabled: false,
      apiKey: "",
      listId: "",
    },
    googleAnalytics: {
      enabled: true,
      trackingId: "UA-12345678-1",
    },
    zapier: {
      enabled: false,
      webhookUrl: "",
    },
  })

  const methods = useForm({
    defaultValues: {
      googleMapsEnabled: true,
      googleMapsApiKey: "AIzaSyA1234567890abcdefghijklmnopqrstuv",
      stripeEnabled: true,
      stripePublicKey: "pk_test_1234567890abcdefghijklmnopqrstuv",
      stripeSecretKey: "sk_test_1234567890abcdefghijklmnopqrstuv",
      mailchimpEnabled: false,
      mailchimpApiKey: "",
      mailchimpListId: "",
      googleAnalyticsEnabled: true,
      googleAnalyticsTrackingId: "UA-12345678-1",
      zapierEnabled: false,
      zapierWebhookUrl: "",
    },
  })

  const handleToggle = (integration: string, value: boolean) => {
    methods.setValue(`${integration}Enabled`, value)
  }

  const handleInputChange = (integration: string, field: string, value: string) => {
    methods.setValue(`${integration}${field.charAt(0).toUpperCase() + field.slice(1)}`, value)
  }

  const handleSubmit = (data: any) => {
    setIsLoading(true)

    // Update integrations state based on form data
    setIntegrations({
      googleMaps: {
        enabled: data.googleMapsEnabled,
        apiKey: data.googleMapsApiKey,
      },
      stripe: {
        enabled: data.stripeEnabled,
        publicKey: data.stripePublicKey,
        secretKey: data.stripeSecretKey,
      },
      mailchimp: {
        enabled: data.mailchimpEnabled,
        apiKey: data.mailchimpApiKey,
        listId: data.mailchimpListId,
      },
      googleAnalytics: {
        enabled: data.googleAnalyticsEnabled,
        trackingId: data.googleAnalyticsTrackingId,
      },
      zapier: {
        enabled: data.zapierEnabled,
        webhookUrl: data.zapierWebhookUrl,
      },
    })

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Integration settings updated",
        description: "Your integration settings have been saved.",
      })
    }, 1000)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Google Maps</CardTitle>
              <CardDescription>Configure Google Maps integration for property locations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Google Maps</Label>
                  <p className="text-sm text-muted-foreground">Show property locations on Google Maps</p>
                </div>
                <Switch
                  checked={integrations.googleMaps.enabled}
                  onCheckedChange={(value) => handleToggle("googleMaps", value)}
                />
              </div>
              {integrations.googleMaps.enabled && (
                <>
                  <Separator />
                  <div className="grid gap-2">
                    <Label htmlFor="googleMapsApiKey">API Key</Label>
                    <Input
                      id="googleMapsApiKey"
                      type="password"
                      value={integrations.googleMaps.apiKey}
                      onChange={(e) => handleInputChange("googleMaps", "apiKey", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      <a
                        href="https://developers.google.com/maps/documentation/javascript/get-api-key"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        Get a Google Maps API key
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stripe</CardTitle>
              <CardDescription>Configure Stripe for payment processing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Stripe</Label>
                  <p className="text-sm text-muted-foreground">Process payments through Stripe</p>
                </div>
                <Switch
                  checked={integrations.stripe.enabled}
                  onCheckedChange={(value) => handleToggle("stripe", value)}
                />
              </div>
              {integrations.stripe.enabled && (
                <>
                  <Separator />
                  <div className="grid gap-2">
                    <Label htmlFor="stripePublicKey">Public Key</Label>
                    <Input
                      id="stripePublicKey"
                      value={integrations.stripe.publicKey}
                      onChange={(e) => handleInputChange("stripe", "publicKey", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stripeSecretKey">Secret Key</Label>
                    <Input
                      id="stripeSecretKey"
                      type="password"
                      value={integrations.stripe.secretKey}
                      onChange={(e) => handleInputChange("stripe", "secretKey", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      <a
                        href="https://dashboard.stripe.com/apikeys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        Get your Stripe API keys
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mailchimp</CardTitle>
              <CardDescription>Configure Mailchimp for email marketing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Mailchimp</Label>
                  <p className="text-sm text-muted-foreground">Sync leads and contacts with Mailchimp</p>
                </div>
                <Switch
                  checked={integrations.mailchimp.enabled}
                  onCheckedChange={(value) => handleToggle("mailchimp", value)}
                />
              </div>
              {integrations.mailchimp.enabled && (
                <>
                  <Separator />
                  <div className="grid gap-2">
                    <Label htmlFor="mailchimpApiKey">API Key</Label>
                    <Input
                      id="mailchimpApiKey"
                      type="password"
                      value={integrations.mailchimp.apiKey}
                      onChange={(e) => handleInputChange("mailchimp", "apiKey", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mailchimpListId">List ID</Label>
                    <Input
                      id="mailchimpListId"
                      value={integrations.mailchimp.listId}
                      onChange={(e) => handleInputChange("mailchimp", "listId", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      <a
                        href="https://mailchimp.com/help/find-audience-id/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        How to find your Mailchimp List ID
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Google Analytics</CardTitle>
              <CardDescription>Configure Google Analytics for website tracking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Google Analytics</Label>
                  <p className="text-sm text-muted-foreground">Track website traffic and user behavior</p>
                </div>
                <Switch
                  checked={integrations.googleAnalytics.enabled}
                  onCheckedChange={(value) => handleToggle("googleAnalytics", value)}
                />
              </div>
              {integrations.googleAnalytics.enabled && (
                <>
                  <Separator />
                  <div className="grid gap-2">
                    <Label htmlFor="gaTrackingId">Tracking ID</Label>
                    <Input
                      id="gaTrackingId"
                      value={integrations.googleAnalytics.trackingId}
                      onChange={(e) => handleInputChange("googleAnalytics", "trackingId", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      <a
                        href="https://support.google.com/analytics/answer/1008080"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        How to find your Google Analytics Tracking ID
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </p>
                  </div>
                </>
              )}
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

