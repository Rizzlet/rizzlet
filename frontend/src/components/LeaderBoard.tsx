import { useAuth } from "../context/auth/AuthContext";
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
    rank: number;
  }[];
}

function Table(props: TableProps) {
  return (
    //overflow-x-auto
    //"w-full py-12 md:py-32 lg:py-40 bg-no-repeat bg-cover relative"
    <div>
      {/* Header: LeaderBoard */}
      <h1 className="text-5xl font-extrabold text-black text-center bg-[#96C8AF] w-screen py-3">
        Leaderboard
      </h1>
      <div className="relative sm:rounded-lg">
        <table className="w-screen min-h-[80dvh] py-2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-700">
          <TableHeader />
          {/* <UserRank userData={props.userData}/> */}
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

  console.log("User Data:", props.userData);
  const authData = useAuth();

  // Find the user with the matching ID
  const currentUser = sortedUserData.find(user => 
    user._id === authData.authUserId
  );
  console.log("currentUser", currentUser);
  console.log("authUserId", authData.authUserId); //incase someone has the same name

  // const currentUser = props.userData.find(user => {
  //   const fullName = `${user.firstName} ${user.lastName}`;
  //   return fullName === authData.authUserFullName;
  // });

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
