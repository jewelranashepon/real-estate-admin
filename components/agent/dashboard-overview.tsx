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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function DashboardOverview() {
  const { locale } = useParams();
  const t = useTranslations();
  const isRtl = locale === "ar";

  const statusData = [
    {
      name: t("agentdashboard.approved"),
      value: 12,
      color: "#22c55e", // Tailwind's green-500
    },
    {
      name: t("agentdashboard.rejected"),
      value: 4,
      color: "#ef4444", // Tailwind's red-500
    },
    {
      name: t("property.pending"),
      value: 7,
      color: "#eab308", // Tailwind's yellow-500
    },
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
              {t("agentdashboard.static_rejected")}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("agentdashboard.needsRevision")}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Property Status with Recharts */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>{t("agentdashboard.propertyStatus")}</CardTitle>
            <CardDescription>
              {t("agentdashboard.distribution")}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Agent Performance Metrics */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>{t("agentdashboard.agentPerformance")}</CardTitle>
            <CardDescription>
              {t("agentdashboard.performanceMetrics")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: t("agentdashboard.listingApprovalRate"),
                  value: t("agentdashboard.static_listingApprovalRate"),
                  width: "75%",
                },
                {
                  title: t("agentdashboard.averageResponseTime"),
                  value: t("agentdashboard.static_averageResponseTime"),
                  width: "65%",
                },
                {
                  title: t("agentdashboard.documentCompletion"),
                  value: t("agentdashboard.static_documentCompletion"),
                  width: "90%",
                },
                {
                  title: t("agentdashboard.profileCompleteness"),
                  value: t("agentdashboard.static_profileCompleteness"),
                  width: "85%",
                },
              ].map((metric, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{metric.title}</div>
                    <div className="text-sm font-medium">{metric.value}</div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: metric.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
