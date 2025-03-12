import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { editProfile, mainSearchApi } from "../store/Services/AllApi";

const TopArea = ({ search, setSearch, imageFile }: any) => {
  const navigate = useNavigate();
  const [everySearch, setEverySearch]: any = useState("");
  const [apiResponse, setApiResponse]: any = useState({});
  const [getImage, setGetImage]: any = useState("");

  const searchContentApiHandler = async () => {
    if (everySearch !== "") {
      try {
        const res: any = mainSearchApi({
          query: {
            q: everySearch,
          },
        });
        setApiResponse(res);
      } catch (err) {
        console.log("err", err);
      }
    }
  };
  useEffect(() => {
    searchContentApiHandler();
  }, [everySearch]);

  useEffect(() => {
    editProfile()
      .then((res: any) => {
        setGetImage(res?.profile_pic);
      })
      .catch((err: any) => console.log("err", err));
  }, []);

  return (
    <div className="top-area">
      <div className="flex space-bw al-center">
        <div className="search">
          <div className="search-box">
            <div className="search-field">
              <input
                placeholder="Search..."
                value={
                  window.location.pathname === "/directory"
                    ? search
                    : everySearch
                }
                className="input-search"
                type="text"
                onChange={(e) =>
                  window.location.pathname === "/directory"
                    ? setSearch(e.target.value)
                    : setEverySearch(e.target.value)
                }
              />
              <div className="search-box-icon">
                <button className="btn-icon-content">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
          </div>
          {window.location.pathname !== "/directory" && (
            <div className="searchDown">
              <ul>
                <li>Hi my name is kumar</li>
                <li>I am a web developer</li>
              </ul>
            </div>
          )}
        </div>
        <div className="user-profile" onClick={() => navigate("/edit-profile")}>
          {imageFile ? (
            <img src={imageFile} alt="" />
          ) : getImage ? (
            <img src={getImage} alt="" />
          ) : (
            <i className="fa-regular fa-circle-user"></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopArea;
