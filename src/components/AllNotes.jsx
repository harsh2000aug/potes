import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../reusable/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteNotes, editNote, getNotesApi } from "../store/Services/AllApi";
import toast from "react-hot-toast";
import FullScreenLoader from "./FullScreenLoader/FullScreenLoader";

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
        if (currentNote) {
          setAllNotes(res?.filter((item) => item?.id === currentNote?.id));
        } else {
          setAllNotes(res);
        }
      })
      .catch((err) => {
        toast.error(err.data.error);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = (id) => {
    setLoading(true);
    deleteNotes({
      query: { id },
    })
      .then((res) => {
        console.log(res);
        setPopupOpen(false);
        fetchNotes();
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
        fetchNotes();
      })
      .catch((err) => {
        toast.error(err.data.error);
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

    return `${yy}-${mm}-${dd}`;
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
                  <label>Contact Reminder</label>
                  <select
                    name="interval"
                    id="interval"
                    value={interval}
                    onChange={(e) => setInterval(e.target.value)}
                  >
                    <option value="">Select Interval</option>
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
            <button type="button" onClick={() => navigate(-1)}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
          </div>
            <div className="body-area">
              <div className="common-back">
                <div className="allNotes">
                  <h4
                    style={{
                      marginBottom: "15px",
                    }}
                  >
                    Notes
                  </h4>
                  <div>
                    {allNotes.map((itm, index) => (
                      <div className="mb-15 p-relate border" key={index}>
                        <div className="date">
                          <p>{itm.reminder}</p>
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
                              {formatDate(itm.updated_at)})
                            </span>
                        </div>
                      </div>
                    ))}
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
