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
  const [selectedPerson, setSelectedPerson] = useState<string | null>(props.selectedPerson);
  const [usersInClass, setUsersInClass] = useState(props.people);
  const authData = useAuth();

  useEffect(() => {
    setSelectedPerson(props.selectedPerson);
  }, [props.selectedPerson]);

  useEffect(() => {
    setUsersInClass(props.people);
  }, [props.people]);

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

  function handleSelectPerson(user: any) {
    setSelectedPerson(user.id);
    props.onSelectPerson(user.id);
    console.log("user id", user.id);
  }

  return (
    <div className="">
      <div className="grid grid-cols-2 gap-2 h-screen overflow-hidden">
        <div className="col-span-1 bg-gray-200 p-4 pt-8">
          <div className="">
            {/* Mapping over usersInClass */}
            {usersInClass.map((user) => (
              <div
                key={user.id}
                onClick={() => handleSelectPerson(user)}
              >
                {avatar(
                  user,
                  `${user.name[0]}`,
                  user.id === selectedPerson,
                  75
                )}
              </div>
            ))}
          </div>
          <div className="pt-20">
            {avatar(authData, `${authData.authUserFullName[0]}`, false, 75)}
          </div>
        </div>
        <div className="col-span-1 bg-gray-300 p-4"></div>
      </div>
    </div>
  );
}

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
