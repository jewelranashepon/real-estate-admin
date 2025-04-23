"use client";

import { SupportDashboard } from "@/components/admin/support-dashboard";
import { useTranslations } from "next-intl";

export default function SupportPage() {
  const t = useTranslations("common");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">{t("help")}</h1>

      <SupportDashboard />
    </div>
  );
}
