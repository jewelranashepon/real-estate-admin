"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
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
  ExternalLink,
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

interface Payment {
  id: string;
  transactionId: string;
  customer: string;
  email: string;
  amount: number;
  date: string;
  status: string;
  method: string;
}

const mockPayments: Payment[] = [
  {
    id: "1",
    transactionId: "TXN-12345",
    customer: "جون سميث",
    email: "mohammad@example.com",
    amount: 350000,
    status: "مكتمل",
    method: "بطاقة ائتمان",
    date: "2023-11-15T10:30:00Z",
  },
  {
    id: "2",
    transactionId: "TXN-67890",
    customer: "سارة جونسون",
    email: "sarah@example.com",
    amount: 125000,
    status: "قيد الانتظار",
    method: "تحويل بنكي",
    date: "2023-11-14T14:20:00Z",
  },
  {
    id: "3",
    transactionId: "TXN-24680",
    customer: "مايكل براون",
    email: "younus@example.com",
    amount: 18000,
    status: "مكتمل",
    method: "باي بال",
    date: "2023-11-13T11:45:00Z",
  },
  {
    id: "4",
    transactionId: "TXN-13579",
    customer: "إميلي ديفيس",
    email: "ali@example.com",
    amount: 75000,
    status: "فشل",
    method: "بطاقة ائتمان",
    date: "2023-11-12T09:00:00Z",
  },
  {
    id: "5",
    transactionId: "TXN-97531",
    customer: "ديفيد ويلسون",
    email: "abdulzabbar@example.com",
    amount: 62000,
    status: "تم الاسترداد",
    method: "نقداً",
    date: "2023-11-11T13:15:00Z",
  },
];

export function PaymentsTable() {
  const t = useTranslations("adminPayments");
  const { locale } = useParams();
  const isRtl = locale === "ar";
  const [data] = useState<Payment[]>(mockPayments);
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusTranslation = (status: string) => {
    switch (status) {
      case "Completed":
        return t("status.completed");
      case "Pending":
        return t("status.pending");
      case "Failed":
        return t("status.failed");
      case "Refunded":
        return t("status.refunded");
      default:
        return status;
    }
  };

  const getMethodTranslation = (method: string) => {
    switch (method) {
      case "Credit Card":
        return t("methods.creditCard");
      case "Bank Transfer":
        return t("methods.bankTransfer");
      case "PayPal":
        return t("methods.paypal");
      case "Cash":
        return t("methods.cash");
      default:
        return method;
    }
  };

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "transactionId",
      header: t("columns.transactionId"),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("transactionId")}</div>
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
            {getStatusTranslation(status)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "method",
      header: t("columns.paymentMethod"),
      cell: ({ row }) => (
        <div>{getMethodTranslation(row.getValue("method") as string)}</div>
      ),
    },
    {
      accessorKey: "date",
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
        const date = new Date(row.getValue("date"));
        return <div>{date.toLocaleDateString(locale as string)}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">{t("actions.openMenu")}</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isRtl ? "start" : "end"}>
              <DropdownMenuLabel>{t("actions.title")}</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  toast({
                    title: t("toast.receiptGenerated.title"),
                    description: t("toast.receiptGenerated.description", {
                      transactionId: payment.transactionId,
                    }),
                  });
                }}
              >
                <FileText className="mr-2 h-4 w-4" />
                {t("actions.viewReceipt")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  toast({
                    title: t("toast.receiptDownloaded.title"),
                    description: t("toast.receiptDownloaded.description", {
                      transactionId: payment.transactionId,
                    }),
                  });
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                {t("actions.downloadReceipt")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  toast({
                    title: t("toast.paymentDetails.title"),
                    description: t("toast.paymentDetails.description", {
                      transactionId: payment.transactionId,
                    }),
                  });
                }}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                {t("actions.viewTransaction")}
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
    <div className="space-y-4" dir={isRtl ? "rtl" : "ltr"}>
      <div className="flex items-center">
        <Input
          placeholder={t("search.placeholder")}
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
                  {t("table.noPayments")}
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
