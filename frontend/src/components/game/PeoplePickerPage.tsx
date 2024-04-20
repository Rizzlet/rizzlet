import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "./PeoplePicker"; // Import the Select component

function PeoplePicker() {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [usersInClass, setUsersInClass] = useState([]);
  // const [disabled, setdisabled] = useState(Boolean);

  //hardcoded diabled for now since we dont have the requirements for it
  const disabled = true;
  // Temporarily hard coded classId
  const classId = "65d679f08f3afb1b89eebfc3";
  useEffect(() => {
    fetchUserByClass(classId);
  }, [classId]); 

  //fetchs user by class and formated to match prop
  async function fetchUserByClass(classId: string) {
    try {
      const response = await axios.get<any>(
        `${process.env.REACT_APP_BACKEND_URL}/api/class/${classId}/user`,
        {
          withCredentials: true,
        }
      );

      const peopleFormat = response.data.slice(0, 3).map((user: any) => ({
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        profileColor: user.profileColor,
        health: 100,
      }));

      setUsersInClass(peopleFormat);
    } catch (error) {
      console.log("fetch error: ", error);
    }
  }

  //On click handle or a user 
  function handleSelectPerson(id: string) {
    if (!disabled) {
    setSelectedPerson(id);
    }
    console.log("Selected person:", id);
  }

  return (
    <Select
      selectedPerson={selectedPerson}
      onSelectPerson={handleSelectPerson}
      disabled={disabled}
      people={usersInClass}
    />
  );
}

export default PeoplePicker;
