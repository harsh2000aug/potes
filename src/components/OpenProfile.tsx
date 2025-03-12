import React from "react";
import Sidebar from "../reusable/Sidebar";
import TopArea from "../reusable/TopArea";
import user from "../images/user.png";
import { useLocation, useNavigate } from "react-router-dom";

const OpenProfile = () => {
  const location = useLocation();
  const profileData = location.state?.profileData;
  console.log("first", profileData);
  const navigate = useNavigate();
  function formatDate(timestamp: any) {
    const date = new Date(timestamp);
    const yy = String(date.getFullYear()); // Extract last two digits of the year
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Month (zero-based index)
    const dd = String(date.getDate()).padStart(2, "0"); // Day

    return `${yy}-${mm}-${dd}`;
  }

  return (
    <div className="openProfile">
      <div className="flex h-100">
        <Sidebar />
        <div className="main-area">
          <div className="body-area">
            <div className="common-back">
              <div className="name flex space-bw al-center">
                <h4>{profileData.full_name}</h4>
                <div className="btn">
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/create-note", {
                        state: {
                          profileName: profileData.full_name,
                          profileId: profileData.id,
                        },
                      })
                    }
                  >
                    <i className="fa-solid fa-plus"></i>
                    Add a note
                  </button>
                </div>
              </div>
              <div className="userDetail flex space-bw al-center">
                <ul>
                  <li>
                    <b>Name:</b> {profileData.full_name}
                  </li>
                  <li>
                    <b>Birthday:</b> {profileData.birthday}
                  </li>
                  <li>
                    <b>Email:</b> {profileData.email}
                  </li>
                  <li>
                    <b>Phone:</b> {profileData.phone}
                  </li>
                  <li>
                    <b>Spouse Name:</b> {profileData.spouse_name || "-"}
                  </li>
                  <li>
                    <b>Spouse Birthday:</b> {profileData.spouse_birthday || "-"}
                  </li>
                  <li>
                    <b>Employment:</b>{" "}
                    {profileData.previous_employers.length > 0
                      ? profileData.previous_employers.map((itm: any) => (
                          <p key={itm.id}>{itm.details}</p>
                        ))
                      : "-"}
                  </li>
                  <li>
                    <b>University:</b>{" "}
                    {/* {profileData.universities > 0
                      ? profileData.universities.details
                      : "-"} */}
                    {profileData.universities.length > 0
                      ? profileData.universities.map((itm: any) => (
                          <p key={itm.id}>{itm.details}</p>
                        ))
                      : "-"}
                  </li>
                </ul>
                <img src={user} alt="" />
              </div>
              <div className="allNotes">
                <div>
                  <div className="flex space-bw note-head">
                    <h4>Notes</h4>
                    <i
                      className="fa-solid fa-keyboard"
                      onClick={() =>
                        navigate("/all-notes", {
                          state: { profileId: profileData.id },
                        })
                      }
                      style={{
                        display:
                          profileData?.contact_notes.length > 0
                            ? "block"
                            : "none",
                        cursor: "pointer",
                      }}
                    ></i>
                  </div>
                </div>
                <div>
                  {profileData?.contact_notes.length > 0 ? (
                    profileData?.contact_notes?.map((itm: any) => (
                      <div key={itm.id} className="flex al-center mb-15 border">
                        <div className="date">
                          <span></span>
                          <p>
                            <i className="fa-solid fa-bell fa-shake"></i>
                            {itm.reminder}
                          </p>
                        </div>
                        <div className="note">
                          <p>{itm.note}</p>
                          <span>
                            (<i className="fa-solid fa-keyboard"></i>
                            {formatDate(itm.updated_at)})
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No note found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenProfile;
