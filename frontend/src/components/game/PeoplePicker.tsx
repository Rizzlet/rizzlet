import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import axios from "axios";
import HealthBar from "./HealthBar";

interface PeoplePickerProps {
  selectedPerson: string | null; // Person's ID
  onSelectPerson: (id: string) => void; // Assume this will change selectedPerson
  disabled: boolean; //disabled until finish answering questions
  //there is a temporary profile color prop 
  people: {
    id: string;
    name: string;
    health: number;
  }[]; // Exactly 3
}

function PeoplePicker(props: PeoplePickerProps) {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(
    props.selectedPerson
  );
  const [usersInClass, setUsersInClass] = useState(props.people);
  const authData = useAuth();

  useEffect(() => {
    setUsersInClass(props.people); // Update usersInClass when props.people changes
  }, [props.people]);

  //temporarily hard coded to 308
  const classId = "65d679f08f3afb1b89eebfc3";
  useEffect(() => {
    fetchUserByClass(classId);
  }, []);


  //fetch all users in the class
  async function fetchUserByClass(classId: string) {
    try {
      const response = await axios.get<any>(
        `${process.env.REACT_APP_BACKEND_URL}/api/class/${classId}/user`,
        {
          withCredentials: true,
        }
      );
   
    // Takes all the relevent data 
    const peopleFormat = response.data.slice(0, 3).map((user: any) => ({
      id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      profileColor: user.profileColor, //added it temporary so that the icons have color
      health: 100, //set the health to 100 for now but not sure how we're gonna save the health
    }));

    // Update the state with the peopleFormat
    setUsersInClass(peopleFormat);

      // console.log("userByClass", response.data)
    } catch (error) {
      console.log("fetch error: ", error);
    }
  }

  // makes sure tha the selected person is changed
  function handleSelectPerson(user: any) {
    setSelectedPerson(user.id);
    props.onSelectPerson(user.id);
    // console.log("Selected Person ID:", selectedPerson);
    // console.log("user id", user.id);
  }

  console.log("people", props.people);
  console.log("selectedPerson", props.selectedPerson)
  console.log("onSelectPerson", props.onSelectPerson)
  // console.log("usersInClass", usersInClass);

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
                  key={usersInClass[0].id}
                  onClick={() => handleSelectPerson(usersInClass[0])}
                >
                  {avatar(
                    usersInClass[0],
                    `${usersInClass[0].name[0]}`,
                    usersInClass[0].id === selectedPerson, 75
                  )}
                </div>
              )}
            </div>
            {/* index 1 second user*/}
            <div className=" mt-6 grid grid-cols-2 col-span-1">
              {usersInClass[1] && (
                <div
                  key={usersInClass[1].id}
                  onClick={() => handleSelectPerson(usersInClass[1])}
                >
                  {avatar(
                    usersInClass[1],
                    `${usersInClass[1].name[0]}`,
                    usersInClass[1].id === selectedPerson, 75
                  )}
                </div>
              )}
              {/* index 2: third user*/}
              {usersInClass[2] && (
                <div
                  key={usersInClass[0].id}
                  onClick={() => handleSelectPerson(usersInClass[2])}
                >
                  {avatar(
                    usersInClass[2],
                    `${usersInClass[2].name[0]}`,
                    usersInClass[2].id === selectedPerson, 75
                  )}
                </div>
              )}
            </div>
          </div>
          {/* The user */}
          <div className="pt-20">
            {avatar(authData, `${authData.authUserFullName[0]}`, false, 75)}
          </div>
        </div>
        {/* right side of the screen */}
        <div className="col-span-1 bg-gray-300 p-4"></div>
      </div>
    </div>
  );
}

// style of the avatar icon
function avatar(user: any, initial: string, isSelected: boolean, health: number) {
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
        <HealthBar health={health} />
      </div>
    </div>
  );
}

export default PeoplePicker;
