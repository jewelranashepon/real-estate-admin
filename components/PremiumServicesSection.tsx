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
  y: -8,
  scale: 1.02,
  boxShadow:
    "0 20px 25px -5px rgba(5, 242, 191, 0.1), 0 10px 10px -5px rgba(5, 242, 191, 0.04)",
  transition: {
    duration: 0.3,
    ease: "easeInOut",
  },
};

export default function PremiumServicesSection() {
  const t = useTranslations();

  const services = [
    {
      icon: "🌆",
      title: t("services.urban.title"),
      description: t("services.urban.description"),
    },
    {
      icon: "🔑",
      title: t("services.instant.title"),
      description: t("services.instant.description"),
    },
    {
      icon: "📈",
      title: t("services.analytics.title"),
      description: t("services.analytics.description"),
    },
    {
      icon: "🛡️",
      title: t("services.security.title"),
      description: t("services.security.description"),
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-500 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-teal-500/5 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      />
      <motion.div
        className="absolute bottom-1/3 -right-20 w-96 h-96 rounded-full bg-slate-700/5 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1.5 }}
        viewport={{ once: true }}
      />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('/grid-pattern.svg')] bg-[size:60px_60px]"></div>

      <div className="relative container mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t("services.title")}
          </motion.h2>
          <motion.p
            className="max-w-2xl mx-auto text-lg text-slate-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {t("services.subtitle")}
          </motion.p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={cardHover}
              className="relative group"
            >
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-2 bg-teal-400/10 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              />

              {/* Service card */}
              <div className="relative h-full bg-slate-800/70 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50 hover:border-teal-400/30 transition-all duration-300">
                <motion.div
                  className="text-5xl mb-6 text-teal-400"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {service.icon}
                </motion.div>
                <motion.h3
                  className="text-xl font-semibold text-white mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {service.title}
                </motion.h3>
                <motion.p
                  className="text-slate-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {service.description}
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
