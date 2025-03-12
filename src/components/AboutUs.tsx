import React, { useEffect, useState } from "react";
import Sidebar from "../reusable/Sidebar";
import { staticDataApi } from "../store/Services/AllApi";

const AboutUs = () => {
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
