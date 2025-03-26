import React, { useState } from "react";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
const menuTab: any = [
  {
    name: "Create Contact",
    icon: "fa-solid fa-plus",
    isButton: true,
  },
  {
    name: "Create Note",
    icon: "fa-solid fa-plus",
    isButton: true,
  },
  {
    name: "Home",
    icon: "fa-solid fa-house",
  },
  {
    name: "Directory",
    icon: "fa-solid fa-user",
  },
  {
    name: "About Us",
    icon: "fa-solid fa-circle-exclamation",
  },
  {
    name: "Contact Us",
    icon: "fa-solid fa-phone",
  },
  {
    name: "Logout",
    icon: "fa-solid fa-right-from-bracket",
  },
];
const Sidebar = ({ current }: any) => {
  const [logoutPopup, setLogoutPopup]: any = useState(false);

  const PopupHandler = () => {
    setLogoutPopup(!logoutPopup);
  };
  const logoutBtnHandler = () => {
    localStorage.clear();
    window.location.reload();
  };
  const navigate = useNavigate();

  const tabChangeHandler = (val: any) => {
    if (val === "Home") {
      navigate("/");
    } else if (val === "Directory") {
      navigate("/directory");
    } else if (val === "About Us") {
      navigate("/about-us");
    } else if (val === "Contact Us") {
      navigate("/contact-us");
    } else if (val === "Create Contact") {
      navigate("/create-contact");
    } else if (val === "Create Note") {
      navigate("/create-a-note");
    } else if (val === "Logout") {
      // logoutBtnHandler();
      setLogoutPopup(true);
    }
  };

  return (
    <>
      <div className="sidebar">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="menu">
          <ul>
            {menuTab.slice(0, 4).map((item: any) => (
              <li
                key={item.name}
                className={`${item.isButton ? "btns" : ""} ${
                  current === item.name ? "active" : ""
                }`.trim()}
              >
                {item.isButton ? (
                  <button onClick={() => tabChangeHandler(item.name)}>
                    <i className={item.icon}></i> {item.name}
                  </button>
                ) : (
                  <span onClick={() => tabChangeHandler(item.name)}>
                    <i className={item.icon}></i> {item.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <ul className="p-absolute">
            {menuTab.slice(4).map((item: any) => (
              <li
                key={item.name}
                className={`${item.isButton ? "btns" : ""} ${
                  current === item.name ? "active" : ""
                }`.trim()}
              >
                {item.isButton ? (
                  <button onClick={() => tabChangeHandler(item.name)}>
                    <i className={item.icon}></i> {item.name}
                  </button>
                ) : (
                  <span onClick={() => tabChangeHandler(item.name)}>
                    <i className={item.icon}></i> {item.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {logoutPopup && (
        <div id="logoutPopup" className="overlay">
          <div className="popup">
            <h2>Are you sure you want to logout?</h2>
            <div className="btn-group">
              <button className="cancel-btn" onClick={PopupHandler}>
                Cancel
              </button>
              <button className="logout-btn" onClick={logoutBtnHandler}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
