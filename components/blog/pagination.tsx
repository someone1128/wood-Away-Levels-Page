import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  lang: string;
}

export function Pagination({ currentPage, totalPages, lang }: PaginationProps) {
  return (
    <div className="flex justify-center gap-4 mt-8">
      {currentPage > 1 && (
        <Link
          href={`/${lang}/blog/${currentPage - 1}`}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Previous
        </Link>
      )}
      {currentPage < totalPages && (
        <Link
          href={`/${lang}/blog/${currentPage + 1}`}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Next
        </Link>
      )}
    </div>
  );
}
