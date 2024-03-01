import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ClassSearch.css";

interface ClassItem {
  id: string;
  name: string;
}

export default function ClassSearch() {
  const [classNames, setClassNames] = useState<ClassItem[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Fetch class names from backend when component mounts
    fetchClassNames();
    // Disable scrolling when the component mounts
    // document.body.style.overflow = 'hidden';
    // // Re-enable scrolling when the component unmounts
    // return () => {
    //   document.body.style.overflow = 'auto';
    // };
  }, []);

  const fetchClassNames = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/class");
      console.log("Response from backend:", response);
      setClassNames(response.data);
    } catch (error) {
      console.error("Error fetching class names:", error);
    }
  };

  const handleClassSelect = (className: string) => {
    // Check if the class is already selected
    const index = selectedClasses.indexOf(className);
    if (index === -1) {
      // If not selected, add it to the list
      setSelectedClasses([...selectedClasses, className]);
    } else {
      // If already selected, remove it from the list
      setSelectedClasses(selectedClasses.filter((name) => name !== className));
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // return (
  //   <div className="flex flex-col items-center justify-start h-screen pt-10 mt-auto bg-white">
  //     {/* Header Section */}
  //     <div className="bg-teal-200 py-5 px-8 w-1/2 max-w-screen-lg box-border text-center rounded-lg mb-auto">
  //       {/* Heading */}
  //       <h1 className="text-gray-800 text-2xl">Class Search</h1>
  //     </div>

  //     {/* Custom dropdown box */}
  //     <div className="relative inline-block mt-5">
  //       <div className="bg-gray-200 border-b border-gray-400 py-3 px-6 w-700 flex justify-between items-center">
  //         Classes
  //         <div className="border-l border-r border-transparent border-t-8 border-gray-600"></div>
  //       </div>
  //         {/* Dropdown Items */}
          
  //     </div>
  //     {/* Conatiner for Selected Classes */}
  //     <div className="absolute text-center mt-1 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-full">
  //       <div className="bg-gray-300 py-2 px-4 rounded-full text-black w-700">
  //         Selected Classes
  //       </div>
  //     </div>
    
  //     {/* Container for list of selected classes */}
  //     <div className="absolute bg-gray-400 rounded-lg top-2/5 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center p-4 w-700">
  //       <ul className="flex flex-wrap justify-center">

  //       </ul>
  //     </div>
  //   </div>
  // );

  return (
    <div className="class-search-background"> {/*gradient background*/}
  
      {/* Custom dropdown box */}
      <div className="dropdown-container">
        <div className="dropdown-title" onClick={toggleDropdown}>
          Classes
        </div>
        {isDropdownOpen && (
          <div className="dropdown">
            {classNames.map((classItem, index) => (
              <div key={index} className="dropdown-item">
                <input
                  className="checkbox"
                  type="checkbox"
                  value={classItem.name}
                  checked={selectedClasses.includes(classItem.name)}
                  onChange={() => handleClassSelect(classItem.name)}
                />
                <label>{classItem.name}</label>
              </div>
            ))}
          </div>
        )}
      </div>
  
      {/* Green background container */}
      <div className="class-search-container">
        <div className="header-container">
          {/* Heading */}
          <div className="heading-container">
            <h1 className="heading">Class Search</h1>
          </div>
        </div>
      </div>
  
      {/* Container for the title "Selected Classes" */}
      {/* {selectedClasses.length > 0 && (
        <div className="selected-classes-title-container">
          <div className="selected-classes-title">Selected Classes</div>
        </div>
      )} */}
  
      {/* Container for the list of selected classes */}
      {selectedClasses.length > 0 && (
        <div className="selected-classes-container">
          <ul>
            {selectedClasses.map((className, index) => (
              <li key={index}>{className}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );  
}

// // .class-search-container
// className="flex flex-col items-center justify-start h-screen pt-10 mt-auto"

// // .header-container
// className="bg-teal-200 py-5 px-8 w-1/2 max-w-screen-lg box-border text-center rounded-lg mb-auto"

// // .header
// className="p-5 bg-cornflowerblue"

// // .brand
// className="text-white font-bold text-2xl"

// // .heading
// className="text-gray-800 text-2xl"

// // select
// className="py-2 px-3 border border-gray-300 rounded bg-white text-base text-gray-700"

// // select:hover
// className="hover:border-gray-600"

// // .dropdown-container
// className="relative inline-block mt-5"

// // .dropdown-title
// className="text-gray-600 bg-gray-200 border-b border-gray-400 py-3 px-6 w-700 flex justify-between items-center"

// // .dropdown-title::after
// className="border-l border-r border-transparent border-t-8 border-gray-600"

// // .dropdown
// className="hidden absolute left-1/2 transform -translate-x-1/2 bg-white shadow-md p-4 border border-gray-300 z-10 w-700"

// // .dropdown-item
// className="flex items-center p-2"

// // .checkbox
// className="mr-2"

// // .dropdown-container:hover .dropdown
// className="group hover:block"

// // .selected-classes-title
// className="bg-cornflowerblue py-2 px-4 rounded-full text-white w-700"

// // .selected-classes-title-container
// className="absolute text-center mt-1 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-full"

// // .selected-classes-container
// className="absolute bg-cornflowerblue rounded-lg top-2/5 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center p-4 w-700"

// // .selected-classes-container ul
// className="flex flex-wrap justify-center"

// // .selected-classes-container ul li
// className="text-gray-600 bg-gray-300 border border-gray-400 rounded-lg m-2 p-2 shadow-md"
