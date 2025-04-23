"use client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import Image from "next/image";
import PropertyBrowser from "@/components/property-browser";
import HeroSection from "@/components/HeroSection";
import StatisticsSection from "@/components/stats";
import FeaturesSection from "@/components/FeaturesSection";
import PremiumServicesSection from "@/components/PremiumServicesSection";

export default function Home() {
  const { locale } = useParams();
  const t = useTranslations();
  const isRtl = locale === "ar";

  const features = [
    {
      title: t("landing.features.qualityProperties"),
      description: t("landing.features.qualityPropertiesDesc"),
      icon: "🏠",
    },
    {
      title: t("landing.features.expertAgents"),
      description: t("landing.features.expertAgentsDesc"),
      icon: "👨‍💼",
    },
    {
      title: t("landing.features.easySearch"),
      description: t("landing.features.easySearchDesc"),
      icon: "🔍",
    },
    {
      title: t("landing.features.secureTransactions"),
      description: t("landing.features.secureTransactionsDesc"),
      icon: "🔒",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      <StatisticsSection />

      <FeaturesSection />

      <PremiumServicesSection />

      {/* Features Section */}
      <section className="py-20 ">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t("landing.features.title")}
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition hover:border-teal-500 border border-transparent"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <PropertyBrowser />
        </div>
      </section>

      <Footer />
    </div>
  );
}
