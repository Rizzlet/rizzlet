import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Pages } from "../components/Overview";
//import of router so that it will update URL with each page
import { useParams, useSearchParams } from "react-router-dom";

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
  const [totalPages, setTotalPages] = useState(1); //determines # of total pages
  const [currentPage, setCurrentPage] = useState(1); //keeps track of current page
  const postsPerPage = 5;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || postsPerPage;

  //get classId from the url
  const { id } = useParams();
  // console.log("classId", id); 
  const classId = id;

  //sets current page
  useEffect(() => {
    setCurrentPage(Number(page));
  }, [page]);

  //assigns questions and totalPages from the response data
  useEffect(() => {
    fetchQuestions(currentPage, Number(limit)).then((result) => {
      if (result && result.paginatedData) {
        setQuestionData(result.paginatedData);
        if (Math.ceil(result.totalQuestions / postsPerPage) === 0) {
          setTotalPages(1);
        } else {
          setTotalPages(Math.ceil(result.totalQuestions / postsPerPage));
          // console.log("total question:", result.totalQuestions)
        }
      }
    });
  }, [currentPage, limit]);
  // console.log("total pages: ", totalPages);

  //fetches paginated data and the total pages of all questions
  async function fetchQuestions(page: number, limit: number) {
    try {
      const response = await axios.get<any>(
        //fetches paginated data and the total pages of all questions
        `${process.env.REACT_APP_BACKEND_URL}/api/paginate/question?classId=${classId}&page=${page}&limit=${limit}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.log("fetch error: ", error);
      return { paginatedData: [], totalQuestions: 0 };
    }
  }

  // decides what previous click does
  const handlePrevClick = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1)); //sets the current page
    if (currentPage > 1) {
      searchParams.set("page", (currentPage - 1).toString()); //navigates to the prev page
      setSearchParams(searchParams);
    }
  };

  //decides what next click does
  const handleNextClick = () => {
    setCurrentPage((prev) => prev + 1); //sets the current page
    if (currentPage < totalPages) {
      searchParams.set("page", (currentPage + 1).toString()); //navigates to the next page 
      setSearchParams(searchParams);
    }
  };

  return (
    <div className="container">
      <Table questionData={questions} />
      <Pages
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        totalPages={totalPages}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
      />
    </div>
  );
}

export default QuestionOverview;
