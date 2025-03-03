import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../reusable/Sidebar";
import TopArea from "../reusable/TopArea";

const CreateNote = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const [finalTranscript, setFinalTranscript] = useState(""); 

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
          setFinalTranscript((prevFinalTranscript) => prevFinalTranscript + result[0].transcript + " "); //append final result with a space.
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

  return (
    <div className="contactUs">
      <div className="flex h-100">
        <Sidebar current="Create Note" />
        <div className="main-area">
          <TopArea />
          <div className="body-area">
            <div className="common-back">
              <h3>Create a Note</h3>
              <div className="form-group">
                <label>Select a Contact</label>
                <input type="text" />
              </div>
              <div className="form-group mic-btn">
                <label>Enter the Note</label>
                <textarea
                  value={text}
                  onChange={(e) => {setText(e.target.value); setFinalTranscript(e.target.value);}}
                ></textarea>
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={isListening ? "active_mic" : ""}
                >
                  <i className="fa-solid fa-microphone"></i>
                </button>
              </div>
              <div className="form-group">
                <label>Set a Reminder</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <div class="col-33 btn">
                  <button type="button">Submit</button>
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