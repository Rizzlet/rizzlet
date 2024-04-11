import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Pages } from "../components/ProfilePage";
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

  //pagination const
  const [currentPage, setCurrentPage] = useState(1) //local storage is to save page for refresh
  const postsPerPage = 10; //how many are in each page

  useEffect(() => {
    fetchQuestions(currentPage).then((result) => {
      if (result) setQuestionData(result);
    });
  }, [currentPage]);

  async function fetchQuestions(page: number) {
    try {
      const response = await axios.get<Question[]>(
        process.env.REACT_APP_BACKEND_URL + `/api/question/user`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

 //makes sure that the base line is 1 and not 0;
 let totalPages: number;
 if (Math.ceil(questions.length / postsPerPage) == 0) {
   totalPages = 1;
 } else {
   totalPages = Math.ceil(questions.length / postsPerPage);
 }

  console.log("questions: ", questions);

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