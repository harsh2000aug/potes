import React from "react";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
const menuTab: any = [
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
  {
    name: "Create Contact",
    icon: "fa-solid fa-plus",
    isButton: true, // Marking these items as buttons
  },
  {
    name: "Create Note",
    icon: "fa-solid fa-plus",
    isButton: true, // Marking these items as buttons
  },
];
const Sidebar = ({ current }: any) => {
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
      navigate("/create-note");
    }
  };
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="menu">
        <ul>
          {menuTab.map((item: any) => (
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
  );
};

export default Sidebar;
