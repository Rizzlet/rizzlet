import React, { useState, useEffect} from "react";
import "./ClassSearch.css"; 

const ClassSearch: React.FC = () => {
  const [classList, setClassList] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/class")
      .then(response => response.json())
      .then(data => {
        // Assuming data is an array of class objects with a 'name' property
        const classNames = data.map((classObject: any) => classObject.name);
        console.log(classNames); // Print classNames to the console
        setClassList(classNames);
      })
      .catch(error => console.error("Error fetching class data:", error));
  }, []);

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
          {classList.map(className => (
            <option key={className} value={className}>
              {className}
            </option>
          ))}
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

export default ClassSearch;
