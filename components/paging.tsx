"use client"

import { useRouter } from "next/navigation"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationLink,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { PagingProps } from "@/lib/types"

const Paging = ({ currentPage, totalPages }: PagingProps) => {
  const router = useRouter()

  const onPageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    router.push(`?page=${page}`)
  }

  const renderPages = () => {
    const pages = []

    // Always show Previous
    pages.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          href="#"
          className="px-4 py-2"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </PaginationPrevious>
      </PaginationItem>
    )

    // Show first pages
    if (currentPage > 1) {
      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)

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
          </PaginationItem>
        )
      }
    }

    // Show ellipsis if needed
    if (currentPage > 4 || currentPage < totalPages - 3) {
      pages.push(
        <PaginationItem key="ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      )
    }

    // Show last page if not near end
    if (currentPage < totalPages - 2) {
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
        </PaginationItem>
      )
    }

    // Always show Next
    pages.push(
      <PaginationItem key="next">
        <PaginationNext
          href="#"
          className="px-4 py-2"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </PaginationNext>
      </PaginationItem>
    )

    return pages
  }

  return (
    <Pagination>
      <PaginationContent>{renderPages()}</PaginationContent>
    </Pagination>
  )
}

export default Paging
