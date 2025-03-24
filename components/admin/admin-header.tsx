// "use client"

// import { Bell, Search, User } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { SidebarTrigger } from "@/components/ui/sidebar"

// export default function AdminHeader() {
//   return (
//     <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
//       <SidebarTrigger className="md:hidden" />

//       <div className="relative hidden md:flex md:w-64">
//         <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//         <Input placeholder="Search..." className="w-full pl-8" />
//       </div>

//       <div className="ml-auto flex items-center gap-2">
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" size="icon" className="relative">
//               <Bell className="h-5 w-5" />
//               <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary"></span>
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end" className="w-80">
//             <DropdownMenuLabel>Notifications</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <div className="max-h-96 overflow-auto">
//               <DropdownMenuItem className="flex flex-col items-start gap-1 p-4">
//                 <div className="font-medium">New property submission</div>
//                 <div className="text-sm text-muted-foreground">A new property has been submitted for review</div>
//                 <div className="text-xs text-muted-foreground">2 minutes ago</div>
//               </DropdownMenuItem>
//               <DropdownMenuItem className="flex flex-col items-start gap-1 p-4">
//                 <div className="font-medium">New user registration</div>
//                 <div className="text-sm text-muted-foreground">A new agent has registered and requires approval</div>
//                 <div className="text-xs text-muted-foreground">1 hour ago</div>
//               </DropdownMenuItem>
//               <DropdownMenuItem className="flex flex-col items-start gap-1 p-4">
//                 <div className="font-medium">System update</div>
//                 <div className="text-sm text-muted-foreground">The system will be updated tonight at 2 AM</div>
//                 <div className="text-xs text-muted-foreground">5 hours ago</div>
//               </DropdownMenuItem>
//             </div>
//           </DropdownMenuContent>
//         </DropdownMenu>

//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" size="icon">
//               <User className="h-5 w-5" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>My Account</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Profile</DropdownMenuItem>
//             <DropdownMenuItem>Settings</DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Log out</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </header>
//   )
// }

"use client";

import { Bell, Search, User, LogOut, Settings, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6 shadow-sm">
      {/* Sidebar toggle (mobile) */}
      <SidebarTrigger className="md:hidden" />

      {/* Search bar */}
      <div className="relative hidden md:flex md:w-64">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          className="w-full pl-10 rounded-md border bg-muted text-sm"
        />
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-auto">
              {[
                {
                  title: "New property submission",
                  desc: "A new property has been submitted for review",
                  time: "2 minutes ago",
                },
                {
                  title: "New user registration",
                  desc: "A new agent has registered and requires approval",
                  time: "1 hour ago",
                },
                {
                  title: "System update",
                  desc: "The system will be updated tonight at 2 AM",
                  time: "5 hours ago",
                },
              ].map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  className="flex flex-col items-start gap-1 p-3"
                >
                  <div className="font-medium text-sm">{item.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.desc}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {item.time}
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/avatar.png" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
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
            {/* <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem> */}
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
