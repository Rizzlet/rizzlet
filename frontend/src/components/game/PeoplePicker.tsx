import React from "react";
import { useAuth } from "../../context/auth/AuthContext";
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

const Select: React.FC<PeoplePickerProps> = ({
  selectedPerson,
  onSelectPerson,
  disabled,
  people,
}) => {
  const authData = useAuth();

  console.log("selectedPerson", selectedPerson);
  // console.log("onSelectPerson", onSelectPerson)
  console.log("disabled", disabled);
  console.log("people: ", people);

  return (
    <div>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
      />
      {/* rendering the "enemy" */}
      <div>
        {/* index 0 first*/}
        <div>
          {people[0] && (
            <div
              key={people[0].id}
              onClick={() => disabled === false && onSelectPerson(people[0].id)}
            >
              {avatar(
                people[0],
                `${people[0].name}`,
                people[0].id === selectedPerson,
                75,
                disabled
              )}
            </div>
          )}
        </div>
        {/* index 1 second user*/}
        <div className=" mt-2 grid grid-cols-2 col-span-1">
          {people[1] && (
            <div
              key={people[1].id}
              onClick={() => disabled === false && onSelectPerson(people[1].id)}
            >
              {avatar(
                people[1],
                `${people[1].name}`,
                people[1].id === selectedPerson,
                50,
                disabled
              )}
            </div>
          )}
          {/* index 2: third user*/}
          {people[2] && (
            <div
              key={people[0].id}
              onClick={() => disabled === false && onSelectPerson(people[2].id)}
            >
              {avatar(
                people[2],
                `${people[2].name}`,
                people[2].id === selectedPerson,
                100,
                disabled
              )}
            </div>
          )}
        </div>
      </div>
      {/* The user */}
      <div className="mt-9 mb-4">
        {avatar(
          authData,
          `${authData.authUserFullName}`,
          false,
          25,
          false //false so that the user icon is not grayed out (harcoded)
        )}
      </div>
    </div>
  );
};

// style of the avatar icon
function avatar(
  user: any,
  name: string,
  isSelected: boolean,
  health: number,
  disabled: boolean
) {
  const avatarStyle = {
    backgroundColor: disabled ? "gray" : user.profileColor,
    border: isSelected ? "4px solid #ff605d" : "none",
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="animate-bounce"
        style={{ visibility: isSelected ? "visible" : "hidden" }}
      >
        <svg
          className="w-6 h-6  text-red-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 10"
        >
          <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
        </svg>
      </div>
      <div
        className="h-16 w-16 flex items-center justify-center rounded-full bg-gray-900 text-gray-50 text-2xl"
        style={avatarStyle}
      >
        {name[0]}
      </div>
      <div className="font-semibold">{name}</div>
      <div className="">
        <HealthBar health={health} />
      </div>
    </div>
  );
}

export default Select;