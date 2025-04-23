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
  FileText,
  Download,
  Send,
  CheckCircle,
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
import { formatCurrency } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: string;
  email: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue" | "Draft";
  dueDate: string;
  issuedDate: string;
}

export function InvoicesTable() {
  const { locale } = useParams();
  const t = useTranslations("adminInvoice");
  const isRtl = locale === "ar";

  const [data, setData] = useState<Invoice[]>([
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
    // ... other mock invoices
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const columns: ColumnDef<Invoice>[] = [
    {
      accessorKey: "invoiceNumber",
      header: t("columns.invoiceNumber"),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("invoiceNumber")}</div>
      ),
    },
    {
      accessorKey: "customer",
      header: ({ column }) => (
        <div className="flex items-center">
          {t("columns.customer")}
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
          <div className="text-xs text-muted-foreground">
            {row.original.email}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <div className="flex items-center">
          {t("columns.amount")}
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
        <div className="font-medium">
          {formatCurrency(row.getValue("amount"))}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: t("columns.status"),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const statusTranslation = t(`status.${status.toLowerCase()}` as const);
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
            {statusTranslation}
          </Badge>
        );
      },
    },
    {
      accessorKey: "dueDate",
      header: ({ column }) => (
        <div className="flex items-center">
          {t("columns.dueDate")}
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
        const date = new Date(row.getValue("dueDate"));
        return <div>{date.toLocaleDateString(locale)}</div>;
      },
    },
    {
      accessorKey: "issuedDate",
      header: t("columns.issuedDate"),
      cell: ({ row }) => {
        const date = new Date(row.getValue("issuedDate"));
        return <div>{date.toLocaleDateString(locale)}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const invoice = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("actions.menuTitle")}</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  toast({
                    title: t("toast.viewed"),
                    description: `${t("toast.viewed")} ${
                      invoice.invoiceNumber
                    }.`,
                  });
                }}
              >
                <FileText className="mr-2 h-4 w-4" />
                {t("actions.view")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  toast({
                    title: t("toast.downloaded"),
                    description: `${t("toast.downloaded")} ${
                      invoice.invoiceNumber
                    }.`,
                  });
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                {t("actions.download")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  toast({
                    title: t("toast.sent"),
                    description: `${t("toast.sent")} ${
                      invoice.invoiceNumber
                    } ${t("toast.to")} ${invoice.email}.`,
                  });
                }}
              >
                <Send className="mr-2 h-4 w-4" />
                {t("actions.send")}
              </DropdownMenuItem>
              {invoice.status !== "Paid" && (
                <DropdownMenuItem
                  onClick={() => {
                    const updatedData = data.map((item) =>
                      item.id === invoice.id
                        ? { ...item, status: "Paid" }
                        : item
                    );
                    setData(updatedData);
                    toast({
                      title: t("toast.markedPaid"),
                      description: `${t("toast.markedPaid")} ${
                        invoice.invoiceNumber
                      }.`,
                    });
                  }}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  {t("actions.markPaid")}
                </DropdownMenuItem>
              )}
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
    <div className="space-y-4" dir={isRtl ? "rtl" : "ltr"}>
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
                  {t("noInvoices")}
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
