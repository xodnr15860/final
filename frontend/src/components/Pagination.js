import React from "react";
import "./Pagination.css";

const Pagination = ({ pageInfo, onPageChange }) => {
  const { startPage, endPage, maxPage, currentPage } = pageInfo;
  const pageNumbers = [];

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}> &lt; </button>
      )}

      <div className="page-numbers-container">
        <div className="page-numbers">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={pageNumber === currentPage ? "active" : ""}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>

      {currentPage < maxPage && (
        <button onClick={() => onPageChange(currentPage + 1)}> &gt; </button>
      )}
    </div>
  );
};

export default Pagination;