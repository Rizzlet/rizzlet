import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import HealthBar from "./HealthBar";
import {
  WitchIdle,
  WitchCharge,
  WitchDefeat,
  SlimeIdle,
  SlimeTakeDamage,
  SlimeDeath,
} from "./Animation/Sprites";

interface Person {
  id: string;
  firstName: string;
  lastName: string;
  health: number;
}

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

  // State to keep track of previous health values and damage animation
  const [prevHealths, setPrevHealths] = useState<{ [key: string]: number }>({});
  const [damageAnimations, setDamageAnimations] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Update previous health values whenever `people` changes
    const newPrevHealths = people.reduce((acc, person) => {
      acc[person.id] = person.health;
      return acc;
    }, {} as { [key: string]: number });

    // Trigger damage animations for people whose health has changed
    people.forEach((person) => {
      if (prevHealths[person.id] && prevHealths[person.id] > person.health) {
        setDamageAnimations((prev) => ({ ...prev, [person.id]: true }));
        setTimeout(() => {
          setDamageAnimations((prev) => ({ ...prev, [person.id]: false }));
        }, 500); // Duration of the damage animation
      }
    });

    setPrevHealths(newPrevHealths);
  }, [people]);

  console.log("health", userHealth);
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
        person.health !== undefined
    );

  if (!isDataAvailable) {
    return <div></div>;
  }

  const renderEnemy = (person: Person) => {
    return (
      <div
        key={person.id}
        onClick={() =>
          disabled === false && userHealth > 0 && onSelectPerson(person.id)
        }
      >
        {slime(
          person,
          `${person.firstName} ${person.lastName}`,
          person.id === selectedPerson,
          person.health,
          disabled,
          damageAnimations[person.id]
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-rows-[175px_minmax(175px,_1fr)_200px] col-span-1 grid-flow-col gap-4">
      {/* rendering the "enemy" using index 0, 1, 2*/}
      <div>{people[0] && renderEnemy(people[0])}</div>
      <div className="grid grid-cols-2 col-span-1">
        {people[1] && renderEnemy(people[1])}
        {people[2] && renderEnemy(people[2])}
      </div>
      {/* The user */}
      <div className="">
        {userHealth <= 0 ? (
          <WitchDefeat active={true} />
        ) : (
          witch(
            authData,
            `${authData.authUserFullName}`,
            false,
            userHealth,
            disabled //false so that the user icon is not grayed out (hardcoded)
          )
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
      ></div>
      {disabled ? <WitchIdle active={true} /> : <WitchCharge active={true} />}
      <div className="font-bold text-white">{name}</div>
      <div className="">
        <HealthBar health={health} />
      </div>
    </div>
  );
}

// style of the avatar icon
function slime(
  user: any,
  name: string,
  isSelected: boolean,
  health: number,
  disabled: boolean,
  isTakingDamage: boolean
) {
  if (health <= 0) {
    return (
      <div className="flex flex-col items-center justify-center pt-6">
        <SlimeDeath active={true} />
        <div className="font-bold text-white">{name}</div>
      </div>
    );
  }

  if (isTakingDamage) {
    return (
      <div className="flex flex-col items-center justify-center pt-6">
        <SlimeTakeDamage active={true} />
        <div className="font-bold text-white">{name}</div>
      <div className="">
        <HealthBar health={health} />
      </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="animate-bounce"
        style={{ visibility: isSelected ? "visible" : "hidden" }}
      >
        <svg
          className="text-teal-300 w-9 h-9"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 400 200"
        >
          <path
            xmlns="http://www.w3.org/2000/svg"
            opacity="1.000000"
            stroke="none"
            d=" M121.060928,187.039459   C110.099083,187.059448 111.779106,186.855911 111.657562,178.073669   C111.611458,174.742645 111.655121,171.410431 111.648232,168.078781   C111.632179,160.321671 111.629807,160.320969 103.615738,160.308807   C98.784836,160.301483 93.951241,160.196381 89.124001,160.326401   C85.947678,160.411942 84.604683,159.173813 84.670586,155.938232   C84.799469,149.610764 84.811234,143.276291 84.661789,136.949677   C84.584045,133.658401 85.985855,132.395813 89.130905,132.658188   C90.123138,132.740982 91.128738,132.660065 92.128220,132.660065   C185.414963,132.659653 278.701691,132.659149 371.988434,132.661224   C379.316132,132.661377 379.316193,132.669846 379.310791,140.063782   C379.307251,144.894684 379.089783,149.737762 379.363800,154.552856   C379.606354,158.815384 378.233307,160.638046 373.727142,160.376511   C368.248413,160.058502 362.731934,160.447693 357.241638,160.253067   C353.628876,160.125015 352.120636,161.340057 352.274811,165.122742   C352.512024,170.943283 352.207581,176.784393 352.372040,182.610016   C352.464020,185.868576 351.119263,187.121780 347.972687,187.076828   C342.143585,186.993530 336.311157,187.125397 330.482605,187.024948   C327.291656,186.969955 325.979279,188.339157 326.036041,191.510422   C326.137360,197.172241 325.958893,202.839371 326.078888,208.500427   C326.154724,212.078918 324.814026,213.582214 321.075500,213.430786   C315.254791,213.194992 309.413635,213.500412 303.588226,213.332138   C300.286133,213.236771 299.180023,214.577042 299.265015,217.763901   C299.420380,223.590103 299.125122,229.430939 299.364990,235.251358   C299.530060,239.256302 297.893433,240.526794 294.073975,240.366638   C288.752686,240.143509 283.396179,240.588120 278.089905,240.228317   C273.338074,239.906113 271.990875,241.793152 272.261292,246.285095   C272.591003,251.762146 272.207397,257.278412 272.370300,262.770630   C272.467957,266.062775 271.057953,267.214935 267.924896,267.151489   C262.263275,267.036865 256.593506,267.238953 250.935669,267.051849   C247.221527,266.929016 245.885910,268.471497 246.023270,272.086243   C246.206573,276.910065 246.079102,281.746368 246.056122,286.577179   C246.024017,293.322968 246.012589,293.331482 239.509003,293.355133   C234.678146,293.372711 229.847198,293.370880 225.016281,293.366058   C217.973434,293.358978 217.966446,293.354553 217.945145,286.053528   C217.931046,281.222748 217.869980,276.390533 217.964584,271.561584   C218.026306,268.410522 216.724609,267.036804 213.508591,267.096191   C207.680603,267.203827 201.847687,267.024780 196.018661,267.102753   C192.848282,267.145172 191.529160,265.848755 191.607742,262.624176   C191.749725,256.797363 191.483765,250.959000 191.688065,245.135971   C191.819702,241.384155 190.309357,240.113342 186.679245,240.271606   C181.857559,240.481842 177.019684,240.322037 172.188766,240.318665   C164.706177,240.313431 164.703094,240.312515 164.691132,233.063782   C164.682877,228.066284 164.559174,223.064621 164.725266,218.072739   C164.838730,214.662689 163.573456,213.240051 160.079483,213.344818   C154.420929,213.514481 148.744858,213.189041 143.092255,213.437759   C139.059845,213.615173 137.797791,211.877167 137.919708,208.127289   C138.087433,202.968552 137.844833,197.796356 138.016907,192.637894   C138.148956,188.679199 136.763321,186.743973 132.539703,187.011063   C128.890701,187.241806 125.214783,187.046936 121.060928,187.039459  z"
          />
        </svg>
      </div>
      <SlimeIdle active={true} />
      <div className="font-bold text-white">{name}</div>
      <div className="">
        <HealthBar health={health} />
      </div>
    </div>
  );
}
