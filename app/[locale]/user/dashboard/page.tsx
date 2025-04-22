'use client'

import {
  Bell,
  Heart,
  Home,
  MessageSquare,
  Search,
  Settings,
  User,
  LogOut,
  UserCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@/i18n/navigation";

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
import Image from "next/image";
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
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex h-[100px] items-center px-4 md:px-6">
          <Link href="#" className="flex items-center gap-2 font-semibold">
            <Image
              src="/boedlogo.png"
              alt="Birds of Eden Logo"
              height={100}
              width={100}
            />
            {/* <Home className="h-6 w-6" /> */}
            <span className="mt-5 ml-5 text-bold">User Dashboard</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/avatar.png" alt="Admin" />
                <AvatarFallback>{user?.name}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserCircle className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/");
                      router.refresh();
                    },
                  },
                });
              }}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[240px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="#">
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="#">
                <Heart className="h-4 w-4" />
                Saved Properties
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="#">
                <Search className="h-4 w-4" />
                Search
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="#">
                <MessageSquare className="h-4 w-4" />
                Messages
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="/user/dashboard/settings">
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </Button>
          </div>
        </div>
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
                    title="Villa on King Fahd Road"
                    address="King Fahd Road, Riyadh"
                    price="SAR 1,200,000"
                    beds={4}
                    baths={3}
                    sqft={2500}
                    image="/sa1.jpg"
                  />
                  <PropertyCard
                    title="Modern Apartment on Tahlia"
                    address="Tahlia Street, Jeddah"
                    price="SAR 950,000"
                    beds={3}
                    baths={2}
                    sqft={1800}
                    image="/sa2.jpg"
                  />
                  <PropertyCard
                    title="Sea View at Al Khobar Corniche"
                    address="Al Khobar Corniche, Dammam"
                    price="SAR 1,500,000"
                    beds={5}
                    baths={4}
                    sqft={3200}
                    image="/sa3.webp"
                  />
                  <PropertyCard
                    title="Home on Prince Sultan Road"
                    address="Prince Sultan Road, Mecca"
                    price="SAR 850,000"
                    beds={3}
                    baths={2}
                    sqft={1600}
                    image="/sa4.jpeg"
                  />
                  <PropertyCard
                    title="Flat on King Abdullah Road"
                    address="King Abdullah Road, Medina"
                    price="SAR 780,000"
                    beds={2}
                    baths={2}
                    sqft={1400}
                    image="/sa5.jpg"
                  />
                  <PropertyCard
                    title="Luxury Home in Al Olaya"
                    address="Al Olaya District, Riyadh"
                    price="SAR 2,200,000"
                    beds={6}
                    baths={5}
                    sqft={4500}
                    image="/dt3.jpg"
                  />
                  <PropertyCard
                    title="Family House in Al Hamra"
                    address="Al Hamra District, Jeddah"
                    price="SAR 1,100,000"
                    beds={4}
                    baths={3}
                    sqft={2200}
                    image="/dt4.jpg"
                  />
                  <PropertyCard
                    title="Quiet Spot in Al Rawdah"
                    address="Al Rawdah, Dammam"
                    price="SAR 920,000"
                    beds={3}
                    baths={2}
                    sqft={1900}
                    image="/dt5.webp"
                  />
                  <PropertyCard
                    title="Affordable Home in Al Khaledia"
                    address="Al Khaledia, Bisha"
                    price="SAR 720,000"
                    beds={3}
                    baths={2}
                    sqft={1900}
                    image="/pj6.jpg"
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
