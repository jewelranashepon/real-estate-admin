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
import { ArrowUpDown, MoreHorizontal, FileText, Download, ExternalLink } from "lucide-react"
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
import { useTranslations } from 'next-intl';

interface Payment {
  id: string
  transactionId: string
  customer: string
  email: string
  amount: number
  status: "Completed" | "Pending" | "Failed" | "Refunded"
  method: "Credit Card" | "Bank Transfer" | "PayPal" | "Cash"
  date: string
}

const mockPayments: Payment[] = [
  {
    id: "1",
    transactionId: "TXN-12345",
    customer: "John Smith",
    email: "john.smith@example.com",
    amount: 350000,
    status: "Completed",
    method: "Credit Card",
    date: "2023-11-15T10:30:00Z",
  },
  {
    id: "2",
    transactionId: "TXN-67890",
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    amount: 125000,
    status: "Pending",
    method: "Bank Transfer",
    date: "2023-11-14T14:20:00Z",
  },
  {
    id: "3",
    transactionId: "TXN-24680",
    customer: "Michael Brown",
    email: "michael.b@example.com",
    amount: 18000,
    status: "Completed",
    method: "PayPal",
    date: "2023-11-13T11:45:00Z",
  },
  {
    id: "4",
    transactionId: "TXN-13579",
    customer: "Emily Davis",
    email: "emily.d@example.com",
    amount: 75000,
    status: "Failed",
    method: "Credit Card",
    date: "2023-11-12T09:00:00Z",
  },
  {
    id: "5",
    transactionId: "TXN-97531",
    customer: "David Wilson",
    email: "david.w@example.com",
    amount: 62000,
    status: "Refunded",
    method: "Cash",
    date: "2023-11-11T13:15:00Z",
  },
]

export function PaymentsTable() {
  const t = useTranslations('dashboard')
  const [data] = useState<Payment[]>(mockPayments)
  const [searchQuery, setSearchQuery] = useState("")

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "transactionId",
      header: t("transactionId"),
      cell: ({ row }) => <div className="font-medium">{row.getValue("transactionId")}</div>,
    },
    {
      accessorKey: "customer",
      header: ({ column }) => (
        <div className="flex items-center">
          {t('customer')}
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
          {t('amount')}
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
      header: t("status"),
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge
            variant={
              status === "Completed"
                ? "success"
                : status === "Pending"
                  ? "warning"
                  : status === "Failed"
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
      accessorKey: "method",
      header: t("paymentMethod"),
      cell: ({ row }) => <div>{row.getValue("method")}</div>,
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <div className="flex items-center">
          {t('date')}
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
        const date = new Date(row.getValue("date"))
        return <div>{date.toLocaleDateString()}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const payment = row.original

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
                    title: "Receipt generated",
                    description: `Receipt for ${payment.transactionId} has been generated.`,
                  })
                }}
              >
                <FileText className="mr-2 h-4 w-4" />
                View Receipt
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  toast({
                    title: "Receipt downloaded",
                    description: `Receipt for ${payment.transactionId} has been downloaded.`,
                  })
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Receipt
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  toast({
                    title: "Payment details",
                    description: `Viewing details for ${payment.transactionId}.`,
                  })
                }}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Transaction
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

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Input
          placeholder="Search payments..."
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
                  No payments found.
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

