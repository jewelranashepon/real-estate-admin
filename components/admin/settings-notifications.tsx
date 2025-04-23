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
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useForm, FormProvider } from "react-hook-form";
import { useTranslations } from "next-intl";

export function SettingsNotifications() {
  const t = useTranslations("dashboard.settingsNotifications");
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm({
    defaultValues: {
      // Email notifications
      emailNewProperty: true,
      emailPropertyUpdated: true,
      emailNewLead: true,
      emailNewMessage: true,
      emailPaymentReceived: true,
      emailSystemUpdates: false,

      // In-app notifications
      appNewProperty: true,
      appPropertyUpdated: true,
      appNewLead: true,
      appNewMessage: true,
      appPaymentReceived: true,
      appSystemUpdates: true,

      // Push notifications
      pushNewProperty: false,
      pushPropertyUpdated: false,
      pushNewLead: true,
      pushNewMessage: true,
      pushPaymentReceived: false,
      pushSystemUpdates: false,
    },
  });

  const [notifications, setNotifications] = useState({
    // Email notifications
    emailNewProperty: true,
    emailPropertyUpdated: true,
    emailNewLead: true,
    emailNewMessage: true,
    emailPaymentReceived: true,
    emailSystemUpdates: false,

    // In-app notifications
    appNewProperty: true,
    appPropertyUpdated: true,
    appNewLead: true,
    appNewMessage: true,
    appPaymentReceived: true,
    appSystemUpdates: true,

    // Push notifications
    pushNewProperty: false,
    pushPropertyUpdated: false,
    pushNewLead: true,
    pushNewMessage: true,
    pushPaymentReceived: false,
    pushSystemUpdates: false,
  });

  const handleToggle = (key: string, value: boolean) => {
    methods.setValue(key, value);
  };

  const handleSubmit = (data: any) => {
    setIsLoading(true);

    // Update notifications state with form data
    setNotifications(data);

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
              <CardTitle>{t("email.title")}</CardTitle>
              <CardDescription>{t("email.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("email.newProperty")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("email.newPropertyDescription")}
                  </p>
                </div>
                <Switch
                  checked={methods.watch("emailNewProperty")}
                  onCheckedChange={(value) =>
                    handleToggle("emailNewProperty", value)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("email.propertyUpdated")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("email.propertyUpdatedDescription")}
                  </p>
                </div>
                <Switch
                  checked={methods.watch("emailPropertyUpdated")}
                  onCheckedChange={(value) =>
                    handleToggle("emailPropertyUpdated", value)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("email.newLead")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("email.newLeadDescription")}
                  </p>
                </div>
                <Switch
                  checked={methods.watch("emailNewLead")}
                  onCheckedChange={(value) =>
                    handleToggle("emailNewLead", value)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("email.newMessage")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("email.newMessageDescription")}
                  </p>
                </div>
                <Switch
                  checked={methods.watch("emailNewMessage")}
                  onCheckedChange={(value) =>
                    handleToggle("emailNewMessage", value)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("email.paymentReceived")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("email.paymentReceivedDescription")}
                  </p>
                </div>
                <Switch
                  checked={methods.watch("emailPaymentReceived")}
                  onCheckedChange={(value) =>
                    handleToggle("emailPaymentReceived", value)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("email.systemUpdates")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("email.systemUpdatesDescription")}
                  </p>
                </div>
                <Switch
                  checked={methods.watch("emailSystemUpdates")}
                  onCheckedChange={(value) =>
                    handleToggle("emailSystemUpdates", value)
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("inApp.title")}</CardTitle>
              <CardDescription>{t("inApp.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("inApp.newProperty")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("inApp.newPropertyDescription")}
                  </p>
                </div>
                <Switch
                  checked={methods.watch("appNewProperty")}
                  onCheckedChange={(value) =>
                    handleToggle("appNewProperty", value)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("inApp.propertyUpdated")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("inApp.propertyUpdatedDescription")}
                  </p>
                </div>
                <Switch
                  checked={methods.watch("appPropertyUpdated")}
                  onCheckedChange={(value) =>
                    handleToggle("appPropertyUpdated", value)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("inApp.newLead")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("inApp.newLeadDescription")}
                  </p>
                </div>
                <Switch
                  checked={methods.watch("appNewLead")}
                  onCheckedChange={(value) => handleToggle("appNewLead", value)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("inApp.newMessage")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("inApp.newMessageDescription")}
                  </p>
                </div>
                <Switch
                  checked={methods.watch("appNewMessage")}
                  onCheckedChange={(value) =>
                    handleToggle("appNewMessage", value)
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("push.title")}</CardTitle>
              <CardDescription>{t("push.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("push.newLead")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("push.newLeadDescription")}
                  </p>
                </div>
                <Switch
                  checked={methods.watch("pushNewLead")}
                  onCheckedChange={(value) =>
                    handleToggle("pushNewLead", value)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("push.newMessage")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("push.newMessageDescription")}
                  </p>
                </div>
                <Switch
                  checked={methods.watch("pushNewMessage")}
                  onCheckedChange={(value) =>
                    handleToggle("pushNewMessage", value)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("push.paymentReceived")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("push.paymentReceivedDescription")}
                  </p>
                </div>
                <Switch
                  checked={methods.watch("pushPaymentReceived")}
                  onCheckedChange={(value) =>
                    handleToggle("pushPaymentReceived", value)
                  }
                />
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
