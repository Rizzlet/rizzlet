import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import of router so that it will update URL with each page
import { BrowserRouter as Route, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface PaginationProps {
  currentPosts: number;
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
}

function Pagination() {
  const [model, setModelData] = useState<[]>([]);
 //pagination const
 const [currentPage, setCurrentPage] = useState(
  parseInt(localStorage.getItem("currentPage") || "1", 10) //local storage is to save page for refresh
);
const [postsPerPage] = useState(5); //how many are in each page
const { page } = useParams<{ page: string }>();
const navigate = useNavigate();

//To stay on the same page when switching pages
useEffect(() => {
  localStorage.setItem("currentPage", currentPage.toString());
}, [currentPage]);


//Get current Posts
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = model.slice(indexOfFirstPost, indexOfLastPost);

//Change Page
const paginate = (pageNumber: number) => {
  setCurrentPage(pageNumber);
  localStorage.setItem("currentPage", pageNumber.toString());
  navigate(`/${model}/${pageNumber}`);
};

}
// const Pagination: React.FC<PaginationProps> = ({
//   postsPerPage,
//   totalPosts,
//   paginate,
// }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <nav>
//       <ul className="pagination">
//         {pageNumbers.map((number) => (
//           <li key={number} className="page-item">
//             <Link to={`/overview/${number}`} className="Page-link" onClick={() => paginate(number)}>
//                 {number}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

export default Pagination;
