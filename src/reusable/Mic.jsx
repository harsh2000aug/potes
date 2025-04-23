import React, { useEffect, useRef, useState } from 'react';

const Mic = ({ textToSend}) => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const [finalTranscript, setFinalTranscript] = useState("");
  const [editText, setEditText] = useState("");

  
  useEffect(() => {
    if (textToSend) {
      setEditText(textToSend);
      setFinalTranscript(textToSend);
      
    }
  }, [textToSend]);

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

  return (
    <div className="form-group mic-btn">
      <label>Edit the Note</label>
      <textarea
        value={editText}
        onChange={(e) => {
          setEditText(e.target.value);
          setFinalTranscript(e.target.value);
         localStorage.setItem("mouse",e.target.value)
        }}
      ></textarea>
      <button
        onClick={isListening ? stopListening : startListening}
        className={isListening ? "active_mic" : ""}
      >
        <i className="fa-solid fa-microphone"></i>
      </button>
    </div>
  );
};

export default Mic;
