"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useForm, FormProvider } from "react-hook-form"

export function SettingsNotifications() {
  const [isLoading, setIsLoading] = useState(false)
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
  })

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
  })

  const handleToggle = (key: string, value: boolean) => {
    methods.setValue(key, value)
  }

  const handleSubmit = (data: any) => {
    setIsLoading(true)

    // Update notifications state with form data
    setNotifications(data)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      })
    }, 1000)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure which email notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Property Listed</Label>
                  <p className="text-sm text-muted-foreground">Receive an email when a new property is listed</p>
                </div>
                <Switch
                  checked={methods.watch("emailNewProperty")}
                  onCheckedChange={(value) => handleToggle("emailNewProperty", value)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Property Updated</Label>
                  <p className="text-sm text-muted-foreground">Receive an email when a property is updated</p>
                </div>
                <Switch
                  checked={methods.watch("emailPropertyUpdated")}
                  onCheckedChange={(value) => handleToggle("emailPropertyUpdated", value)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Lead</Label>
                  <p className="text-sm text-muted-foreground">Receive an email when a new lead is created</p>
                </div>
                <Switch
                  checked={methods.watch("emailNewLead")}
                  onCheckedChange={(value) => handleToggle("emailNewLead", value)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Message</Label>
                  <p className="text-sm text-muted-foreground">Receive an email when you get a new message</p>
                </div>
                <Switch
                  checked={methods.watch("emailNewMessage")}
                  onCheckedChange={(value) => handleToggle("emailNewMessage", value)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Payment Received</Label>
                  <p className="text-sm text-muted-foreground">Receive an email when a payment is received</p>
                </div>
                <Switch
                  checked={methods.watch("emailPaymentReceived")}
                  onCheckedChange={(value) => handleToggle("emailPaymentReceived", value)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>System Updates</Label>
                  <p className="text-sm text-muted-foreground">Receive emails about system updates and maintenance</p>
                </div>
                <Switch
                  checked={methods.watch("emailSystemUpdates")}
                  onCheckedChange={(value) => handleToggle("emailSystemUpdates", value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>In-App Notifications</CardTitle>
              <CardDescription>Configure which notifications you want to see in the app</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Property Listed</Label>
                  <p className="text-sm text-muted-foreground">Show notification when a new property is listed</p>
                </div>
                <Switch
                  checked={methods.watch("appNewProperty")}
                  onCheckedChange={(value) => handleToggle("appNewProperty", value)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Property Updated</Label>
                  <p className="text-sm text-muted-foreground">Show notification when a property is updated</p>
                </div>
                <Switch
                  checked={methods.watch("appPropertyUpdated")}
                  onCheckedChange={(value) => handleToggle("appPropertyUpdated", value)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Lead</Label>
                  <p className="text-sm text-muted-foreground">Show notification when a new lead is created</p>
                </div>
                <Switch
                  checked={methods.watch("appNewLead")}
                  onCheckedChange={(value) => handleToggle("appNewLead", value)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Message</Label>
                  <p className="text-sm text-muted-foreground">Show notification when you get a new message</p>
                </div>
                <Switch
                  checked={methods.watch("appNewMessage")}
                  onCheckedChange={(value) => handleToggle("appNewMessage", value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Push Notifications</CardTitle>
              <CardDescription>Configure which push notifications you want to receive on your devices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Lead</Label>
                  <p className="text-sm text-muted-foreground">Receive push notification when a new lead is created</p>
                </div>
                <Switch
                  checked={methods.watch("pushNewLead")}
                  onCheckedChange={(value) => handleToggle("pushNewLead", value)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Message</Label>
                  <p className="text-sm text-muted-foreground">Receive push notification when you get a new message</p>
                </div>
                <Switch
                  checked={methods.watch("pushNewMessage")}
                  onCheckedChange={(value) => handleToggle("pushNewMessage", value)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Payment Received</Label>
                  <p className="text-sm text-muted-foreground">Receive push notification when a payment is received</p>
                </div>
                <Switch
                  checked={methods.watch("pushPaymentReceived")}
                  onCheckedChange={(value) => handleToggle("pushPaymentReceived", value)}
                />
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

