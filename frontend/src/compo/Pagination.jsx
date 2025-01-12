import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate an array of page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex justify-center items-center gap-4 mt-4 overflow-x-auto scrollbar-hide">
      {/* Previous Button */}
      <button
        className={`px-4 py-2 rounded ${
          currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {/* Page Numbers */}
      <div className="flex gap-2">
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`px-3 py-2 rounded ${
              currentPage === page ? "bg-orange-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        className={`px-4 py-2 rounded ${
          currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
