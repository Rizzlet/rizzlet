import { useAuth } from "../context/auth/AuthContext";
//Creating the Table with Questions
interface TableProps {
  userData: {
    user: {
      id: string;
      name: string;
    };
    score: number;
    rank: number;
  }[];
}

function Table(props: TableProps) {
  return (
    <div>
      {/* <h1 className="text-3xl font-semibold text-center mb-4">Leaderboard</h1> */}
      <div className="relative sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-700">
          <TableHeader />
          <TableBody userData={props.userData} />
        </table>
      </div>
    </div>
  );
}

function TableHeader() {
  return (
    <thead className="text-small bg-[#d3f1e2] uppercase text-gray-700 dark:text-black">
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

  // sort the users based on scores in descending order
  const sortedUserData = [...props.userData].sort((a, b) => b.score - a.score);

  //set authentication information
  const authData = useAuth();

  return (
    <tbody>
      {sortedUserData.map((row, index) => (
        <tr
          key={index}
          className={
            "border-b" +
            (row.user.id === authData.authUserId ? " bg-orange-50" : "")
          }
        >
          <td className="px-6 py-3">{row.rank}</td>
          <td className="px-6 py-3">{row.user.name}</td>
          <td className="px-6 py-3">{row.score}</td>
        </tr>
      ))}
    </tbody>
  );
}

export { Table };
