import React, { useState } from "react";
import "../styles/global.css";
import SchemaPopup from "./schemaPopup";
import axios from "axios";
import Header from "./header";

function HomePage() {
  const options = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ];

  const [selectedOption, setSelectedOption] = useState("");
  const [addedSchemas, setAddedSchemas] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [segmentName, setSegmentName] = useState("");

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSegmentNameChange = (event) => {
    setSegmentName(event.target.value);
  };
  const saveSegment = () => {
    const schema = [];
    options.forEach((element, index) => {
      const availableValues = addedSchemas.includes(
        element.value.replace(/_/g, " ")
      );
      if (availableValues) {
        schema.push({ [element.value]: element.label });
      }
    });
    const postData = {
      segment_name: segmentName,
      schema: schema,
    };
    const jsonData = JSON.stringify(postData)
    axios
      .post("https://webhook.site/97415c23-7182-40f8-9c07-09fc7d52be44", jsonData)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className={`page-container ${isPopupOpen ? "overlay" : ""}`}>
     <Header/>
      <div className="content">
        {/* Your content here */}
        <button className="save-segment-button" onClick={openPopup}>
          Save Segment
        </button>
      </div>
      {isPopupOpen && (
        <div className="popup">
        <Header closePopup={closePopup}/>

          <div className="popup-content">
            <label className="segment-label">
              Enter the Name of the Segment
            </label>
            <input
              type="text"
              placeholder="Enter segment name"
              value={segmentName}
              onChange={handleSegmentNameChange}
            />
            <p className="segment-query-details">
              To save your segment, you need to add the schemas <br></br>
              to build the query
            </p>
            <div className="trait-item">
              <span className="user-traits">
                <span className="dot green" />- User Traits
              </span>
              <span className="group-traits">
                <span className="dot red" />- Group Traits
              </span>
            </div>
            <SchemaPopup
              options={options}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              addedSchemas={addedSchemas}
              setAddedSchemas={setAddedSchemas}
            />
          </div>
          <div className="popup-footer">
            <button className="save-button" onClick={saveSegment}>
              Save the Segment
            </button>
            <button className="cancel-button" onClick={closePopup}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
