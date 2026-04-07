"use client";

import ReactPaginate from "react-paginate";
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  currentPage: number; 
  onPageChange: (selectedItem: { selected: number }) => void;
}

export const Pagination = ({ pageCount, currentPage, onPageChange }: PaginationProps) => {
  return (
    <ReactPaginate
      forcePage={currentPage - 1} 
      pageCount={pageCount}
      onPageChange={onPageChange}
      
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageClassName={css.pageItem}
      previousClassName={css.pageItem}
      nextClassName={css.pageItem}
      breakClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousLinkClassName={css.pageLink}
      nextLinkClassName={css.pageLink}
      breakLinkClassName={css.pageLink}
    />
  );
};