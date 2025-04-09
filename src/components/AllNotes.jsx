import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../reusable/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteNotes, editNote, getNotesApi, profileContactApi } from "../store/Services/AllApi";
import toast from "react-hot-toast";
import FullScreenLoader from "./FullScreenLoader/FullScreenLoader";
import user from "../images/user.png";
import logo from "../images/logo.png";

const AllNotes = () => {
  const location = useLocation();
  const profileIdApi = location.state?.profileId;
  const currentNote = location.state?.currentNote;
  const [allNotes, setAllNotes] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const [finalTranscript, setFinalTranscript] = useState("");
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(false);
  const [interval, setInterval] = useState("");
  const [reminder, setReminder] = useState("");
  const [saveId,setSaveId]= useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onstart = () => {
      setIsListening(true);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = "";
      let finalText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        let result = event.results[i];
        if (result.isFinal) {
          finalText += result[0].transcript + " ";
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      if (finalText) {
        setEditText((prevText) => prevText + finalText);
        setFinalTranscript("");
      }

      if (interimTranscript) {
        setText(finalText + interimTranscript);
      }
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };
  const fetchNotes = () => {
    setLoading(true);
    getNotesApi({
      query: {
        id: profileIdApi,
      },
    })
      .then((res) => {
        setSaveId(res[0].contact)
        if (currentNote) {
          setAllNotes(res?.filter((item) => item?.id === currentNote?.id));
         
        } else {
          setAllNotes(res);
        }
      })
      .catch((err) => {
        toast.error(err?.data?.error.length> 0 ? err?.data?.error : "No note found");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
 
  useEffect(() => {
    fetchNotes();
  }, []);
  
  const profileHandler = () => {
    profileContactApi({
      query: {
        id: saveId,
      },
    }).then((res) => {
      navigate("/profile", { state: { profileData: res } });
    });
  };

  const handleDelete = (id) => {
    setLoading(true);
    deleteNotes({
      query: { id },
    })
      .then((res) => {
        toast.success("Note Deleted Successfully");
        setPopupOpen(false);
        profileHandler()
        // fetchNotes();
        // navigate("/directory");
      })
      .catch((err) => {
        toast.error(err.data.error);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const editNoteApi = () => {
    setLoading(true);
    editNote({
      query: { id: userId },
      body: {
        note: editText,
        reminder_type: interval || null,
        reminder: reminder || null,
      },
    })
      .then((res) => {
        toast.success("Noted Edited successfully");
        setOpenEdit(false);
        profileHandler()
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

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const yy = String(date.getFullYear());
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${mm}-${dd}-${yy}`;
  }



  return (
    <>
      {popupOpen && (
        <div id="myModal" className="modal">
          <div className="modal-dialog modal-confirm">
            <div className="modal-content">
              <div className="modal-header flex-column">
                <div className="icon-box">
                  <i className="fa-solid fa-xmark"></i>
                </div>
                <h4 className="modal-title">Are you sure?</h4>
              </div>
              <div className="modal-footer justify-content-center btn">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setPopupOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => handleDelete(userId)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
              <div className="form-group mic-btn">
                <label htmlFor="">Edit the Note</label>
                <textarea
                  value={editText}
                  onChange={(e) => {
                    setEditText(e.target.value);
                    setFinalTranscript(e.target.value);
                  }}
                ></textarea>
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={isListening ? "active_mic" : ""}
                >
                  <i className="fa-solid fa-microphone"></i>
                </button>
              </div>
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
                      style={{cursor:"pointer"}}
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
      <div className="all-Notes">
        {loading && <FullScreenLoader />}
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
                <div className="allNotes">
                  <div className="flex space-bw al-center"
                      style={{
                        marginBottom: "15px",
                      }}>
                    <h4>
                    Notes
                    </h4>
                  </div>
                    <div className="flex" onClick={profileHandler} style={{marginBottom:"10px",cursor:"pointer"}}>
                      <img src={allNotes[0]?.contact_photo ?allNotes[0]?.contact_photo:user } alt="" />
                      <h4 style={{fontSize:"15px"}}>
                        {allNotes?.[0]?.contact_full_name}
                      </h4>
                    </div>
                  <div>
                    {allNotes.length>0?allNotes.map((itm) => (
                      <div className="mb-15 p-relate border" key={itm.id}>
                        <div className="date">
                          <p>{itm.reminder?formatDate(itm.reminder):""}</p>
                        </div>
                        <div className="note">
                          <p>{itm.note}</p>
                          <div className="editDelete">
                            <i
                              className="fa-solid fa-trash"
                              onClick={() => {
                                setUserId(itm.id);
                                setPopupOpen(true);
                              }}
                            ></i>
                            <i
                              onClick={() => {
                                setOpenEdit(true);
                                setInterval(itm?.reminder_type);
                                setReminder(itm?.reminder);
                                setEditText(itm.note);
                                setUserId(itm.id);
                              }}
                              className="fa-solid fa-pencil"
                            ></i>
                          </div>
                          <span>
                              (<i className="fa-solid fa-keyboard"></i>
                              {itm.created_at ? formatDate(itm.created_at): ""})
                            </span>
                        </div>
                      </div>
                    )):<p>No Note found</p>}
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

export default AllNotes;
