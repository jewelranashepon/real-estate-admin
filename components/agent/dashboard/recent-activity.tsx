import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "property_added",
      title: "New Property Added",
      description: "Luxury Condo in Downtown",
      timestamp: "2 hours ago",
      icon: "LC",
    },
    {
      id: 2,
      type: "lead_created",
      title: "New Lead",
      description: "Michael Brown interested in Family Home",
      timestamp: "3 hours ago",
      icon: "MB",
    },
    {
      id: 3,
      type: "appointment_scheduled",
      title: "Appointment Scheduled",
      description: "Property viewing with Emily Davis",
      timestamp: "5 hours ago",
      icon: "ED",
    },
    {
      id: 4,
      type: "offer_made",
      title: "Offer Made",
      description: "Robert Wilson made an offer on City Apartment",
      timestamp: "Yesterday",
      icon: "RW",
    },
    {
      id: 5,
      type: "deal_closed",
      title: "Deal Closed",
      description: "Beach Villa sold to Jennifer Smith",
      timestamp: "2 days ago",
      icon: "JS",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest activities and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`/placeholder.svg?text=${activity.icon}`} />
                <AvatarFallback>{activity.icon}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium leading-none">{activity.title}</p>
                  <Badge
                    variant={
                      activity.type === "property_added"
                        ? "default"
                        : activity.type === "lead_created"
                          ? "secondary"
                          : activity.type === "appointment_scheduled"
                            ? "outline"
                            : activity.type === "offer_made"
                              ? "destructive"
                              : "success"
                    }
                  >
                    {activity.type.replace("_", " ")}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

