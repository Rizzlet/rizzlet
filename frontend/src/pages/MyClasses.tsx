import axios from "axios";
import React, { useEffect, useState } from "react";
import ClassWidget from "../components/ClassWidget";

interface ClassItem {
  id: string;
  name: string;
}

export default function MyClasses() {
  const [classes, setClasses] = useState<ClassItem[]>([]);

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
      <div className=" bg-teal-200 mb-2 rounded-md items-center justify-center inline-flex">
        <h1 className="text-6xl m-2 ">My Classes</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {classes.map((cls) => {
          return <ClassWidget name={cls.name} id={cls.id} />;
        })}
      </div>
    </div>
  );
}
