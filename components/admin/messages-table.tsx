"use client"

import { useState } from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Reply, Archive, Star, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface Message {
  id: string
  sender: string
  email: string
  subject: string
  message: string
  propertyId?: string
  propertyName?: string
  status: "Unread" | "Read" | "Replied" | "Archived"
  isStarred: boolean
  createdAt: string
}

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "John Smith",
    email: "john.smith@example.com",
    subject: "Inquiry about Modern Apartment",
    message:
      "Hello, I'm interested in the Modern Apartment in Downtown. Is it still available? I would like to schedule a viewing this weekend if possible. Thank you.",
    propertyId: "1",
    propertyName: "Modern Apartment in Downtown",
    status: "Unread",
    isStarred: false,
    createdAt: "2023-11-15T10:30:00Z",
  },
  {
    id: "2",
    sender: "Sarah Johnson",
    email: "sarah.j@example.com",
    subject: "Question about Luxury Villa",
    message:
      "Hi there, I have a few questions about the Luxury Villa with Pool. What's the size of the pool? Is the property fully furnished? Looking forward to your response.",
    propertyId: "2",
    propertyName: "Luxury Villa with Pool",
    status: "Read",
    isStarred: true,
    createdAt: "2023-11-14T14:20:00Z",
  },
  {
    id: "3",
    sender: "Michael Brown",
    email: "michael.b@example.com",
    subject: "Offer for Cozy Studio",
    message:
      "I would like to make an offer for the Cozy Studio in Historic District. I'm willing to pay the asking price but would like to negotiate the closing costs. Please let me know if this is acceptable.",
    propertyId: "3",
    propertyName: "Cozy Studio in Historic District",
    status: "Replied",
    isStarred: false,
    createdAt: "2023-11-13T11:45:00Z",
  },
  {
    id: "4",
    sender: "Emily Davis",
    email: "emily.d@example.com",
    subject: "Viewing request for Family Home",
    message:
      "Hello, I'm interested in viewing the Spacious Family Home. Would it be possible to arrange a viewing for next Tuesday around 5 PM? Thank you in advance.",
    propertyId: "4",
    propertyName: "Spacious Family Home",
    status: "Archived",
    isStarred: false,
    createdAt: "2023-11-12T09:00:00Z",
  },
  {
    id: "5",
    sender: "David Wilson",
    email: "david.w@example.com",
    subject: "Price negotiation for Waterfront Condo",
    message:
      "I'm interested in the Waterfront Condo but I find the price a bit high. Would the owner be open to a 5% reduction? I can close quickly with a cash offer if we can reach an agreement on the price.",
    propertyId: "5",
    propertyName: "Waterfront Condo",
    status: "Unread",
    isStarred: false,
    createdAt: "2023-11-11T13:15:00Z",
  },
]

export function MessagesTable() {
  const [data, setData] = useState<Message[]>(mockMessages)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [replyDialogOpen, setReplyDialogOpen] = useState(false)
  const [replyText, setReplyText] = useState("")

  const columns: ColumnDef<Message>[] = [
    {
      id: "starred",
      cell: ({ row }) => {
        const message = row.original
        return (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              const updatedData = data.map((item) =>
                item.id === message.id ? { ...item, isStarred: !item.isStarred } : item,
              )
              setData(updatedData)
            }}
          >
            <Star
              className={`h-4 w-4 ${message.isStarred ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
            />
            <span className="sr-only">{message.isStarred ? "Unstar" : "Star"}</span>
          </Button>
        )
      },
    },
    {
      accessorKey: "sender",
      header: ({ column }) => (
        <div className="flex items-center">
          Sender
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
          <div className="text-xs text-muted-foreground">{row.original.email}</div>
        </div>
      ),
    },
    {
      accessorKey: "subject",
      header: "Subject",
      cell: ({ row }) => <div className="font-medium">{row.getValue("subject")}</div>,
    },
    {
      accessorKey: "propertyName",
      header: "Property",
      cell: ({ row }) => <div>{row.original.propertyName || "N/A"}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
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
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <div className="flex items-center">
          Date
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
        const date = new Date(row.getValue("createdAt"))
        return <div>{date.toLocaleDateString()}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const message = row.original

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
                  setSelectedMessage(message)
                  setReplyDialogOpen(true)
                }}
              >
                <Reply className="mr-2 h-4 w-4" />
                Reply
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const updatedData = data.map((item) =>
                    item.id === message.id ? { ...item, status: "Archived" as const } : item,
                  )
                  setData(updatedData)
                  toast({
                    title: "Message archived",
                    description: "The message has been archived.",
                  })
                }}
              >
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => {
                  const updatedData = data.filter((item) => item.id !== message.id)
                  setData(updatedData)
                  toast({
                    title: "Message deleted",
                    description: "The message has been deleted.",
                  })
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

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
  })

  const handleSendReply = () => {
    if (!selectedMessage || !replyText.trim()) return

    const updatedData = data.map((item) =>
      item.id === selectedMessage.id ? { ...item, status: "Replied" as const } : item,
    )
    setData(updatedData)

    toast({
      title: "Reply sent",
      description: `Your reply to ${selectedMessage.sender} has been sent.`,
    })

    setReplyDialogOpen(false)
    setReplyText("")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Input
          placeholder="Search messages..."
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
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
                  className={row.original.status === "Unread" ? "font-medium bg-muted/30" : ""}
                  onClick={() => {
                    if (row.original.status === "Unread") {
                      const updatedData = data.map((item) =>
                        item.id === row.original.id ? { ...item, status: "Read" as const } : item,
                      )
                      setData(updatedData)
                    }
                    setSelectedMessage(row.original)
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No messages found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>

      {selectedMessage && (
        <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Reply to {selectedMessage.sender}</DialogTitle>
              <DialogDescription>Re: {selectedMessage.subject}</DialogDescription>
            </DialogHeader>
            <div className="border-y py-4 my-4">
              <div className="text-sm text-muted-foreground mb-2">Original message:</div>
              <div className="text-sm">{selectedMessage.message}</div>
            </div>
            <Textarea
              placeholder="Type your reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="min-h-[150px]"
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setReplyDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendReply}>Send Reply</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

