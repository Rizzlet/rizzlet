import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Pages } from "../components/Overview";
//import of router so that it will update URL with each page
import { useParams } from "react-router-dom";

interface Question {
  _id: string;
  type: string;
  question: string;
  answer: boolean;
  createdBy: {
    firstName: string;
    lastName: string;
  };
}

function QuestionOverview() {
  const [questions, setQuestionData] = useState<Question[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const { page = 1, limit = postsPerPage } = useParams();

  useEffect(() => {
    setCurrentPage(Number(page));
  }, [page]);

  useEffect(() => {
    fetchQuestions(currentPage, Number(limit)).then((result) => {
      if (result && result.paginatedData) {
        setQuestionData(result.paginatedData);
        setTotalPages(Math.ceil(result.totalQuestions / postsPerPage)); 
        console.log("total question:", result.totalQuestions)
      }
    });
  }, [currentPage, limit]);
  console.log("total pages: ", totalPages);

  async function fetchQuestions(page: number, limit: number) {
    try {
      const response = await axios.get<any>(
        `${process.env.REACT_APP_BACKEND_URL}/api/paginate?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.log("fetch error: ", error);
      return { paginatedData: [], totalQuestions: 0 };
    }
  }
 //makes sure that the base line is 1 and not 0;
//  if (totalPages === 0) {
//    totalPages = 1;
//  }

  //Change Page
  // const paginate = (pageNumber: number) => {
  //   setCurrentPage(pageNumber);
  //   // localStorage.setItem("currentPage", pageNumber.toString());
  //   // navigate(`/overview/${pageNumber}`);
  // };
  console.log("cur pages: ", currentPage);


  return (
    <div className="container">
      <Table questionData={questions} />
      <Pages
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        totalPages={totalPages}
        onPrevClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        onNextClick={() => setCurrentPage((prev) => prev + 1)}
      />
    </div>
  );
}

export default QuestionOverview;