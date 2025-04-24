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
import { useTranslations } from "next-intl";

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const t = useTranslations("userSettingsPage");

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
              {t("navigation.back")}
            </button>
          </Button>
          <h1 className="text-2xl font-bold flex-1">
            {t("navigation.settings")}
          </h1>
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
                    {t("user.email")}
                  </p>
                </div>

                <div className="space-y-1 mt-4">
                  {[
                    { id: "profile", label: t("sidebar.profile"), icon: User },
                    {
                      id: "notifications",
                      label: t("sidebar.notifications"),
                      icon: Bell,
                    },
                    {
                      id: "security",
                      label: t("sidebar.security"),
                      icon: Lock,
                    },
                    {
                      id: "payment",
                      label: t("sidebar.payment"),
                      icon: CreditCard,
                    },
                    {
                      id: "preferences",
                      label: t("sidebar.preferences"),
                      icon: Home,
                    },
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
                  <CardTitle>{t("profile.title")}</CardTitle>
                  <CardDescription>{t("profile.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">
                        {t("profile.firstName")}
                      </Label>
                      <Input
                        id="first-name"
                        defaultValue="John"
                        className="bg-background/50 border-emerald-900/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">{t("profile.lastName")}</Label>
                      <Input
                        id="last-name"
                        defaultValue="Doe"
                        className="bg-background/50 border-emerald-900/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t("profile.email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={t("user.email")}
                      className="bg-background/50 border-emerald-900/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("profile.phone")}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="bg-background/50 border-emerald-900/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">{t("profile.bio")}</Label>
                    <Textarea
                      id="bio"
                      defaultValue={t("profile.bioDefault")}
                      className="bg-background/50 border-emerald-900/20 min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profile-image">
                      {t("profile.profileImage")}
                    </Label>
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
                    {t("profile.saveChanges")}
                  </Button>
                </CardFooter>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card className="bg-emerald-50/10 backdrop-blur-md border border-emerald-500/20">
                <CardHeader>
                  <CardTitle>{t("notifications.title")}</CardTitle>
                  <CardDescription>
                    {t("notifications.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      {t("notifications.emailNotifications")}
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          id: "new-properties",
                          label: t("notifications.items.newProperties"),
                        },
                        {
                          id: "price-changes",
                          label: t("notifications.items.priceChanges"),
                        },
                        {
                          id: "messages",
                          label: t("notifications.items.messages"),
                        },
                        {
                          id: "offers",
                          label: t("notifications.items.offers"),
                        },
                        {
                          id: "newsletter",
                          label: t("notifications.items.newsletter"),
                        },
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
                    <h3 className="text-lg font-medium">
                      {t("notifications.pushNotifications")}
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          id: "push-messages",
                          label: t("notifications.pushItems.newMessages"),
                        },
                        {
                          id: "push-offers",
                          label: t("notifications.pushItems.offerUpdates"),
                        },
                        {
                          id: "push-properties",
                          label: t("notifications.pushItems.newProperties"),
                        },
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
                    {t("notifications.savePreferences")}
                  </Button>
                </CardFooter>
              </Card>
            )}

            {activeTab === "security" && (
              <Card className="bg-emerald-50/10 backdrop-blur-md border border-emerald-500/20">
                <CardHeader>
                  <CardTitle>{t("security.title")}</CardTitle>
                  <CardDescription>{t("security.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">
                      {t("security.currentPassword")}
                    </Label>
                    <Input
                      id="current-password"
                      type="password"
                      className="bg-background/50 border-emerald-900/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">
                      {t("security.newPassword")}
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      className="bg-background/50 border-emerald-900/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      {t("security.confirmPassword")}
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      className="bg-background/50 border-emerald-900/20"
                    />
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-4">
                      {t("security.twoFactor")}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {t("security.enableTwoFactor")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {t("security.twoFactorDescription")}
                        </p>
                      </div>
                      <Switch id="2fa" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-gradient-to-r from-emerald-500/80 to-green-500/80 text-white hover:from-emerald-600/80 hover:to-green-600/80 backdrop-blur-sm">
                    <Save className="mr-2 h-4 w-4" />
                    {t("security.updateSecurity")}
                  </Button>
                </CardFooter>
              </Card>
            )}

            {activeTab === "payment" && (
              <Card className="bg-emerald-50/10 backdrop-blur-md border border-emerald-500/20">
                <CardHeader>
                  <CardTitle>{t("payment.title")}</CardTitle>
                  <CardDescription>{t("payment.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      {t("payment.savedMethods")}
                    </h3>
                    <div className="space-y-3">
                      <div className="p-4 border border-emerald-500/20 rounded-lg bg-emerald-950/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-16 bg-background/50 rounded-md flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-emerald-500" />
                          </div>
                          <div>
                            <p className="font-medium">{t("payment.visa")}</p>
                            <p className="text-sm text-muted-foreground">
                              {t("payment.visaExpiry")}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-emerald-900/20 bg-emerald-950/10"
                        >
                          {t("payment.remove")}
                        </Button>
                      </div>

                      <div className="p-4 border border-emerald-500/20 rounded-lg bg-emerald-950/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-16 bg-background/50 rounded-md flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-emerald-500" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {t("payment.mastercard")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {t("payment.mastercardExpiry")}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-emerald-900/20 bg-emerald-950/10"
                        >
                          {t("payment.remove")}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      {t("payment.addNew")}
                    </h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">
                          {t("payment.cardNumber")}
                        </Label>
                        <Input
                          id="card-number"
                          placeholder={t("payment.cardNumberPlaceholder")}
                          className="bg-background/50 border-emerald-900/20"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">
                            {t("payment.expiryDate")}
                          </Label>
                          <Input
                            id="expiry"
                            placeholder={t("payment.expiryDatePlaceholder")}
                            className="bg-background/50 border-emerald-900/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">{t("payment.cvc")}</Label>
                          <Input
                            id="cvc"
                            placeholder={t("payment.cvcPlaceholder")}
                            className="bg-background/50 border-emerald-900/20"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name-on-card">
                          {t("payment.nameOnCard")}
                        </Label>
                        <Input
                          id="name-on-card"
                          placeholder={t("payment.nameOnCardPlaceholder")}
                          className="bg-background/50 border-emerald-900/20"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-gradient-to-r from-emerald-500/80 to-green-500/80 text-white hover:from-emerald-600/80 hover:to-green-600/80 backdrop-blur-sm">
                    <Save className="mr-2 h-4 w-4" />
                    {t("payment.savePayment")}
                  </Button>
                </CardFooter>
              </Card>
            )}

            {activeTab === "preferences" && (
              <Card className="bg-emerald-50/10 backdrop-blur-md border border-emerald-500/20">
                <CardHeader>
                  <CardTitle>{t("preferences.title")}</CardTitle>
                  <CardDescription>
                    {t("preferences.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">
                      {t("preferences.location")}
                    </Label>
                    <Input
                      id="location"
                      defaultValue={t("preferences.locationDefault")}
                      className="bg-background/50 border-emerald-900/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="min-price">
                        {t("preferences.minPrice")}
                      </Label>
                      <Input
                        id="min-price"
                        type="number"
                        defaultValue="1500"
                        className="bg-background/50 border-emerald-900/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-price">
                        {t("preferences.maxPrice")}
                      </Label>
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
                      <Label htmlFor="bedrooms">
                        {t("preferences.bedrooms")}
                      </Label>
                      <Select defaultValue="2">
                        <SelectTrigger
                          id="bedrooms"
                          className="bg-background/50 border-emerald-900/20"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">
                            {t("preferences.any")}
                          </SelectItem>
                          <SelectItem value="1">
                            {t("preferences.onePlus")}
                          </SelectItem>
                          <SelectItem value="2">
                            {t("preferences.twoPlus")}
                          </SelectItem>
                          <SelectItem value="3">
                            {t("preferences.threePlus")}
                          </SelectItem>
                          <SelectItem value="4">
                            {t("preferences.fourPlus")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">
                        {t("preferences.bathrooms")}
                      </Label>
                      <Select defaultValue="1">
                        <SelectTrigger
                          id="bathrooms"
                          className="bg-background/50 border-emerald-900/20"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">
                            {t("preferences.any")}
                          </SelectItem>
                          <SelectItem value="1">
                            {t("preferences.onePlus")}
                          </SelectItem>
                          <SelectItem value="2">
                            {t("preferences.twoPlus")}
                          </SelectItem>
                          <SelectItem value="3">
                            {t("preferences.threePlus")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="property-type">
                        {t("preferences.propertyType")}
                      </Label>
                      <Select defaultValue="apartment">
                        <SelectTrigger
                          id="property-type"
                          className="bg-background/50 border-emerald-900/20"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">
                            {t("preferences.any")}
                          </SelectItem>
                          <SelectItem value="apartment">
                            {t("preferences.apartment")}
                          </SelectItem>
                          <SelectItem value="house">
                            {t("preferences.house")}
                          </SelectItem>
                          <SelectItem value="condo">
                            {t("preferences.condo")}
                          </SelectItem>
                          <SelectItem value="townhouse">
                            {t("preferences.townhouse")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>{t("preferences.features")}</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        {
                          id: "parking",
                          label: t("preferences.featureItems.parking"),
                        },
                        {
                          id: "balcony",
                          label: t("preferences.featureItems.balcony"),
                        },
                        {
                          id: "pet-friendly",
                          label: t("preferences.featureItems.petFriendly"),
                        },
                        { id: "gym", label: t("preferences.featureItems.gym") },
                        {
                          id: "pool",
                          label: t("preferences.featureItems.pool"),
                        },
                        {
                          id: "laundry",
                          label: t("preferences.featureItems.laundry"),
                        },
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
                    {t("preferences.savePreferences")}
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
