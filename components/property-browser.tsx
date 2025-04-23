"use client";
import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Property = {
  id: number;
  title: string;
  type: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  area: number;
  falCertified: boolean;
  thumbnail: string;
  image: string;
};

export default function PropertyBrowser() {
  const { locale } = useParams();
  const t = useTranslations("properties");
  const searchT = useTranslations('app')
  const isRtl = locale === "ar";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  const properties: Property[] = [
    {
      id: 1,
      title: t("sampleProperties.0.title"),
      type: t("types.villa"),
      price: "AED 3,200,000",
      location: t("sampleProperties.0.location"),
      beds: 4,
      baths: 3,
      area: 2200,
      falCertified: true,
      thumbnail: "/sa1.jpg",
      image: "/sa1.jpg",
    },
    {
      id: 2,
      title: t("sampleProperties.1.title"),
      type: t("types.apartment"),
      price: "AED 1,850,000",
      location: t("sampleProperties.1.location"),
      beds: 2,
      baths: 2,
      area: 1200,
      falCertified: false,
      thumbnail: "/sa2.jpg",
      image: "/sa2.jpg",
    },
    {
      id: 3,
      title: t("sampleProperties.2.title"),
      type: t("types.penthouse"),
      price: "AED 4,750,000",
      location: t("sampleProperties.2.location"),
      beds: 3,
      baths: 3,
      area: 2800,
      falCertified: true,
      thumbnail: "/sa3.webp",
      image: "/sa3.webp",
    },
    {
      id: 4,
      title: t("sampleProperties.3.title"),
      type: t("types.townhouse"),
      price: "AED 2,300,000",
      location: t("sampleProperties.3.location"),
      beds: 3,
      baths: 2,
      area: 1800,
      falCertified: true,
      thumbnail: "/sa4.jpeg",
      image: "/sa4.jpeg",
    },
    {
      id: 5,
      title: t("sampleProperties.4.title"),
      type: t("types.villa"),
      price: "AED 5,500,000",
      location: t("sampleProperties.4.location"),
      beds: 5,
      baths: 4,
      area: 3200,
      falCertified: false,
      thumbnail: "/sa5.jpg",
      image: "/sa5.jpg",
    },
  ];

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        property.title.toLowerCase().includes(searchLower) ||
        property.location.toLowerCase().includes(searchLower) ||
        property.type.toLowerCase().includes(searchLower) ||
        property.price.toLowerCase().includes(searchLower)
      );
    });
  }, [properties, searchTerm]);

  useMemo(() => {
    if (
      filteredProperties.length > 0 &&
      (!selectedProperty ||
        !filteredProperties.some((p) => p.id === selectedProperty.id))
    ) {
      setSelectedProperty(filteredProperties[0]);
    } else if (filteredProperties.length === 0) {
      setSelectedProperty(null);
    }
  }, [filteredProperties, selectedProperty]);

  // Animation variants
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
        ease: "easeOut",
      },
    },
  };

  const cardHover = {
    scale: 1.02,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  };

  const imageHover = {
    scale: 1.05,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  };

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="flex flex-col lg:flex-row h-screen bg-gray-900 text-gray-100"
    >
      {/* Property List (Left Column) */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/3 overflow-y-auto p-6 border-r border-gray-800 bg-gray-900"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-bold mb-6 text-teal-400">
            {t("availableProperties")}
          </h2>

          {/* Search Input */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder={searchT("search.placeholder") || "Search properties..."}
                className="w-full p-3 pl-10 rounded-lg bg-gray-800 border border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-white transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </motion.div>

          <motion.div variants={containerVariants} className="space-y-4">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <motion.div
                  key={property.id}
                  variants={itemVariants}
                  whileHover={cardHover}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    selectedProperty?.id === property.id
                      ? "bg-gray-800 shadow-lg border-l-4 border-teal-500"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                  onClick={() => setSelectedProperty(property)}
                >
                  <div className="flex gap-4">
                    <motion.div
                      className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden"
                      whileHover={imageHover}
                    >
                      <Image
                        src={property.thumbnail}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-white">
                        {property.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {property.location}
                      </p>
                      <div className="flex items-center mt-2">
                        <span className="text-teal-400 font-semibold">
                          {property.price}
                        </span>
                        {property.falCertified && (
                          <span className="ml-2 bg-teal-900 text-teal-300 text-xs px-2 py-1 rounded">
                            {t("falCertified")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                variants={itemVariants}
                className="text-center py-8 text-gray-500"
              >
                {searchT("search.noResults") || "No properties found"}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Property Detail (Right Column) */}
      <div className="w-full lg:w-2/3 overflow-y-auto bg-gray-900">
        <AnimatePresence mode="wait">
          {selectedProperty ? (
            <motion.div
              key={selectedProperty.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto p-6"
            >
              <motion.div
                className="relative w-full h-96 rounded-xl overflow-hidden mb-8"
                whileHover={imageHover}
              >
                <Image
                  src={selectedProperty.image}
                  alt={selectedProperty.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="md:col-span-2">
                  <motion.h1
                    className="text-3xl font-bold mb-2 text-white"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {selectedProperty.title}
                  </motion.h1>
                  <motion.p
                    className="text-gray-400 mb-6 flex items-center"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <svg
                      className="w-5 h-5 mr-2 text-teal-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {selectedProperty.location}
                  </motion.p>

                  <motion.div
                    className="flex items-center space-x-6 mb-8"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center text-gray-300">
                      <svg
                        className="w-5 h-5 mr-2 text-teal-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      <span>{selectedProperty.type}</span>
                    </div>
                    {selectedProperty.falCertified && (
                      <div className="bg-teal-900/50 text-teal-300 px-3 py-1 rounded-full text-sm flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {t("falCertified")}
                      </div>
                    )}
                  </motion.div>

                  <motion.p
                    className="text-gray-300 mb-8 leading-relaxed"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {t("sampleDescription")}
                  </motion.p>
                </div>

                <motion.div
                  className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {t("pricing.title")}
                  </h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-400">
                        {t("pricing.price")}
                      </span>
                      <span className="font-semibold text-teal-400">
                        {selectedProperty.price}
                      </span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-400">{t("pricing.type")}</span>
                      <span className="text-gray-300">
                        {selectedProperty.type}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg font-medium transition shadow-lg"
                  >
                    {t("proceedButton")}
                  </motion.button>
                </motion.div>
              </div>

              <motion.div
                className="grid grid-cols-3 gap-4 mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700 hover:border-teal-500 transition"
                >
                  <div className="text-teal-400 mb-2 text-2xl">🛏️</div>
                  <div className="text-gray-300">
                    <span className="font-medium text-white">
                      {selectedProperty.beds}
                    </span>{" "}
                    {t("details.beds")}
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700 hover:border-teal-500 transition"
                >
                  <div className="text-teal-400 mb-2 text-2xl">🚿</div>
                  <div className="text-gray-300">
                    <span className="font-medium text-white">
                      {selectedProperty.baths}
                    </span>{" "}
                    {t("details.baths")}
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700 hover:border-teal-500 transition"
                >
                  <div className="text-teal-400 mb-2 text-2xl">📐</div>
                  <div className="text-gray-300">
                    <span className="font-medium text-white">
                      {selectedProperty.area}
                    </span>{" "}
                    {t("details.area")}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="no-property"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 text-gray-500"
            >
              {t("search.noResults") || "No property selected"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
