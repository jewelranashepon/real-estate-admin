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

interface BlogPost {
  id: string
  title: string
  slug: string
  status: "Published" | "Draft" | "Scheduled"
  author: string
  category: string
  publishDate: string
  views: number
}

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "10 Tips for First-Time Home Buyers",
    slug: "/blog/10-tips-first-time-home-buyers",
    status: "Published",
    author: "Admin User",
    category: "Buying",
    publishDate: "2023-11-15T10:30:00Z",
    views: 1250,
  },
  {
    id: "2",
    title: "How to Stage Your Home for a Quick Sale",
    slug: "/blog/stage-home-quick-sale",
    status: "Published",
    author: "Admin User",
    category: "Selling",
    publishDate: "2023-11-10T14:20:00Z",
    views: 980,
  },
  {
    id: "3",
    title: "Understanding Mortgage Rates in 2023",
    slug: "/blog/understanding-mortgage-rates-2023",
    status: "Published",
    author: "Admin User",
    category: "Financing",
    publishDate: "2023-11-05T11:45:00Z",
    views: 1560,
  },
  {
    id: "4",
    title: "5 Home Renovation Projects with the Best ROI",
    slug: "/blog/renovation-projects-best-roi",
    status: "Draft",
    author: "Admin User",
    category: "Renovations",
    publishDate: "2023-11-20T09:00:00Z",
    views: 0,
  },
  {
    id: "5",
    title: "The Future of Real Estate: Trends to Watch",
    slug: "/blog/future-real-estate-trends",
    status: "Scheduled",
    author: "Admin User",
    category: "Market Trends",
    publishDate: "2023-11-25T13:15:00Z",
    views: 0,
  },
]

export function ContentBlogs() {
  const [data, setData] = useState<BlogPost[]>(mockBlogPosts)
  const [searchQuery, setSearchQuery] = useState("")

  const columns: ColumnDef<BlogPost>[] = [
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
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <Badge variant="outline">{row.getValue("category")}</Badge>,
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
      accessorKey: "publishDate",
      header: ({ column }) => (
        <div className="flex items-center">
          Publish Date
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
        const date = new Date(row.getValue("publishDate"))
        return <div>{formatDate(date.toString())}</div>
      },
    },
    {
      accessorKey: "views",
      header: ({ column }) => (
        <div className="flex items-center">
          Views
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
      cell: ({ row }) => <div className="text-right">{row.getValue("views")}</div>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const post = row.original

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
                    title: "Edit blog post",
                    description: `Editing ${post.title}.`,
                  })
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  toast({
                    title: "View blog post",
                    description: `Viewing ${post.title}.`,
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
                  const updatedData = data.filter((item) => item.id !== post.id)
                  setData(updatedData)
                  toast({
                    title: "Blog post deleted",
                    description: `${post.title} has been deleted.`,
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
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Button
          onClick={() => {
            toast({
              title: "Create blog post",
              description: "Creating a new blog post.",
            })
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Blog Post
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
                  No blog posts found.
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

