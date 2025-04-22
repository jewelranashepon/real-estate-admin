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
import { ArrowUpDown, MoreHorizontal, UserCheck, Mail, Phone, Trash2 } from "lucide-react"
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
import { useTranslations } from "next-intl"

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  propertyInterest: string
  status: "New" | "Contacted" | "Qualified" | "Converted" | "Lost"
  source: string
  createdAt: string
}

const mockLeads: Lead[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    propertyInterest: "Modern Apartment in Downtown",
    status: "New",
    source: "Website",
    createdAt: "2023-11-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 987-6543",
    propertyInterest: "Luxury Villa with Pool",
    status: "Contacted",
    source: "Referral",
    createdAt: "2023-11-14T14:20:00Z",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "(555) 456-7890",
    propertyInterest: "Cozy Studio in Historic District",
    status: "Qualified",
    source: "Social Media",
    createdAt: "2023-11-13T11:45:00Z",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "(555) 234-5678",
    propertyInterest: "Spacious Family Home",
    status: "Converted",
    source: "Website",
    createdAt: "2023-11-12T09:00:00Z",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.w@example.com",
    phone: "(555) 876-5432",
    propertyInterest: "Waterfront Condo",
    status: "Lost",
    source: "Property Portal",
    createdAt: "2023-11-11T13:15:00Z",
  },
]

