import React from "react";
import Sidebar from "../reusable/Sidebar";
import TopArea from "../reusable/TopArea";
import user from "../images/user.png";

const UserProfile = () => {
  return (
    <div className="userProfile">
      <div className="flex h-100">
        <Sidebar />
        <div className="main-area">
          <TopArea />
          <div className="body-area">
            <div className="common-back">
              <div className="top-text flex space-bw">
                <h3>User Profile</h3>
                <div className="btn">
                  <button>
                    <i className="fa-solid fa-pen"></i>
                    Edit
                  </button>
                </div>
              </div>
              {/* <div className="profile-pic-upload">
                            <div className="circle">
                            <img className="profile-pic" src={user} />
                            </div>
                            <div className="p-image">
                            <i className="fa fa-camera upload-button"></i>
                            <input className="file-upload" type="file" accept="image/*" />
                            </div>
                        </div> */}
              <div className="form-group flex space-bw">
                <div className="col-50">
                  <label htmlFor="">Full Name</label>
                  <input type="text" />
                </div>
                <div className="col-50">
                  <label htmlFor="">Birthday</label>
                  <input type="date" />
                </div>
              </div>
              <div className="form-group flex space-bw">
                <div className="col-50">
                  <label htmlFor="">Email</label>
                  <input type="text" />
                </div>
                <div className="col-50">
                  <label htmlFor="">Password</label>
                  <input type="password" />
                </div>
              </div>
              <div className="form-group">
                <div className="col-33 btn">
                  <button type="button">Logout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
