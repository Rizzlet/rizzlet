import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Pages } from "../components/Overview";
//import of router so that it will update URL with each page
import { useNavigate } from "react-router-dom";

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
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage") || "1", 10) //local storage is to save page for refresh
  );
  const [postsPerPage] = useState(5); //how many are in each page
  const navigate = useNavigate();

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) setQuestionData(result);
    });
  }, []);

  //To stay on the same page when switching pages
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  //getting questions from moongo
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
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = questions.slice(indexOfFirstPost, indexOfLastPost);

  //Change Page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("currentPage", pageNumber.toString());
    navigate(`/overview/${pageNumber}`);
  };

  return (
    <div className="container ">
      <Table questionData={currentPosts} />
      {Pages({
        currentPage,
        postsPerPage: postsPerPage,
        totalPages: Math.ceil(questions.length / postsPerPage),
        onPrevClick: () => paginate(currentPage - 1),
        onNextClick: () => paginate(currentPage + 1),
      })}{" "}
    </div>
  );
}

export default QuestionOverview;
