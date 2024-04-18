import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth/AuthContext";
// import PeoplePicker from "./PeoplePicker";
import axios from "axios";
import HealthBar from "./HealthBar";

interface Person {
  _id: string;
  firstName: string;
  lastName: string;
  health: number;
}

interface PeoplePickerProps {
  selectedPerson: string | null; // Person's ID
  onSelectPerson: (id: string) => void; // Function to handle selecting a person
  disabled: boolean;
  people: Person[]; // Exactly 3
}

function PeoplePicker(props: PeoplePickerProps) {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(
    props.selectedPerson
  );
  const [usersInClass, setUsersInClass] = useState<Person[]>([]);
  const authData = useAuth();

  //Update selected person when selected person changes
  // useEffect(() => {
  //   setSelectedPerson(props.selectedPerson);
  // }, [props.selectedPerson]);

  //fetch all users in the class
  async function fetchUserByClass(classId: string) {
    try {
      const response = await axios.get<any>(
        `${process.env.REACT_APP_BACKEND_URL}/api/class/${classId}/user`,
        {
          params: {
            limit: 3,
          },
          withCredentials: true,
        }
      );
      setUsersInClass(response.data);
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

  function handleSelectPerson(user: Person) {
    setSelectedPerson(user._id);
    props.onSelectPerson(user._id);
    // console.log("Selected Person ID:", selectedPerson);
    // console.log("user id", user._id);
  }

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
