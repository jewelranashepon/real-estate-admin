"use client"

import { useTranslations } from "next-intl"
import { useIsMobile } from "@/hooks/use-mobile"
import MobileListingsView from "@/components/home/mobile-listings-view"
import DesktopListingsView from "@/components/home/desktop-listings-view"

export default function ListingsPage() {
  const t = useTranslations("app")
  const isMobile = useIsMobile()

  return isMobile ? <MobileListingsView /> : <DesktopListingsView />
}

