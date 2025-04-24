"use client";
import { useTranslations } from "next-intl";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import LanguageSwitcher from "@/components/language-switcher";

export default function Navbar() {
  const { locale } = useParams();
  const pathname = usePathname();
  const t = useTranslations();
  const isRtl = locale === "ar";

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.service"), href: "/service" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              <img src="/realLogo.png" alt="RealEstate" width={100} />
            </Link>
          </div>

          <div className="hidden md:flex rtl:gap-4 items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`hover:text-blue-600 ${
                  pathname === link.href
                    ? "text-blue-600 font-medium"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex rtl:gap-4 items-center space-x-4  ">
            <Link
              href="/sign-in"
              className="px-4 py-2 bg-teal-700 text-white hover:bg-teal-800 rounded-md"
            >
              {t("nav.signIn")}
            </Link>
            <Link
              href="/sign-up"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {t("nav.signUp")}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
