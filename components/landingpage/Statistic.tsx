"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function StatisticsSection() {
  const t = useTranslations();

  const stats = [
    {
      id: 1,
      name: "stats.propertiesListed",
      value: "stats.propertiesListedValue",
      suffix: "+",
    },
    {
      id: 2,
      name: "stats.happyClients",
      value: "stats.happyClientsValue",
      suffix: "+",
    },
    {
      id: 3,
      name: "stats.yearsExperience",
      value: "stats.yearsExperienceValue",
      suffix: "+",
    },
    {
      id: 4,
      name: "stats.awardsWon",
      value: "stats.awardsWonValue",
      suffix: "",
    },
  ];

  return (
    <section className="relative py-24 bg-slate-900 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {t("stats.title")}
          </h2>
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-lg text-slate-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {t("stats.subtitle")}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="bg-slate-800 p-8 rounded-lg shadow-xl border border-slate-700/50 hover:border-teal-400/30 transition-all duration-300 group relative">
                <p className="text-4xl font-bold text-white">
                  {t.raw(stat.value)}
                  {stat.suffix}
                </p>
                <p className="mt-2 text-slate-300 text-lg">{t(stat.name)}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
