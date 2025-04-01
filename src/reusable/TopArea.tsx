import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  editProfile,
  mainSearchApi,
  profileContactApi,
} from "../store/Services/AllApi";
import $ from "jquery";
import logo from "../images/logo.png";
import toast from "react-hot-toast";

const TopArea = ({ search, setSearch, imageFile }: any) => {
  const navigate = useNavigate();
  const [everySearch, setEverySearch]: any = useState("");
  const [apiResponse, setApiResponse]: any = useState({});
  const [getImage, setGetImage]: any = useState("");
  const [isOpen, setIsOpen]: any = useState(false);
  const [logoutPopup, setLogoutPopup]: any = useState(false);
  const [searcheditem, setSearchedItem]: any = useState("");

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
        }).then((res: any) => {
          setApiResponse(res);
          setSearchedItem(everySearch);
          // $(".searchDown").css("display", "block");
          // navigate("/search-result", { state: { searchAnswer: res } });
        });
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

  const PopupHandler = () => {
    setLogoutPopup(!logoutPopup);
  };

  const logoutBtnHandler = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleOpenSidebar = () => setIsOpen(true);
  const handleCloseSidebar = () => setIsOpen(false);

  const handleNewSearch = () => {
    if (window.location.pathname !== "/directory") {
      if (everySearch !== "") {
        navigate("/search-result", {
          state: { searchAnswer: apiResponse, word: searcheditem },
        });
      } else {
        toast.error("Please write something to search");
      }
    }
  };

  return (
    <div className="top-area">
      <div className="flex space-bw al-center">
        <div className="toggle" onClick={handleOpenSidebar}>
          <i className="fa-solid fa-bars"></i>
        </div>
        {isOpen && <div className="overlay" onClick={handleCloseSidebar}></div>}
        {isOpen && (
          <div className={`mobileSidebar ${isOpen ? "open" : ""}`}>
            <button className="close-btn" onClick={handleCloseSidebar}>
              &times;
            </button>
            <div className="logo" onClick={() => navigate("/")}>
              <img src={logo} alt="Logo" />
            </div>
            <div className="menu">
              <ul>
                {/* <li
                  className="btn-type"
                  onClick={() => navigate("/create-contact")}
                >
                  <i className="fa-solid fa-plus"></i>
                  Create Contact
                </li>
                <li
                  className="btn-type"
                  onClick={() => navigate("/create-a-note")}
                >
                  <i className="fa-solid fa-plus"></i>
                  Create Note
                </li> */}
                <li onClick={() => navigate("/")}>
                  <i className="fa-solid fa-house"></i>
                  Home
                </li>
                <li onClick={() => navigate("/directory")}>
                  <i className="fa-solid fa-user"></i>
                  Directory
                </li>
                <li onClick={() => navigate("/about-us")}>
                  <i className="fa-solid fa-circle-exclamation"></i>
                  About Us
                </li>
                <li onClick={() => navigate("/contact-us")}>
                  <i className="fa-solid fa-phone"></i>
                  Contact Us
                </li>
                <li
                  onClick={() => {
                    setIsOpen(false);
                    setLogoutPopup(true);
                  }}
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                  Logout
                </li>
              </ul>
            </div>
          </div>
        )}
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
                <button className="btn-icon-content" onClick={handleNewSearch}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
          </div>
          {window.location.pathname !== "/directory" && (
            <div className="searchDown">
              <ul>
                <h3>Contact</h3>
                {apiResponse?.contacts?.length ? (
                  apiResponse.contacts.map((itm: any) => (
                    <li key={itm.id} onClick={() => profileHandler(itm.id)}>
                      {itm.full_name}
                    </li>
                  ))
                ) : (
                  <li>No result found for "{everySearch}"</li>
                )}
                <h3>Notes</h3>
                {apiResponse?.notes?.length ? (
                  apiResponse.notes.map((itm: any) => (
                    <li
                      key={itm.id}
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
                  ))
                ) : (
                  <li>No note found</li>
                )}
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
      <div className="note-contact">
        <button type="button" onClick={() => navigate("/create-contact")}>
          <i className="fa-solid fa-plus"></i>
          Create contact
        </button>
        <button type="button" onClick={() => navigate("/create-a-note")}>
          <i className="fa-solid fa-plus"></i>
          Create note
        </button>
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
    </div>
  );
};

export default TopArea;
