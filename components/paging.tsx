"use client";

import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationLink,
  PaginationPrevious,
} from "@/components/ui/pagination";
// types
import { PagingProps } from "@/lib/types";

const Paging = ({ currentPage, totalPages }: PagingProps) => {
  const router = useRouter();

  const onPageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    router.push(`?page=${page}`);
  };

  const renderPages = () => {
    const pages = [];

    // Previous
    pages.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          href="#"
          className="px-4 py-2"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </PaginationPrevious>
      </PaginationItem>,
    );

    // 1
    pages.push(
      <PaginationItem key={1}>
        <PaginationLink
          href="#"
          className="px-4 py-2"
          isActive={currentPage === 1}
          onClick={() => onPageChange(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>,
    );

    // Left ellipsis
    if (currentPage > 3) {
      pages.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    // Middle pages
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            className="px-4 py-2"
            isActive={currentPage === i}
            onClick={() => onPageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    // Right ellipsis
    if (currentPage < totalPages - 2) {
      pages.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    // Last page
    if (totalPages > 1) {
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            className="px-4 py-2"
            isActive={currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    // Next
    pages.push(
      <PaginationItem key="next">
        <PaginationNext
          href="#"
          className="px-4 py-2"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </PaginationNext>
      </PaginationItem>,
    );

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>{renderPages()}</PaginationContent>
    </Pagination>
  );
};

export default Paging;
