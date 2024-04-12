import { useAuth } from "../context/auth/AuthContext";
//Creating the Table with Questions
interface TableProps {
  userData: {
    _id: string;
    firstName: string;
    lastName: string;
    score: number;
    rank: number;
  }[];
}

function Table(props: TableProps) {
  return (
    <div style={{ width: "1250px", maxHeight: "1000px", overflow: "auto", margin: "60px auto", marginLeft: "auto", marginRight: "60px", padding: "10px", border: "5px solid #ccc", borderRadius: "5px" }}>
      <h1 className="text-3xl font-semibold text-center mb-4">Leaderboard</h1>
      <div className="relative sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-700">
          <TableHeader />
          <TableBody userData={props.userData} />
        </table>
      </div>
    </div>
  );
}

function TableHeader() {
  return (
    <thead className="text-small text-gray-700 uppercase bg-[#d3f1e2] dark:text-black">
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

  // assign each user their rank
  sortedUserData.forEach((user, index) => {
    user.rank = index + 1;
  });

  //assign each row what info I want in each
  const rows = sortedUserData.map((row, index) => (
    <tr
      key={index}
      className=" border-b dark:border-gray-200 dark:hover:bg-gray-200"
    >
      <td className="px-6 py-3">{row.rank}</td>
      <td className="px-6 py-3">{`${row.firstName} ${row.lastName}`}</td>
      <td className="px-6 py-3">{row.score}</td>
    </tr>
  ));

  //set authentication information
  console.log("User Data:", props.userData);
  const authData = useAuth();

  // search for authenticated user (based on ID) in the leaderboard
  const currentUser = props.userData.find((user) => {
    const fullName = `${user._id}`;
    return fullName === authData.authUserId;
  });

  console.log("currentUser", currentUser);
  //console.log("authUserId", authData.authUserId); //base it off of MongoDB user ID: Object(....)

  return (
    <tbody>
      {currentUser && (
        <tr className=" border-b dark:border-gray-200 dark:hover:bg-gray-200 bg-orange-50">
          <td className="px-6 py-3">{currentUser.rank}</td>
          <td className="px-6 py-3">{`${currentUser.firstName} ${currentUser.lastName}`}</td>
          <td className="px-6 py-3">{currentUser.score}</td>
        </tr>
      )}
      {rows}
    </tbody>
  );
}

export { Table };
