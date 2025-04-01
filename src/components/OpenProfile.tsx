import React, { useEffect, useState } from "react";
import Sidebar from "../reusable/Sidebar";
import user from "../images/user.png";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteContactApi, profileContactApi } from "../store/Services/AllApi";
import toast from "react-hot-toast";

const OpenProfile = () => {
  const location = useLocation();
  const [openSection, setOpenSection]: any = useState("personal");
  const [openDeletePop, setOpenDeletePop] = useState(false);
  const [notes, setNotes]: any = useState([]);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const profileData = location.state?.profileData;
  const navigate = useNavigate();

  const deleteContactHandler = () => {
    deleteContactApi({
      query: {
        id: profileData.id,
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

  const handleDeletePart = () => {
    setOpenDeletePop(!openDeletePop);
  };

  // const photo = profileData.photo;

  // useEffect(() => {
  //   profileContactApi({
  //     query: {
  //       id: profileData.id,
  //     },
  //   })
  //     .then((res: any) => {
  //       console.log("res", res);
  //     })
  //     .catch((err: any) => {
  //       console.log("err", err);
  //     });
  // }, []);

  useEffect(() => {
    profileContactApi({
      query: {
        id: profileData.id,
      },
    }).then((res: any) => {
      setNotes(res.contact_notes);
    });
  }, []);

  function formatDate(date: any) {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${month}-${day}-${year}`;
  }

  return (
    <>
      {openDeletePop && (
        <div id="myModal" className="modal">
          <div className="modal-dialog modal-confirm">
            <h4 className="modal-title">
              Are you sure you want to delete the contact?
            </h4>
            <div className="modal-footer justify-content-center btn">
              <button
                type="button"
                className="btn-secondary"
                onClick={deleteContactHandler}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={handleDeletePart}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="openProfile">
        <div className="flex h-100">
          <Sidebar />
          <div className="main-area">
            <div className="back-btn">
              <button type="button" onClick={() => navigate("/directory")}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>
            </div>
            <div className="body-area">
              <div className="common-back">
                <div className="name flex space-bw al-center">
                  <h4
                    style={{
                      fontWeight: 800,
                    }}
                  >
                    {profileData?.full_name}
                  </h4>
                  <div className="btn">
                    <button
                      type="button"
                      className="mr"
                      onClick={handleDeletePart}
                    >
                      <i className="fa-solid fa-trash"></i>
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
                    </button>
                  </div>
                </div>
                <div className="flex space-bw">
                  <div className="profile-pic-upload">
                    <div className="circle">
                      <img
                        className="profile-pic"
                        src={profileData?.photo ? profileData?.photo : user}
                        alt="Profile"
                      />
                    </div>
                  </div>
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
                              <b>Name:</b> {profileData?.full_name}
                            </li>

                            <li>
                              <b>Birthday:</b> {profileData?.birthday}
                            </li>
                            <li>
                              <b>Email:</b> {profileData?.email}
                            </li>
                            <li>
                              <b>Number:</b> {profileData?.phone}
                            </li>
                            <li>
                              <b>Anniversary:</b>{" "}
                              {profileData?.anniversary || "-"}
                            </li>
                            <li>
                              <b>Description:</b>{" "}
                              {profileData?.description || "-"}
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

                    {/* children Details Accordion */}
                    <div className="accordion">
                      <div
                        className="accordion-header"
                        onClick={() => toggleSection("children")}
                      >
                        <h3>Children Details +</h3>
                      </div>
                      {openSection === "children" && (
                        <div className="accordion-content">
                          {Array.isArray(profileData.children) &&
                          profileData.children.length > 0 ? (
                            profileData.children.map((itm: any) => (
                              <ul key={itm.id}>
                                <li>
                                  <b>Child Name:</b> {itm.name || "-"}
                                </li>
                                <li>
                                  <b>Child Birthday:</b> {itm.birthday || "-"}
                                </li>
                              </ul>
                            ))
                          ) : (
                            <p>-</p>
                          )}
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

                    {/* Custom Details Accordion */}
                    <div className="accordion">
                      <div
                        className="accordion-header"
                        onClick={() => toggleSection("custom")}
                      >
                        <h3>Others +</h3>
                      </div>
                      {openSection === "custom" && (
                        <div className="accordion-content">
                          {profileData.custom_fields.length > 0 ? (
                            profileData.custom_fields.map((itm: any) => (
                              <>
                                <ul className="employee-list">
                                  <li key={itm.id}>{itm.title}</li>
                                </ul>
                                <ul
                                  style={{
                                    paddingLeft: "10px",
                                  }}
                                >
                                  {itm.values.map((subitm: any) => (
                                    <li>{subitm}</li>
                                  ))}
                                </ul>
                              </>
                            ))
                          ) : (
                            <p>-</p>
                          )}
                        </div>
                      )}
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
                            display: notes?.length > 0 ? "block" : "none",
                          }}
                        >
                          All notes
                        </p>
                        <i
                          className="fa-solid fa-keyboard"
                          style={{
                            display: notes?.length > 0 ? "block" : "none",
                            cursor: "pointer",
                          }}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    {notes?.length > 0 ? (
                      notes?.map((itm: any) => (
                        <div
                          key={itm.id}
                          className="flex al-center mb-15 border"
                        >
                          <div className="date">
                            {/* <span></span> */}
                            <p className="flex al-center">
                              <i
                                className="fa-solid fa-bell fa-shake"
                                style={{
                                  display: itm.reminder ? "block" : "none",
                                }}
                              ></i>
                              {formatDate(itm.reminder)}
                            </p>
                          </div>
                          <div className="note">
                            <p>{itm.note}</p>
                            <span>
                              (<i className="fa-solid fa-keyboard"></i>
                              {formatDate(itm.created_at)})
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
