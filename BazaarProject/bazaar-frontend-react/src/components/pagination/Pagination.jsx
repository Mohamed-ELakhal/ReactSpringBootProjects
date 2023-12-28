import React from 'react';
import { useNavigate } from 'react-router-dom';
const Pagination = ({ pageNumber, totalPages}) => {
  const pageArray = Array.from({ length: totalPages }, (_, index) => index + 1);
  const navigate = useNavigate();
  const pageChanged=(number)=>{
    navigate({
        pathname: '/',
        search: `pageNumber=${number}`,
      })
  }

  return (
    <div className="d-flex justify-content-center" style={{ marginTop: '20px' }}>
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              type="button"
              onClick={() => pageChanged(pageNumber - 1)}
              disabled={pageNumber === 1}
              aria-label="Previous"
            >
              <span aria-hidden="true"><i className="fas fa-chevron-left"></i></span>
              <span className="visually-hidden">Previous</span>
            </button>
          </li>
          {pageArray.map((item) => (
            <li key={item} className={`page-item ${item === pageNumber ? 'active' : ''}`}>
              <button
                type="button"
                className="page-link"
                onClick={() => pageChanged(item)}
              >
                {item}
              </button>
            </li>
          ))}

          <li className="page-item">
            <button
              className="page-link"
              type="button"
              onClick={() => pageChanged(pageNumber + 1)}
              disabled={pageNumber === totalPages}
              aria-label="Next"
            >
              <span aria-hidden="true"><i className="fas fa-chevron-right"></i></span>
              <span className="visually-hidden">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
