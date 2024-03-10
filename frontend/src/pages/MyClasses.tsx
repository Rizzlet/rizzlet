import axios from "axios";
import React, { useEffect, useState } from "react";
import ClassWidget from "../components/ClassWidget";
import { createPortal } from "react-dom";
import AddClassModal from "../components/AddClassModal";

interface ClassItem {
  id: string;
  name: string;
}

export default function MyClasses() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [showAddClassModal, setShowAddClassModal] = useState(false);

  async function fetchClasses() {
    // Use axios to get the classes from the backend
    const response = await axios.get<ClassItem[]>(
      process.env.REACT_APP_BACKEND_URL + "/api/class"
    );

    if (response.status === 200) {
      setClasses(response.data);
    } else {
      console.error("Got invalid status from class request!");
      console.error(response);
    }
  }

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="m-16">
      <AddClassModal
        open={showAddClassModal}
        onClose={() => setShowAddClassModal(false)}
      />
      <div className="flex justify-between items-center">
        <div className=" bg-teal-200 mb-2 rounded-md items-center justify-center inline-flex">
          <h1 className="text-4xl m-2 ">My Classes</h1>
        </div>
        <div
          className="w-10 h-10 rounded-2xl border-2 bg-gray-300 
          border-gray-500 flex justify-center cursor-pointer 
          hover:bg-gray-400 transition duration-100 ease-in-out"
          onClick={() => setShowAddClassModal(true)}
        >
          <p className="text-3xl justify-end">+</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {classes.map((cls) => {
          return <ClassWidget name={cls.name} id={cls.id} />;
        })}
      </div>
    </div>
  );
}
