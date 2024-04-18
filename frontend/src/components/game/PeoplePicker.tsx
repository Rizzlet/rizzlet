import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth/AuthContext";
// import PeoplePicker from "./PeoplePicker";
import axios from "axios";
import HealthBar from "./HealthBar";

interface PeoplePickerProps {
  selectedPerson: string | null; // Person's ID
  onSelectPerson: (id: string) => void; // Assume this will change selectedPerson
  disabled: boolean;
  people: {
    _id: string;
    firstName: string;
    lastName: string;
    health: number;
  }[]; // Exactly 3
}

function PeoplePicker(props: PeoplePickerProps) {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(
    props.selectedPerson
  );
  const [usersInClass, setUsersInClass] = useState(props.people);
  const authData = useAuth();

  //fetch all users in the class
  async function fetchUserByClass(classId: string) {
    try {
      const response = await axios.get<any>(
        `${process.env.REACT_APP_BACKEND_URL}/api/class/${classId}/user`,
        {
          withCredentials: true,
        }
      );
      setUsersInClass(response.data.slice(0, 3)); //hardcoded to the first three, but can randomize later
      // console.log("userByClass", response.data)
    } catch (error) {
      console.log("fetch error: ", error);
    }
  }

  //temporarily hard coded to 308
  const classId = "65d679f08f3afb1b89eebfc3";
  useEffect(() => {
    fetchUserByClass(classId);
  }, []);

  function handleSelectPerson(user: any) {
    setSelectedPerson(user._id);
    props.onSelectPerson(user._id);
    // console.log("Selected Person ID:", selectedPerson);
    // console.log("user id", user._id);
  }

  // console.log("people", props.people);
  console.log("usersInClass", usersInClass);

  return (
    <div className="">
      <div className="grid grid-cols-2 gap-2 h-screen overflow-hidden">
        {/*left side of the screen */}
        <div className="col-span-1 bg-gray-200 p-4 pt-8">
          {/* rendering the "enemy" */}
          <div className="">
            {/* index 0 first*/}
            <div className="">
              {usersInClass[0] && (
                <div
                  key={usersInClass[0]._id}
                  onClick={() => handleSelectPerson(usersInClass[0])}
                >
                  {avatar(
                    usersInClass[0],
                    `${usersInClass[0].firstName[0]}`,
                    usersInClass[0]._id === selectedPerson
                  )}
                </div>
              )}
            </div>
            {/* index 1 second user*/}
            <div className=" mt-6 grid grid-cols-2 col-span-1">
              {usersInClass[1] && (
                <div
                  key={usersInClass[1]._id}
                  onClick={() => handleSelectPerson(usersInClass[1])}
                >
                  {avatar(
                    usersInClass[1],
                    `${usersInClass[1].firstName[0]}`,
                    usersInClass[1]._id === selectedPerson
                  )}
                </div>
              )}
            {/* index 2: third user*/}
              {usersInClass[2] && (
                <div
                  key={usersInClass[0]._id}
                  onClick={() => handleSelectPerson(usersInClass[2])}
                >
                  {avatar(
                    usersInClass[2],
                    `${usersInClass[2].firstName[0]}`,
                    usersInClass[2]._id === selectedPerson
                  )}
                </div>
              )}
            </div>
          </div>
          {/* The user */}
          <div className="pt-20">
            {avatar(authData, `${authData.authUserFullName[0]}`, false)}
          </div>
        </div>
        {/* right side of the screen */}
        <div className="col-span-1 bg-gray-300 p-4"></div>
      </div>
    </div>
  );
}

// style of the avatar icon
function avatar(user: any, initial: string, isSelected: boolean) {
  const avatarStyle = {
    backgroundColor: user.profileColor,
    border: isSelected ? "4px solid red" : "none",
    
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="h-16 w-16 flex items-center justify-center rounded-full bg-gray-900 text-gray-50 text-2xl"
        style={avatarStyle}
      >
        {initial}
      </div>
      <div className="">
        <HealthBar health={75}  />
      </div>
    </div>
  );
}

export default PeoplePicker;
