import { NotificationsList } from "@/components/admin/notifications-list";
import { useTranslations } from "next-intl";

export default function NotificationsPage() {
  const t = useTranslations("dashboard");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">
        {t("notifications")}
      </h1>
      <NotificationsList />
    </div>
  );
}
