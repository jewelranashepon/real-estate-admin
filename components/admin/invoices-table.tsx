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
import { ArrowUpDown, MoreHorizontal, FileText, Download, Send, CheckCircle } from "lucide-react"
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
import { formatCurrency } from "@/lib/utils"

interface Invoice {
  id: string
  invoiceNumber: string
  customer: string
  email: string
  amount: number
  status: "Paid" | "Pending" | "Overdue" | "Draft"
  dueDate: string
  issuedDate: string
}

const mockInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2023-001",
    customer: "John Smith",
    email: "john.smith@example.com",
    amount: 350000,
    status: "Paid",
    dueDate: "2023-11-30T00:00:00Z",
    issuedDate: "2023-11-15T10:30:00Z",
  },
  {
    id: "2",
    invoiceNumber: "INV-2023-002",
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    amount: 125000,
    status: "Pending",
    dueDate: "2023-12-15T00:00:00Z",
    issuedDate: "2023-11-14T14:20:00Z",
  },
  {
    id: "3",
    invoiceNumber: "INV-2023-003",
    customer: "Michael Brown",
    email: "michael.b@example.com",
    amount: 18000,
    status: "Overdue",
    dueDate: "2023-11-10T00:00:00Z",
    issuedDate: "2023-10-25T11:45:00Z",
  },
  {
    id: "4",
    invoiceNumber: "INV-2023-004",
    customer: "Emily Davis",
    email: "emily.d@example.com",
    amount: 75000,
    status: "Draft",
    dueDate: "2023-12-20T00:00:00Z",
    issuedDate: "2023-11-12T09:00:00Z",
  },
  {
    id: "5",
    invoiceNumber: "INV-2023-005",
    customer: "David Wilson",
    email: "david.w@example.com",
    amount: 62000,
    status: "Pending",
    dueDate: "2023-12-05T00:00:00Z",
    issuedDate: "2023-11-11T13:15:00Z",
  },
]

export function InvoicesTable() {
  const [data, setData] = useState<Invoice[]>(mockInvoices)
  const [searchQuery, setSearchQuery] = useState("")

  const columns: ColumnDef<Invoice>[] = [
    {
      accessorKey: "invoiceNumber",
      header: "Invoice #",
      cell: ({ row }) => <div className="font-medium">{row.getValue("invoiceNumber")}</div>,
    },
    {
      accessorKey: "customer",
      header: ({ column }) => (
        <div className="flex items-center">
          Customer
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
          <div className="font-medium">{row.getValue("customer")}</div>
          <div className="text-xs text-muted-foreground">{row.original.email}</div>
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <div className="flex items-center">
          Amount
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
      cell: ({ row }) => <div className="font-medium">{formatCurrency(row.getValue("amount"))}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge
            variant={
              status === "Paid"
                ? "success"
                : status === "Pending"
                  ? "warning"
                  : status === "Overdue"
                    ? "destructive"
                    : "outline"
            }
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "dueDate",
      header: ({ column }) => (
        <div className="flex items-center">
          Due Date
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
        const date = new Date(row.getValue("dueDate"))
        return <div>{date.toLocaleDateString()}</div>
      },
    },
    {
      accessorKey: "issuedDate",
      header: "Issued Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("issuedDate"))
        return <div>{date.toLocaleDateString()}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const invoice = row.original

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
                  toast({
                    title: "Invoice viewed",
                    description: `Viewing invoice ${invoice.invoiceNumber}.`,
                  })
                }}
              >
                <FileText className="mr-2 h-4 w-4" />
                View Invoice
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  toast({
                    title: "Invoice downloaded",
                    description: `Invoice ${invoice.invoiceNumber} has been downloaded.`,
                  })
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  toast({
                    title: "Invoice sent",
                    description: `Invoice ${invoice.invoiceNumber} has been sent to ${invoice.email}.`,
                  })
                }}
              >
                <Send className="mr-2 h-4 w-4" />
                Send to Customer
              </DropdownMenuItem>
              {invoice.status !== "Paid" && (
                <DropdownMenuItem
                  onClick={() => {
                    const updatedData = data.map((item) =>
                      item.id === invoice.id ? { ...item, status: "Paid" as const } : item,
                    )
                    setData(updatedData)
                    toast({
                      title: "Invoice marked as paid",
                      description: `Invoice ${invoice.invoiceNumber} has been marked as paid.`,
                    })
                  }}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Paid
                </DropdownMenuItem>
              )}
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

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Input
          placeholder="Search invoices..."
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
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No invoices found.
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
    </div>
  )
}

