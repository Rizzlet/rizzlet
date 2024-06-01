import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Pages } from "../components/Profile";
import { useParams } from "react-router-dom";

interface Question {
  _id: string;
  type: string;
  question: string;
  createdBy: {
    firstName: string;
    lastName: string;
  };
}

interface Answers {
  _id: string;
  answer: string;
}

export interface QuestionMappedAnswers {
  questions: Question;
  answer: Answers[];
}

function ProfilePage() {
  const [questions, setQuestionData] = useState<QuestionMappedAnswers[]>([]);

  //pagination const
  const [totalPages, setTotalPages] = useState(1); //determines the total # of pages
  const [currentPage, setCurrentPage] = useState(1); //keeps track of current page
  const postsPerPage = 5; //how many are in each page
  const { page = 1, limit = postsPerPage } = useParams();

  //set the current page
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

  //fetches questions based on user
  async function fetchQuestions(page: number, limit: number) {
    try {
      const response = await axios.get<any>(
        process.env.REACT_APP_BACKEND_URL +
          `/api/paginate/question/user?page=${page}&limit=${limit}`,
        { headers: { "X-token": localStorage.getItem("token") } }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return { paginatedData: [], totalQuestions: 0 };
    }
  }

  return (
    <div className="container">
      <Table questions={questions} />
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
