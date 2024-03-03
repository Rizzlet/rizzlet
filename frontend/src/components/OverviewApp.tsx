import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Overview";
import Pagination from "./Pagination";

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
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage") || "1", 10) //local storage is to save page for refresh
  );
  const [postsPerPage] = useState(5);

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) setQuestionData(result);
      console.log(result);
    });
  }, []);

  //To stay on the same page when switching pages
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  async function fetchAll() {
    try {
      const response = await axios.get<Question[]>(
        "http://localhost:8000/api/question"
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //Get current Posts
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = questions.slice(indexOfFirstPost, indexOfLastPost);

  // //Change Page
  // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container ">
      {/* <Table /> */}
      <Table questionData={questions} />
      {/* <Pagination
        postsPerPage={postsPerPage}
        totalPosts={questions.length}
        paginate={paginate}
      /> */}
    </div>
  );
}

export default QuestionOverview;
