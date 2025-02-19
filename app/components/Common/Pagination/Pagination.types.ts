export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  size?: "xs" | "sm" | "md";
}
