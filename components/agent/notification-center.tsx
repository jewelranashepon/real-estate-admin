"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Trash2,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

// Mock notification data
const notifications = [
  {
    id: 1,
    title: "Property Approved",
    message:
      'Your property "Luxury Villa in Al Olaya" has been approved and is now visible to the public.',
    date: "2023-11-15T10:30:00",
    type: "success",
    read: false,
  },
  {
    id: 2,
    title: "Property Rejected",
    message:
      'Your property "Studio Apartment" has been rejected. Please update the information and resubmit.',
    date: "2023-11-14T14:45:00",
    type: "error",
    read: false,
  },
  {
    id: 3,
    title: "License Expiry Warning",
    message:
      "Your real estate license will expire in 30 days. Please renew it before expiration.",
    date: "2023-11-12T09:15:00",
    type: "warning",
    read: true,
  },
  {
    id: 4,
    title: "System Maintenance",
    message:
      "The system will be undergoing maintenance on November 20th from 2:00 AM to 4:00 AM (GMT+3).",
    date: "2023-11-10T16:20:00",
    type: "info",
    read: true,
  },
  {
    id: 5,
    title: "New Feature Added",
    message:
      "We've added a new map feature to help you visualize your property locations. Check it out!",
    date: "2023-11-08T11:05:00",
    type: "info",
    read: true,
  },
];

export default function NotificationCenter() {
  const [activeTab, setActiveTab] = useState("all");
  const [notificationState, setNotificationState] = useState(notifications);
  const { locale } = useParams();
  const t = useTranslations();
  const isRtl = locale === "ar";

  const unreadCount = notificationState.filter((n) => !n.read).length;

  const filteredNotifications =
    activeTab === "all"
      ? notificationState
      : activeTab === "unread"
      ? notificationState.filter((n) => !n.read)
      : notificationState.filter((n) => n.type === activeTab);

  const markAsRead = (id: number) => {
    setNotificationState((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationState((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotificationState((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="space-y-6" dir={isRtl ? "rtl" : "ltr"}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {t("common.notifications")}
          </h2>
          <p className="text-muted-foreground">
            {t("notifications.stayUpdated")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              onClick={markAllAsRead}
              className="border-green-500 text-green-600 hover:bg-green-50"
            >
              {t("notifications.markAllRead")}
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("notifications.notificationCenter")}</CardTitle>
          <CardDescription>
            {t("notifications.manageNotifications")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger
                value="all"
                className="relative data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                {t("notifications.all")}
                {unreadCount > 0 && (
                  <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-xs bg-green-700">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                {t("notifications.unread")}
              </TabsTrigger>
              <TabsTrigger
                value="success"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                {t("properties.approved")}
              </TabsTrigger>
              <TabsTrigger
                value="error"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                {t("properties.rejected")}
              </TabsTrigger>
              <TabsTrigger
                value="info"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                {t("notifications.system")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">
                    {t("notifications.noNotifications")}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {activeTab === "unread"
                      ? t("notifications.noUnread")
                      : t("notifications.noCategory")}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`relative rounded-lg border p-4 ${
                        notification.read ? "bg-background" : "bg-green-50"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                            <h4 className="text-sm font-semibold">
                              {notification.title}
                              {!notification.read && (
                                <Badge className="ml-2 bg-green-600">
                                  {t("notifications.new")}
                                </Badge>
                              )}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(notification.date)}
                            </span>
                          </div>
                          <p className="mt-1 text-sm">{notification.message}</p>
                          <div className="mt-2 flex items-center gap-2">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="text-green-600 hover:bg-green-50 hover:text-green-700"
                              >
                                {t("notifications.markAsRead")}
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground"
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              {t("properties.delete")}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
