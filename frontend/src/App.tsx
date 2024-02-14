import React from 'react';
import {SelectDefault} from './SubmitQuestion'
import {InputDefault} from './SubmitQuestion'
import {Buttons} from './SubmitQuestion'
import {Title} from './SubmitQuestion'

export default function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold bg-black">Hello world!</h1>
      <Title />
      <SelectDefault />
      <InputDefault />
      <Buttons />
    </div>

    
  );
}
