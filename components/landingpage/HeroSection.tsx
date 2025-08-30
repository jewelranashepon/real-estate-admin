"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const t = useTranslations();
  const router = useRouter();

  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <Image
          src="/herobanner.jpg"
          alt="Amman Skyline"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-black/70 "></div>
      </div>

      <motion.div
        className="relative z-10 h-full flex flex-col justify-center items-center text-white px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto text-center">
          <motion.div
            className="mb-8"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              <span className="block text-teal-300">
                {t("landing.hero.YGT")}
              </span>
              <span className="block">{t("landing.hero.SFP")}</span>
            </h1>
            <motion.p
              className="text-xl md:text-2xl max-w-3xl mx-auto mt-6"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {t("landing.hero.subtitle")}
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/listings")}
              className="bg-gradient-to-r from-teal-600 to-teal-400 text-white px-8 py-4 rounded-lg font-medium hover:from-teal-700 hover:to-teal-500 transition-all shadow-lg text-lg"
            >
              {t("landing.hero.ctaPrimary")}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const el = document.getElementById("features");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-teal-600 transition-all text-lg"
            >
              {t("landing.hero.ctaSecondary")}
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          onClick={() => {
            const el = document.getElementById("features");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <svg
            className="w-10 h-10 text-white animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
