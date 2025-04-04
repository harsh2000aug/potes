import React from "react";
import Sidebar from "../reusable/Sidebar";
import TopArea from "../reusable/TopArea";

const EditNote = () => {
  return (
    <div className="editNote">
      <div className="flex h-100">
        <Sidebar current={"Create Note"} />
        <div className="main-area">
          <TopArea />
          <div className="body-area">
            <div className="common-back">
              <h3>Edit Note</h3>
              <div className="form-group">
                <label htmlFor="">Select a Contact</label>
                <input type="text" placeholder="John Kumar" />
              </div>
              <div className="form-group">
                <label htmlFor="">Enter the Note</label>
                <textarea name="" id=""></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="">Set a Reminder</label>
                <input type="date" style={{ cursor: "pointer" }} />
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

export default EditNote;
