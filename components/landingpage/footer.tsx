"use client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Footer() {
  const { locale } = useParams();
  const t = useTranslations("footer");
  const isRtl = locale === "ar";

  const quickLinks = [
    { name: "home", href: "/" },
    { name: "properties", href: "/properties" },
    { name: "agents", href: "/agents" },
    { name: "about", href: "/about" },
    { name: "contact", href: "/contact" },
  ];

  return (
    <footer
      className="bg-gray-800 text-white py-12"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t("about.title")}</h3>
            <p className="mb-4">{t("about.description")}</p>
            <div className="flex space-x-4">
              <Link href="/" className="text-blue-500 hover:text-blue-300">
                <img src="/realLogo.png" alt="Logo" />
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t("links.title")}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-blue-300 transition"
                  >
                    {t(`links.${link.name}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t("contact.title")}</h3>
            <address className="not-italic">
              <p className="mb-2">{t("contact.address")}</p>
              <p className="mb-2">
                <Link href="tel:+97141234567" className="hover:text-blue-300">
                  {t("contact.phone")}
                </Link>
              </p>
              <p>
                <Link
                  href="mailto:info@realestate.com"
                  className="hover:text-blue-300"
                >
                  {t("contact.email")}
                </Link>
              </p>
            </address>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {t("newsletter.title")}
            </h3>
            <p className="mb-4">{t("newsletter.description")}</p>
            <form className="flex">
              <input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="px-4 py-2 rounded-l text-gray-800 w-full"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 rounded-r hover:bg-blue-700"
              >
                {t("newsletter.button")}
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
