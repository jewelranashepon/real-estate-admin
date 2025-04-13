"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
} from "recharts";

export function MarketTrends() {
  const t = useTranslations("dashboard");
  const [timeframe, setTimeframe] = useState("1year");
  const [region, setRegion] = useState("all");

  const priceTrends = {
    "1year": [
      { name: "Jan", apartment: 350000, house: 550000, condo: 280000 },
      { name: "Feb", apartment: 360000, house: 565000, condo: 290000 },
      { name: "Mar", apartment: 370000, house: 580000, condo: 300000 },
      { name: "Apr", apartment: 380000, house: 590000, condo: 310000 },
      { name: "May", apartment: 390000, house: 600000, condo: 320000 },
      { name: "Jun", apartment: 400000, house: 610000, condo: 330000 },
      { name: "Jul", apartment: 410000, house: 620000, condo: 340000 },
      { name: "Aug", apartment: 420000, house: 630000, condo: 350000 },
      { name: "Sep", apartment: 430000, house: 640000, condo: 360000 },
      { name: "Oct", apartment: 440000, house: 650000, condo: 370000 },
      { name: "Nov", apartment: 450000, house: 660000, condo: 380000 },
      { name: "Dec", apartment: 460000, house: 670000, condo: 390000 },
    ],
    "6months": [
      { name: "Jul", apartment: 410000, house: 620000, condo: 340000 },
      { name: "Aug", apartment: 420000, house: 630000, condo: 350000 },
      { name: "Sep", apartment: 430000, house: 640000, condo: 360000 },
      { name: "Oct", apartment: 440000, house: 650000, condo: 370000 },
      { name: "Nov", apartment: 450000, house: 660000, condo: 380000 },
      { name: "Dec", apartment: 460000, house: 670000, condo: 390000 },
    ],
    "3months": [
      { name: "Oct", apartment: 440000, house: 650000, condo: 370000 },
      { name: "Nov", apartment: 450000, house: 660000, condo: 380000 },
      { name: "Dec", apartment: 460000, house: 670000, condo: 390000 },
    ],
  };

  const demandSupply = [
    { name: "Downtown", demand: 90, supply: 70 },
    { name: "Suburbs", demand: 75, supply: 85 },
    { name: "Waterfront", demand: 95, supply: 60 },
    { name: "Historic", demand: 80, supply: 68 },
    { name: "Business", demand: 88, supply: 72 },
  ];

  const insights = [
    {
      title: t("priceGrowth"),
      text: "Prices grew by 8.5% this year. The waterfront area saw the sharpest rise at 12.3%.",
    },
    {
      title: t("inventoryLevels"),
      text: "Inventory dropped by 15% from last year, leading to competitive bidding in urban zones.",
    },
    {
      title: t("daysOnMarket"),
      text: "Average days on market dropped to 28 days, 20% faster than the previous year.",
    },
    {
      title: t("interestRates"),
      text: "Mortgage interest rates are stable at 6.5%, slightly reducing affordability for new buyers.",
    },
    {
      title: t("forecast"),
      text: "Analysts predict 4–6% growth over the next year with slower demand in luxury segments.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Line Chart */}
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <CardTitle>{t("priceTrends")}</CardTitle>
            <CardDescription>{t("averagePricesOverTime")}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1year">{t("last12Months")}</SelectItem>
                <SelectItem value="6months">{t("last6Months")}</SelectItem>
                <SelectItem value="3months">{t("last3Months")}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("allRegions")}</SelectItem>
                <SelectItem value="downtown">{t("downtown")}</SelectItem>
                <SelectItem value="suburbs">{t("suburbs")}</SelectItem>
                <SelectItem value="waterfront">{t("waterfront")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={360}>
            <LineChart
              data={priceTrends[timeframe as keyof typeof priceTrends]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="apartment"
                stroke="#6366f1"
                name="Apartments"
              />
              <Line
                type="monotone"
                dataKey="house"
                stroke="#22c55e"
                name="Houses"
              />
              <Line
                type="monotone"
                dataKey="condo"
                stroke="#f59e0b"
                name="Condos"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t("supplyVsDemand")}</CardTitle>
          <CardDescription>{t("marketDemandSupply")}</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={demandSupply}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="demand" fill="#3b82f6" name="Demand" />
              <Bar dataKey="supply" fill="#10b981" name="Supply" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>{t("marketInsights")}</CardTitle>
          <CardDescription>{t("currentTrends")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 pt-2">
          {insights.map((item, idx) => (
            <div key={idx}>
              <h4 className="text-md font-semibold">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
