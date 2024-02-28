import { useState, useEffect } from "react";
import "./ClassSearch.css";
import axios from "axios";

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
  }, []);

  const fetchClassNames = async () => {
    try {
      const response = await axios.get<ClassItem[]>(process.env.REACT_APP_BACKEND_URL + "/api/class");
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

  const handleSubmit = async () => {
    try {
      const requestUrl = new URL("/api/user", process.env.REACT_APP_BACKEND_URL!).href;
      console.log("Updating user classes at URL:", requestUrl);
      await axios.put(
        requestUrl,
        { classes: selectedClasses },
        { withCredentials: true }
      );
  
      setSelectedClasses([]); // Clear selected classes after submission
      console.log("Classes submitted successfully");
    } catch (error) {
      console.error("Error submitting selected classes:", error);
    }
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

      {/* Submit button container */}
    <div className="submit-button-container">
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
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
