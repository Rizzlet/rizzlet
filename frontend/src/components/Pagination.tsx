import React from "react";
import { Link } from "react-router-dom";

interface PaginationProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  postsPerPage,
  totalPosts,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <Link to={`/overview/${number}`} className="Page-link">
            <a onClick={() => paginate(number)} href="#" className="Page-link">
              {number}
            </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
