import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import axios from "axios";
import HealthBar from "./HealthBar";

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


const PeoplePicker: React.FC<PeoplePickerProps> = ({
  selectedPerson,
  onSelectPerson,
  disabled,
  people,
}) => {
  const authData = useAuth();


  return (
    <div className="">
      <div className="grid grid-cols-2 gap-2 h-screen overflow-hidden">
        {/*left side of the screen */}
        <div className="col-span-1 bg-gray-200 p-4 pt-8">
          {/* rendering the "enemy" */}
          <div className="">
            {/* index 0 first*/}
            <div className="">
              {people[0] && (
                <div
                  key={people[0].id}
                  onClick={() => onSelectPerson(people[0].id)}
                >
                  {avatar(
                    people[0],
                    `${people[0].name[0]}`,
                    people[0].id === selectedPerson,
                    75
                  )}
                </div>
              )}
            </div>
            {/* index 1 second user*/}
            <div className=" mt-6 grid grid-cols-2 col-span-1">
              {people[1] && (
                <div
                  key={people[1].id}
                  onClick={() => onSelectPerson(people[1].id)}
                >
                  {avatar(
                    people[1],
                    `${people[1].name[0]}`,
                    people[1].id === selectedPerson,
                    75
                  )}
                </div>
              )}
              {/* index 2: third user*/}
              {people[2] && (
                <div
                  key={people[0].id}
                  onClick={() => onSelectPerson(people[2].id)}
                >
                  {avatar(
                    people[2],
                    `${people[2].name[0]}`,
                    people[2].id === selectedPerson,
                    75
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
};

// style of the avatar icon
function avatar(
  user: any,
  initial: string,
  isSelected: boolean,
  health: number
) {
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
