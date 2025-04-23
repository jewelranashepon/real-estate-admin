"use client";

import { useTranslations } from "next-intl";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export function UserActivity() {
  const t = useTranslations("dashboard");

  const activityStats = [
    { day: "Mon", users: 120, sessions: 180, views: 450 },
    { day: "Tue", users: 135, sessions: 190, views: 480 },
    { day: "Wed", users: 150, sessions: 205, views: 520 },
    { day: "Thu", users: 165, sessions: 225, views: 550 },
    { day: "Fri", users: 180, sessions: 240, views: 580 },
    { day: "Sat", users: 195, sessions: 260, views: 610 },
    { day: "Sun", users: 210, sessions: 275, views: 640 },
  ];

  const trafficSources = [
    { name: "مباشر", value: 34 }, // Direct
    { name: "عضوي", value: 26 }, // Organic
    { name: "شبكات التواصل", value: 20 }, // Social
    { name: "إحالة", value: 14 }, // Referral
    { name: "البريد الإلكتروني", value: 6 }, // Email
  ];

  const activeList = [
    {
      id: 1,
      name: "Emma Walker",
      email: "emma@domain.com",
      avatar: "/avatar1.png",
      lastSeen: "3m ago",
      sessions: 28,
      duration: "11m 50s",
    },
    {
      id: 2,
      name: "James Lee",
      email: "james@domain.com",
      avatar: "/avatar2.png",
      lastSeen: "18m ago",
      sessions: 24,
      duration: "10m 30s",
    },
    {
      id: 3,
      name: "Sophia King",
      email: "sophia@domain.com",
      avatar: "/avatar3.png",
      lastSeen: "35m ago",
      sessions: 21,
      duration: "9m 10s",
    },
    {
      id: 4,
      name: "Liam Scott",
      email: "liam@domain.com",
      avatar: "/avatar4.png",
      lastSeen: "1h ago",
      sessions: 20,
      duration: "8m 25s",
    },
    {
      id: 5,
      name: "Ava Brooks",
      email: "ava@domain.com",
      avatar: "/avatar5.png",
      lastSeen: "2h ago",
      sessions: 17,
      duration: "7m 45s",
    },
  ];

  const chartColors = ["#3b82f6", "#10b981", "#facc15", "#f97316", "#8b5cf6"];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Activity Chart */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>{t("userActivity")}</CardTitle>
          <CardDescription>{t("dailyUserActivityMetrics")}</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={activityStats}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#6366f1"
                name={t("activeUsers")}
              />
              <Line
                type="monotone"
                dataKey="sessions"
                stroke="#22c55e"
                name={t("sessions")}
              />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#f59e0b"
                name={t("pageViews")}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Source Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t("userSources")}</CardTitle>
          <CardDescription>{t("userSourcesDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={trafficSources}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {trafficSources.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {trafficSources.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: chartColors[index % chartColors.length],
                  }}
                />
                <span className="text-sm">
                  {entry.name}: {entry.value}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t("mostActiveUsers")}</CardTitle>
          <CardDescription>{t("mostActiveUsersDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("user")}</TableHead>
                <TableHead>{t("lastActive")}</TableHead>
                <TableHead className="text-right">{t("sessions")}</TableHead>
                <TableHead className="text-right">{t("avgDuration")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeList.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.lastSeen}</TableCell>
                  <TableCell className="text-right">{user.sessions}</TableCell>
                  <TableCell className="text-right">{user.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
