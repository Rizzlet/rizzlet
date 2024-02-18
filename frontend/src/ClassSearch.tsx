import React, { useState, useEffect } from "react";
import "./ClassSearch.css"; 
import axios from "axios";

export default function ClassSearch() { 
  
  const [classNames, setClassNames] = useState<string[]>([]);

  useEffect(() => {
    // Fetch class names from backend when component mounts
    fetchClassNames();
  }, []);

  const fetchClassNames = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/classes");
      console.log("Response from backend:", response);
      setClassNames(response.data);
    } catch (error) {
      console.error("Error fetching class names:", error);
    }
  };
  
  
  return (
    <div>
      {/* Header section */}
      <div className="header">
        <div className="brand">Rizzlet</div>
      </div>

      {/* Dropdown box */}
      <div className="dropdown-container">
        <div className="dropdown-title">Classes</div>
        <select className="dropdown">
          {/* Map over classNames array to populate dropdown options */}
          {classNames.map((className, index) => (
            <option key={index} value={className}>
              {className}
            </option>
          ))}
          <option>
            
          </option>
        </select>
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
    </div>
  );
};

