import React from "react";
import { useAuth } from "../../context/auth/AuthContext";
import HealthBar from "./HealthBar";

interface PeoplePickerProps<
  T extends { id: string; firstName: string; lastName: string; health: number },
> {
  selectedPerson: string | null; // Person's ID
  onSelectPerson: (id: string) => void; // Assume this will change selectedPerson
  disabled: boolean; //disabled until finish answering questions
  userHealth: number;
  people: T[]; // Exactly 3
}

export default function Select<
  T extends { id: string; firstName: string; lastName: string; health: number },
>({
  selectedPerson,
  onSelectPerson,
  disabled,
  people,
  userHealth,
}: PeoplePickerProps<T>) {
  const authData = useAuth();

  // console.log("selectedPerson", selectedPerson);
  // console.log("onSelectPerson", onSelectPerson)
  // console.log("disabled", disabled);
  console.log("people: ", people);

  //make sure the data is properly rendered (fixes undefined)
  const isDataAvailable =
    people.length === 3 &&
    people.every(person => person && person.id && person.firstName && person.lastName && person.health !== undefined);

  if (!isDataAvailable) {
    return <div></div>;
  }

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
              {people[0].health <= 0
                ? ghost(`${people[0].firstName} ${people[0].lastName}`)
                : avatar(
                    people[0],
                    `${people[0].firstName} ${people[0].lastName}`,
                    people[0].id === selectedPerson,
                    people[0].health,
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
              {people[1].health <= 0
                ? ghost(`${people[1].firstName} ${people[1].lastName}`)
                : avatar(
                people[1],
                `${people[1].firstName} ${people[1].lastName}`,
                people[1].id === selectedPerson,
                people[1].health,
                disabled
              )}
            </div>
          )}
          {/* index 2: third user*/}
          {people[2] && (
            <div
              key={people[2].id}
              onClick={() => disabled === false && onSelectPerson(people[2].id)}
            >
              {people[2].health <= 0
                ? ghost(`${people[2].firstName} ${people[2].lastName}`)
                : avatar(
                people[2],
                `${people[2].firstName} ${people[2].lastName}`,
                people[2].id === selectedPerson,
                people[2].health,
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
          userHealth,
          false //false so that the user icon is not grayed out (harcoded)
        )}
      </div>
    </div>
  );
}

//style of ghost when the person.health <=0
function ghost(name: string) {
  return (
    <div className="flex flex-col items-center justify-center m-4 mt-8">
      <svg
        className="h-20 w-20 text-white flex items-center justify-center animate-pulse"
        width="60"
        height="60"
        viewBox="0 0 24 24"
        stroke-width="1.25"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <path d="M16.882 7.842a4.882 4.882 0 0 0 -9.764 0c0 4.273-.213 6.409-4.118 8.118 2 .882 2 .882 3 3 3 0 4 2 6 2s3-2 6-2c1-2.118 1-2.118 3-3-3.906-1.709-4.118-3.845-4.118-8.118h0zM3 15.961c4-2.118 4-4.118 1-7.118m17 7.118c-4-2.118-4-4.118-1-7.118" />
      </svg>
      <div className="font-semibold">
        {name}
      </div>
    </div>
  );
}

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
