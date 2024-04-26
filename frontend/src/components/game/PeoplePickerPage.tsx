import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "./PeoplePicker"; // Import the Select component
import DamageDealer from "./damageDealer";

function PeoplePicker() {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [usersInClass, setUsersInClass] = useState([]);
  // const [disabled, setdisabled] = useState(Boolean);

  //hardcoded diabled for now since we dont have the requirements for it
  const disabled = false;
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
        health: user.health,
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

  async function updateHealth(damage: Number, userToAttack: string) {
    try {
      await axios.post(
        new URL("/api/user/updateHealth", process.env.REACT_APP_BACKEND_URL!)
          .href,
        {
          damageAmount: damage,
          attackUser: selectedPerson,
          classId: classId,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error, "Error updating user health");
    }
  }

  return (
    <div className="grid grid-cols-2 gap-2 h-screen overflow-hidden">
      {/*left side of the screen */}
      <div className="col-span-1 bg-[url('https://s3.amazonaws.com/spoonflower/public/design_thumbnails/0424/5908/1431605648965_shop_thumb.png')] p-4 pt-5">
        <Select
          selectedPerson={selectedPerson}
          onSelectPerson={handleSelectPerson}
          disabled={disabled}
          people={usersInClass}
        />

        {/* Attack Button */}
        <div className="flex justify-center items-center">
          <button
            type="button"
            className="flex items-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={() =>
              selectedPerson !== null && updateHealth(-2, selectedPerson)
            }
            disabled={disabled}
          >
            {/* Fire Icon */}
            <svg
              className="h-6 w-6 text-white-600"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <path d="M18 15a6 6 0 1 1 -10.853 -3.529c1.926-2.338 4.763-3.327 3.848-8.47 2.355 1.761 5.84 5.38 2.022 9.406-1.136 1.091-.244 2.767 1.221 2.593.882-.105 2.023-.966 3.23-2.3.532.68.532 1.717.532 2.3z" />
            </svg>
            <div className="text-base mr-2 ml-1">
              Attack
            </div>
          </button>
        </div>
      </div>
      {/* right side of the screen */}
      <div className="col-span-1 bg-gray-300 p-4"></div>
    </div>
  );
}

export default PeoplePicker;