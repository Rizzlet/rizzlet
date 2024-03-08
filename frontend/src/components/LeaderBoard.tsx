//Creating the Table with Questions
interface TableProps {
  userData: {
    _id: string;
    googleUserId: number;
    email: string;
    firstName: string;
    lastName: string;
    score: number;
    profileColor: string;
  }[];
}

function Table(props: TableProps) {
  return (
    //overflow-x-auto
    //"w-full py-12 md:py-32 lg:py-40 bg-no-repeat bg-cover relative"
    <div className="relative sm:rounded-lg ">
      <table className="w-screen min-h-[80dvh] py-2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-700">
        <TableHeader />
        <TableBody userData={props.userData} />
      </table>
    </div>
  );
}

function TableHeader() {
  return (
    <thead className="text-small text-gray-700 uppercase bg-gray-50 dark:bg-teal-100 dark:text-black">
      <tr>
        <th scope="col" className="px-6 py-3">
          Rank
        </th>
        <th scope="col" className="px-6 py-3">
          Name
        </th>
        <th scope="col" className="px-6 py-3">
          Score
        </th>
      </tr>
    </thead>
  );
}

function TableBody(props: TableProps) {
  const rows = props.userData.map((row, index) => {
    //to resolve is createdBy is NULL
    // const createdByInfo = row.createdBy || { firstName: "", lastName: "" };
    return (
      <tr
        key={index}
        className=" border-b dark:border-gray-200 dark:hover:bg-gray-200"
      >
        {/* <th scope="row" className="px-6  font-medium text-gray-900 whitespace-nowrap dark:text-black"> */}
        {/* <td className="px-6 py-3">{row.rank}</td> */}
        <td className="px-6 py-3">{`${row.firstName} ${row.lastName}`}</td>
        <td className="px-6 py-3">{row.score}</td>
        {/* </th> */}
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

export { Table };
