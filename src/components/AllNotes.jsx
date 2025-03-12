import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../reusable/Sidebar";
import { useLocation } from "react-router-dom";
import { deleteNotes, editNote, getNotesApi } from "../store/Services/AllApi";
import toast from "react-hot-toast";

const AllNotes = () => {
  const location = useLocation();
  const profileIdApi = location.state?.profileId;
  const [allNotes, setAllNotes] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const [finalTranscript, setFinalTranscript] = useState(""); 
  const [editText,setEditText]=useState("")
  
  
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
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
  
      // ✅ Only update `editText` when final result is available
      if (finalText) {
        setEditText((prevText) => prevText + finalText);
        setFinalTranscript(""); // ✅ Clear to avoid re-adding
      }
  
      // ✅ Update interim transcript in real-time without saving it
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
    getNotesApi({
      query: {
        id: profileIdApi,
      },
    }).then((res) => {
     
      setAllNotes(res);
    });
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = (id) => {
    deleteNotes({
      query: { id },
    }).then((res) => {
      console.log(res);
      setPopupOpen(false);
      fetchNotes();
    });
  };
const editNoteApi=()=>{
  editNote({
    query:{id:userId},
    body:{
      note:editText
    }
  }).then((res)=>{
    toast.success("Noted Edited successfully")
    setOpenEdit(false)
    fetchNotes();
  })
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
              <div className="modal-footer justify-content-center">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setPopupOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
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
          <div className="modal-dialog modal-confirm"
          style={{
            background:"none",
          }}>
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
              <div className="form-group flex space-bw">
                <div className="col-50 btn">
                  <button type="button" onClick={editNoteApi}>Submit</button>
                </div>
                <div className="col-50 btn">
                  <button type="button" onClick={()=>setOpenEdit(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="all-Notes">
        <div className="flex h-100">
          <Sidebar />
          <div className="main-area">
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
                    {allNotes.map((itm) => (
                      <div className="mb-15 p-relate border">
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
                            <i onClick={()=>{setOpenEdit(true)
                              setEditText(itm.note)
                              setUserId(itm.id)
                            }} className="fa-solid fa-pencil"></i>
                          </div>
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
