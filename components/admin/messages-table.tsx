"use client";

import { useState, useEffect } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  Reply,
  Archive,
  Star,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

interface Message {
  id: string;
  sender: string;
  email: string;
  subject: string;
  message: string;
  propertyId?: string;
  propertyName?: string;
  status: "Unread" | "Read" | "Replied" | "Archived";
  isStarred: boolean;
  createdAt: string;
}

export function MessagesTable() {
  const t = useTranslations("dashboard");
  const [data, setData] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/messages");
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const messages = await response.json();
        setData(messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast({
          title: "Error",
          description: "Failed to load messages. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const updateMessageStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update message status");
      }

      // Update the local state
      setData((prevData) =>
        prevData.map((message) =>
          message.id === id ? { ...message, status: status as any } : message
        )
      );

      return true;
    } catch (error) {
      console.error("Error updating message status:", error);
      toast({
        title: "Error",
        description: "Failed to update message status. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const toggleStarred = async (id: string, isStarred: boolean) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isStarred }),
      });

      if (!response.ok) {
        throw new Error("Failed to update starred status");
      }

      // Update the local state
      setData((prevData) =>
        prevData.map((message) =>
          message.id === id ? { ...message, isStarred } : message
        )
      );

      return true;
    } catch (error) {
      console.error("Error updating starred status:", error);
      toast({
        title: "Error",
        description: "Failed to update starred status. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete message");
      }

      // Remove from local state
      setData((prevData) => prevData.filter((message) => message.id !== id));
      return true;
    } catch (error) {
      console.error("Error deleting message:", error);
      toast({
        title: "Error",
        description: "Failed to delete message. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const sendReply = async (messageId: string, replyText: string) => {
    try {
      const response = await fetch("/api/messages/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messageId, replyText }),
      });

      if (!response.ok) {
        throw new Error("Failed to send reply");
      }

      // Update the message status in local state
      setData((prevData) =>
        prevData.map((message) =>
          message.id === messageId
            ? { ...message, status: "Replied" as const }
            : message
        )
      );

      return true;
    } catch (error) {
      console.error("Error sending reply:", error);
      toast({
        title: "Error",
        description: "Failed to send reply. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const columns: ColumnDef<Message>[] = [
    {
      id: "starred",
      cell: ({ row }) => {
        const message = row.original;
        return (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={async () => {
              await toggleStarred(message.id, !message.isStarred);
            }}
          >
            <Star
              className={`h-4 w-4 ${
                message.isStarred
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
            <span className="sr-only">
              {message.isStarred ? "Unstar" : "Star"}
            </span>
          </Button>
        );
      },
    },
    {
      accessorKey: "sender",
      header: ({ column }) => (
        <div className="flex items-center">
          {t("sender")}
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.getValue("sender")}</div>
          <div className="text-xs text-muted-foreground">
            {row.original.email}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "subject",
      header: t("subject"),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("subject")}</div>
      ),
    },
    {
      accessorKey: "propertyName",
      header: t("property"),
      cell: ({ row }) => <div>{row.original.propertyName || "N/A"}</div>,
    },
    {
      accessorKey: "status",
      header: t("status"),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge
            variant={
              status === "Unread"
                ? "default"
                : status === "Read"
                ? "outline"
                : status === "Replied"
                ? "secondary"
                : "destructive"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <div className="flex items-center">
          {t("date")}
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const message = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedMessage(message);
                  setReplyDialogOpen(true);
                }}
              >
                <Reply className="mr-2 h-4 w-4" />
                Reply
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  const success = await updateMessageStatus(
                    message.id,
                    "Archived"
                  );
                  if (success) {
                    toast({
                      title: "Message archived",
                      description: "The message has been archived.",
                    });
                  }
                }}
              >
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={async () => {
                  const success = await deleteMessage(message.id);
                  if (success) {
                    toast({
                      title: "Message deleted",
                      description: "The message has been deleted.",
                    });
                  }
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: searchQuery,
    },
    onGlobalFilterChange: setSearchQuery,
  });

  const handleSendReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;

    const success = await sendReply(selectedMessage.id, replyText);

    if (success) {
      toast({
        title: "Reply sent",
        description: `Your reply to ${selectedMessage.sender} has been sent.`,
      });
      setReplyDialogOpen(false);
      setReplyText("");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Input
          placeholder={t("searchLeads")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={
                    row.original.status === "Unread"
                      ? "font-medium bg-muted/30"
                      : ""
                  }
                  onClick={async () => {
                    if (row.original.status === "Unread") {
                      await updateMessageStatus(row.original.id, "Read");
                    }
                    setSelectedMessage(row.original);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {t("noMessagesFound")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {t("previous")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {t("next")}
        </Button>
      </div>

      {selectedMessage && (
        <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Reply to {selectedMessage.sender}</DialogTitle>
              <DialogDescription>
                Re: {selectedMessage.subject}
              </DialogDescription>
            </DialogHeader>
            <div className="border-y py-4 my-4">
              <div className="text-sm text-muted-foreground mb-2">
                Original message:
              </div>
              <div className="text-sm">{selectedMessage.message}</div>
            </div>
            <Textarea
              placeholder="Type your reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="min-h-[150px]"
            />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setReplyDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSendReply}>Send Reply</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
