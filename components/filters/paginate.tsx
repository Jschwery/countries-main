'use client';
import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { useState } from 'react';

export type PaginateType = {
  count: number;
  page: number;
  rowsPerPage: number;
};

export default function TablePaginationDemo({ resultCount }: { resultCount: number }) {
  const [count, setCount] = useState(resultCount);
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  React.useEffect(() => {
    setCount(resultCount);
  }, [resultCount]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
