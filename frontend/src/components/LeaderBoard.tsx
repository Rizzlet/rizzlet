//Creating the Table with Questions
interface TableProps {
  userData: {
    _id: string;
    googleUserId: string;
    email: string;
    firstName: string;
    lastName: string;
    score: number;
    profileColor: string;
    classIds: [];
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
  console.log("User Data:", props.userData);

  const rows = props.userData.map((row, index) => {
    //to resolve is createdBy is NULL
    // const createdByInfo = row.createdBy || { firstName: "", lastName: "" };
    return (
      <tr
        key={index}
        className=" border-b dark:border-gray-200 dark:hover:bg-gray-200"
      >
        <td className="px-6 py-3">{index + 1}</td>{" "}
        {/* Assuming "index" represents the rank */}
        <td className="px-6 py-3">{`${row.firstName} ${row.lastName}`}</td>
        <td className="px-6 py-3">{row.score}</td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

export { Table };
