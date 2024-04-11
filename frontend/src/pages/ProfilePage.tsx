import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Pages } from "../components/ProfilePage";
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

function ProfilePage() {
  const [questions, setQuestionData] = useState<Question[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  //pagination const
  const [currentPage, setCurrentPage] = useState(1) //local storage is to save page for refresh
  const postsPerPage = 5; //how many are in each page
  const { page = 1, limit = postsPerPage } = useParams();

  //change each page 
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

  async function fetchQuestions(page: number, limit: number) {
    try {
      const response = await axios.get<any>(
        process.env.REACT_APP_BACKEND_URL + `/api/paginate?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return { paginatedData: [], totalQuestions: 0 };
    }
  }

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

export default ProfilePage;