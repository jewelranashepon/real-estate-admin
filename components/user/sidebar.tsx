"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Heart, Home, MessageSquare, Search, Settings } from "lucide-react";

const UserSidebar = () => {
  return (
    <div className="shrink-0 hidden border-r bg-muted/40 md:block min-w-[300px]">
      <div className="flex h-full flex-col gap-2 p-4">
        <Button variant="ghost" className="justify-start gap-2" asChild>
          <Link href="/user/dashboard">
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
        </Button>
        <Button variant="ghost" className="justify-start gap-2" asChild>
          <Link href="/user/dashboard/saved-properties">
            <Heart className="h-4 w-4" />
            Saved Properties
          </Link>
        </Button>
        <Button variant="ghost" className="justify-start gap-2" asChild>
          <Link href="/user/dashboard/search">
            <Search className="h-4 w-4" />
            Search
          </Link>
        </Button>
        <Button variant="ghost" className="justify-start gap-2" asChild>
          <Link href="/user/dashboard/messages">
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
  );
};

export default UserSidebar;
