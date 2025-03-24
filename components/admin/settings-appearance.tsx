"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"
import { useForm, FormProvider } from "react-hook-form"

export function SettingsAppearance() {
  const [isLoading, setIsLoading] = useState(false)
  const [theme, setTheme] = useState("light")
  const [primaryColor, setPrimaryColor] = useState("blue")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [enableAnimations, setEnableAnimations] = useState(true)
  const [highContrastMode, setHighContrastMode] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const methods = useForm({
    defaultValues: {
      theme,
      primaryColor,
      sidebarCollapsed,
      enableAnimations,
      highContrastMode,
      reducedMotion,
    },
  })

  const handleSubmit = (data: any) => {
    setIsLoading(true)

    // Update state with form data
    setTheme(data.theme)
    setPrimaryColor(data.primaryColor)
    setSidebarCollapsed(data.sidebarCollapsed)
    setEnableAnimations(data.enableAnimations)
    setHighContrastMode(data.highContrastMode)
    setReducedMotion(data.reducedMotion)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Appearance updated",
        description: "Your appearance settings have been updated successfully.",
      })
    }, 1000)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Customize the look and feel of the admin panel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Color Mode</Label>
                <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-3 gap-4">
                  <div>
                    <RadioGroupItem value="light" id="theme-light" className="sr-only" />
                    <Label
                      htmlFor="theme-light"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 h-16 w-16 rounded-md bg-[#f8fafc] border"></div>
                      Light
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
                    <Label
                      htmlFor="theme-dark"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 h-16 w-16 rounded-md bg-[#1e293b]"></div>
                      Dark
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="system" id="theme-system" className="sr-only" />
                    <Label
                      htmlFor="theme-system"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 h-16 w-16 rounded-md bg-gradient-to-r from-[#f8fafc] to-[#1e293b]"></div>
                      System
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Primary Color</Label>
                <RadioGroup value={primaryColor} onValueChange={setPrimaryColor} className="grid grid-cols-6 gap-2">
                  <div>
                    <RadioGroupItem value="blue" id="color-blue" className="sr-only" />
                    <Label
                      htmlFor="color-blue"
                      className="flex aspect-square items-center justify-center rounded-md border-2 border-muted bg-blue-600 text-white hover:border-accent [&:has([data-state=checked])]:border-primary"
                    >
                      {primaryColor === "blue" && "✓"}
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="green" id="color-green" className="sr-only" />
                    <Label
                      htmlFor="color-green"
                      className="flex aspect-square items-center justify-center rounded-md border-2 border-muted bg-green-600 text-white hover:border-accent [&:has([data-state=checked])]:border-primary"
                    >
                      {primaryColor === "green" && "✓"}
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="purple" id="color-purple" className="sr-only" />
                    <Label
                      htmlFor="color-purple"
                      className="flex aspect-square items-center justify-center rounded-md border-2 border-muted bg-purple-600 text-white hover:border-accent [&:has([data-state=checked])]:border-primary"
                    >
                      {primaryColor === "purple" && "✓"}
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="orange" id="color-orange" className="sr-only" />
                    <Label
                      htmlFor="color-orange"
                      className="flex aspect-square items-center justify-center rounded-md border-2 border-muted bg-orange-600 text-white hover:border-accent [&:has([data-state=checked])]:border-primary"
                    >
                      {primaryColor === "orange" && "✓"}
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="red" id="color-red" className="sr-only" />
                    <Label
                      htmlFor="color-red"
                      className="flex aspect-square items-center justify-center rounded-md border-2 border-muted bg-red-600 text-white hover:border-accent [&:has([data-state=checked])]:border-primary"
                    >
                      {primaryColor === "red" && "✓"}
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="gray" id="color-gray" className="sr-only" />
                    <Label
                      htmlFor="color-gray"
                      className="flex aspect-square items-center justify-center rounded-md border-2 border-muted bg-gray-600 text-white hover:border-accent [&:has([data-state=checked])]:border-primary"
                    >
                      {primaryColor === "gray" && "✓"}
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Layout</CardTitle>
              <CardDescription>Customize the layout of the admin panel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sidebar-collapsed">Sidebar Collapsed by Default</Label>
                  <p className="text-sm text-muted-foreground">
                    Start with the sidebar collapsed when loading the page
                  </p>
                </div>
                <Switch id="sidebar-collapsed" checked={sidebarCollapsed} onCheckedChange={setSidebarCollapsed} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable-animations">Enable Animations</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable animations and transitions throughout the interface
                  </p>
                </div>
                <Switch id="enable-animations" checked={enableAnimations} onCheckedChange={setEnableAnimations} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accessibility</CardTitle>
              <CardDescription>Customize accessibility settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="high-contrast">High Contrast Mode</Label>
                  <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                </div>
                <Switch id="high-contrast" checked={highContrastMode} onCheckedChange={setHighContrastMode} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reduced-motion">Reduced Motion</Label>
                  <p className="text-sm text-muted-foreground">Reduce or eliminate motion effects</p>
                </div>
                <Switch id="reduced-motion" checked={reducedMotion} onCheckedChange={setReducedMotion} />
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

