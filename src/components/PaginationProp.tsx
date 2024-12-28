import React from 'react';

interface PaginationProps {
  page: number;
  isFetching: boolean;
  data: {
    pagination: {
      pages: number;
    };
  };
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, isFetching, data, setPage }) => {
  return (
    data.pagination && (
      <div className="pagination">
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1 || isFetching}
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="mx-4">
          Page {page} of {data.pagination.pages}
        </span>
        <button
          onClick={() => setPage(Math.min(data.pagination.pages, page + 1))}
          disabled={page === data.pagination.pages || isFetching}
          className="px-4 py-2 ml-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    )
  );
};

export default Pagination;
