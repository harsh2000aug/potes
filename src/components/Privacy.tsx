import React, { useEffect, useState } from "react";
import Sidebar from "../reusable/Sidebar";
import { staticDataApi } from "../store/Services/AllApi";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
const Privacy = () => {
  const navigate = useNavigate();
  const [apiResponse, setApiReponse]: any = useState({});
  const apiCaller = () => {
    staticDataApi({
      query: {
        topic: "privacy-policy",
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
        <Sidebar current={"Privacy Policy"} />
        <div className="main-area">
          <div className="body-area">
            <div className="back-btn">
              <div className="flex al-center space-bw">
                <button type="button" onClick={() => navigate(-1)}>
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <div className="logo" onClick={() => navigate("/")}>
                  <img src={logo} alt="Logo" />
                </div>
                <button type="button" onClick={() => navigate("/directory")}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
            <div className="common-back">
              <h3>Privacy Policy</h3>
              <p>{apiResponse?.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
