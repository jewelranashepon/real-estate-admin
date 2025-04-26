"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/landingpage/navbar";
import Footer from "@/components/landingpage/footer";

export default function ContactPage() {
  const { locale } = useParams();
  const t = useTranslations("contact");
  const isRtl = locale === "ar";

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
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
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-gray-900">
      <Navbar />

      <motion.main
        initial="hidden"
        animate="visible"
        variants={container}
        className="container mx-auto px-4 py-12"
      >
        <motion.h1
          variants={item}
          className="text-3xl font-bold text-center mb-8 text-white"
        >
          {t("title")}
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            variants={item}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4 text-white">
              {t("formTitle")}
            </h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1 text-gray-300">
                  {t("form.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-700 text-white"
                  placeholder={t("form.namePlaceholder")}
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-1 text-gray-300">
                  {t("form.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-700 text-white"
                  placeholder={t("form.emailPlaceholder")}
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-1 text-gray-300">
                  {t("form.message")}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-700 text-white"
                  placeholder={t("form.messagePlaceholder")}
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors w-full"
              >
                {t("form.submitButton")}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={item}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4 text-white">
              {t("contactInfo.title")}
            </h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="font-medium text-white">
                  {t("contactInfo.addressTitle")}
                </h3>
                <p>{t("contactInfo.address")}</p>
              </div>

              <div>
                <h3 className="font-medium text-white">
                  {t("contactInfo.phoneTitle")}
                </h3>
                <p>+1 (123) 456-7890</p>
              </div>

              <div>
                <h3 className="font-medium text-white">
                  {t("contactInfo.emailTitle")}
                </h3>
                <p>contact@realestate.com</p>
              </div>

              <div>
                <h3 className="font-medium text-white">
                  {t("contactInfo.hoursTitle")}
                </h3>
                <p>{t("contactInfo.hours")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.main>

      <Footer />
    </div>
  );
}
