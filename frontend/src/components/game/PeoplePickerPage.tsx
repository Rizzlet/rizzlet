import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "./PeoplePicker"; // Import the Select component

function PeoplePicker() {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [usersInClass, setUsersInClass] = useState([]);
  // Temporarily hard coded classId
  const classId = "65d679f08f3afb1b89eebfc3";
  useEffect(() => {
    fetchUserByClass(classId);
  }, [classId]); // Dependency added

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

  function handleSelectPerson(id: string) {
    setSelectedPerson(id);
    console.log("Selected person:", id);
  }

  return (
    <Select
      selectedPerson={selectedPerson}
      onSelectPerson={handleSelectPerson}
      disabled={false} // Set disabled to false or true as per your requirement
      people={usersInClass}
    />
  );
}

export default PeoplePicker;
