"use client";

import { useTranslations } from "next-intl";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function AnalyticsOverview() {
  const t = useTranslations("dashboard");

  const dataMonthly = [
    { month: "Jan", listings: 65, views: 240, inquiries: 24 },
    { month: "Feb", listings: 59, views: 280, inquiries: 28 },
    { month: "Mar", listings: 80, views: 290, inquiries: 29 },
    { month: "Apr", listings: 81, views: 310, inquiries: 31 },
    { month: "May", listings: 56, views: 180, inquiries: 18 },
    { month: "Jun", listings: 55, views: 255, inquiries: 25 },
    { month: "Jul", listings: 40, views: 190, inquiries: 19 },
    { month: "Aug", listings: 72, views: 320, inquiries: 32 },
    { month: "Sep", listings: 78, views: 280, inquiries: 28 },
    { month: "Oct", listings: 82, views: 310, inquiries: 31 },
    { month: "Nov", listings: 85, views: 350, inquiries: 35 },
    { month: "Dec", listings: 68, views: 270, inquiries: 27 },
  ];

  const dataWeekly = [
    { day: "Mon", listings: 12, views: 45, inquiries: 5 },
    { day: "Tue", listings: 15, views: 52, inquiries: 6 },
    { day: "Wed", listings: 18, views: 58, inquiries: 7 },
    { day: "Thu", listings: 16, views: 50, inquiries: 5 },
    { day: "Fri", listings: 14, views: 48, inquiries: 4 },
    { day: "Sat", listings: 10, views: 40, inquiries: 3 },
    { day: "Sun", listings: 8, views: 35, inquiries: 2 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("overview")}</CardTitle>
        <CardDescription>{t("viewRealEstateMetrics")}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <Tabs defaultValue="monthly">
          <TabsList className="mb-6 grid max-w-xs grid-cols-2">
            <TabsTrigger value="monthly">{t("monthly")}</TabsTrigger>
            <TabsTrigger value="weekly">{t("weekly")}</TabsTrigger>
          </TabsList>

          {/* Monthly Tab */}
          <TabsContent value="monthly">
            <ResponsiveContainer width="100%" height={360}>
              <BarChart data={dataMonthly}>
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Bar
                  dataKey="listings"
                  name={t("newListings")}
                  fill="#6366f1"
                />
                <Bar dataKey="views" name={t("propertyViews")} fill="#22c55e" />
                <Bar dataKey="inquiries" name={t("inquiries")} fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          {/* Weekly Tab */}
          <TabsContent value="weekly">
            <ResponsiveContainer width="100%" height={360}>
              <BarChart data={dataWeekly}>
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Bar
                  dataKey="listings"
                  name={t("newListings")}
                  fill="#6366f1"
                />
                <Bar dataKey="views" name={t("propertyViews")} fill="#22c55e" />
                <Bar dataKey="inquiries" name={t("inquiries")} fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
