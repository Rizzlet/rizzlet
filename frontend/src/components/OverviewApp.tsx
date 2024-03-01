import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Overview";

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

  useEffect(() => {
    fetchAll().then( result => {
       if (result)
       setQuestionData(result);
        console.log(result);
     });
  }, [] );

  async function fetchAll(){
    try {
      const response = await axios.get<Question[]>('http://localhost:8000/api/question');
      return response.data;     
    }
    catch (error){
      console.log(error); 
      return false;         
    }
  }

  return (
    <div className="container ">
      {/* <Table /> */}
      <Table questionData = {questions} />
    </div>
  );
}

export default QuestionOverview;

