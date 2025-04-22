"use client";

import { useState } from "react";
import {
  Search,
  MoreVertical,
  Phone,
  Video,
  Info,
  Paperclip,
  ImageIcon,
  Smile,
  Send,
  Check,
  CheckCheck,
  Clock,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample conversation data
const conversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Real Estate Agent",
    lastMessage: "I found a few properties that match your criteria",
    time: "10:42 AM",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Property Manager",
    lastMessage: "The apartment is available for viewing this weekend",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Leasing Consultant",
    lastMessage: "Your application has been received",
    time: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Mortgage Broker",
    lastMessage: "Let's discuss your financing options",
    time: "Monday",
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: "Jessica Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Real Estate Agent",
    lastMessage: "I have the keys for your new apartment!",
    time: "Monday",
    unread: 0,
    online: true,
  },
];

// Sample messages for a conversation
const messages = [
  {
    id: 1,
    sender: "Sarah Johnson",
    content:
      "Hi there! I'm Sarah, your dedicated real estate agent. I understand you're looking for a 2-bedroom apartment in downtown. How can I help you today?",
    time: "10:30 AM",
    isMe: false,
    status: "read",
  },
  {
    id: 2,
    sender: "Me",
    content:
      "Hi Sarah! Yes, I'm looking for a 2-bedroom apartment in downtown with a budget of around $3,000 per month. Ideally with parking and pet-friendly options.",
    time: "10:32 AM",
    isMe: true,
    status: "read",
  },
  {
    id: 3,
    sender: "Sarah Johnson",
    content:
      "Great! I've been searching the market and found several options that might interest you. Are you looking for something available immediately or do you have a specific move-in date in mind?",
    time: "10:35 AM",
    isMe: false,
    status: "read",
  },
  {
    id: 4,
    sender: "Me",
    content:
      "I'm hoping to move in by the end of next month. Would prefer a place with modern amenities and close to public transportation.",
    time: "10:38 AM",
    isMe: true,
    status: "read",
  },
  {
    id: 5,
    sender: "Sarah Johnson",
    content:
      "Perfect timing! I found a few properties that match your criteria. Here are three options I think you'll love:",
    time: "10:40 AM",
    isMe: false,
    status: "read",
  },
  {
    id: 6,
    sender: "Sarah Johnson",
    content:
      "1. Modern Apartment at 123 Main St - $2,800/month, 2 bed/2 bath, pet-friendly with indoor parking, 5-minute walk to subway station.",
    time: "10:41 AM",
    isMe: false,
    status: "read",
  },
  {
    id: 7,
    sender: "Sarah Johnson",
    content:
      "2. Luxury Condo at 456 Park Ave - $3,200/month, 2 bed/2 bath, includes gym and pool access, pet-friendly with a small deposit, covered parking available.",
    time: "10:41 AM",
    isMe: false,
    status: "read",
  },
  {
    id: 8,
    sender: "Sarah Johnson",
    content:
      "3. Downtown Loft at 789 Broadway - $2,950/month, 2 bed/1.5 bath, recently renovated with modern appliances, rooftop access, street parking permits available.",
    time: "10:42 AM",
    isMe: false,
    status: "read",
  },
  {
    id: 9,
    sender: "Sarah Johnson",
    content:
      "Would you like to schedule viewings for any of these properties? I have availability this weekend.",
    time: "10:42 AM",
    isMe: false,
    status: "delivered",
  },
];

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState(
    conversations[0]
  );
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, you would send the message to the server
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col h-[calc(100vh-8rem)] overflow-hidden rounded-lg border bg-background shadow">
        <div className="grid h-full grid-cols-1 md:grid-cols-[300px_1fr]">
          {/* Sidebar */}
          <div className="flex flex-col border-r">
            <div className="flex items-center justify-between p-4">
              <h2 className="text-xl font-semibold">Messages</h2>
              <Button variant="ghost" size="icon">
                <Plus className="h-5 w-5" />
                <span className="sr-only">New conversation</span>
              </Button>
            </div>
            <div className="px-4 pb-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search conversations..."
                  className="pl-8"
                />
              </div>
            </div>
            <Tabs defaultValue="all" className="px-4">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">
                  All
                </TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">
                  Unread
                </TabsTrigger>
                <TabsTrigger value="archived" className="flex-1">
                  Archived
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Separator />
            <ScrollArea className="flex-1">
              <div className="space-y-1 p-2">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    className={`flex w-full items-center gap-3 rounded-lg p-2 text-left ${
                      activeConversation.id === conversation.id
                        ? "bg-accent"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setActiveConversation(conversation)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage
                          src={conversation.avatar || "/placeholder.svg"}
                          alt={conversation.name}
                        />
                        <AvatarFallback>
                          {conversation.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-background" />
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{conversation.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {conversation.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread > 0 && (
                          <Badge className="ml-auto" variant="default">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={activeConversation.avatar || "/placeholder.svg"}
                    alt={activeConversation.name}
                  />
                  <AvatarFallback>
                    {activeConversation.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{activeConversation.name}</h3>
                    {activeConversation.online && (
                      <Badge
                        variant="outline"
                        className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs"
                      >
                        Online
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {activeConversation.role}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                  <span className="sr-only">Call</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                  <span className="sr-only">Video call</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Info className="h-5 w-5" />
                  <span className="sr-only">Info</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuItem>View profile</DropdownMenuItem>
                    <DropdownMenuItem>Mute conversation</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Block contact
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.isMe
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="flex flex-col space-y-1">
                        <p>{message.content}</p>
                        <div
                          className={`flex items-center justify-end gap-1 text-xs ${
                            message.isMe
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {message.time}
                          {message.isMe && (
                            <>
                              {message.status === "sent" && (
                                <Clock className="h-3 w-3" />
                              )}
                              {message.status === "delivered" && (
                                <Check className="h-3 w-3" />
                              )}
                              {message.status === "read" && (
                                <CheckCheck className="h-3 w-3" />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                  <span className="sr-only">Attach file</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <ImageIcon className="h-5 w-5" />
                  <span className="sr-only">Attach image</span>
                </Button>
                <div className="relative flex-1">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                  >
                    <Smile className="h-5 w-5" />
                    <span className="sr-only">Emoji</span>
                  </Button>
                </div>
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
