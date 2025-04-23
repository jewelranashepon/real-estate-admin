"use client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t("landing.hero.title")}
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t("landing.hero.subtitle")}
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition">
              {t("landing.hero.ctaPrimary")}
            </button>
            <button className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition">
              {t("landing.hero.ctaSecondary")}
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("landing.features.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Showcase */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("landing.properties.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Property cards would go here */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">
                  {t("landing.properties.sampleTitle")}
                </h3>
                <p className="text-gray-600 mt-2">
                  {t("landing.properties.sampleLocation")}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="font-bold text-lg">
                    {t("landing.properties.samplePrice")}
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    {t("landing.properties.viewButton")}
                  </button>
                </div>
              </div>
            </div>
            {/* Repeat similar property cards */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
