"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function PropertyPerformance() {
  const t = useTranslations("dashboard");
  const [filter, setFilter] = useState("all");

  const trendData = [
    { label: "Week 1", apt: 120, house: 90, condo: 70, villa: 40, town: 60 },
    { label: "Week 2", apt: 130, house: 85, condo: 75, villa: 45, town: 65 },
    { label: "Week 3", apt: 145, house: 95, condo: 80, villa: 50, town: 70 },
    { label: "Week 4", apt: 160, house: 100, condo: 85, villa: 55, town: 75 },
    { label: "Week 5", apt: 175, house: 110, condo: 90, villa: 60, town: 80 },
    { label: "Week 6", apt: 190, house: 120, condo: 95, villa: 65, town: 85 },
    { label: "Week 7", apt: 205, house: 130, condo: 100, villa: 70, town: 90 },
    { label: "Week 8", apt: 220, house: 140, condo: 105, villa: 75, town: 95 },
  ];

  const topList = [
    {
      id: 1,
      title: "Urban Apartment View",
      category: "Apartment",
      views: 1250,
      inquiries: 45,
      rate: "3.6%",
    },
    {
      id: 2,
      title: "Seaside Villa Luxe",
      category: "Villa",
      views: 980,
      inquiries: 38,
      rate: "3.9%",
    },
    {
      id: 3,
      title: "Suburban Family Home",
      category: "House",
      views: 870,
      inquiries: 32,
      rate: "3.7%",
    },
    {
      id: 4,
      title: "Modern Waterfront Condo",
      category: "Condo",
      views: 760,
      inquiries: 29,
      rate: "3.8%",
    },
    {
      id: 5,
      title: "Downtown Townhouse",
      category: "Townhouse",
      views: 650,
      inquiries: 24,
      rate: "3.7%",
    },
  ];

  const conversion = [
    { label: t("apartments"), percent: "3.6%", width: "72%" },
    { label: t("houses"), percent: "3.9%", width: "78%" },
    { label: t("condos"), percent: "3.8%", width: "76%" },
    { label: t("villas"), percent: "4.1%", width: "82%" },
    { label: t("townhouses"), percent: "3.7%", width: "74%" },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Line Chart */}
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>{t("propertyViewsByType")}</CardTitle>
            <CardDescription>{t("weeklyViewsBreakdown")}</CardDescription>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("allTypes")}</SelectItem>
              <SelectItem value="apt">{t("apartments")}</SelectItem>
              <SelectItem value="house">{t("houses")}</SelectItem>
              <SelectItem value="condo">{t("condos")}</SelectItem>
              <SelectItem value="villa">{t("villas")}</SelectItem>
              <SelectItem value="town">{t("townhouses")}</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              {(filter === "all" || filter === "apt") && (
                <Line
                  type="monotone"
                  dataKey="apt"
                  name={t("apartments")}
                  stroke="#6366f1"
                />
              )}
              {(filter === "all" || filter === "house") && (
                <Line
                  type="monotone"
                  dataKey="house"
                  name={t("houses")}
                  stroke="#22c55e"
                />
              )}
              {(filter === "all" || filter === "condo") && (
                <Line
                  type="monotone"
                  dataKey="condo"
                  name={t("condos")}
                  stroke="#facc15"
                />
              )}
              {(filter === "all" || filter === "villa") && (
                <Line
                  type="monotone"
                  dataKey="villa"
                  name={t("villas")}
                  stroke="#f97316"
                />
              )}
              {(filter === "all" || filter === "town") && (
                <Line
                  type="monotone"
                  dataKey="town"
                  name={t("townhouses")}
                  stroke="#0ea5e9"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Properties Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t("topPerformingProperties")}</CardTitle>
          <CardDescription>{t("topPerformingDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("property")}</TableHead>
                <TableHead>{t("type")}</TableHead>
                <TableHead className="text-right">{t("views")}</TableHead>
                <TableHead className="text-right">{t("inquiries")}</TableHead>
                <TableHead className="text-right">{t("conversion")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topList.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{item.views}</TableCell>
                  <TableCell className="text-right">{item.inquiries}</TableCell>
                  <TableCell className="text-right">{item.rate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Conversion Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>{t("conversionMetrics")}</CardTitle>
          <CardDescription>{t("conversionRates")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {conversion.map((item, idx) => (
            <div className="space-y-2" key={idx}>
              <div className="flex justify-between text-sm font-medium">
                <span>{item.label}</span>
                <span className="text-muted-foreground">{item.percent}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: item.width }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
