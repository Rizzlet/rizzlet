import React from "react";
import { useAuth } from "../../context/auth/AuthContext";
import HealthBar from "./HealthBar";
import { WitchIdle, WitchCharge, WitchAttack, WitchDefeat, SlimeIdle, SlimeTakeDamage, SlimeDeath } from "./Animation/Sprites";


interface PeoplePickerProps<
  T extends { id: string; firstName: string; lastName: string; health: number },
> {
  selectedPerson: string | null; // Person's ID
  onSelectPerson: (id: string) => void; // Assume this will change selectedPerson
  disabled: boolean; //disabled until finish answering questions
  userHealth: number;
  people: T[]; // Exactly <=3
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
    people.length <= 3 &&
    people.every(
      (person) =>
        person &&
        person.id &&
        person.firstName &&
        person.lastName &&
        person.health
    );

  if (!isDataAvailable) {
    return <div></div>;
  }

  return (
    <div className="grid grid-rows-3 grid-flow-col gap-4">
      {/* rendering the "enemy" */}
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
      <div className="grid grid-cols-2 col-span-1">
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
      {/* The user */}
      <div className="">
        {witch(
          authData,
          `${authData.authUserFullName}`,
          false,
          userHealth,
          disabled 
        )}
      </div>
    </div>
  );
}



// style of the avatar icon
function witch(
  user: any,
  name: string,
  isSelected: boolean,
  health: number,
  disabled: boolean
) {

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="animate-bounce"
        style={{ visibility: isSelected ? "visible" : "hidden" }}
      >
      </div>
      {disabled ? <WitchIdle active={true}/> : <WitchCharge active={true}/>}      
      <div className="font-semibold">{name}</div>
      <div className="">
        <HealthBar health={health} />
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

//style of ghost when the person.health <=0
function ghost(name: string) {
  return (
    <div className="flex flex-col items-center justify-center m-4 mt-10">
      <div className="animate-pulse">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="4em"
          height="4em"
          viewBox="0 0 24 24"
        >
          <g fill="none" fill-rule="evenodd">
            <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
            <path
              fill="white"
              d="M12 2a9 9 0 0 1 9 9v8.62c0 1.83-1.966 2.987-3.565 2.099l-.363-.195c-1-.512-1.784-.68-2.889-.114l-.198.108a4 4 0 0 1-3.762.11l-.208-.11c-1.277-.73-2.166-.512-3.45.2c-1.6.89-3.565-.267-3.565-2.097V11a9 9 0 0 1 9-9M8.5 9a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3m7 0a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3"
            />
          </g>
        </svg>
      </div>
      <div className="font-semibold">{name}</div>
    </div>
  );
}