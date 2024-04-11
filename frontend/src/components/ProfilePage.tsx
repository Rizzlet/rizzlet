//Creating the Pagination
interface PagesProps {
  currentPage: number;
  totalPages: number;
  postsPerPage: number;
  onPrevClick: () => void;
  onNextClick: () => void;
}

const Pages: React.FC<PagesProps> = ({
  currentPage,
  postsPerPage,
  totalPages,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <div className="flex flex-col items-center py-3">
      <span className="text-sm text-gray-700 dark:text-gray-700">
        Showing Page{" "}
        <span className="font-semibold text-gray-900 dark:text-black">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-black">
          {totalPages}
        </span>{" "}
      </span>
      <div className="inline-flex mt-2 xs:mt-0 ">
        <button
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-teal-100 dark:border-gray-700 dark:text-gray-800 dark:hover:bg-gray-300 dark:hover:text-black"
          onClick={onPrevClick}
          disabled={currentPage === 1}
        >
          <svg
            className="w-3.5 h-3.5 me-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Prev
        </button>
        <button
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-teal-100 dark:border-gray-700 dark:text-gray-800 dark:hover:bg-gray-300 dark:hover:text-black"
          onClick={onNextClick}
          disabled={currentPage === totalPages}
        >
          Next
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

//Creating the Table with Questions
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
    <div>
      <h3 className="m-4 mt-6 *:text-align-left pl-8 text-4xl font-bold leading-none tracking-tight text-gray-700 md:text-4xl lg:text-4xl md:mx-0">Your Submitted Questions</h3>
    <div className="relative sm:rounded-lg items-h-screen flex items-center justify-center pt-3 ">
    <table className="w-11/12 min-h-[74dvh] py-2 text-sm text-left rtl:text-right text-gray-500 border border-gray-300">
      <TableHeader />
      <TableBody questionData={props.questionData} />
    </table>
    </div>
    </div>
  );
}

function TableHeader() {
  return (
    <thead className="text-small bg-[#d3f1e2] text-gray-700 uppercase">
      <tr>
        <th scope="col" className="px-6 py-3">
          Type
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
    // const createdByInfo = row.createdBy || { firstName: "", lastName: "" };
    return (
      <tr
        key={index}
        className=" border-b border-gray-200 hover:bg-gray-200"
      >
        {/* <th scope="row" className="px-6  font-medium text-gray-900 whitespace-nowrap dark:text-black"> */}
        <td className="px-6 py-3">{row.type}</td>
        {/* <td className="px-6 py-3">{`${createdByInfo.firstName} ${createdByInfo.lastName}`}</td> */}
        <td className="px-6 py-3">{row.question}</td>
        <td className="px-6 py-3">{row.answer ? "True" : "False"}</td>
        {/* </th> */}
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

export { Table, Pages };
