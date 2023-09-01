import React, { useState } from "react";
import "../styles/global.css";
import BackArrow from "../assets/BackArrow.svg";

function Header(props) {

  return (
      <div className="sticky-header">
        <div className="back-arrow">
          <img className="backArrow-icon" src={BackArrow} alt="Back" onClick={props?.closePopup}/>
        </div>
        <div className="header-gap"></div>
        <div className="view-audience">View Audience</div>
      </div>
    );
}

export default Header;
