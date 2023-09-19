import React from "react";
import "../styles/components/pagination.scss";

import Button from "./Button";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        label={"Prev"}
      >
        -
      </Button>
      <div className="page-number">{currentPage}</div>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        label={"Next"}
      >
        +
      </Button>
    </div>
  );
};

export default Pagination;
