import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, CheckCircle, Users } from "lucide-react";

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">System Overview</h2>
        <p className="text-muted-foreground">
          Quick overview of the property management system.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active User</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Properties
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent System Updates</CardTitle>
            <CardDescription>
              Latest changes and improvements to the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Map Integration</div>
                  <div className="text-xs text-muted-foreground">
                    2 days ago
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Added interactive map feature to visualize property locations
                  in Riyadh.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Document Upload</div>
                  <div className="text-xs text-muted-foreground">
                    1 week ago
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Added support for uploading property documents and
                  verification files.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Notification System</div>
                  <div className="text-xs text-muted-foreground">
                    2 weeks ago
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Implemented real-time notifications for property status
                  changes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                className="w-full justify-between bg-green-600 hover:bg-green-700"
                asChild
              >
                <a href="/agent/properties/add">
                  Add New Property
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              <Button
                className="w-full justify-between"
                variant="outline"
                asChild
              >
                <a href="/agent/properties">
                  View My Properties
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              <Button
                className="w-full justify-between"
                variant="outline"
                asChild
              >
                <a href="/agent/map">
                  Explore Property Map
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              <Button
                className="w-full justify-between"
                variant="outline"
                asChild
              >
                <a href="/agent/profile">
                  Update Profile
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
