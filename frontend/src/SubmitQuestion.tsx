import { Select, Option } from "@material-tailwind/react";
// import { Button } from "@material-tailwind/react";
import type { ButtonProps } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";

import withMT from "@material-tailwind/react/utils/withMT"; // Import withMT


export function SelectDefault() {
  return (
    <div className="flex w-72 flex-col gap-6">
      <Select variant="static" label="Select Version" placeholder="Select">
        <Option>Material Tailwind HTML</Option>
        <Option>Material Tailwind React</Option>
        <Option>Material Tailwind Vue</Option>
        <Option>Material Tailwind Angular</Option>
        <Option>Material Tailwind Svelte</Option>
      </Select>
    </div>
  );
}

 
export function InputDefault() {
  return (
    <div className="w-72">
      <Input label="Question" variant = "standard" size = "md" crossOrigin="" />
    </div>
  );
}

// interface ButtonProps {

//   ripple: boolean;
//   placeholder?: string; 
// }


export function Buttons() {
  return (
    <div>
      <div className="mt-20 grid grid-cols-2 gap-2 px-3 flex aspect-w-5 aspect-h-5">
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            True
        </button>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            False
        </button>
      </div> 
    {/* <center className ="h-screen flex items-center justify-center scale-150">
      <button className ="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
        False
      </button>
    </center>  */}
    {/* <style>
    .btn {
      @apply font-bold py-2 px-4 rounded;
      }
    .btn-blue {
      @apply bg-blue-500 text-white;
    }
    .btn-blue:hover {
      @apply bg-blue-700;
    }
  </style> */}
  </div>
  )
}
 