"use client";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/navigation";
import Image from "next/image";
import { Bell, Settings, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "@/lib/auth-client";

const UserHeader = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
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
          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/avatar.png" alt="Admin" />
                  <AvatarFallback>{session?.user?.name}</AvatarFallback>
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
  );
};

export default UserHeader;
