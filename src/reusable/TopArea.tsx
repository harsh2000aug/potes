import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  editProfile,
  mainSearchApi,
  profileContactApi,
} from "../store/Services/AllApi";
import $ from "jquery";

const TopArea = ({ search, setSearch, imageFile }: any) => {
  const navigate = useNavigate();
  const [everySearch, setEverySearch]: any = useState("");
  const [apiResponse, setApiResponse]: any = useState({});
  const [getImage, setGetImage]: any = useState("");

  const profileHandler = (userId: any) => {
    profileContactApi({
      query: {
        id: userId,
      },
    }).then((res: any) => {
      navigate("/profile", { state: { profileData: res } });
    });
  };

  const searchContentApiHandler = async () => {
    if (everySearch !== "") {
      try {
        const res: any = await mainSearchApi({
          query: {
            q: everySearch,
          },
        });
        setApiResponse(res);
        $(".searchDown").css("display", "block");
      } catch (err) {
        console.log("err", err);
      }
    } else {
      $(".searchDown").css("display", "none");
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

  const sendParticularNote = (noteData: any) => {
    navigate("/notes", {
      state: { profileId: noteData?.contact?.id, currentNote: noteData },
    });
  };

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
                <h3>Contact</h3>
                {apiResponse?.contacts?.map((itm: any) => {
                  return (
                    <li onClick={() => profileHandler(itm.id)}>
                      {itm.full_name}
                    </li>
                  );
                })}
                <h3>Notes</h3>
                {apiResponse?.notes?.map((itm: any) => {
                  return (
                    <li
                      className="flex"
                      onClick={() => sendParticularNote(itm)}
                    >
                      <span>{itm?.contact?.full_name}</span>
                      <p>
                        {itm?.note?.length < 30
                          ? itm?.note
                          : `${itm?.note?.slice(0, 30)}...`}
                      </p>
                    </li>
                  );
                })}
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
