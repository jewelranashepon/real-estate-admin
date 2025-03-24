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
import { ArrowUpDown, MoreHorizontal, Pencil, Eye, Trash2, Plus } from "lucide-react"
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
import { formatDate } from "@/lib/utils"

interface Page {
  id: string
  title: string
  slug: string
  status: "Published" | "Draft" | "Scheduled"
  author: string
  lastUpdated: string
  createdAt: string
}

const mockPages: Page[] = [
  {
    id: "1",
    title: "Home Page",
    slug: "/",
    status: "Published",
    author: "Admin User",
    lastUpdated: "2023-11-15T10:30:00Z",
    createdAt: "2023-01-15T10:30:00Z",
  },
  {
    id: "2",
    title: "About Us",
    slug: "/about",
    status: "Published",
    author: "Admin User",
    lastUpdated: "2023-11-14T14:20:00Z",
    createdAt: "2023-01-20T14:20:00Z",
  },
  {
    id: "3",
    title: "Contact Us",
    slug: "/contact",
    status: "Published",
    author: "Admin User",
    lastUpdated: "2023-11-13T11:45:00Z",
    createdAt: "2023-01-25T11:45:00Z",
  },
  {
    id: "4",
    title: "Services",
    slug: "/services",
    status: "Draft",
    author: "Admin User",
    lastUpdated: "2023-11-12T09:00:00Z",
    createdAt: "2023-11-10T09:00:00Z",
  },
  {
    id: "5",
    title: "Testimonials",
    slug: "/testimonials",
    status: "Scheduled",
    author: "Admin User",
    lastUpdated: "2023-11-11T13:15:00Z",
    createdAt: "2023-11-05T13:15:00Z",
  },
]

export function ContentPages() {
  const [data, setData] = useState<Page[]>(mockPages)
  const [searchQuery, setSearchQuery] = useState("")

  const columns: ColumnDef<Page>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <div className="flex items-center">
          Title
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
      cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "slug",
      header: "URL Slug",
      cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("slug")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge variant={status === "Published" ? "success" : status === "Draft" ? "outline" : "warning"}>
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "author",
      header: "Author",
      cell: ({ row }) => <div>{row.getValue("author")}</div>,
    },
    {
      accessorKey: "lastUpdated",
      header: ({ column }) => (
        <div className="flex items-center">
          Last Updated
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
        const date = new Date(row.getValue("lastUpdated"))
        return <div>{formatDate(date.toString())}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const page = row.original

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
                    title: "Edit page",
                    description: `Editing ${page.title}.`,
                  })
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  toast({
                    title: "View page",
                    description: `Viewing ${page.title}.`,
                  })
                }}
              >
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => {
                  const updatedData = data.filter((item) => item.id !== page.id)
                  setData(updatedData)
                  toast({
                    title: "Page deleted",
                    description: `${page.title} has been deleted.`,
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search pages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Button
          onClick={() => {
            toast({
              title: "Create page",
              description: "Creating a new page.",
            })
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Page
        </Button>
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
                  No pages found.
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

