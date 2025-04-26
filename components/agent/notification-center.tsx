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

const notifications = [
  {
    id: 1,
    title: "تمت الموافقة على العقار",
    message:
      'تمت الموافقة على عقارك "فيلا فاخرة في العليا" وهو الآن مرئي للعامة.',
    date: "2023-11-15T10:30:00",
    type: "success",
    read: false,
  },
  {
    id: 2,
    title: "تم رفض العقار",
    message: 'تم رفض عقارك "شقة استوديو". يرجى تحديث المعلومات وإعادة التقديم.',
    date: "2023-11-14T14:45:00",
    type: "error",
    read: false,
  },
  {
    id: 3,
    title: "تحذير انتهاء الترخيص",
    message:
      "ستنتهي صلاحية رخصتك العقارية خلال 30 يومًا. يرجى تجديدها قبل انتهاء الصلاحية.",
    date: "2023-11-12T09:15:00",
    type: "warning",
    read: true,
  },
  {
    id: 4,
    title: "صيانة النظام",
    message:
      "سيخضع النظام للصيانة في 20 نوفمبر من الساعة 2:00 صباحًا حتى 4:00 صباحًا (GMT+3).",
    date: "2023-11-10T16:20:00",
    type: "info",
    read: true,
  },
  {
    id: 5,
    title: "تمت إضافة ميزة جديدة",
    message:
      "لقد أضفنا ميزة جديدة للخريطة لمساعدتك في تصور مواقع عقاراتك. جرّبها الآن!",
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
                {t("property.approved")}
              </TabsTrigger>
              <TabsTrigger
                value="error"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                {t("property.rejected")}
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
                              {t("property.delete")}
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
