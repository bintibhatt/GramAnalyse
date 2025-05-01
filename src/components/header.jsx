import React from "react";

const Header = () => {
  return (
    <div className="header-wrapper">
      <div className="header">
        <div className="header-container">
          <h1 className="logo">FNFCompare</h1>
          <nav className="nav-buttons">
            {/* Optional buttons */}
            {/* <button>Refresh</button>
        <button>Export</button> */}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
