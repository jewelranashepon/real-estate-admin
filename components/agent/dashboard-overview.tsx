"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building, Clock, CheckCircle, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function DashboardOverview() {
  const { locale } = useParams();
  const t = useTranslations();
  const isRtl = locale === "ar";

  // Mock data for the chart
  const statusData = [
    { name: t("agentdashboard.approved"), value: 12, color: "bg-green-500" },
    { name: t("agentdashboard.rejected"), value: 4, color: "bg-red-500" },
    { name: t("properties.pending"), value: 7, color: "bg-yellow-500" },
  ];

  return (
    <div className="space-y-6" dir={isRtl ? "rtl" : "ltr"}>
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          {t("common.agentdashboard")}
        </h2>
        <p className="text-muted-foreground">{t("agentdashboard.welcome")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("agentdashboard.totalProperties")}
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {t("agentdashboard.static_totalProperties")}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("agentdashboard.static_fromLastMonth")}{" "}
              {t("agentdashboard.fromLastMonth")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("agentdashboard.pendingApprovals")}
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {t("agentdashboard.static_pendingApprovals")}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("agentdashboard.awaitingReview")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("agentdashboard.approved")}
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {t("agentdashboard.static_totalProperties")}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("agentdashboard.visibleToPublic")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("agentdashboard.rejected")}
            </CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {t("agentdashboard.static_rejected")}{" "}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("agentdashboard.needsRevision")}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>{t("agentdashboard.propertyStatus")}</CardTitle>
            <CardDescription>
              {t("agentdashboard.distribution")}
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-80 flex items-end gap-2">
              {statusData.map((status) => (
                <div
                  key={status.name}
                  className={`${status.color} w-20 relative`}
                  style={{ height: `${status.value * 10}px` }}
                >
                  <div className="absolute -top-8 left-0 bg-gray-900 text-white p-2 rounded opacity-0 hover:opacity-100">
                    {status.name}: {status.value}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>{t("agentdashboard.agentPerformance")}</CardTitle>
            <CardDescription>
              {t("agentdashboard.performanceMetrics")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">
                    {t("agentdashboard.listingApprovalRate")}
                  </div>
                  <div className="text-sm font-medium">
                    {t("agentdashboard.static_listingApprovalRate")}
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: "75%" }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">
                    {t("agentdashboard.averageResponseTime")}
                  </div>
                  <div className="text-sm font-medium">
                    {t("agentdashboard.static_averageResponseTime")}
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: "65%" }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">
                    {t("agentdashboard.documentCompletion")}
                  </div>
                  <div className="text-sm font-medium">
                    {t("agentdashboard.static_documentCompletion")}
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: "90%" }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">
                    {t("agentdashboard.profileCompleteness")}
                  </div>
                  <div className="text-sm font-medium">
                    {t("agentdashboard.static_profileCompleteness")}
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: "85%" }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
