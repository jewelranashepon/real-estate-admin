"use client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Navbar from "@/components/landingpage/navbar";
import Footer from "@/components/landingpage/footer";
import { motion } from "framer-motion";
import Image from "next/image";
import PropertyBrowser from "@/components/landingpage/property-browser";
import HeroSection from "@/components/landingpage/HeroSection";

import PremiumServicesSection from "@/components/landingpage/PremiumServicesSection";
import StatisticsSection from "@/components/landingpage/Statistic";
import FeaturesSection from "@/components/landingpage/FeaturesSection";

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
    <div dir={isRtl ? "rtl" : "ltr"}>
      <Navbar />
      <div className="mt-16"></div>
      {/* Hero Section */}
      <HeroSection />

      <StatisticsSection />

      <div className="w-full h-[2px] bg-green-900"></div>
      <div id="features">
        <FeaturesSection />
      </div>

      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <PropertyBrowser />
        </div>
      </section>

      <PremiumServicesSection />

      <Footer />
    </div>
  );
}
