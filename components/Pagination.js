import React from 'react'

const Pagination = ({
  currentPage = 1,
  totalPages = 0,
  onPageChange,
}) => {
  if (!totalPages || totalPages <= 1) return null;

  const handlePageChange = (page) => {
    if (!onPageChange) return;
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
        <ul id="pagination">
            <li>
              <button type="button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>«</button>
            </li>
            {pages.map((page) => (
              <li key={page}>
                <button
                  type="button"
                  onClick={() => handlePageChange(page)}
                  className={page === currentPage ? 'active' : ''}
                >
                  {page}
                </button>
              </li>
            ))}
            <li>
              <button type="button" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>»</button>
            </li>
        </ul>
    </div>
  )
}

export default Pagination
