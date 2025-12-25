import React, { useState } from "react";
import Sidebar from "../reusable/Sidebar";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { deleteAccountApi } from "../store/Services/AllApi";
import toast from "react-hot-toast";

const DeleteAccount = () => {
  const [deletePass, setDeletePass] = useState("");
  const navigate = useNavigate();

  const deleteAccount = () => {
    deleteAccountApi({
      body: {
        password: deletePass,
      },
    })
      .then((res: any) => {
        toast.success(res.msg);
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      })
      .catch((err: any) => {
        toast.error(err.data.error);
      });
  };

  return (
    <div className="aboutUs">
      <div className="flex h-100">
        <Sidebar current={"About Us"} />
        <div className="main-area">
          <div className="body-area">
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
            <div className="common-back">
              <h3>Delete Account</h3>
              <p
                style={{
                  marginBottom: "30px",
                }}
              >
                If you no longer wish to use our services, you can permanently
                delete your account. Please note that this action is
                irreversible, and all your data, preferences, and saved details
                will be permanently removed from our system
              </p>
              <div className="form-group">
                <div className="col-50">
                  <label htmlFor="">Enter Your Password</label>
                  <input
                    type="password"
                    onChange={(e) => setDeletePass(e.target.value)}
                  />
                </div>
                <div className="col-50">
                  <button
                    style={{
                      padding: "10px",
                      width: "100%",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      backgroundColor: "#ff4d4d",
                      color: "#fff",
                      marginTop: "15px",
                    }}
                    onClick={deleteAccount}
                  >
                    Delete
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

export default DeleteAccount;