export function LeadsTable() {
  const t = useTranslations('dashboard')
  const [data] = useState<Lead[]>(mockLeads)
  const [searchQuery, setSearchQuery] = useState("")

  const columns: ColumnDef<Lead>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <div className="flex items-center">
          {t('name')}
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
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: t("email"),
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "phone",
      header: t("phone"),
      cell: ({ row }) => <div>{row.getValue("phone")}</div>,
    },
    {
      accessorKey: "propertyInterest",
      header: t("propertyInterest"),
      cell: ({ row }) => <div className="max-w-[200px] truncate">{row.getValue("propertyInterest")}</div>,
    },
    {
      accessorKey: "status",
      header: t("status"),
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge
            variant={
              status === "New"
                ? "default"
                : status === "Contacted"
                  ? "outline"
                  : status === "Qualified"
                    ? "secondary"
                    : status === "Converted"
                      ? "success"
                      : "destructive"
            }
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "source",
      header: t("source"),
      cell: ({ row }) => <div>{row.getValue("source")}</div>,
    },
    {
      accessorKey: "createdAt",
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
        const date = new Date(row.getValue("createdAt"))
        return <div>{date.toLocaleDateString()}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const lead = row.original

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
                    title: "Status updated",
                    description: `${lead.name} marked as contacted.`,
                  })
                }}
              >
                <UserCheck className="mr-2 h-4 w-4" />
                Mark as Contacted
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  window.location.href = `mailto:${lead.email}`
                }}
              >
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  window.location.href = `tel:${lead.phone}`
                }}
              >
                <Phone className="mr-2 h-4 w-4" />
                Call
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => {
                  toast({
                    title: "Lead deleted",
                    description: `${lead.name} has been deleted.`,
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
      <div className="flex items-center">
        <Input
          placeholder="Search leads..."
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
                  No leads found.
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












// "use client"

// import { useState, useEffect } from "react"
// import {
//   type ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table"
// import { ArrowUpDown, MoreHorizontal, UserCheck, Mail, Phone, Trash2 } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { toast } from "@/components/ui/use-toast"
// import { useTranslations } from "next-intl"

// interface Lead {
//   id: string
//   name: string
//   email: string
//   phone: string
//   propertyInterest: string
//   status: "New" | "Contacted" | "Qualified" | "Converted" | "Lost"
//   source: string
//   createdAt: string
// }

// export function LeadsTable() {
//   const t = useTranslations("dashboard")
//   const [data, setData] = useState<Lead[]>([])
//   const [loading, setLoading] = useState(true)
//   const [searchQuery, setSearchQuery] = useState("")

//   useEffect(() => {
//     const fetchLeads = async () => {
//       try {
//         const response = await fetch("/api/leads")
//         if (!response.ok) {
//           throw new Error("Failed to fetch leads")
//         }
//         const leads = await response.json()
//         setData(leads)
//       } catch (error) {
//         console.error("Error fetching leads:", error)
//         toast({
//           title: "Error",
//           description: "Failed to load leads. Please try again.",
//           variant: "destructive",
//         })
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchLeads()
//   }, [])

//   const updateLeadStatus = async (id: string, status: string) => {
//     try {
//       const response = await fetch(`/api/leads/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update lead status")
//       }

//       // Update the local state
//       setData((prevData) => prevData.map((lead) => (lead.id === id ? { ...lead, status: status as any } : lead)))

//       return true
//     } catch (error) {
//       console.error("Error updating lead status:", error)
//       toast({
//         title: "Error",
//         description: "Failed to update lead status. Please try again.",
//         variant: "destructive",
//       })
//       return false
//     }
//   }

//   const deleteLead = async (id: string) => {
//     try {
//       const response = await fetch(`/api/leads/${id}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete lead")
//       }

//       // Remove from local state
//       setData((prevData) => prevData.filter((lead) => lead.id !== id))
//       return true
//     } catch (error) {
//       console.error("Error deleting lead:", error)
//       toast({
//         title: "Error",
//         description: "Failed to delete lead. Please try again.",
//         variant: "destructive",
//       })
//       return false
//     }
//   }

//   const columns: ColumnDef<Lead>[] = [
//     {
//       accessorKey: "name",
//       header: ({ column }) => (
//         <div className="flex items-center">
//           {t("name")}
//           <Button
//             variant="ghost"
//             size="sm"
//             className="-ml-3 h-8 data-[state=open]:bg-accent"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             <ArrowUpDown className="h-4 w-4" />
//           </Button>
//         </div>
//       ),
//       cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
//     },
//     {
//       accessorKey: "email",
//       header: t("email"),
//       cell: ({ row }) => <div>{row.getValue("email")}</div>,
//     },
//     {
//       accessorKey: "phone",
//       header: t("phone"),
//       cell: ({ row }) => <div>{row.getValue("phone")}</div>,
//     },
//     {
//       accessorKey: "propertyInterest",
//       header: t("propertyInterest"),
//       cell: ({ row }) => <div className="max-w-[200px] truncate">{row.getValue("propertyInterest")}</div>,
//     },
//     {
//       accessorKey: "status",
//       header: t("status"),
//       cell: ({ row }) => {
//         const status = row.getValue("status") as string
//         return (
//           <Badge
//             variant={
//               status === "New"
//                 ? "default"
//                 : status === "Contacted"
//                   ? "outline"
//                   : status === "Qualified"
//                     ? "secondary"
//                     : status === "Converted"
//                       ? "success"
//                       : "destructive"
//             }
//           >
//             {status}
//           </Badge>
//         )
//       },
//     },
//     {
//       accessorKey: "source",
//       header: t("source"),
//       cell: ({ row }) => <div>{row.getValue("source")}</div>,
//     },
//     {
//       accessorKey: "createdAt",
//       header: ({ column }) => (
//         <div className="flex items-center">
//           {t("date")}
//           <Button
//             variant="ghost"
//             size="sm"
//             className="-ml-3 h-8 data-[state=open]:bg-accent"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             <ArrowUpDown className="h-4 w-4" />
//           </Button>
//         </div>
//       ),
//       cell: ({ row }) => {
//         const date = new Date(row.getValue("createdAt"))
//         return <div>{date.toLocaleDateString()}</div>
//       },
//     },
//     {
//       id: "actions",
//       cell: ({ row }) => {
//         const lead = row.original

//         return (
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="h-8 w-8 p-0">
//                 <span className="sr-only">Open menu</span>
//                 <MoreHorizontal className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>Actions</DropdownMenuLabel>
//               <DropdownMenuItem
//                 onClick={async () => {
//                   const success = await updateLeadStatus(lead.id, "Contacted")
//                   if (success) {
//                     toast({
//                       title: "Status updated",
//                       description: `${lead.name} marked as contacted.`,
//                     })
//                   }
//                 }}
//               >
//                 <UserCheck className="mr-2 h-4 w-4" />
//                 Mark as Contacted
//               </DropdownMenuItem>
//               <DropdownMenuItem
//                 onClick={() => {
//                   window.location.href = `mailto:${lead.email}`
//                 }}
//               >
//                 <Mail className="mr-2 h-4 w-4" />
//                 Send Email
//               </DropdownMenuItem>
//               <DropdownMenuItem
//                 onClick={() => {
//                   window.location.href = `tel:${lead.phone}`
//                 }}
//               >
//                 <Phone className="mr-2 h-4 w-4" />
//                 Call
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem
//                 className="text-destructive focus:text-destructive"
//                 onClick={async () => {
//                   const success = await deleteLead(lead.id)
//                   if (success) {
//                     toast({
//                       title: "Lead deleted",
//                       description: `${lead.name} has been deleted.`,
//                     })
//                   }
//                 }}
//               >
//                 <Trash2 className="mr-2 h-4 w-4" />
//                 Delete
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         )
//       },
//     },
//   ]

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     state: {
//       globalFilter: searchQuery,
//     },
//     onGlobalFilterChange: setSearchQuery,
//   })

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
//           <p className="text-muted-foreground">Loading leads...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center">
//         <Input
//           placeholder="Search leads..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="max-w-sm"
//         />
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow key={row.id}>
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={columns.length} className="h-24 text-center">
//                   No leads found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="flex items-center justify-end space-x-2">
//         <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
//           Previous
//         </Button>
//         <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
//           Next
//         </Button>
//       </div>
//     </div>
//   )
// }
