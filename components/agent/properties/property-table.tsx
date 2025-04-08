"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Pencil, Trash2, Eye, Building2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Sample property data
const properties = [
  {
    id: "1",
    title: "Luxury Condo in Downtown",
    address: "123 Main St, Downtown",
    price: 450000,
    type: "Condo",
    status: "For Sale",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    views: 120,
    leads: 24,
    createdAt: "2023-10-15",
  },
  {
    id: "2",
    title: "Family Home with Garden",
    address: "456 Oak Ave, Suburban",
    price: 650000,
    type: "House",
    status: "For Sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 2400,
    views: 98,
    leads: 13,
    createdAt: "2023-11-02",
  },
  {
    id: "3",
    title: "Beach Villa with Ocean View",
    address: "789 Shore Dr, Beachfront",
    price: 1200000,
    type: "Villa",
    status: "For Sale",
    bedrooms: 5,
    bathrooms: 4,
    area: 3500,
    views: 86,
    leads: 18,
    createdAt: "2023-12-10",
  },
  {
    id: "4",
    title: "Modern City Apartment",
    address: "101 Urban St, Downtown",
    price: 2500,
    type: "Apartment",
    status: "For Rent",
    bedrooms: 1,
    bathrooms: 1,
    area: 850,
    views: 99,
    leads: 15,
    createdAt: "2024-01-05",
  },
  {
    id: "5",
    title: "Suburban House with Pool",
    address: "202 Maple Rd, Suburban",
    price: 750000,
    type: "House",
    status: "For Sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    views: 85,
    leads: 11,
    createdAt: "2024-01-20",
  },
]

export function PropertyTable() {
  const [page, setPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(properties.length / itemsPerPage)

  const formatPrice = (price: number, status: string) => {
    return status === "For Rent" ? `$${price.toLocaleString()}/mo` : `$${price.toLocaleString()}`
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Beds/Baths</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Leads</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">{property.title}</div>
                      <div className="text-xs text-muted-foreground">{property.address}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{property.type}</TableCell>
                <TableCell>
                  <Badge variant={property.status === "For Sale" ? "default" : "secondary"}>{property.status}</Badge>
                </TableCell>
                <TableCell>{formatPrice(property.price, property.status)}</TableCell>
                <TableCell>
                  {property.bedrooms} / {property.bathrooms}
                </TableCell>
                <TableCell>{property.views}</TableCell>
                <TableCell>{property.leads}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/properties/${property.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/properties/${property.id}/edit`}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (page > 1) setPage(page - 1)
              }}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setPage(i + 1)
                }}
                isActive={page === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (page < totalPages) setPage(page + 1)
              }}
              className={page === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

