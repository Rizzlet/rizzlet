import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import axios from "axios";
import PeoplePicker from "./PeoplePicker";

interface PeoplePickerProps {
  selectedPerson: string | null; // Person's ID
  onSelectPerson: (id: string) => void; // Assume this will change selectedPerson
  disabled: boolean; //disabled until finish answering questions
  people: {
    id: string;
    name: string;
    health: number;
    //there is a temporary profile color prop 
  }[]; // Exactly 3
}


function PeoplePickerPage(props: PeoplePickerProps) {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(
    props.selectedPerson || null
  );
  const [usersInClass, setUsersInClass] = useState(props.people || []);


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
    <div>
      <PeoplePicker 
        selectedPerson={selectedPerson}
        onSelectPerson={handleSelectPerson}
        disabled ={props.disabled || false}
        people={usersInClass}
        />
    </div>
  );
}

export default PeoplePickerPage