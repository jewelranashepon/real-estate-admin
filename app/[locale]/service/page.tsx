"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Navbar from "@/components/landingpage/navbar";
import Footer from "@/components/landingpage/footer";

export default function ServicesPage() {
  const { locale } = useParams();
  const t = useTranslations("Services");
  const isRtl = locale === "ar";

  // Chart data
  const serviceData = [
    { name: t("charts.property"), value: 35 },
    { name: t("charts.investment"), value: 25 },
    { name: t("charts.legal"), value: 20 },
    { name: t("charts.valuation"), value: 15 },
    { name: t("charts.relocation"), value: 5 },
  ];

  const performanceData = [
    { year: "2020", growth: 20 },
    { year: "2021", growth: 35 },
    { year: "2022", growth: 50 },
    { year: "2023", growth: 65 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        {/* Services Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-white mb-4">{t("title")}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Services Distribution Pie Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-xl p-6 shadow-lg mb-16"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">
            {t("charts.distributionTitle")}
          </h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {serviceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Performance Growth Bar Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 rounded-xl p-6 shadow-lg mb-16"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">
            {t("charts.growthTitle")}
          </h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={performanceData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                <XAxis dataKey="year" stroke="#e5e7eb" />
                <YAxis stroke="#e5e7eb" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderColor: "#374151",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="growth"
                  fill="#10b981"
                  name={t("charts.growthLabel")}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
