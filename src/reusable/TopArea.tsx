import React from "react";

const TopArea = () => {
  return (
    <div className="top-area">
      <div className="flex space-bw al-center">
        <div className="search">
          <div className="search-box">
            <div className="search-field">
              <input
                placeholder="Search..."
                className="input-search"
                type="text"
              />
              <div className="search-box-icon">
                <button className="btn-icon-content">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="user-profile">
          <i className="fa-regular fa-circle-user"></i>
        </div>
      </div>
    </div>
  );
};

export default TopArea;
