import React, { useEffect, useState } from "react";
import Sidebar from "../reusable/Sidebar";
import { staticDataApi } from "../store/Services/AllApi";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
const AboutUs = () => {
  const navigate = useNavigate();
  const [apiResponse, setApiReponse]: any = useState({});
  const apiCaller = () => {
    staticDataApi({
      query: {
        topic: "about",
      },
    })
      .then((res: any) => {
        setApiReponse(res?.data);
      })
      .catch((err: any) => console.log("err", err));
  };

  useEffect(() => {
    apiCaller();
  }, []);
  return (
    <div className="aboutUs">
      <div className="flex h-100">
        <Sidebar current={"About Us"} />
        <div className="main-area">
          <div className="body-area">
            <div className="back-btn">
              <div className="flex al-center">
                <button type="button" onClick={() => navigate(-1)}>
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <div className="logo" onClick={() => navigate("/")}>
                  <img src={logo} alt="Logo" />
                </div>
              </div>
            </div>
            <div className="common-back">
              <h3>About Us</h3>
              <p>{apiResponse?.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
