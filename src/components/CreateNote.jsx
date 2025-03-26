import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../reusable/Sidebar";
import { allContactApi, createNotesApi } from "../store/Services/AllApi";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import FullScreenLoader from "./FullScreenLoader/FullScreenLoader";

const CreateNote = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const [finalTranscript, setFinalTranscript] = useState("");
  const [storeRes, setStoreRes] = useState([]);
  const [selectedContact, setSelectedContact] = useState("");
  const [reminder, setReminder] = useState("");
  const location = useLocation();
  const [interval, setInterval] = useState("");
  const [loading, setLoading] = useState(false);
  const profileData = location.state?.profileName;
  const profileIdUser = location.state?.profileId;
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
      for (let i = event.resultIndex; i < event.results.length; i++) {
        let result = event.results[i];
        interimTranscript += result[0].transcript;

        if (result.isFinal) {
          setFinalTranscript(
            (prevFinalTranscript) =>
              prevFinalTranscript + result[0].transcript + " "
          ); //append final result with a space.
        }
      }
      setText(finalTranscript + interimTranscript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [finalTranscript]);

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

  const createNoteHandler = () => {
    if (!text) {
      toast.error("Please fill Notes before submitting.");
      return;
    }
    setLoading(true);
    createNotesApi({
      body: {
        contact: profileIdUser,
        note: text,
        reminder_type: interval || null,
        reminder: reminder || null,
      },
    })
      .then((res) => {
        toast.success(res.msg);
        setText("");
        setFinalTranscript("");
        setInterval("");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.data.error);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="contactUs">
      {loading && <FullScreenLoader />}
      <div className="flex h-100">
        <Sidebar current="Create Note" />
        <div className="main-area">
        <div className="back-btn">
              <button type="button" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>
            </div>
          <div className="body-area">
            <div className="common-back">
              <h3>Create a Note</h3>
              <div className="form-group">
                <label>Contact Name</label>
                <input type="text" value={profileData} />
              </div>
              <div className="form-group mic-btn">
                <label>Enter the Note</label>
                <textarea
                  placeholder="Enter your note"
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
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
                <div className="col-50">
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
                  <div className="col-50">
                    <label>Set a Reminder</label>
                    <input
                      type="date"
                      value={reminder}
                      onChange={(e) => setReminder(e.target.value)}
                    />
                  </div>
                )}
              </div>
              <div className="form-group">
                <div class="col-33 btn">
                  <button type="button" onClick={createNoteHandler}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
