// src/Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pageRange = 2; // Сколько номеров показывать слева и справа от текущей

  const start = Math.max(1, currentPage - pageRange);
  const end = Math.min(totalPages, currentPage + pageRange);

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>&laquo; Назад</button>
      )}

      {pages.map((page) =>
        page === currentPage ? (
          <span key={page} className="current-page">{page}</span>
        ) : (
          <button key={page} onClick={() => onPageChange(page)}>{page}</button>
        )
      )}

      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>Вперёд &raquo;</button>
      )}
    </div>
  );
};

export default Pagination;
