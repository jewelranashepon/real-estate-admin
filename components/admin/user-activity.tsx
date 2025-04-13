"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Line,
  LineChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTranslations } from "next-intl"

export function UserActivity() {
  const t =useTranslations('dashboard')
  // Mock data for the charts
  const activityData = [
    { name: "Mon", users: 120, sessions: 180, pageViews: 450 },
    { name: "Tue", users: 132, sessions: 195, pageViews: 480 },
    { name: "Wed", users: 145, sessions: 210, pageViews: 520 },
    { name: "Thu", users: 160, sessions: 230, pageViews: 550 },
    { name: "Fri", users: 175, sessions: 245, pageViews: 580 },
    { name: "Sat", users: 190, sessions: 260, pageViews: 610 },
    { name: "Sun", users: 205, sessions: 275, pageViews: 640 },
  ]

  // Mock data for user sources
  const sourceData = [
    { name: "Direct", value: 35 },
    { name: "Organic Search", value: 25 },
    { name: "Social Media", value: 20 },
    { name: "Referral", value: 15 },
    { name: "Email", value: 5 },
  ]

  // Mock data for active users
  const activeUsers = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      lastActive: "2 minutes ago",
      sessions: 28,
      avgDuration: "12m 30s",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      lastActive: "15 minutes ago",
      sessions: 24,
      avgDuration: "10m 45s",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.b@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      lastActive: "32 minutes ago",
      sessions: 22,
      avgDuration: "9m 20s",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.d@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      lastActive: "1 hour ago",
      sessions: 20,
      avgDuration: "8m 15s",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.w@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      lastActive: "2 hours ago",
      sessions: 18,
      avgDuration: "7m 50s",
    },
  ]

  // Colors for the pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>{t('userActivity')}</CardTitle>
          <CardDescription>{t('dailyUserActivityMetrics')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" name="Active Users" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="sessions" name="Sessions" stroke="#82ca9d" />
              <Line type="monotone" dataKey="pageViews" name="Page Views" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('userSources')}</CardTitle>
          <CardDescription>{t('userSourcesDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {sourceData.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-sm">
                  {entry.name}: {entry.value}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('mostActiveUsers')}</CardTitle>
          <CardDescription>{t('mostActiveUsersDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('user')}</TableHead>
                <TableHead>{t('lastActive')}</TableHead>
                <TableHead className="text-right">{t('sessions')}</TableHead>
                <TableHead className="text-right">{t('avgDuration')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell className="text-right">{user.sessions}</TableCell>
                  <TableCell className="text-right">{user.avgDuration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

