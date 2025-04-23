"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Loader2, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useForm, FormProvider } from "react-hook-form";
import { useTranslations } from "next-intl";

export function SettingsIntegrations() {
  const t = useTranslations("dashboard.settingsIntegrations");
  const [isLoading, setIsLoading] = useState(false);
  const [integrations, setIntegrations] = useState({
    googleMaps: {
      enabled: true,
      apiKey: "AIzaSyA1234567890abcdefghijklmnopqrstuv",
    },
    stripe: {
      enabled: true,
      publicKey: "***********************************",
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
  });

  const methods = useForm({
    defaultValues: {
      googleMapsEnabled: true,
      googleMapsApiKey: "AIzaSyA1234567890abcdefghijklmnopqrstuv",
      stripeEnabled: true,
      stripePublicKey: "***********************************",
      stripeSecretKey: "sk_test_1234567890abcdefghijklmnopqrstuv",
      mailchimpEnabled: false,
      mailchimpApiKey: "",
      mailchimpListId: "",
      googleAnalyticsEnabled: true,
      googleAnalyticsTrackingId: "UA-12345678-1",
      zapierEnabled: false,
      zapierWebhookUrl: "",
    },
  });

  const handleToggle = (integration: string, value: boolean) => {
    methods.setValue(`${integration}Enabled`, value);
  };

  const handleInputChange = (
    integration: string,
    field: string,
    value: string
  ) => {
    methods.setValue(
      `${integration}${field.charAt(0).toUpperCase() + field.slice(1)}`,
      value
    );
  };

  const handleSubmit = (data: any) => {
    setIsLoading(true);

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
    });

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t("toast.title"),
        description: t("toast.description"),
      });
    }, 1000);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("googleMaps.title")}</CardTitle>
              <CardDescription>{t("googleMaps.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("googleMaps.enableLabel")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("googleMaps.enableDescription")}
                  </p>
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
                    <Label htmlFor="googleMapsApiKey">
                      {t("googleMaps.apiKeyLabel")}
                    </Label>
                    <Input
                      id="googleMapsApiKey"
                      type="password"
                      value={integrations.googleMaps.apiKey}
                      onChange={(e) =>
                        handleInputChange(
                          "googleMaps",
                          "apiKey",
                          e.target.value
                        )
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      <a
                        href="https://developers.google.com/maps/documentation/javascript/get-api-key"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        {t("googleMaps.getApiKey")}
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
              <CardTitle>{t("stripe.title")}</CardTitle>
              <CardDescription>{t("stripe.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("stripe.enableLabel")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("stripe.enableDescription")}
                  </p>
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
                    <Label htmlFor="stripePublicKey">
                      {t("stripe.publicKeyLabel")}
                    </Label>
                    <Input
                      id="stripePublicKey"
                      value={integrations.stripe.publicKey}
                      onChange={(e) =>
                        handleInputChange("stripe", "publicKey", e.target.value)
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stripeSecretKey">
                      {t("stripe.secretKeyLabel")}
                    </Label>
                    <Input
                      id="stripeSecretKey"
                      type="password"
                      value={integrations.stripe.secretKey}
                      onChange={(e) =>
                        handleInputChange("stripe", "secretKey", e.target.value)
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      <a
                        href="https://dashboard.stripe.com/apikeys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        {t("stripe.getApiKeys")}
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
              <CardTitle>{t("mailchimp.title")}</CardTitle>
              <CardDescription>{t("mailchimp.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("mailchimp.enableLabel")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("mailchimp.enableDescription")}
                  </p>
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
                    <Label htmlFor="mailchimpApiKey">
                      {t("mailchimp.apiKeyLabel")}
                    </Label>
                    <Input
                      id="mailchimpApiKey"
                      type="password"
                      value={integrations.mailchimp.apiKey}
                      onChange={(e) =>
                        handleInputChange("mailchimp", "apiKey", e.target.value)
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mailchimpListId">
                      {t("mailchimp.listIdLabel")}
                    </Label>
                    <Input
                      id="mailchimpListId"
                      value={integrations.mailchimp.listId}
                      onChange={(e) =>
                        handleInputChange("mailchimp", "listId", e.target.value)
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      <a
                        href="https://mailchimp.com/help/find-audience-id/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        {t("mailchimp.findListId")}
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
              <CardTitle>{t("googleAnalytics.title")}</CardTitle>
              <CardDescription>
                {t("googleAnalytics.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("googleAnalytics.enableLabel")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("googleAnalytics.enableDescription")}
                  </p>
                </div>
                <Switch
                  checked={integrations.googleAnalytics.enabled}
                  onCheckedChange={(value) =>
                    handleToggle("googleAnalytics", value)
                  }
                />
              </div>
              {integrations.googleAnalytics.enabled && (
                <>
                  <Separator />
                  <div className="grid gap-2">
                    <Label htmlFor="gaTrackingId">
                      {t("googleAnalytics.trackingIdLabel")}
                    </Label>
                    <Input
                      id="gaTrackingId"
                      value={integrations.googleAnalytics.trackingId}
                      onChange={(e) =>
                        handleInputChange(
                          "googleAnalytics",
                          "trackingId",
                          e.target.value
                        )
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      <a
                        href="https://support.google.com/analytics/answer/1008080"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        {t("googleAnalytics.findTrackingId")}
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
                    {t("saving")}
                  </>
                ) : (
                  t("saveChanges")
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </FormProvider>
  );
}
