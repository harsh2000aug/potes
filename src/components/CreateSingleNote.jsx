import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../reusable/Sidebar";
import { allContactOptionApi, createNotesApi } from "../store/Services/AllApi";
import toast from "react-hot-toast";
import FullScreenLoader from "./FullScreenLoader/FullScreenLoader";

const CreateNote = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const [finalTranscript, setFinalTranscript] = useState("");
  const [storeRes, setStoreRes] = useState([]);
  const [selectedContact, setSelectedContact] = useState("");
  const [reminder, setReminder] = useState("");
  const [interval, setInterval] = useState("");
  const [loading, setLoading] = useState(false);

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
        contact: selectedContact,
        note: text,
        reminder: reminder || null,
        reminder_type: interval,
      },
    })
      .then((res) => {
        toast.success(res.msg);
        setSelectedContact("");
        setInterval("");
        setText("");
        setFinalTranscript("");
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    allContactOptionApi().then((res) => {
      setStoreRes(res?.contacts);
    });
  }, []);

  return (
    <div className="contactUs">
      {loading && <FullScreenLoader />}
      <div className="flex h-100">
        <Sidebar current="Create Note" />
        <div className="main-area">
          <div className="body-area">
            <div className="common-back">
              <h3>Create a Note</h3>
              <div className="form-group">
                <label>Contact Name</label>
                <select
                  name=""
                  id=""
                  value={selectedContact}
                  onChange={(e) => setSelectedContact(e.target.value)}
                >
                  <option>Select any contact</option>
                  {Array.isArray(storeRes) &&
                    storeRes.map((itm) => (
                      <option key={itm?.id} value={itm?.id}>
                        {itm?.full_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group mic-btn">
                <label>Enter the Note</label>
                <textarea
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
                  <label>Intervals</label>
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
                <div className="col-33 btn">
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
