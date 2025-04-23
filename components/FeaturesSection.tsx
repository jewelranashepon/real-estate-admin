"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

const cardHover = {
  y: -10,
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
  transition: {
    duration: 0.3,
    ease: "easeInOut",
  },
};

export default function FeaturesSection() {
  const t = useTranslations();

  const features = [
    {
      icon: "🏙️",
      title: t("features.urban.title"),
      description: t("features.urban.description"),
    },
    {
      icon: "🔑",
      title: t("features.instant.title"),
      description: t("features.instant.description"),
    },
    {
      icon: "📊",
      title: t("features.analytics.title"),
      description: t("features.analytics.description"),
    },
    {
      icon: "🛡️",
      title: t("features.security.title"),
      description: t("features.security.description"),
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Diamond Grid Background */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/diamond-grid.svg')] bg-[size:60px_60px]"></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900/5 via-teal-900/5 to-slate-900/5"></div>

      {/* Animated Blobs */}
      <motion.div
        className="absolute -left-40 top-1/3 w-96 h-96 rounded-full bg-teal-500/5 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      />
      <motion.div
        className="absolute -right-40 bottom-1/4 w-96 h-96 rounded-full bg-slate-700/5 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1.5 }}
        viewport={{ once: true }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            {t("features.title")}
          </h2>
          <motion.p
            className="max-w-2xl mx-auto text-lg text-slate-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {t("features.subtitle")}
          </motion.p>
        </motion.div>

        {/* Features grid */}
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
              whileHover={cardHover}
              className="relative group"
            >
              {/* Card glow effect */}
              <motion.div
                className="absolute -inset-2 bg-teal-400/10 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              />

              {/* Feature card */}
              <div className="relative h-full bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-slate-200/80 hover:border-teal-300/50 transition-all duration-300">
                <motion.div
                  className="text-5xl mb-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {feature.icon}
                </motion.div>
                <motion.h3
                  className="text-xl font-semibold text-slate-800 mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p
                  className="text-slate-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {feature.description}
                </motion.p>

                {/* Hover underline */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
