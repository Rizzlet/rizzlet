import React, { useState, useEffect } from "react";
import "./ClassSearch.css";
import axios from "axios";

export default function ClassSearch() {
  const [classNames, setClassNames] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Fetch class names from backend when component mounts
    fetchClassNames();
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

  return (
    <div className="class-search-background"> {/*gradient background*/}
      {/* Header section */}
      <div className="header">
        <div className="brand">Rizzlet</div>
      </div>
  
      {/* Custom dropdown box */}
      <div className="dropdown-container">
        <div className="dropdown-title" onClick={toggleDropdown}>
          Classes
        </div>
        {isDropdownOpen && (
          <div className="dropdown">
            {classNames.map((className, index) => (
              <div key={index} className="dropdown-item">
                <input
                  className="checkbox"
                  type="checkbox"
                  value={className}
                  checked={selectedClasses.includes(className)}
                  onChange={() => handleClassSelect(className)}
                />
                <label>{className}</label>
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
      {selectedClasses.length > 0 && (
        <div className="selected-classes-title-container">
          <div className="selected-classes-title">Selected Classes</div>
        </div>
      )}
  
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
