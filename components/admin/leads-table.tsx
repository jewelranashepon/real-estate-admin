"use client";

import { useState } from "react";
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
  UserCheck,
  Mail,
  Phone,
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
import { useTranslations } from "next-intl";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyInterest: string;
  status: "New" | "Contacted" | "Qualified" | "Converted" | "Lost";
  source: string;
  createdAt: string;
}

export function LeadsTable() {
  const t = useTranslations("dashboard.adminLeads");
  const [data] = useState<Lead[]>(() => [
    {
      id: "1",
      name: t("mockLeads.john.name"),
      email: "abdulkuddus@example.com",
      phone: t("mockLeads.john.phone"),
      propertyInterest: t("mockLeads.john.propertyInterest"),
      status: t("mockLeads.john.status") as Lead["status"],
      source: t("mockLeads.john.source"),
      createdAt: "2023-11-15T10:30:00Z",
    },
    {
      id: "2",
      name: t("mockLeads.sarah.name"),
      email: "julfiqar@example.com",
      phone: t("mockLeads.sarah.phone"),
      propertyInterest: t("mockLeads.sarah.propertyInterest"),
      status: t("mockLeads.sarah.status") as Lead["status"],
      source: t("mockLeads.sarah.source"),
      createdAt: "2023-11-14T14:20:00Z",
    },
    {
      id: "3",
      name: t("mockLeads.michael.name"),
      email: "saleh@example.com",
      phone: t("mockLeads.michael.phone"),
      propertyInterest: t("mockLeads.michael.propertyInterest"),
      status: t("mockLeads.michael.status") as Lead["status"],
      source: t("mockLeads.michael.source"),
      createdAt: "2023-11-13T11:45:00Z",
    },
    {
      id: "4",
      name: t("mockLeads.emily.name"),
      email: "salman@example.com",
      phone: t("mockLeads.emily.phone"),
      propertyInterest: t("mockLeads.emily.propertyInterest"),
      status: t("mockLeads.emily.status") as Lead["status"],
      source: t("mockLeads.emily.source"),
      createdAt: "2023-11-12T09:00:00Z",
    },
    {
      id: "5",
      name: t("mockLeads.david.name"),
      email: "sulaiman@example.com",
      phone: t("mockLeads.david.phone"),
      propertyInterest: t("mockLeads.david.propertyInterest"),
      status: t("mockLeads.david.status") as Lead["status"],
      source: t("mockLeads.david.source"),
      createdAt: "2023-11-11T13:15:00Z",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const columns: ColumnDef<Lead>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <div className="flex items-center">
          {t("columns.name")}
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
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: t("columns.email"),
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "phone",
      header: t("columns.phone"),
      cell: ({ row }) => <div>{row.getValue("phone")}</div>,
    },
    {
      accessorKey: "propertyInterest",
      header: t("columns.propertyInterest"),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate">
          {row.getValue("propertyInterest")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: t("columns.status"),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge
            variant={
              status === t("status.new")
                ? "default"
                : status === t("status.contacted")
                ? "outline"
                : status === t("status.qualified")
                ? "secondary"
                : status === t("status.converted")
                ? "success"
                : "destructive"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "source",
      header: t("columns.source"),
      cell: ({ row }) => <div>{row.getValue("source")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <div className="flex items-center">
          {t("columns.date")}
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
        const lead = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">{t("actions.openMenu")}</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("actions.label")}</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  toast({
                    title: t("toast.statusUpdated.title"),
                    description: t("toast.statusUpdated.description", {
                      name: lead.name,
                    }),
                  });
                }}
              >
                <UserCheck className="mr-2 h-4 w-4" />
                {t("actions.markContacted")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  window.location.href = `mailto:${lead.email}`;
                }}
              >
                <Mail className="mr-2 h-4 w-4" />
                {t("actions.sendEmail")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  window.location.href = `tel:${lead.phone}`;
                }}
              >
                <Phone className="mr-2 h-4 w-4" />
                {t("actions.call")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => {
                  toast({
                    title: t("toast.leadDeleted.title"),
                    description: t("toast.leadDeleted.description", {
                      name: lead.name,
                    }),
                  });
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {t("actions.delete")}
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

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Input
          placeholder={t("searchPlaceholder")}
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
                <TableRow key={row.id}>
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
                  {t("noLeadsFound")}
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
          {t("pagination.previous")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {t("pagination.next")}
        </Button>
      </div>
    </div>
  );
}
