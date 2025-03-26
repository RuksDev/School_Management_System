"use client";

import { ITEM_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const router = useRouter();

  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0
  const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled={!hasPrev}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 ease-in-out hover:bg-slate-300 hover:scale-105 active:scale-95 cursor-pointer"
        onClick={() => {
          changePage(page - 1);
        }}
      >
        Prev
      </button>
      <div className="text-sm flex items-center gap-2">
        {Array.from(
          { length: Math.ceil(count / ITEM_PER_PAGE) },
          (_, index) => {
            const pageIndex = index + 1;
            return (
              <button
                key={pageIndex}
                disabled={page === pageIndex}
                className={`px-2 rounded-sm transition duration-200 ease-in-out ${
                  page === pageIndex
                    ? "bg-ruksSkyBlue text-white cursor-default"
                    : "bg-slate-200 text-gray-700 hover:bg-slate-300 hover:scale-105 active:scale-95 cursor-pointer"
                }`}
                onClick={() => {
                  changePage(pageIndex);
                }}
              >
                {pageIndex}
              </button>
            );
          },
        )}
      </div>
      <button
        disabled={!hasNext}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 ease-in-out hover:bg-slate-300 hover:scale-105 active:scale-95 cursor-pointer"
        onClick={() => {
          changePage(page + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
