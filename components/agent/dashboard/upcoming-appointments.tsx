import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function UpcomingAppointments() {
  const appointments = [
    {
      id: 1,
      client: "Sarah Johnson",
      property: "Luxury Condo",
      date: "Today, 2:00 PM",
      type: "Viewing",
      avatar: "SJ",
    },
    {
      id: 2,
      client: "Michael Brown",
      property: "Family Home",
      date: "Today, 4:30 PM",
      type: "Follow-up",
      avatar: "MB",
    },
    {
      id: 3,
      client: "Emily Davis",
      property: "Beach Villa",
      date: "Tomorrow, 10:00 AM",
      type: "Viewing",
      avatar: "ED",
    },
    {
      id: 4,
      client: "Robert Wilson",
      property: "City Apartment",
      date: "Tomorrow, 3:00 PM",
      type: "Offer Discussion",
      avatar: "RW",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>You have {appointments.length} appointments scheduled</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?text=${appointment.avatar}`} />
                  <AvatarFallback>{appointment.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{appointment.client}</p>
                  <p className="text-xs text-muted-foreground">{appointment.property}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs text-right">{appointment.date}</div>
                <Badge
                  variant={
                    appointment.type === "Viewing"
                      ? "default"
                      : appointment.type === "Follow-up"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {appointment.type}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

