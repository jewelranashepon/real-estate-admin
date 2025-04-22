"use client";

import { useState } from "react";
import {
  User,
  Lock,
  Bell,
  CreditCard,
  Home,
  HelpCircle,
  LogOut,
  Check,
  ChevronRight,
  Mail,
  Phone,
  Shield,
  Eye,
  EyeOff,
  Save,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const settingsTabs = [
  {
    id: "account",
    label: "Account",
    icon: User,
  },
  {
    id: "security",
    label: "Security",
    icon: Lock,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCard,
  },
  {
    id: "preferences",
    label: "Preferences",
    icon: Home,
  },
  {
    id: "help",
    label: "Help & Support",
    icon: HelpCircle,
  },
];

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-64 space-y-6">
          <div className="flex flex-col items-center space-y-3 p-4 border rounded-lg">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src="/placeholder.svg?height=80&width=80"
                alt="User"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="font-medium">John Doe</h3>
              <p className="text-sm text-muted-foreground">
                john.doe@example.com
              </p>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Change Avatar
            </Button>
          </div>
          <div className="space-y-1">
            {settingsTabs.map((tab) => (
              <Button
                key={tab.id}
                variant={tab.id === "account" ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <tab.icon className="mr-2 h-4 w-4" />
                {tab.label}
              </Button>
            ))}
            <Separator className="my-2" />
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </div>
        </div>

        <div className="flex-1">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              {settingsTabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-4 py-3"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="account" className="pt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="john.doe@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="123 Main St, Apt 4B" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" defaultValue="New York" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select defaultValue="ny">
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                          <SelectItem value="fl">Florida</SelectItem>
                          <SelectItem value="il">Illinois</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" defaultValue="10001" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Profile Preferences</CardTitle>
                  <CardDescription>
                    Customize your profile and search preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="property-type">
                      Preferred Property Type
                    </Label>
                    <Select defaultValue="apartment">
                      <SelectTrigger id="property-type">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="loft">Loft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range</Label>
                    <Select defaultValue="2000-3000">
                      <SelectTrigger id="budget">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1000-2000">
                          $1,000 - $2,000
                        </SelectItem>
                        <SelectItem value="2000-3000">
                          $2,000 - $3,000
                        </SelectItem>
                        <SelectItem value="3000-4000">
                          $3,000 - $4,000
                        </SelectItem>
                        <SelectItem value="4000-5000">
                          $4,000 - $5,000
                        </SelectItem>
                        <SelectItem value="5000+">$5,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Select defaultValue="2">
                      <SelectTrigger id="bedrooms">
                        <SelectValue placeholder="Select number of bedrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="1">1 Bedroom</SelectItem>
                        <SelectItem value="2">2 Bedrooms</SelectItem>
                        <SelectItem value="3">3 Bedrooms</SelectItem>
                        <SelectItem value="4+">4+ Bedrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferred-locations">
                      Preferred Locations
                    </Label>
                    <Input
                      id="preferred-locations"
                      defaultValue="Manhattan, Brooklyn"
                    />
                    <p className="text-sm text-muted-foreground">
                      Separate multiple locations with commas
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="pets-allowed">
                        Pet-Friendly Properties
                      </Label>
                      <Switch id="pets-allowed" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Only show properties that allow pets
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Reset Preferences</Button>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="pt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPassword ? "text" : "password"}
                        defaultValue="currentpassword"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showNewPassword ? "text" : "password"}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showNewPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showConfirmPassword
                            ? "Hide password"
                            : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Update Password</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">
                        Text Message Authentication
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Receive a code via SMS to verify your identity
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Authenticator App</div>
                      <div className="text-sm text-muted-foreground">
                        Use an authenticator app to generate verification codes
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Backup Codes</div>
                      <div className="text-sm text-muted-foreground">
                        Generate backup codes to use when other methods aren't
                        available
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Generate Codes
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Login Sessions</CardTitle>
                  <CardDescription>
                    Manage your active sessions and sign out from other devices
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">MacBook Pro - Chrome</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Shield className="mr-1 h-3.5 w-3.5" />
                          <span>Current device • New York, USA</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Last active: Just now
                        </p>
                      </div>
                      <Button variant="outline" size="sm" disabled>
                        Current
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">iPhone 13 - Safari</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Shield className="mr-1 h-3.5 w-3.5" />
                          <span>New York, USA</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Last active: 2 hours ago
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Sign Out
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">Windows PC - Firefox</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Shield className="mr-1 h-3.5 w-3.5" />
                          <span>Boston, USA</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Last active: Yesterday
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Sign Out From All Devices
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="pt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>
                    Choose what types of email notifications you receive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">New Property Alerts</div>
                      <div className="text-sm text-muted-foreground">
                        Receive notifications when new properties match your
                        search criteria
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Price Change Alerts</div>
                      <div className="text-sm text-muted-foreground">
                        Get notified when prices change on your saved properties
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Messages</div>
                      <div className="text-sm text-muted-foreground">
                        Receive email notifications for new messages
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Marketing & Promotions</div>
                      <div className="text-sm text-muted-foreground">
                        Receive emails about special offers and promotions
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Newsletter</div>
                      <div className="text-sm text-muted-foreground">
                        Receive our monthly newsletter with real estate tips and
                        trends
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Push Notifications</CardTitle>
                  <CardDescription>
                    Configure push notifications for your mobile devices
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">New Property Alerts</div>
                      <div className="text-sm text-muted-foreground">
                        Receive push notifications for new matching properties
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Messages</div>
                      <div className="text-sm text-muted-foreground">
                        Get notified when you receive new messages
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Appointment Reminders</div>
                      <div className="text-sm text-muted-foreground">
                        Receive reminders for upcoming property viewings
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Application Updates</div>
                      <div className="text-sm text-muted-foreground">
                        Get notified about updates to your rental applications
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="pt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Plan</CardTitle>
                  <CardDescription>
                    Manage your subscription and billing details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">Premium Plan</h3>
                        <p className="text-sm text-muted-foreground">
                          $19.99/month
                        </p>
                        <div className="mt-2 flex items-center text-sm text-emerald-600">
                          <Check className="mr-1 h-4 w-4" />
                          Active until May 15, 2025
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Change Plan
                      </Button>
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-emerald-600" />
                        <span>Unlimited property searches</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-emerald-600" />
                        <span>Priority customer support</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-emerald-600" />
                        <span>Advanced filters and sorting options</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-emerald-600" />
                        <span>Early access to new listings</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-emerald-600" />
                        <span>No advertisements</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel Subscription</Button>
                  <Button>Manage Billing</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>
                    Manage your payment methods and billing information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup defaultValue="card1">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card1" id="card1" />
                        <Label
                          htmlFor="card1"
                          className="flex flex-1 items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="rounded-md border p-2 flex items-center justify-center">
                              <CreditCard className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">Visa ending in 4242</p>
                              <p className="text-sm text-muted-foreground">
                                Expires 04/2025
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </Label>
                      </div>
                      <Separator />
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card2" id="card2" />
                        <Label
                          htmlFor="card2"
                          className="flex flex-1 items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="rounded-md border p-2 flex items-center justify-center">
                              <CreditCard className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">
                                Mastercard ending in 5678
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Expires 08/2024
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                  <Button variant="outline" className="w-full mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>
                    View your recent billing history and download invoices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Premium Plan - Monthly</p>
                        <p className="text-sm text-muted-foreground">
                          April 15, 2025
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium">$19.99</p>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Premium Plan - Monthly</p>
                        <p className="text-sm text-muted-foreground">
                          March 15, 2025
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium">$19.99</p>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Premium Plan - Monthly</p>
                        <p className="text-sm text-muted-foreground">
                          February 15, 2025
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium">$19.99</p>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Invoices
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="pt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Display Settings</CardTitle>
                  <CardDescription>
                    Customize how the application looks and feels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Dark Mode</div>
                      <div className="text-sm text-muted-foreground">
                        Switch between light and dark themes
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Theme Color</Label>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 rounded-full p-0 bg-emerald-500"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 rounded-full p-0 bg-sky-500"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 rounded-full p-0 bg-amber-500"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 rounded-full p-0 bg-rose-500"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 rounded-full p-0 bg-violet-500"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 rounded-full p-0 bg-slate-500"
                      />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Font Size</Label>
                    <RadioGroup defaultValue="medium">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="small" id="font-small" />
                        <Label htmlFor="font-small">Small</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="font-medium" />
                        <Label htmlFor="font-medium">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="large" id="font-large" />
                        <Label htmlFor="font-large">Large</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Language & Region</CardTitle>
                  <CardDescription>
                    Set your preferred language and regional settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="cad">CAD ($)</SelectItem>
                        <SelectItem value="aud">AUD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select defaultValue="mdy">
                      <SelectTrigger id="date-format">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time-format">Time Format</Label>
                    <Select defaultValue="12h">
                      <SelectTrigger id="time-format">
                        <SelectValue placeholder="Select time format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                        <SelectItem value="24h">24-hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Control how your information is used and shared
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Profile Visibility</div>
                      <div className="text-sm text-muted-foreground">
                        Allow other users to view your profile
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Search History</div>
                      <div className="text-sm text-muted-foreground">
                        Save your search history for quick access
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Data Collection</div>
                      <div className="text-sm text-muted-foreground">
                        Allow us to collect usage data to improve our services
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">
                        Personalized Recommendations
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Receive property recommendations based on your activity
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Privacy Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="help" className="pt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Help & Support</CardTitle>
                  <CardDescription>
                    Get help with your account or contact our support team
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-semibold">
                        Frequently Asked Questions
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Find answers to common questions about our platform
                      </p>
                      <Button variant="link" className="px-0 mt-2" asChild>
                        <a href="#" className="flex items-center">
                          Browse FAQ
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-semibold">Knowledge Base</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Explore our guides and tutorials for using the platform
                      </p>
                      <Button variant="link" className="px-0 mt-2" asChild>
                        <a href="#" className="flex items-center">
                          View Knowledge Base
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-semibold">Contact Support</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Get in touch with our customer support team
                      </p>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center">
                          <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>support@rootsofelite.com</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>+1 (800) 123-4567</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Submit a Support Ticket</CardTitle>
                  <CardDescription>
                    Need help with something specific? Submit a support ticket
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Enter the subject of your inquiry"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select defaultValue="account">
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="account">Account Issues</SelectItem>
                        <SelectItem value="billing">
                          Billing & Payments
                        </SelectItem>
                        <SelectItem value="technical">
                          Technical Problems
                        </SelectItem>
                        <SelectItem value="properties">
                          Property Listings
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Describe your issue in detail"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="attachments">Attachments (Optional)</Label>
                    <Input id="attachments" type="file" multiple />
                    <p className="text-xs text-muted-foreground">
                      You can attach screenshots or documents to help explain
                      your issue
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Submit Ticket
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
