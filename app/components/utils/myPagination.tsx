"use client";
import React, { useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import "react-responsive-pagination/themes/minimal.css";

function MyPagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  
  const pathname = usePathname();
  const { replace } = useRouter();

  function handlePageChange(page: React.SetStateAction<number>) {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default MyPagination;
