import React from "react";
import "../styles/global.css";
import MinusIcon from "../assets/minus-icon.svg";

const SchemaPopup = (props) => {
  const {
    options,
    selectedOption,
    setSelectedOption,
    addedSchemas,
    setAddedSchemas,
  } = props;

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value.replace(/_/g, " "));
  };

  const handleAddNewSchema = () => {
    if (selectedOption) {
      setAddedSchemas([...addedSchemas, selectedOption]);
      setSelectedOption("");
    }
  };
  const getDotClassName = (schema) => {
    const greenSchemas = ["account_name", "city", "state"];
    return greenSchemas.includes(schema) ? "green" : "red";
  };

  const availableOptions = options.filter(
    (option) => !addedSchemas.includes(option.value.replace(/_/g, " "))
  );
  return (
    <div className="schema-container">
      {addedSchemas.length > 0 && (
        <div className="blue-box">
          {addedSchemas.map((schema, index) => (
            <div className="selected-schemas" key={index}>
              <span className={`dot ${getDotClassName(schema)}`} />
              <select className="select-schema-option">
                <option value={schema}>{schema}</option>
              </select>
              <img className="minus-icon" src={MinusIcon} alt="MinusIcon" />
            </div>
          ))}
        </div>
      )}

      <div className="schema-segment">
        <span className="dot gray" />
        <select
          className="select-schema-option"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="">Add schema to segment</option>
          {availableOptions.map((option) => (
            <option
              className={option.label}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
        <img className="minus-icon" src={MinusIcon} alt="MinusIcon" />
      </div>
      <a className="addNew-schema" onClick={handleAddNewSchema}>
        + Add new schema
      </a>
    </div>
  );
};

export default SchemaPopup;
