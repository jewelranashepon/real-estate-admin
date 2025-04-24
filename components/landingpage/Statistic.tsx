"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

const stats = [
  { id: 1, name: "stats.propertiesListed", value: "10000", suffix: "+" },
  { id: 2, name: "stats.happyClients", value: "5000", suffix: "+" },
  { id: 3, name: "stats.yearsExperience", value: "15", suffix: "+" },
  { id: 4, name: "stats.awardsWon", value: "24", suffix: "" },
];

// CountUp component
const CountUp = ({ end }: { end: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1200;
    const increment = Math.max(1, Math.ceil(end / (duration / 16)));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, inView]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const StatCard = ({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
  index: number;
}) => {
  const t = useTranslations();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="flex flex-col items-center"
    >
      <div className="relative">
        <motion.div
          className="absolute -inset-4 bg-slate-700/30 rounded-xl blur-md"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        />
        <div className="relative bg-slate-800 p-8 rounded-lg shadow-xl border border-slate-700/50 hover:border-teal-400/30 transition-all duration-300 group">
          <div className="flex items-baseline space-x-2">
            <motion.p
              className="text-4xl font-bold text-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <CountUp end={parseInt(stat.value)} />
              {stat.suffix}
            </motion.p>
          </div>
          <motion.p
            className="mt-2 text-slate-300 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t(stat.name)}
          </motion.p>
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default function StatisticsSection() {
  const t = useTranslations();

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
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
