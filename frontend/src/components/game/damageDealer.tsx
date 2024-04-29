import axios from "axios";
import React, { ReactElement, useEffect } from "react";
import { useState } from "react";
interface Classes {
  id: string;
  name: string;
  scores: UserStats[];
}

interface UserStats {
  user: string;
  score: Number;
  health: Number;
}

interface DamageDealerProps {
  class: Classes;
}

export default function DamageDealer<T extends DamageDealerProps>(props: T) {
  /**
   * @param classStats: List of user stats in the class
   */

  async function updateHealth(damage: Number, userToAttack: string) {
    try {
      await axios.post(
        new URL("/api/user/updateHealth", process.env.REACT_APP_BACKEND_URL!)
          .href,
        {
          damageAmount: damage,
          attackUser: userToAttack,
          classId: props.class.id,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error, "Error updating user health");
    }
  }

  const [listOfStudents, setListofStudents] = useState<ReactElement[]>();

  function mapStudents() {
    if (props.class !== undefined) {
      setListofStudents(
        props.class.scores.map((userStats) => {
          return (
            <div>
              {`${userStats.user}: ${userStats.health}`}

              <button
                onClick={() => updateHealth(-2, userStats.user)}
                className="px-3"
              >
                Attack
              </button>
            </div>
          );
        })
      );
    }
  }

  useEffect(() => {
    mapStudents();
  });

  return <div>{listOfStudents}</div>;
}
