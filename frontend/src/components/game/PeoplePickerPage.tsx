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
  // const authData = useAuth();

  //fetch all users in the class
  async function fetchUserByClass(classId: string) {
    try {
      const response = await axios.get<any>(
        `${process.env.REACT_APP_BACKEND_URL}/api/class/${classId}/user`,
        {
          withCredentials: true,
        }
      );
      setUsersInClass(response.data.slice(0,3)); //hardcoded to the first three, but can randomize later
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
  // console.log("usersInClass", usersInClass)

  return (
    <div>
      {usersInClass.map((user) => (
        <div key={user._id} onClick={() => handleSelectPerson(user)}>
          {avatar(
            user,
            `${user.firstName} ${user.lastName}`,
            user._id === selectedPerson
          )}
        </div>
      ))}
    </div>
  );
}

// style of the avatar icon
function avatar(user: any, initial: string, isSelected: boolean) {
  const avatarStyle = {
    backgroundColor: user.profileColor,
    border: isSelected ? "3px solid red" : "none",
  };

  return (
    <div>
      <div
        className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-900 text-gray-50"
        style={avatarStyle}
      >
        {user.firstName[0]}
      </div>
      <div className="">
        <HealthBar health={75} />
      </div>
    </div>
  );
}

export default PeoplePicker;
