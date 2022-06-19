import React from "react";
import "./Loader.css";
import miniLogo from "icons/mini-logo.svg";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__icons-wrapper">
        <div className="loader__circle"></div>
        <img src={miniLogo} alt="Logo" className="loader__mini-logo" />
      </div>
    </div>
  );
};

export default Loader;
