import React from "react";
import "./ClassSearch.css"; 

const ClassSearch: React.FC = () => {

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
          <option>CSC 308</option>
          <option>CSC 309</option>
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
