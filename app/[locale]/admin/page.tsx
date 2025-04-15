import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "@/components/admin/overview";
import { RecentProperties } from "@/components/admin/recent-properties";
import { DashboardStats } from "@/components/admin/dashboard-stats";
import {
  getDashboardStats,
  getRecentProperties,
  getProperties,
  getPropertyTypes,
  getPropertyStatuses,
  getRecentBlogs,
} from "@/lib/actions";
import { FeaturedProperties } from "@/components/admin/featured-properties";
import { getTranslations } from "next-intl/server";
import { RecentBlogs } from "@/components/admin/recent-blogs";

export const metadata: Metadata = {
  title: "Dashboard | Real Estate Admin",
  description: "Admin dashboard for real estate management",
};

export default async function DashboardPage() {
  const t = await getTranslations("dashboard");
  const [stats, recentProperties, allProperties, recentBlogs] =
    await Promise.all([
      getDashboardStats(),
      getRecentProperties(5),
      getProperties(),
      getRecentBlogs(4),
    ]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">{t("db")}</h1>

      <DashboardStats stats={stats} />

      <FeaturedProperties properties={allProperties} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 w-full">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>{t("propertyOverview")}</CardTitle>
            <CardDescription>{t("distributionByTypeStatus")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Overview stats={stats} />
          </CardContent>
        </Card>
        <Card className="col-span-4 md:col-span-3">
          <CardHeader>
            <CardTitle>{t("propertyStatus")}</CardTitle>
            <CardDescription>{t("recentlyAddedOrUpdated")}</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentProperties properties={recentProperties} />
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="">
          <CardHeader>
            <CardTitle>Recent Blogs</CardTitle>
            <CardDescription>Last 4 blog posts</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentBlogs blogs={recentBlogs} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
