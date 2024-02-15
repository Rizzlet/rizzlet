import React, {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import axios from 'axios';
import {Title, SelectQuestion, InputQuestion, TrueAndFalseButtons, Buttons} from './SubmitQuestion';

export function UserInput() {
  const [state, setState] = useState({
    question: '',
    answer: false,
  });
  
  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value: (typeof state)[keyof typeof state] = event.target.value;
    if (event.target.type === "checkbox") {
      value = event.target.checked;
    }
 
    setState({ ...state, [event.target.id]: value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(state);
  };

    return (
      //container changed 
      <div className='container' > 
        <Title />
        <SelectQuestion />
        {/* <InputQuestion /> */}
        <TrueAndFalseButtons/>
      <form className='flashcard' onSubmit={onSubmit}>
        <div className="field mt-20 px-5">
          <label htmlFor="question" className="block mb-2 text-2xl font-medium text-gray-900 dark:text-black">Question</label>
          <input id="question"  onChange={onFieldChange}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type Your Question Here..."
         ></input> 
        </div>
          <div className="field checkbox">
            <input type="checkbox" id="answer" onChange={onFieldChange} />
            <label htmlFor="conditions">I agree to the terms and conditions</label>
          </div>
          <Buttons />
        </form>
      </div>
    );
  }