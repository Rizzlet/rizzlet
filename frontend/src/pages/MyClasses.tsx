import axios from "axios";
import React, { useEffect, useState } from "react";
import ClassWidget from "../components/ClassWidget";
import AddClassModal from "../components/AddClassModal";
interface ClassItem {
  id: string;
  name: string;
}

export default function MyClasses() {
  const [allClasses, setAllClasses] = useState<ClassItem[]>([]);
  const [userClasses, setUserClasses] = useState<ClassItem[]>([]);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [classColors, setClassColors] = useState<Record<string, string>>({});

  async function fetchClasses() {
    // Use axios to get the classes from the backend
    const response = await axios.get<ClassItem[]>(
      process.env.REACT_APP_BACKEND_URL + "/api/class"
    );

    if (response.status === 200) {
      setAllClasses(response.data);
    } else {
      console.error("Got invalid status from class request!");
      console.error(response);
    }

    // Use axios to get the user's classes from the backend
    const userResponse = await axios.get<ClassItem[]>(
      process.env.REACT_APP_BACKEND_URL + "/api/user/classes",
      { withCredentials: true }
    );

    if (userResponse.status === 200) {
      setUserClasses(userResponse.data);
      // Load colors from local storage
      const savedColors: Record<string, string> = {};
      userResponse.data.forEach((cls) => {
        const savedColor = localStorage.getItem(cls.id);
        if (savedColor) {
          savedColors[cls.id] = savedColor;
        }
      });
      setClassColors(savedColors);
    } else {
      console.error("Got invalid status from user class request!");
      console.error(userResponse);
    }
  }

  function addClass(classes: ClassItem) {
    console.log(classes);
    // Use axios to get the user's classes from the backend
    axios
      .put(
        process.env.REACT_APP_BACKEND_URL + "/api/user",
        {
          classIds: [classes.id, ...userClasses.map((c) => c.id)],
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          setUserClasses([...userClasses, classes]);
        }
      })
      .catch((err) => {
        console.error("Got invalid status from user class request!");
        console.error(err);
      });
  }

  function removeClass(classToRemove: ClassItem) {
    // Use axios to get the user's classes from the backend
    axios
      .put(
        process.env.REACT_APP_BACKEND_URL + "/api/user",
        {
          classIds: userClasses
            .filter((c) => c.id !== classToRemove.id)
            .map((c) => c.id),
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          setUserClasses((u) => {
            return u.filter((c) => c.id !== classToRemove.id);
          });
        }
      })
      .catch((err) => {
        console.error("Got invalid status from user remove class request!");
        console.error(err);
      });
  }

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleColorChange = (classId: string, color: string) => {
    setClassColors((prevColors) => ({
      ...prevColors,
      [classId]: color,
    }));
    localStorage.setItem(classId, color);
  };

  return (
    <div className="m-16">
      <AddClassModal
        open={showAddClassModal}
        onClose={() => setShowAddClassModal(false)}
        newClasses={allClasses.filter(
          (c) => !userClasses.some((uc) => uc.id === c.id)
        )}
        onSubmit={addClass}
      />
      <div className="flex items-center justify-between">
        <div className=" mb-8 inline-flex items-center justify-center rounded-md bg-primary">
          <h1 className="m-3 text-4xl ">My Classes</h1>
        </div>
        <div
          className="flex h-10 w-10 cursor-pointer 
          justify-center rounded-2xl border-2 border-black 
          transition duration-100 ease-in-out hover:bg-gray-400"
          onClick={() => setShowAddClassModal(true)}
        >
          <p className="justify-end text-2xl">+</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {userClasses.map((cls) => {
          return (
            <ClassWidget
              key={cls.id}
              name={cls.name}
              id={cls.id}
              onDelete={() => {
                removeClass(cls);
              }}
              selectedColor={classColors[cls.id] || "bg-gray-200"} // Default to gray if color not found
              setSelectedColor={(color) => handleColorChange(cls.id, color)}
            />
          );
        })}
      </div>
    </div>
  );
}
