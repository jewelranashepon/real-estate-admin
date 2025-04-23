"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { useTranslations } from "next-intl";

export function SettingsGeneral() {
  const t = useTranslations("dashboard.dashboardsettings.general");
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm({
    defaultValues: {
      siteName: t("defaultValues.siteName"),
      siteDescription: t("defaultValues.siteDescription"),
      contactEmail: "admin@example.com",
      contactPhone: "+971 50 123 4567",
      address: t("defaultValues.address"),
      timezone: "Asia/Dubai",
      dateFormat: "DD/MM/YYYY",
      currency: "AED",
    },
  });

  const handleSubmit = (data: any) => {
    setIsLoading(true);

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
              <CardTitle>{t("siteInformation.title")}</CardTitle>
              <CardDescription>
                {t("siteInformation.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="siteName">
                  {t("siteInformation.siteName")}
                </Label>
                <Input id="siteName" {...methods.register("siteName")} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="siteDescription">
                  {t("siteInformation.siteDescription")}
                </Label>
                <Textarea
                  id="siteDescription"
                  {...methods.register("siteDescription")}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("contactInformation.title")}</CardTitle>
              <CardDescription>
                {t("contactInformation.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="contactEmail">
                  {t("contactInformation.email")}
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  {...methods.register("contactEmail")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactPhone">
                  {t("contactInformation.phone")}
                </Label>
                <Input
                  id="contactPhone"
                  {...methods.register("contactPhone")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">
                  {t("contactInformation.address")}
                </Label>
                <Textarea id="address" {...methods.register("address")} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("regionalSettings.title")}</CardTitle>
              <CardDescription>
                {t("regionalSettings.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="timezone">
                  {t("regionalSettings.timezone")}
                </Label>
                <Select
                  {...methods.register("timezone")}
                  onValueChange={(value) => methods.setValue("timezone", value)}
                  defaultValue={methods.getValues("timezone")}
                >
                  <SelectTrigger id="timezone">
                    <SelectValue
                      placeholder={t("regionalSettings.timezonePlaceholder")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Dubai">
                      {t("timezones.dubai")} (GMT+4)
                    </SelectItem>
                    <SelectItem value="Asia/Riyadh">
                      {t("timezones.riyadh")} (GMT+3)
                    </SelectItem>
                    <SelectItem value="Asia/Qatar">
                      {t("timezones.doha")} (GMT+3)
                    </SelectItem>
                    <SelectItem value="Asia/Kuwait">
                      {t("timezones.kuwait")} (GMT+3)
                    </SelectItem>
                    <SelectItem value="Asia/Beirut">
                      {t("timezones.beirut")} (GMT+3)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dateFormat">
                  {t("regionalSettings.dateFormat")}
                </Label>
                <Select
                  {...methods.register("dateFormat")}
                  onValueChange={(value) =>
                    methods.setValue("dateFormat", value)
                  }
                  defaultValue={methods.getValues("dateFormat")}
                >
                  <SelectTrigger id="dateFormat">
                    <SelectValue
                      placeholder={t("regionalSettings.dateFormatPlaceholder")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="currency">
                  {t("regionalSettings.currency")}
                </Label>
                <Select
                  {...methods.register("currency")}
                  onValueChange={(value) => methods.setValue("currency", value)}
                  defaultValue={methods.getValues("currency")}
                >
                  <SelectTrigger id="currency">
                    <SelectValue
                      placeholder={t("regionalSettings.currencyPlaceholder")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AED">
                      {t("currencies.aed")} (د.إ)
                    </SelectItem>
                    <SelectItem value="SAR">
                      {t("currencies.sar")} (﷼)
                    </SelectItem>
                    <SelectItem value="QAR">
                      {t("currencies.qar")} (ر.ق)
                    </SelectItem>
                    <SelectItem value="KWD">
                      {t("currencies.kwd")} (د.ك)
                    </SelectItem>
                    <SelectItem value="USD">
                      {t("currencies.usd")} ($)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
