import { QuestionMappedAnswers } from "../pages/QuestionOverview";

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
    <div className="flex flex-col items-center py-2">
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
      <div className="xs:mt-0 mt-2 inline-flex">
        <button
          className="flex h-8 items-center justify-center rounded-s bg-gray-800 px-3 text-sm font-medium text-white hover:bg-gray-900 dark:border-gray-700 dark:bg-teal-100 dark:text-gray-800 dark:hover:bg-gray-300 dark:hover:text-black"
          onClick={onPrevClick}
          disabled={currentPage === 1}
        >
          <svg
            className="me-2 h-3.5 w-3.5 rtl:rotate-180"
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
          className="flex h-8 items-center justify-center rounded-e border-0 border-s border-gray-700 bg-gray-800 px-3 text-sm font-medium text-white hover:bg-gray-900 dark:border-gray-700 dark:bg-teal-100 dark:text-gray-800 dark:hover:bg-gray-300 dark:hover:text-black"
          onClick={onNextClick}
          disabled={currentPage === totalPages}
        >
          Next
          <svg
            className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
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
  questions: QuestionMappedAnswers[];
}

function Table(props: TableProps) {
  return (
    <div className="relative sm:rounded-lg ">
      <table className="w-full min-h-[75dvh] py-2 text-left rtl:text-right text-gray-500">
        <TableHeader />
        <TableBody questions={props.questions} />
      </table>
    </div>
  );
}

function TableHeader() {
  return (
    <thead className="text-small bg-[#d3f1e2] uppercase text-gray-700">
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
  const rows = props.questions.map((row, index) => {
    //to resolve is createdBy is NULL
    const createdByInfo = row.questions.createdBy || {
      firstName: "",
      lastName: "",
    };
    return (
      <tr key={index} className=" border-b border-gray-200 hover:bg-gray-200">
        <td className="px-6 py-3">{row.questions.type}</td>
        <td className="px-6 py-3">{`${createdByInfo.firstName} ${createdByInfo.lastName}`}</td>
        <td className="px-6 py-3">{row.questions.question}</td>
        <td className="px-6 py-3">{row.answer[0]?.answer}</td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

export { Table, Pages };
