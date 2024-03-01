import React, { useState, useEffect } from "react";
import axios from "axios";
import {} from "./SubmitQuestion";

interface TableProps {
  questionData: {
    _id: string;
    type: string;
    question: string;
    answer: boolean;
    createdBy: {
      firstName: string;
      lastName: string;
    };
  }[];
}

function Table(props: TableProps) {
  return (
    //overflow-x-auto
    //"w-full py-12 md:py-32 lg:py-40 bg-no-repeat bg-cover relative"
    <div className="relative sm:rounded-lg ">
      <table className="w-screen min-h-[80dvh] py-2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-700">
        <TableHeader />
        <TableBody questionData={props.questionData} />
        <Pages />
      </table>
    </div>
  );
}

function TableHeader() {
  return (
    <thead className="text-small text-gray-700 uppercase bg-gray-50 dark:bg-teal-100 dark:text-black">
      <tr>
        <th scope="col" className="px-6 py-3">
          Type
        </th>
        <th scope="col" className="px-6 py-3">
          Created By
        </th>
        <th scope="col" className="px-6 py-3">
          Question
        </th>
        <th scope="col" className="px-6 py-3">
          Answer
        </th>
      </tr>
    </thead>
  );
}

function TableBody(props: TableProps) {
  const rows = props.questionData.map((row, index) => {
    //to resolve is createdBy is NULL
    const createdByInfo = row.createdBy || { firstName: "", lastName: "" };
    return (
      <tr
        key={index}
        className=" border-b dark:border-gray-200 dark:hover:bg-gray-200"
      >
        {/* <th scope="row" className="px-6  font-medium text-gray-900 whitespace-nowrap dark:text-black"> */}
        <td scope="col" className="px-6 py-3">
          {row.type}
        </td>
        <td
          scope="col"
          className="px-6 py-3"
        >{`${createdByInfo.firstName} ${createdByInfo.lastName}`}</td>
        <td scope="col" className="px-6 py-3">
          {row.question}
        </td>
        <td scope="col" className="px-6 py-3">
          {row.answer ? "True" : "False"}
        </td>
        {/* </th> */}
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

// function TableBody (props: TableProps) {
//   const rows = props.questionData.map((row, index) => {
//     return (
//       <tr key={index}>
//         <td>{row.type}</td>
//         <td>{row.createdBy.firstName} {row.createdBy.lastName}</td>
//         <td>{row.question}</td>
//         <td>{row.answer}</td>
//         <td>
//         </td>
//       </tr>
//     );
//   });
//   return (
//       <tbody>
//          {rows}
//       </tbody>
//    );
// }



function Pages() {
  return (
<div>
  <div className="flex flex-col items-center ">
    {/* <!-- Help text --> */}
    <span className="text-sm text-gray-700 dark:text-gray-700">
        Showing <span className="font-semibold text-gray-900 dark:text-black">1</span> to <span className="font-semibold text-gray-900 dark:text-black">10</span> of <span className="font-semibold text-gray-900 dark:text-black">100</span> Entries
    </span>
    <div className="inline-flex mt-2 xs:mt-0">
      {/* <!-- Buttons --> */}
      <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-teal-100 dark:border-gray-700 dark:text-gray-800 dark:hover:bg-gray-300 dark:hover:text-black">
          <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            {/* arrow */}
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
          </svg>
          Prev
      </button>
      <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-teal-100 dark:border-gray-700 dark:text-gray-800 dark:hover:bg-gray-300 dark:hover:text-black">
          Next
          <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          {/* arrow */}
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
      </button>
    </div>
    </div>
  </div>
  );
}

export default Table;
