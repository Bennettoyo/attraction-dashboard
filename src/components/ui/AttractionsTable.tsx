import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { ResponsiveContainer } from "recharts";
import type { Attraction, AttractionStatus } from "@/api/stats";

const columns: ColumnDef<Attraction>[] = [
  {
    accessorKey: "name",
    header: "Attraction",
    filterFn: "includesString",
  },
  {
    accessorKey: "staffAssigned",
    header: "Staff",
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ getValue }) => {
      const value = getValue<number>();
      if (value === undefined || value === null) return "—";

      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: 0,
      }).format(value);
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: "equals",
    cell: ({ getValue }) => {
      const status = getValue<AttractionStatus>();

      const styles: Record<AttractionStatus, string> = {
        open: "bg-green-100 text-green-800",
        delayed: "bg-yellow-100 text-yellow-800",
        closed: "bg-red-100 text-red-800",
      };

      return (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "waitTime",
    header: "Wait (min)",
    cell: ({ getValue }) => {
      const value = getValue<number | null>();
      return value === null ? "—" : `${value} min`;
    },
  },
  {
    accessorKey: "lastUpdated",
    header: "Updated",
    cell: ({ getValue }) => new Date(getValue<string>()).toLocaleTimeString(),
  },
];

interface AttractionsTableProps {
  className?: string;
  attractionsTableData: Attraction[];
}

export function AttractionsTable({
  className,
  attractionsTableData,
}: AttractionsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState<Attraction[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: data,
    columns,
    state: { sorting, columnFilters },
    getRowId: (row) => row.id,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

 function downloadCSV(table: ReturnType<typeof useReactTable>) {
  // headers
  const headers = table.getAllColumns().map(col => col.id);

  // rows
  const rows = table.getRowModel().rows.map(row =>
    row.getVisibleCells().map(cell => {
      const colId = cell.column.id;

      // Get raw value instead of JSX
      const rawValue = row.original[colId as keyof typeof row.original];

      // format revenue nicely if needed
      if (colId === "revenue" && typeof rawValue === "number") {
        return `"£${rawValue.toLocaleString("en-GB")}"`;
      }

      return `"${rawValue ?? ""}"`;
    })
  );

  const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "attractions.csv");
  link.click();
}


  useEffect(() => {
    setData(attractionsTableData); // whenever prop changes, update state
  }, [attractionsTableData]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Attractions</CardTitle>
        <CardDescription>
          Statistics showing various details about the business
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer
            className="overflow-x-auto"
            width="100%"
            height="100%"
          >
            <div className="flex gap-4 mb-4">
              {/* Name Filter */}
              <input
                type="text"
                placeholder="Filter by name"
                value={
                  (table.getColumn("name")?.getFilterValue() as string) ?? ""
                }
                onChange={(e) =>
                  table.getColumn("name")?.setFilterValue(e.target.value)
                }
                className="border px-2 py-1 rounded"
              />

              {/* Status Filter */}
              <select
                value={
                  (table.getColumn("status")?.getFilterValue() as string) ?? ""
                }
                onChange={(e) =>
                  table
                    .getColumn("status")
                    ?.setFilterValue(e.target.value || undefined)
                }
                className="border px-2 py-1 rounded"
              >
                <option value="">All Status</option>
                <option value="open">Open</option>
                <option value="delayed">Delayed</option>
                <option value="closed">Closed</option>
              </select>
              <button
                className="px-3 py-1 bg-green-600 text-white rounded whitespace-nowrap"
                onClick={() => downloadCSV(table)}
              >
                Export CSV
              </button>
            </div>
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id}>
                    {hg.headers.map((header) => (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className="px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer select-none whitespace-nowrap"
                      >
                        <div className="flex items-center gap-1">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getIsSorted() === "asc" && " ▲"}
                          {header.column.getIsSorted() === "desc" && " ▼"}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`border-t ${
                      row.original.status !== "open"
                        ? "bg-orange-50"
                        : "bg-white"
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
