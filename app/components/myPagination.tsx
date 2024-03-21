'use client'
import React, { useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';

import 'react-responsive-pagination/themes/minimal.css';


function MyPagination({ totalPages, currentPage }: { totalPages: number, currentPage: number }) {
  const [newPage, setnewPage] = useState(currentPage);


    function handlePageChange(page: React.SetStateAction<number>) {
      // setnewPage(page);
  }

  return (
    <>
      <ResponsivePagination
        total={totalPages} 
        current={newPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default MyPagination;
