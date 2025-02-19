import { ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: ReactNode;
  render: (item: T) => ReactNode;
  width?: string;
  sortable?: boolean;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  className?: string;
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  onSort?: (column: string) => void;
}
