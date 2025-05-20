import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../reusable/Sidebar";
import user from "../images/user.png";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteContactApi,
  editNote,
  profileContactApi,
} from "../store/Services/AllApi";
import toast from "react-hot-toast";
import logo from "../images/logo.png";
import Mic from "../reusable/Mic";
const OpenProfile = () => {
  const location = useLocation();
  const [openSections, setOpenSections] = useState<string[]>(["personal"]);
  const [openDeletePop, setOpenDeletePop] = useState(false);
  const [notes, setNotes]: any = useState([]);
  const [allExpanded, setAllExpanded] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editText, setEditText] = useState("");
  const [interval, setInterval] = useState("");
  const [reminder, setReminder] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveId, setSaveId] = useState("");
  const [userId, setUserId] = useState("");
  const [textComponent, setTextComponent]: any = useState("");
  const allSections = [
    "personal",
    "spouse",
    "children",
    "employment",
    "university",
    "interests",
    "custom",
  ];

  const toggleAllSections = () => {
    if (allExpanded) {
      setOpenSections([]);
    } else {
      setOpenSections(allSections);
    }
    setAllExpanded(!allExpanded);
  };

  const toggleSection = (section: string) => {
    if (section === "personal") return;
    setOpenSections((prev: string[]) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
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
  const profileget = () => {
    profileContactApi({
      query: {
        id: profileData.id,
      },
    }).then((res: any) => {
      setNotes(res.contact_notes);
    });
  };

  function formatDate(date: any) {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${month}-${day}-${year}`;
  }

  const profileHandler = () => {
    profileContactApi({
      query: {
        id: saveId,
      },
    }).then((res) => {
      navigate("/profile", { state: { profileData: res } });
    });
  };

  const editNoteApi = () => {
    setLoading(true);
    editNote({
      query: { id: userId },
      body: {
        note: localStorage.getItem("mouse"),
        reminder_type: interval || null,
        reminder: reminder || null,
      },
    })
      .then((res) => {
        toast.success("Noted Edited successfully");
        setOpenEdit(false);
        profileget();
        // profileHandler();
        // fetchNotes();
      })
      .catch((err) => {
        toast.error("Please enter all details");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
            <div className="body-area">
              <div className="common-back">
                <div className="nameChanged">
                  <h4
                    style={{
                      fontWeight: 800,
                    }}
                  >
                    {profileData?.full_name}
                  </h4>
                </div>
                <div className="btn nameChanged">
                  <button
                    type="button"
                    className="mr"
                    onClick={handleDeletePart}
                  >
                    Delete
                    <i
                      className="fa-solid fa-trash"
                      style={{
                        marginLeft: "5px",
                      }}
                    ></i>
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
                    Edit
                    <i
                      className="fa-solid fa-pencil"
                      style={{
                        marginLeft: "5px",
                      }}
                    ></i>
                  </button>
                  <button
                    type="button"
                    className="mr"
                    onClick={() =>
                      navigate("/create-note", {
                        state: {
                          profileName: profileData.full_name,
                          profileId: profileData.id,
                        },
                      })
                    }
                  >
                    Add Note
                    <i
                      className="fa-solid fa-book"
                      style={{
                        marginLeft: "5px",
                      }}
                    ></i>
                  </button>
                  <button type="button" onClick={toggleAllSections}>
                    {allExpanded ? "Collapse" : "Expand"}
                    <i
                      className={`fa-solid ${
                        allExpanded ? "fa-minus" : "fa-plus"
                      }`}
                      style={{ marginLeft: "5px" }}
                    ></i>
                  </button>
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
                      {openSections.includes("personal") && (
                        <div className="accordion-content">
                          <ul>
                            <li>
                              <b>Name or Description:</b>{" "}
                              {profileData?.full_name}
                            </li>

                            <li>
                              <b>Birthday:</b>{" "}
                              {profileData?.birthday
                                ? formatDate(profileData?.birthday)
                                : "-"}
                            </li>
                            <li>
                              <b>Email:</b>{" "}
                              {profileData?.email ? profileData?.email : "-"}
                            </li>
                            <li>
                              <b>Number:</b>{" "}
                              {profileData?.phone ? profileData?.phone : "-"}
                            </li>
                            <li>
                              <b>Anniversary:</b>{" "}
                              {profileData?.anniversary
                                ? formatDate(profileData?.anniversary)
                                : "-"}
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
                      {openSections.includes("spouse") && (
                        <div className="accordion-content">
                          <ul>
                            <li>
                              <b>Spouse Name:</b>{" "}
                              {profileData.spouse_name || "-"}
                            </li>
                            <li>
                              <b>Spouse Birthday:</b>{" "}
                              {profileData.spouse_birthday
                                ? formatDate(profileData.spouse_birthday)
                                : "-"}
                            </li>
                            <li>
                              <b>Spouse Details:</b>{" "}
                              {profileData.spouse_details || "-"}
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
                      {openSections.includes("children") && (
                        <div className="accordion-content">
                          {Array.isArray(profileData.children) &&
                          profileData.children.length > 0 ? (
                            profileData.children.map((itm: any) => (
                              <ul key={itm.id}>
                                <li>
                                  <b>Child Name:</b> {itm.name || "-"}
                                </li>
                                <li>
                                  <b>Child Birthday:</b>{" "}
                                  {itm.birthday
                                    ? formatDate(itm.birthday)
                                    : "-"}
                                </li>
                                <li>
                                  <b>Child Details:</b> {itm.details || "-"}
                                </li>
                              </ul>
                            ))
                          ) : (
                            <ul>
                              <li>
                                <b>Child Name:</b> -
                              </li>
                              <li>
                                <b>Child Birthday:</b> -
                              </li>
                              <li>
                                <b>Child Details:</b>-
                              </li>
                            </ul>
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
                      {openSections.includes("employment") && (
                        <div className="accordion-content">
                          {profileData.previous_employers.length > 0 ? (
                            profileData.previous_employers.map((itm: any) => (
                              <ul key={itm.id}>
                                <li>
                                  <b>Employer Name:</b> {itm.name || "-"}
                                </li>
                                <li>
                                  <b>Employer Details:</b> {itm.details || "-"}
                                </li>
                              </ul>
                            ))
                          ) : (
                            <ul>
                              <li>
                                <b>Employer Name:</b> -
                              </li>
                              <li>
                                <b>Employer Details:</b> -
                              </li>
                            </ul>
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
                      {openSections.includes("university") && (
                        <div className="accordion-content">
                          {profileData.universities.length > 0 ? (
                            profileData.universities.map((itm: any) => (
                              <ul key={itm.id}>
                                <li>
                                  <b>University Name:</b> {itm.name || "-"}
                                </li>
                                <li>
                                  <b>University Details:</b>
                                  {itm.details || "-"}
                                </li>
                              </ul>
                            ))
                          ) : (
                            <ul>
                              <li>
                                <b>University Name:</b> -
                              </li>
                              <li>
                                <b>University Details:</b>-
                              </li>
                            </ul>
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
                      {openSections.includes("interests") && (
                        <div className="accordion-content">
                          {profileData.interests.length > 0 ? (
                            profileData.interests.map((itm: any) => (
                              <ul className="employee-list intes">
                                <li key={itm.id}>{itm.name || "-"}</li>
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
                      {openSections.includes("custom") && (
                        <div className="accordion-content">
                          {profileData.custom_fields.length > 0 ? (
                            profileData.custom_fields.map((itm: any) => (
                              <>
                                <ul className="employee-list">
                                  <li key={itm.id} className="flex">
                                    <b>{itm.title || "-"}:</b>
                                    <ul>
                                      {itm.values.map((subitm: any) => (
                                        <li>{subitm || "-"}</li>
                                      ))}
                                    </ul>
                                  </li>
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
                          onClick={() => {
                            setTextComponent(itm.note);
                            setUserId(itm.id);
                          }}
                          key={itm.id}
                          className="flex al-center space-bw mb-15 border"
                        >
                          <div className="notedarea">
                            <div className="date">
                              <p className="flex al-center">
                                <i
                                  className="fa-solid fa-bell fa-shake"
                                  style={{
                                    display: itm.reminder ? "block" : "none",
                                  }}
                                ></i>
                                {itm.reminder ? formatDate(itm.reminder) : ""}
                              </p>
                            </div>
                            <div
                              className="note"
                              onClick={() => setOpenEdit(true)}
                            >
                              <p>{itm.note}</p>
                            </div>
                          </div>
                          <div className="date creationarea">
                            <p>Noted created at</p>
                            <p>
                              <i className="fa-solid fa-keyboard"></i>
                              {itm.created_at ? formatDate(itm.created_at) : ""}
                            </p>
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
      {openEdit && (
        <div id="myModal" className="modal">
          <div
            className="modal-dialog modal-confirm"
            style={{
              background: "none",
            }}
          >
            <div className="common-back">
              <h3>Edit Note</h3>
              <Mic textToSend={textComponent} />
              <div className="form-group">
                <div className="mb-15">
                  <label>Note reminder</label>
                  <select
                    name="interval"
                    id="interval"
                    value={interval}
                    onChange={(e) => setInterval(e.target.value)}
                  >
                    <option value="">None</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Yearly">Yearly</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>
                {interval === "Custom" && (
                  <div>
                    <label>Set a Reminder</label>
                    <input
                      type="date"
                      value={reminder}
                      style={{ cursor: "pointer" }}
                      onChange={(e) => setReminder(e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="form-group flex space-bw">
                <div className="col-50 btn">
                  <button type="button" onClick={() => setOpenEdit(false)}>
                    Cancel
                  </button>
                </div>
                <div className="col-50 btn">
                  <button type="button" onClick={editNoteApi}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OpenProfile;
