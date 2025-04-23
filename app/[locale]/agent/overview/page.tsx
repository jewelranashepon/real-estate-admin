"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, CheckCircle, Users } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function OverviewPage() {
  const t = useTranslations("overviewpage");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <div className="space-y-6" dir={isRtl ? "rtl" : "ltr"}>
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("cards.activeUsers.title")}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {t("cards.activeUsers.subtitlevalue")}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("cards.activeUsers.subtitle")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("cards.totalProperties.title")}
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {t("cards.totalProperties.subtitlevalue")}{" "}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("cards.totalProperties.subtitle")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("cards.approvalRate.title")}
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {t("cards.approvalRate.subtitlevalue")}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("cards.approvalRate.subtitle")}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("updates.title")}</CardTitle>
            <CardDescription>{t("updates.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{t("updates.map.title")}</div>
                  <div className="text-xs text-muted-foreground">
                    {t("updates.map.time")}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("updates.map.desc")}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{t("updates.docs.title")}</div>
                  <div className="text-xs text-muted-foreground">
                    {t("updates.docs.time")}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("updates.docs.desc")}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    {t("updates.notifications.title")}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {t("updates.notifications.time")}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("updates.notifications.desc")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("actions.title")}</CardTitle>
            <CardDescription>{t("actions.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                className="w-full justify-between bg-green-600 hover:bg-green-700"
                asChild
              >
                <a href="/agent/properties/add">
                  {t("actions.addProperty")} <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                className="w-full justify-between"
                variant="outline"
                asChild
              >
                <a href="/agent/properties">
                  {t("actions.viewProperties")}{" "}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                className="w-full justify-between"
                variant="outline"
                asChild
              >
                <a href="/agent/map">
                  {t("actions.map")} <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                className="w-full justify-between"
                variant="outline"
                asChild
              >
                <a href="/agent/profile">
                  {t("actions.updateProfile")}{" "}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
