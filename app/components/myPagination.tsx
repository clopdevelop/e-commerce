'use client'
import React, { useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import 'react-responsive-pagination/themes/minimal.css';


function MyPagination({ totalPages, currentPage }: { totalPages: number, currentPage: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();


    function handlePageChange(page: React.SetStateAction<number>) {
      const pagina = page.toString();
      const params = new URLSearchParams(searchParams);
    params.set('page', pagina);
      replace(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <ResponsivePagination
        total={totalPages} 
        current={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default MyPagination;
