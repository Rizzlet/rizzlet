import React, {useState, useEffect} from 'react';
import QuestionSubmission  from "./FormSubmitQuestions"
import axios from 'axios';

interface Question {
  type: string;
  createdBy: string;
  question: string;
  answer: boolean;
}

function SubmitQuestion() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetchAll().then( result => {
       if (result)
        setQuestions(result);
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
  <div>
    <QuestionSubmission />
  </div>
);

}

export default SubmitQuestion;