"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Bell,
  Lock,
  CreditCard,
  Home,
  Save,
} from "lucide-react";
import { Button } from "@/components/user/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/user/ui/card";
import { Input } from "@/components/user/ui/input";
import { Label } from "@/components/user/ui/label";
import { Switch } from "@/components/user/ui/switch";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/user/ui/avatar";
import { Textarea } from "@/components/user/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/user/ui/select";

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-6">
          <Button variant="ghost" asChild className="mr-2">
            <button onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </button>
          </Button>
          <h1 className="text-2xl font-bold flex-1">Settings</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <Card className="bg-emerald-50/10 backdrop-blur-md border border-emerald-500/20">
              <CardContent className="p-4">
                <div className="flex flex-col items-center py-4">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src="/placeholder.svg?height=80&width=80&text=JD" />
                    <AvatarFallback className="bg-emerald-500/20 text-emerald-500 text-xl">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg">John Doe</h3>
                  <p className="text-sm text-muted-foreground">
                    john@example.com
                  </p>
                </div>

                <div className="space-y-1 mt-4">
                  {[
                    { id: "profile", label: "Profile", icon: User },
                    { id: "notifications", label: "Notifications", icon: Bell },
                    { id: "security", label: "Security", icon: Lock },
                    {
                      id: "payment",
                      label: "Payment Methods",
                      icon: CreditCard,
                    },
                    { id: "preferences", label: "Preferences", icon: Home },
                  ].map((item) => (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className={`w-full justify-start ${
                        activeTab === item.id
                          ? "bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 text-emerald-400"
                          : ""
                      }`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <item.icon
                        className={`mr-2 h-4 w-4 ${
                          activeTab === item.id ? "text-emerald-400" : ""
                        }`}
                      />
                      {item.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "profile" && (
              <Card className="bg-emerald-50/10 backdrop-blur-md border border-emerald-500/20">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and contact details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input
                        id="first-name"
                        defaultValue="John"
                        className="bg-background/50 border-emerald-900/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input
                        id="last-name"
                        defaultValue="Doe"
                        className="bg-background/50 border-emerald-900/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="john@example.com"
                      className="bg-background/50 border-emerald-900/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="bg-background/50 border-emerald-900/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      defaultValue="I'm looking for a new home in the city center with modern amenities and good access to public transportation."
                      className="bg-background/50 border-emerald-900/20 min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profile-image">Profile Image</Label>
                    <Input
                      id="profile-image"
                      type="file"
                      className="bg-background/50 border-emerald-900/20"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-gradient-to-r from-emerald-500/80 to-green-500/80 text-white hover:from-emerald-600/80 hover:to-green-600/80 backdrop-blur-sm">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card className="bg-emerald-50/10 backdrop-blur-md border border-emerald-500/20">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Manage how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="space-y-3">
                      {[
                        {
                          id: "new-properties",
                          label: "New Properties Matching Your Criteria",
                        },
                        {
                          id: "price-changes",
                          label: "Price Changes on Saved Properties",
                        },
                        { id: "messages", label: "New Messages from Agents" },
                        { id: "offers", label: "Offer Updates" },
                        { id: "newsletter", label: "Weekly Newsletter" },
                      ].map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between"
                        >
                          <Label htmlFor={item.id} className="flex-1">
                            {item.label}
                          </Label>
                          <Switch
                            id={item.id}
                            defaultChecked={item.id !== "newsletter"}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Push Notifications</h3>
                    <div className="space-y-3">
                      {[
                        { id: "push-messages", label: "New Messages" },
                        { id: "push-offers", label: "Offer Updates" },
                        { id: "push-properties", label: "New Properties" },
                      ].map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between"
                        >
                          <Label htmlFor={item.id} className="flex-1">
                            {item.label}
                          </Label>
                          <Switch
                            id={item.id}
                            defaultChecked={item.id === "push-messages"}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-gradient-to-r from-emerald-500/80 to-green-500/80 text-white hover:from-emerald-600/80 hover:to-green-600/80 backdrop-blur-sm">
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            )}

            {activeTab === "security" && (
              <Card className="bg-emerald-50/10 backdrop-blur-md border border-emerald-500/20">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and password
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      className="bg-background/50 border-emerald-900/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      className="bg-background/50 border-emerald-900/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      className="bg-background/50 border-emerald-900/20"
                    />
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-4">
                      Two-Factor Authentication
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          Enable Two-Factor Authentication
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch id="2fa" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-gradient-to-r from-emerald-500/80 to-green-500/80 text-white hover:from-emerald-600/80 hover:to-green-600/80 backdrop-blur-sm">
                    <Save className="mr-2 h-4 w-4" />
                    Update Security Settings
                  </Button>
                </CardFooter>
              </Card>
            )}

            {activeTab === "payment" && (
              <Card className="bg-emerald-50/10 backdrop-blur-md border border-emerald-500/20">
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>
                    Manage your payment methods and billing information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Saved Payment Methods
                    </h3>
                    <div className="space-y-3">
                      <div className="p-4 border border-emerald-500/20 rounded-lg bg-emerald-950/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-16 bg-background/50 rounded-md flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-emerald-500" />
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-muted-foreground">
                              Expires 12/25
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-emerald-900/20 bg-emerald-950/10"
                        >
                          Remove
                        </Button>
                      </div>

                      <div className="p-4 border border-emerald-500/20 rounded-lg bg-emerald-950/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-16 bg-background/50 rounded-md flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-emerald-500" />
                          </div>
                          <div>
                            <p className="font-medium">
                              Mastercard ending in 8888
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Expires 09/24
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-emerald-900/20 bg-emerald-950/10"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Add New Payment Method
                    </h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          className="bg-background/50 border-emerald-900/20"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            className="bg-background/50 border-emerald-900/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input
                            id="cvc"
                            placeholder="123"
                            className="bg-background/50 border-emerald-900/20"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name-on-card">Name on Card</Label>
                        <Input
                          id="name-on-card"
                          placeholder="John Doe"
                          className="bg-background/50 border-emerald-900/20"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-gradient-to-r from-emerald-500/80 to-green-500/80 text-white hover:from-emerald-600/80 hover:to-green-600/80 backdrop-blur-sm">
                    <Save className="mr-2 h-4 w-4" />
                    Save Payment Method
                  </Button>
                </CardFooter>
              </Card>
            )}

            {activeTab === "preferences" && (
              <Card className="bg-emerald-50/10 backdrop-blur-md border border-emerald-500/20">
                <CardHeader>
                  <CardTitle>Property Preferences</CardTitle>
                  <CardDescription>
                    Set your default property search preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Preferred Location</Label>
                    <Input
                      id="location"
                      defaultValue="New York, NY"
                      className="bg-background/50 border-emerald-900/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="min-price">Minimum Price</Label>
                      <Input
                        id="min-price"
                        type="number"
                        defaultValue="1500"
                        className="bg-background/50 border-emerald-900/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-price">Maximum Price</Label>
                      <Input
                        id="max-price"
                        type="number"
                        defaultValue="5000"
                        className="bg-background/50 border-emerald-900/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Select defaultValue="2">
                        <SelectTrigger
                          id="bedrooms"
                          className="bg-background/50 border-emerald-900/20"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Select defaultValue="1">
                        <SelectTrigger
                          id="bathrooms"
                          className="bg-background/50 border-emerald-900/20"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="property-type">Property Type</Label>
                      <Select defaultValue="apartment">
                        <SelectTrigger
                          id="property-type"
                          className="bg-background/50 border-emerald-900/20"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="condo">Condo</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Must-Have Features</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "parking", label: "Parking" },
                        { id: "balcony", label: "Balcony" },
                        { id: "pet-friendly", label: "Pet Friendly" },
                        { id: "gym", label: "Gym" },
                        { id: "pool", label: "Pool" },
                        { id: "laundry", label: "In-unit Laundry" },
                      ].map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-2"
                        >
                          <Switch
                            id={item.id}
                            defaultChecked={[
                              "parking",
                              "pet-friendly",
                              "laundry",
                            ].includes(item.id)}
                          />
                          <Label htmlFor={item.id}>{item.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-gradient-to-r from-emerald-500/80 to-green-500/80 text-white hover:from-emerald-600/80 hover:to-green-600/80 backdrop-blur-sm">
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
