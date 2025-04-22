"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Search,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "@/i18n/navigation";

export default function AgentHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();
  const session = useSession();
  const user = session?.data?.user;

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b bg-background px-4 md:px-6">
      <SidebarTrigger className="md:hidden" />

      <div className="flex flex-1 items-center gap-4 md:gap-8">
        <div className="hidden md:block">
          <h1 className="text-xl font-semibold">Property Management System</h1>
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] pr-0">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10 border-2 border-primary">
                    <AvatarImage src="../../public/avatar.png" alt="Agent" />
                    <AvatarFallback>AR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Ahmed Rashid</p>
                    <p className="text-xs text-muted-foreground">
                      Real Estate Agent
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="flex-1 overflow-auto py-4">
                <div className="px-2 py-1">
                  <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    Main Menu
                  </h2>
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      size="sm"
                      asChild
                    >
                      <Link href="/agent/dashboard">Dashboard</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      size="sm"
                      asChild
                    >
                      <Link href="/agent/overview">Overview</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      size="sm"
                      asChild
                    >
                      <Link href="/agent/properties">Properties</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      size="sm"
                      asChild
                    >
                      <Link href="/agent/properties/add">Add Property</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      size="sm"
                      asChild
                    >
                      <Link href="/agent/map">Property Map</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      size="sm"
                      asChild
                    >
                      <Link href="/agent/profile">Profile</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      size="sm"
                      asChild
                    >
                      <Link href="/agent/notifications">
                        Notifications
                        <Badge className="ml-auto">3</Badge>
                      </Link>
                    </Button>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="px-2 py-1">
                  <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    Support
                  </h2>
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      size="sm"
                    >
                      Help & Resources
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      size="sm"
                    >
                      Documentation
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      size="sm"
                    >
                      Settings
                    </Button>
                  </div>
                </div>
              </nav>

              <div className="border-t pt-4">
                <Button variant="outline" className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Search bar */}
        <div
          className={`relative flex-1 ${
            searchOpen ? "block" : "hidden md:block"
          } md:max-w-sm`}
        >
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search properties..."
            className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {/* Search toggle for mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Help dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Help & Support</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                User Guide
                <DropdownMenuShortcut>⌘G</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                FAQs
                <DropdownMenuShortcut>⌘F</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Contact Support
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Report an Issue</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative bg-green-700 hover:bg-green-600 text-white hover:text-white font-extrabold"
              >
                <Bell className="h-7 w-7" />
                <Badge className="absolute bg-gray-600 text-white -right-1 -top-1 h-5 w-5 flex items-center justify-center  rounded-full p-0 text-xs">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-1 text-xs"
                >
                  Mark all as read
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-auto">
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-4 cursor-pointer">
                  <div className="font-medium">Property Approved</div>
                  <div className="text-sm text-muted-foreground">
                    Your property "Luxury Villa in Al Olaya" has been approved.
                  </div>
                  <div className="text-xs text-muted-foreground">
                    2 hours ago
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-4 cursor-pointer">
                  <div className="font-medium">Property Rejected</div>
                  <div className="text-sm text-muted-foreground">
                    Your property "Studio Apartment" has been rejected. Please
                    update the information.
                  </div>
                  <div className="text-xs text-muted-foreground">1 day ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-4 cursor-pointer">
                  <div className="font-medium">System Announcement</div>
                  <div className="text-sm text-muted-foreground">
                    New features have been added to the platform. Check them
                    out!
                  </div>
                  <div className="text-xs text-muted-foreground">
                    3 days ago
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="justify-center font-medium cursor-pointer"
                asChild
              >
                <Link href="/agent/notifications">View All Notifications</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/avatar.png" alt="Agent" />
                  <AvatarFallback>
                    {user?.name?.charAt(0) || "AG"}
                  </AvatarFallback>
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
                  try {
                    await signOut();
                    router.push("/");
                    router.refresh();
                  } catch (error) {
                    console.error("Logout failed", error);
                  }
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
