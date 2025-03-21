import React, { useState } from "react";
import Sidebar from "../reusable/Sidebar";
import user from "../images/user.png";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteContactApi } from "../store/Services/AllApi";
import toast from "react-hot-toast";

const OpenProfile = () => {
  const location = useLocation();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };
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

  const deleteContactHandler = () => {
    deleteContactApi({
      query: {
        id: "60",
      },
    })
      .then((res: any) => {
        toast.success(res.msg);
        navigate("/directory");
      })
      .catch((err: any) => {
        toast.error(err.data.error);
      });
  };

  return (
    <>
      {/* <div id="myModal" className="modal">
        <div className="modal-dialog modal-confirm"></div>
      </div> */}
      <div className="openProfile">
        <div className="flex h-100">
          <Sidebar />
          <div className="main-area">
            <div className="body-area">
              <div className="common-back">
                <div className="name flex space-bw al-center">
                  <h4
                    style={{
                      fontWeight: 800,
                    }}
                  >
                    {profileData.full_name}
                  </h4>
                  <div className="btn">
                    <button
                      type="button"
                      className="mr"
                      onClick={deleteContactHandler}
                    >
                      <i className="fa-solid fa-trash"></i>
                      Delete Contact
                    </button>
                    <button
                      type="button"
                      className="mr"
                      onClick={() =>
                        navigate("/edit-contact", {
                          state: {
                            editUser: profileData,
                          },
                        })
                      }
                    >
                      <i className="fa-solid fa-pencil"></i>
                      Edit Contact
                    </button>
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
                <div className="flex space-bw">
                  <div className="userDetail profile-information">
                    {/* Personal Information Accordion */}
                    <div className="accordion">
                      <div
                        className="accordion-header"
                        onClick={() => toggleSection("personal")}
                      >
                        <h3>Personal Information +</h3>
                      </div>
                      {openSection === "personal" && (
                        <div className="accordion-content">
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
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Spouse Details Accordion */}
                    <div className="accordion">
                      <div
                        className="accordion-header"
                        onClick={() => toggleSection("spouse")}
                      >
                        <h3>Spouse Details +</h3>
                      </div>
                      {openSection === "spouse" && (
                        <div className="accordion-content">
                          <ul>
                            <li>
                              <b>Spouse Name:</b>{" "}
                              {profileData.spouse_name || "-"}
                            </li>
                            <li>
                              <b>Spouse Birthday:</b>{" "}
                              {profileData.spouse_birthday || "-"}
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Employment Details Accordion */}
                    <div className="accordion">
                      <div
                        className="accordion-header"
                        onClick={() => toggleSection("employment")}
                      >
                        <h3>Employment Details+</h3>
                      </div>
                      {openSection === "employment" && (
                        <div className="accordion-content">
                          {profileData.previous_employers.length > 0 ? (
                            profileData.previous_employers.map((itm: any) => (
                              <ul className="employee-list">
                                <li key={itm.id}>{itm.details}</li>
                              </ul>
                            ))
                          ) : (
                            <p>-</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* University Details Accordion */}
                    <div className="accordion">
                      <div
                        className="accordion-header"
                        onClick={() => toggleSection("university")}
                      >
                        <h3>University Details +</h3>
                      </div>
                      {openSection === "university" && (
                        <div className="accordion-content">
                          {profileData.universities.length > 0 ? (
                            profileData.universities.map((itm: any) => (
                              <ul className="employee-list">
                                <li key={itm.id}>{itm.details}</li>
                              </ul>
                            ))
                          ) : (
                            <p>-</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Interests Details Accordion */}
                    <div className="accordion">
                      <div
                        className="accordion-header"
                        onClick={() => toggleSection("interests")}
                      >
                        <h3>Interests +</h3>
                      </div>
                      {openSection === "interests" && (
                        <div className="accordion-content">
                          {profileData.interests.length > 0 ? (
                            profileData.interests.map((itm: any) => (
                              <ul className="employee-list">
                                <li key={itm.id}>{itm.name}</li>
                              </ul>
                            ))
                          ) : (
                            <p>-</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="profile-pic-upload">
                    <div className="circle">
                      <img
                        className="profile-pic"
                        src={profileData?.photo ? profileData?.photo : user}
                        alt="Profile"
                      />
                    </div>
                  </div>
                </div>
                <div className="allNotes">
                  <div>
                    <div className="flex space-bw note-head">
                      <h4>Notes</h4>
                      <div
                        className="flex al-center"
                        onClick={() =>
                          navigate("/notes", {
                            state: { profileId: profileData.id },
                          })
                        }
                      >
                        <p
                          style={{
                            fontSize: "14px",
                            marginRight: "5px",
                            cursor: "pointer",
                            display:
                              profileData?.contact_notes.length > 0
                                ? "block"
                                : "none",
                          }}
                        >
                          All notes
                        </p>
                        <i
                          className="fa-solid fa-keyboard"
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
                  </div>
                  <div>
                    {profileData?.contact_notes.length > 0 ? (
                      profileData?.contact_notes?.map((itm: any) => (
                        <div
                          key={itm.id}
                          className="flex al-center mb-15 border"
                        >
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
    </>
  );
};

export default OpenProfile;
