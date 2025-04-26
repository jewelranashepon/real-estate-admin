"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { useTranslations } from "next-intl";
import {
  Bell,
  Building2,
  MessageSquare,
  UserPlus,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Clock,
  Trash2,
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  description: string;
  type: "property" | "message" | "user" | "payment" | "system";
  status: "unread" | "read";
  date: string;
  action?: {
    label: string;
    url: string;
  };
}

export function NotificationsList() {
  const t = useTranslations("dashboard.notificationsList");
  const [notifications, setNotifications] = useState<Notification[]>(() => [
    {
      id: "1",
      title: t("mockNotifications.newProperty.title"),
      description: t("mockNotifications.newProperty.description"),
      type: "property",
      status: "unread",
      date: "2023-11-15T10:30:00Z",
      action: {
        label: t("mockNotifications.newProperty.actionLabel"),
        url: "/admin/properties",
      },
    },
    {
      id: "2",
      title: t("mockNotifications.newMessage.title"),
      description: t("mockNotifications.newMessage.description"),
      type: "message",
      status: "unread",
      date: "2023-11-15T09:45:00Z",
      action: {
        label: t("mockNotifications.newMessage.actionLabel"),
        url: "/admin/leads",
      },
    },
    {
      id: "3",
      title: t("mockNotifications.newUser.title"),
      description: t("mockNotifications.newUser.description"),
      type: "user",
      status: "unread",
      date: "2023-11-14T14:20:00Z",
      action: {
        label: t("mockNotifications.newUser.actionLabel"),
        url: "/admin/users",
      },
    },
    {
      id: "4",
      title: t("mockNotifications.payment.title"),
      description: t("mockNotifications.payment.description"),
      type: "payment",
      status: "read",
      date: "2023-11-13T11:45:00Z",
      action: {
        label: t("mockNotifications.payment.actionLabel"),
        url: "/admin/payments",
      },
    },
    {
      id: "5",
      title: t("mockNotifications.system.title"),
      description: t("mockNotifications.system.description"),
      type: "system",
      status: "read",
      date: "2023-11-12T09:00:00Z",
    },
    {
      id: "6",
      title: t("mockNotifications.propertyStatus.title"),
      description: t("mockNotifications.propertyStatus.description"),
      type: "property",
      status: "read",
      date: "2023-11-11T13:15:00Z",
      action: {
        label: t("mockNotifications.propertyStatus.actionLabel"),
        url: "/admin/properties/2",
      },
    },
    {
      id: "7",
      title: t("mockNotifications.newLead.title"),
      description: t("mockNotifications.newLead.description"),
      type: "user",
      status: "read",
      date: "2023-11-10T15:30:00Z",
      action: {
        label: t("mockNotifications.newLead.actionLabel"),
        url: "/admin/leads",
      },
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");

  const unreadCount = notifications.filter((n) => n.status === "unread").length;

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return notification.status === "unread";
    return notification.type === activeTab;
  });

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, status: "read" as const }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, status: "read" as const }))
    );
    toast({
      title: t("toast.markAllRead.title"),
      description: t("toast.markAllRead.description"),
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
    toast({
      title: t("toast.deleteNotification.title"),
      description: t("toast.deleteNotification.description"),
    });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    toast({
      title: t("toast.clearAll.title"),
      description: t("toast.clearAll.description"),
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "property":
        return <Building2 className="h-5 w-5 text-blue-500" />;
      case "message":
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case "user":
        return <UserPlus className="h-5 w-5 text-purple-500" />;
      case "payment":
        return <CreditCard className="h-5 w-5 text-amber-500" />;
      case "system":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return t("timeAgo.minutes", { count: diffInMinutes });
    } else if (diffInHours < 24) {
      return t("timeAgo.hours", { count: diffInHours });
    } else if (diffInDays < 7) {
      return t("timeAgo.days", { count: diffInDays });
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 justify-between">
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-2xl grid-cols-6">
            <TabsTrigger value="all" className="relative px-4">
              {t("tabs.all")}
              {unreadCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-[10px]">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger className="px-4" value="unread">
              {t("tabs.unread")}
            </TabsTrigger>
            <TabsTrigger className="px-4" value="property">
              {t("tabs.property")}
            </TabsTrigger>
            <TabsTrigger className="px-4" value="message">
              {t("tabs.message")}
            </TabsTrigger>
            <TabsTrigger className="px-4" value="user">
              {t("tabs.user")}
            </TabsTrigger>
            <TabsTrigger className="px-4" value="system">
              {t("tabs.system")}
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            {t("actions.markAllRead")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllNotifications}
            disabled={notifications.length === 0}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {t("actions.clearAll")}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={
                notification.status === "unread"
                  ? "border-l-4 border-l-primary"
                  : ""
              }
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 rounded-full bg-muted p-2">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{notification.title}</h4>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {formatDate(notification.date)}
                        </span>
                        {notification.status === "unread" && (
                          <Badge
                            variant="default"
                            className="h-2 w-2 rounded-full p-0"
                          />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex gap-2">
                        {notification.action && (
                          <Button variant="default" size="sm" asChild>
                            <a href={notification.action.url}>
                              {notification.action.label}
                            </a>
                          </Button>
                        )}
                        {notification.status === "unread" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            {t("actions.markAsRead")}
                          </Button>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">{t("actions.delete")}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Bell className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">
                {t("emptyState.title")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("emptyState.description", {
                  type: activeTab !== "all" ? t(`tabs.${activeTab}`) : "",
                })}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
