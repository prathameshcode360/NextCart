import React from "react";
import styles from "./Pagination.module.css";

function Pagination({ currentPage, totalPages, pageNumbers, onPageChange }) {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.navBtn}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}>
        Previous
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`${styles.pageBtn} ${
            currentPage === page ? styles.activePage : ""
          }`}
          onClick={() => onPageChange(page)}>
          {page}
        </button>
      ))}

      <button
        className={styles.navBtn}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
