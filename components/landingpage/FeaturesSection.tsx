"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function FeaturesSection() {
  const t = useTranslations("landingPage.FeaturesSection");
  const [activeFeature, setActiveFeature] = useState(0);

  // Feature data from translations
  const features = [
    {
      icon: "🔍",
      title: t("features.0.title"),
      description: t("features.0.description"),
      image: "/dt4.jpg",
    },
    {
      icon: "📱",
      title: t("features.1.title"),
      description: t("features.1.description"),
      image: "/dt5.webp",
    },
    {
      icon: "📊",
      title: t("features.2.title"),
      description: t("features.2.description"),
      image: "/downtown2.webp",
    },
    {
      icon: "🔐",
      title: t("features.3.title"),
      description: t("features.3.description"),
      image: "/downtown1.webp",
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-teal-800  via-[#133738] to-gray-700">
      {/* Background elements */}
      <motion.div
        className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-emerald-600/10 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      />
      <motion.div
        className="absolute -bottom-20 right-0 w-full h-96 rounded-full bg-emerald-950/20 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1.5 }}
        viewport={{ once: true }}
      />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block px-4 py-1 rounded-full bg-emerald-700/30 text-emerald-300 text-sm font-medium mb-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t("tagline")}
          </motion.span>
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t("title")}
          </motion.h2>
          <motion.div
            className="h-1 w-24 bg-amber-400 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          />
          <motion.p
            className="max-w-2xl mx-auto text-lg text-emerald-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        {/* Features display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Feature tabs - left side on desktop */}
          <motion.div
            className="lg:col-span-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`mb-6 cursor-pointer group`}
                onClick={() => setActiveFeature(index)}
              >
                <div
                  className={`relative p-6 rounded-xl transition-all duration-300 ${
                    activeFeature === index
                      ? "bg-white/10 border border-emerald-400/30 shadow-lg"
                      : "bg-emerald-900/50 hover:bg-white/5 border border-emerald-700/30"
                  }`}
                >
                  {/* Glow effect for active item */}
                  {activeFeature === index && (
                    <motion.div
                      className="absolute -inset-1 bg-emerald-400/10 rounded-xl blur-md z-0"
                      layoutId="featureHighlight"
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  <div className="relative z-10 flex items-start">
                    <div
                      className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full ${
                        activeFeature === index
                          ? "bg-amber-400 text-emerald-900"
                          : "bg-emerald-800 text-emerald-300"
                      } mr-4 text-xl transition-colors duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h3
                        className={`text-xl font-semibold mb-2 ${
                          activeFeature === index
                            ? "text-white"
                            : "text-emerald-100"
                        } transition-colors duration-300`}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={`${
                          activeFeature === index
                            ? "text-emerald-100"
                            : "text-emerald-200/70"
                        } transition-colors duration-300`}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Animated indicator for active tab */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg overflow-hidden">
                    {activeFeature === index && (
                      <motion.div
                        className="h-full w-full bg-amber-400"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature image - right side on desktop */}
          <motion.div
            className="lg:col-span-7 relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-emerald-700/30">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeFeature === index ? 1 : 0,
                    scale: activeFeature === index ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                    <span className="text-amber-400 font-semibold text-lg mb-1">
                      {feature.title}
                    </span>
                    <p className="text-emerald-100 text-sm max-w-md">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <motion.div
                  className="absolute top-4 right-4 w-24 h-24 border-t-2 border-r-2 border-amber-400/30 rounded-tr-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 w-24 h-24 border-b-2 border-l-2 border-amber-400/30 rounded-bl-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  viewport={{ once: true }}
                />
              </div>
            </div>

            {/* Interactive dot navigation */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {features.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    activeFeature === index ? "bg-amber-400" : "bg-emerald-700"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
