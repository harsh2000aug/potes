import React from "react";
import Sidebar from "../reusable/Sidebar";
import TopArea from "../reusable/TopArea";

const CreateNote = () => {
  return (
    <div className="contactUs">
      <div className="flex h-100">
        <Sidebar current={"Create Note"} />
        <div className="main-area">
          <TopArea />
          <div className="body-area">
            <div className="common-back">
              <h3>Create a Note</h3>
              <div className="form-group">
                <label htmlFor="">Select a Contact</label>
                <input type="text" />
              </div>
              <div className="form-group mic-btn">
                <label htmlFor="">Enter the Note</label>
                <textarea name="" id=""></textarea>
                <button>
                  <i className="fa-solid fa-microphone"></i>
                </button>
              </div>
              <div className="form-group">
                <label htmlFor="">Set a Reminder</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <div className="col-33">
                  <input type="submit" />
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
