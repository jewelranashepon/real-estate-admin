import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminPage() {
  const pendingAgents = [
    {
      id: 1,
      name: "Ahmed Mohammed",
      licenseNumber: "FAL-123456",
      phone: "0512345678",
      submittedAt: "2 hours ago",
    },
    {
      id: 2,
      name: "Sarah Abdullah",
      licenseNumber: "FAL-789012",
      phone: "0587654321",
      submittedAt: "5 hours ago",
    },
    {
      id: 3,
      name: "Khalid Alomari",
      licenseNumber: "FAL-345678",
      phone: "0598765432",
      submittedAt: "1 day ago",
    },
  ];

  const pendingProperties = [
    {
      id: 1,
      title: "Villa in Al Narjis",
      agent: "Mohammed Alotaibi",
      type: "Villa",
      submittedAt: "3 hours ago",
    },
    {
      id: 2,
      title: "Apartment in Al Malqa",
      agent: "Fahad Aldosari",
      type: "Apartment",
      submittedAt: "6 hours ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
        <p className="text-muted-foreground">Manage users, properties, and approvals</p>
      </div>

      <Tabs defaultValue="approvals">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="settings">System Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="approvals" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Agents Pending Approval</CardTitle>
              <CardDescription>List of agents waiting for account approval</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>License Number</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Submitted At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingAgents.map((agent) => (
                    <TableRow key={agent.id}>
                      <TableCell className="font-medium">{agent.name}</TableCell>
                      <TableCell>{agent.licenseNumber}</TableCell>
                      <TableCell>{agent.phone}</TableCell>
                      <TableCell>{agent.submittedAt}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="mr-2">View</Button>
                        <Button variant="default" size="sm" className="mr-2">Approve</Button>
                        <Button variant="destructive" size="sm">Reject</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Properties Pending Approval</CardTitle>
              <CardDescription>List of properties waiting for approval before publishing</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Submitted At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingProperties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell className="font-medium">{property.title}</TableCell>
                      <TableCell>{property.agent}</TableCell>
                      <TableCell>{property.type}</TableCell>
                      <TableCell>{property.submittedAt}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="mr-2">View</Button>
                        <Button variant="default" size="sm" className="mr-2">Approve</Button>
                        <Button variant="destructive" size="sm">Reject</Button>
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
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts, roles, and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Abdullah Alshammari</TableCell>
                    <TableCell>admin@example.com</TableCell>
                    <TableCell>
                      <Badge variant="default">Admin</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Sarah Alqahtani</TableCell>
                    <TableCell>support@example.com</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Support</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mohammed Alotaibi</TableCell>
                    <TableCell>agent@example.com</TableCell>
                    <TableCell>
                      <Badge>Agent</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        Suspended
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
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
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure system settings and integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <h3 className="text-lg font-medium">Approval Settings</h3>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="font-medium">Auto-approve Properties</div>
                      <div className="text-sm text-muted-foreground">
                        Automatically approve properties added by verified agents
                      </div>
                    </div>
                    <Button variant="outline">Disabled</Button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="font-medium">License Verification</div>
                      <div className="text-sm text-muted-foreground">
                        Automatically verify agent licenses during registration
                      </div>
                    </div>
                    <Button variant="outline">Enabled</Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <h3 className="text-lg font-medium">System Integrations</h3>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="font-medium">SMS Service</div>
                      <div className="text-sm text-muted-foreground">
                        Integration with Unifonic SMS service
                      </div>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="font-medium">Payment Gateway</div>
                      <div className="text-sm text-muted-foreground">
                        Integration with Stripe payment service
                      </div>
                    </div>
                    <Button variant="outline">Configure</Button>
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
