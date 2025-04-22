"use client";

import { Heart, MessageSquare, Search, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { signOut, useSession } from "@/lib/auth-client";

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const router = useRouter();
  const session = useSession();
  const user = session?.data?.user;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Saved Properties
                </CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Recent Searches
                </CardTitle>
                <Search className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  +3 from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Unread Messages
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">+2 new today</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Profile Completion
                </CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">75%</div>
                <Progress value={75} className="mt-2" />
              </CardContent>
            </Card>
          </div>
          <Tabs defaultValue="saved">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="saved">Saved Properties</TabsTrigger>
                <TabsTrigger value="recent">Recent Searches</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
              </TabsList>
              <div className="ml-auto">
                <Button>
                  <Search className="mr-2 h-4 w-4" />
                  New Search
                </Button>
              </div>
            </div>
            <TabsContent value="saved" className="border-none p-0">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <PropertyCard
                  title="Modern Apartment"
                  address="123 Main St, New York, NY"
                  price="$2,500/mo"
                  beds={2}
                  baths={2}
                  sqft={1200}
                  image="/downtown1.webp"
                />
                <PropertyCard
                  title="Luxury Condo"
                  address="456 Park Ave, New York, NY"
                  price="$3,800/mo"
                  beds={3}
                  baths={2}
                  sqft={1800}
                  image="/downtown2.webp"
                />
                <PropertyCard
                  title="Downtown Loft"
                  address="789 Broadway, New York, NY"
                  price="$4,200/mo"
                  beds={1}
                  baths={1}
                  sqft={950}
                  image="/dt3.jpg"
                />
                <PropertyCard
                  title="Garden Apartment"
                  address="101 Greene St, New York, NY"
                  price="$3,100/mo"
                  beds={2}
                  baths={1}
                  sqft={1100}
                  image="/dt4.jpg"
                />
                <PropertyCard
                  title="Penthouse Suite"
                  address="222 Fifth Ave, New York, NY"
                  price="$8,500/mo"
                  beds={3}
                  baths={3}
                  sqft={2200}
                  image="/dt5.webp"
                />
                <PropertyCard
                  title="Brownstone Duplex"
                  address="333 West Village, New York, NY"
                  price="$5,200/mo"
                  beds={3}
                  baths={2.5}
                  sqft={1950}
                  image="/pj1.jpg"
                />
              </div>
            </TabsContent>
            <TabsContent value="recent" className="border-none p-0">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <SearchCard
                  location="Brooklyn, NY"
                  filters="2+ beds, $2000-$3500/mo"
                  date="2 days ago"
                  results={24}
                />
                <SearchCard
                  location="Manhattan, NY"
                  filters="Studio, $1500-$2500/mo"
                  date="3 days ago"
                  results={18}
                />
                <SearchCard
                  location="Queens, NY"
                  filters="3+ beds, $2500-$4000/mo"
                  date="1 week ago"
                  results={12}
                />
                <SearchCard
                  location="Upper East Side, NY"
                  filters="1+ beds, $2000-$3000/mo"
                  date="1 week ago"
                  results={9}
                />
                <SearchCard
                  location="Williamsburg, Brooklyn"
                  filters="2+ beds, $3000-$4500/mo"
                  date="2 weeks ago"
                  results={15}
                />
              </div>
            </TabsContent>
            <TabsContent value="messages" className="border-none p-0">
              <div className="grid gap-4">
                <MessageCard
                  sender="John Smith"
                  property="Modern Apartment"
                  date="Today"
                  message="Hi, I'm interested in scheduling a viewing for this apartment. Is it available this weekend?"
                  unread={true}
                />
                <MessageCard
                  sender="Sarah Johnson"
                  property="Luxury Condo"
                  date="Yesterday"
                  message="Thank you for the information. I'd like to know if utilities are included in the rent?"
                  unread={true}
                />
                <MessageCard
                  sender="Michael Brown"
                  property="Downtown Loft"
                  date="Yesterday"
                  message="Is parking available with this unit? And if so, is there an additional cost?"
                  unread={true}
                />
                <MessageCard
                  sender="Emily Davis"
                  property="Garden Apartment"
                  date="2 days ago"
                  message="I submitted my application yesterday. Could you let me know when I might hear back?"
                  unread={false}
                />
                <MessageCard
                  sender="David Wilson"
                  property="Penthouse Suite"
                  date="3 days ago"
                  message="Are pets allowed in this building? I have a small dog."
                  unread={false}
                />
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

function PropertyCard({
  title,
  address,
  price,
  beds,
  baths,
  sqft,
  image,
}: {
  title: string;
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{address}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-lg font-bold">{price}</div>
        <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
          <div>{beds} Beds</div>
          <div>{baths} Baths</div>
          <div>{sqft} sqft</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          View Details
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <Heart className="h-4 w-4" />
          Saved
        </Button>
      </CardFooter>
    </Card>
  );
}

function SearchCard({
  location,
  filters,
  date,
  results,
}: {
  location: string;
  filters: string;
  date: string;
  results: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{location}</CardTitle>
        <CardDescription>{filters}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">Searched {date}</div>
        <div className="mt-2 text-lg font-semibold">
          {results} properties found
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          <Search className="mr-2 h-4 w-4" />
          Run Search Again
        </Button>
      </CardFooter>
    </Card>
  );
}

function MessageCard({
  sender,
  property,
  date,
  message,
  unread,
}: {
  sender: string;
  property: string;
  date: string;
  message: string;
  unread: boolean;
}) {
  return (
    <Card className={unread ? "border-primary/50 bg-primary/5" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{sender}</CardTitle>
          <div className="text-sm text-muted-foreground">{date}</div>
        </div>
        <CardDescription>Re: {property}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm">{message}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          <MessageSquare className="mr-2 h-4 w-4" />
          Reply
        </Button>
      </CardFooter>
    </Card>
  );
}
