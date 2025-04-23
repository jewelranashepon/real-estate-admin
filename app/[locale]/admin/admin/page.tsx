"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminPage() {
  const { locale } = useParams();
  const t = useTranslations("adminPanel");
  const isRtl = locale === "ar";

  const pendingAgents = [
    {
      id: 1,
      name: "أحمد محمد",
      licenseNumber: "FAL-123456",
      phone: "0512345678",
      submittedAt: "منذ ساعتين",
    },
    {
      id: 2,
      name: "سارة عبدالله",
      licenseNumber: "FAL-789012",
      phone: "0587654321",
      submittedAt: "منذ 5 ساعات",
    },
    {
      id: 3,
      name: "خالد العمري",
      licenseNumber: "FAL-345678",
      phone: "0598765432",
      submittedAt: "منذ يوم",
    },
  ];

  const pendingProperties = [
    {
      id: 1,
      title: "فيلا في حي النرجس",
      agent: "محمد العتيبي",
      type: "فيلا",
      submittedAt: "منذ 3 ساعات",
    },
    {
      id: 2,
      title: "شقة في حي الملقا",
      agent: "فهد الدوسري",
      type: "شقة",
      submittedAt: "منذ 6 ساعات",
    },
  ];

  return (
    <div className="space-y-6" dir={isRtl ? "rtl" : "ltr"}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <Tabs defaultValue="approvals">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="approvals">{t("tabs.approvals")}</TabsTrigger>
          <TabsTrigger value="users">{t("tabs.users")}</TabsTrigger>
          <TabsTrigger value="settings">{t("tabs.settings")}</TabsTrigger>
        </TabsList>

        <TabsContent value="approvals" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("approvals.agentsTitle")}</CardTitle>
              <CardDescription>
                {t("approvals.agentsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("approvals.agentsTable.name")}</TableHead>
                    <TableHead>
                      {t("approvals.agentsTable.licenseNumber")}
                    </TableHead>
                    <TableHead>{t("approvals.agentsTable.phone")}</TableHead>
                    <TableHead>
                      {t("approvals.agentsTable.submittedAt")}
                    </TableHead>
                    <TableHead className="text-right">
                      {t("approvals.agentsTable.actions")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingAgents.map((agent) => (
                    <TableRow key={agent.id}>
                      <TableCell className="font-medium">
                        {agent.name}
                      </TableCell>
                      <TableCell>{agent.licenseNumber}</TableCell>
                      <TableCell>{agent.phone}</TableCell>
                      <TableCell>{agent.submittedAt}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="mr-2">
                          {t("actions.view")}
                        </Button>
                        <Button variant="default" size="sm" className="mr-2">
                          {t("actions.approve")}
                        </Button>
                        <Button variant="destructive" size="sm">
                          {t("actions.reject")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("approvals.propertiesTitle")}</CardTitle>
              <CardDescription>
                {t("approvals.propertiesDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      {t("approvals.propertiesTable.title")}
                    </TableHead>
                    <TableHead>
                      {t("approvals.propertiesTable.agent")}
                    </TableHead>
                    <TableHead>{t("approvals.propertiesTable.type")}</TableHead>
                    <TableHead>
                      {t("approvals.propertiesTable.submittedAt")}
                    </TableHead>
                    <TableHead className="text-right">
                      {t("approvals.propertiesTable.actions")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingProperties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell className="font-medium">
                        {property.title}
                      </TableCell>
                      <TableCell>{property.agent}</TableCell>
                      <TableCell>{property.type}</TableCell>
                      <TableCell>{property.submittedAt}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="mr-2">
                          {t("actions.view")}
                        </Button>
                        <Button variant="default" size="sm" className="mr-2">
                          {t("actions.approve")}
                        </Button>
                        <Button variant="destructive" size="sm">
                          {t("actions.reject")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("users.title")}</CardTitle>
              <CardDescription>{t("users.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("users.table.name")}</TableHead>
                    <TableHead>{t("users.table.email")}</TableHead>
                    <TableHead>{t("users.table.role")}</TableHead>
                    <TableHead>{t("users.table.status")}</TableHead>
                    <TableHead className="text-right">
                      {t("users.table.actions")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Abdullah Alshammari
                    </TableCell>
                    <TableCell>admin@example.com</TableCell>
                    <TableCell>
                      <Badge variant="default">{t("roles.admin")}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        {t("status.active")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        {t("actions.edit")}
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Sarah Alqahtani
                    </TableCell>
                    <TableCell>support@example.com</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{t("roles.support")}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        {t("status.active")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        {t("actions.edit")}
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Mohammed Alotaibi
                    </TableCell>
                    <TableCell>agent@example.com</TableCell>
                    <TableCell>
                      <Badge>{t("roles.agent")}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 border-yellow-200"
                      >
                        {t("status.suspended")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        {t("actions.edit")}
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.title")}</CardTitle>
              <CardDescription>{t("settings.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <h3 className="text-lg font-medium">
                    {t("settings.approvalSettings")}
                  </h3>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="font-medium">
                        {t("settings.autoApproveProperties.title")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t("settings.autoApproveProperties.description")}
                      </div>
                    </div>
                    <Button variant="outline">{t("settings.disabled")}</Button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="font-medium">
                        {t("settings.licenseVerification.title")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t("settings.licenseVerification.description")}
                      </div>
                    </div>
                    <Button variant="outline">{t("settings.enabled")}</Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <h3 className="text-lg font-medium">
                    {t("settings.systemIntegrations")}
                  </h3>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="font-medium">
                        {t("settings.smsService.title")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t("settings.smsService.description")}
                      </div>
                    </div>
                    <Button variant="outline">{t("settings.configure")}</Button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="font-medium">
                        {t("settings.paymentGateway.title")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t("settings.paymentGateway.description")}
                      </div>
                    </div>
                    <Button variant="outline">{t("settings.configure")}</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
