import axios from "axios";

interface DamageDealerProps {
  classId: string;
  targetId: string | null;
  onClick: () => void;
  damage: number;
  disabled: boolean;
}

export default function DamageDealer<T extends DamageDealerProps>(props: T) {
  /**
   * @param classStats: List of user stats in the class
   */

  async function updateHealth() {
    try {
      await axios.post(
        new URL("/api/user/updateHealth", process.env.REACT_APP_BACKEND_URL!)
          .href,
        {
          damageAmount: props.damage,
          attackUser: props.targetId,
          classId: props.classId,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error, "Error updating user health");
    }
  }

  return (
    <button
      type="button"
      className={
        "flex items-center focus:outline-none text-white  focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 " +
        (!props.disabled ? "bg-red-700 hover:bg-red-800" : "bg-gray-400")
      }
      onClick={() => {
        if (props.targetId) {
          updateHealth();
          props.onClick();
        }
      }}
      disabled={props.disabled}
    >
      {/* Fire Icon */}
      <svg
        className="h-6 w-6 text-white-600"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <path d="M18 15a6 6 0 1 1 -10.853 -3.529c1.926-2.338 4.763-3.327 3.848-8.47 2.355 1.761 5.84 5.38 2.022 9.406-1.136 1.091-.244 2.767 1.221 2.593.882-.105 2.023-.966 3.23-2.3.532.68.532 1.717.532 2.3z" />
      </svg>
      <div className="text-base mr-2 ml-1">Attack</div>
    </button>
  );
}
