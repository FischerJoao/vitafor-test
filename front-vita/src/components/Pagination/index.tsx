type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  return (
    <div className="d-flex flex-wrap justify-content-center gap-2 mt-4 py-4">
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`btn ${page === currentPage ? "btn-dark-selected" : "btn-outline-dark"}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Proxima
      </button>
    </div>
  );
};
