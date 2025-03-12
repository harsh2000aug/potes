import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../reusable/Sidebar";
import TopArea from "../reusable/TopArea";
import { changePass, editProfile } from "../store/Services/AllApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import user from "../images/user.png";

const EditProfile = () => {
  const [editUserProfile, setEditUserProfile]: any = useState([]);
  const [changePopup, setChangePopup]: any = useState(false);
  const [contactImage, setContactImage] = useState<string>(user);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const changeImageHandler = (event: any) => {
    const file: File | null = event.target.files[0];
    if (file) {
      setImageFile(file);
      setContactImage(URL.createObjectURL(file));
    } else {
      setContactImage("/path/to/default/user/image.png");
      setImageFile(null);
    }
  };
  useEffect(() => {
    editProfile()
      .then((res: any) => setEditUserProfile(res))
      .catch((err) => console.log("err", err));
  }, []);

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field: any) => {
    setShowPassword((prev: any) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  const handlepasspopup = () => {
    setChangePopup(!changePopup);
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword")], "Passwords must match"),
  });

  const handleSubmit = (values: any) => {
    changePass({
      body: {
        curr_password: values.oldPassword,
        new_password1: values.newPassword,
        new_password2: values.confirmPassword,
      },
    }).then((res: any) => toast.success(res.msg));
  };

  return (
    <div className="editProfile">
      <div className="flex h-100">
        <Sidebar />
        <div className="main-area">
          <TopArea />
          <div className="body-area">
            <div className="common-back">
              <div className="top-text">
                <h3>User Profile</h3>
              </div>
              <div className="profile-pic-upload">
                <div className="circle">
                  <img
                    className="profile-pic"
                    src={contactImage}
                    alt="Profile"
                  />
                </div>
                <div className="p-image" onClick={handleIconClick}>
                  <i className="fa fa-camera upload-button"></i>
                  <input
                    className="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={changeImageHandler}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div className="form-group flex space-bw">
                <div className="col-50">
                  <label htmlFor="">First Name</label>
                  <input type="text" value={editUserProfile.first_name} />
                </div>
                <div className="col-50">
                  <label htmlFor="">Last Name</label>
                  <input type="text" value={editUserProfile.last_name} />
                </div>
              </div>
              <div className="form-group flex space-bw">
                <div className="col-50">
                  <label htmlFor="">Email</label>
                  <input type="text" value={editUserProfile.email} />
                </div>
                <div className="col-50">
                  <label htmlFor="">Username</label>
                  <input type="text" value={editUserProfile.username} />
                </div>
              </div>
              <div className="form-group">
                <div className="col-33 btn">
                  <button type="button" onClick={handlepasspopup}>
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {changePopup && (
        <div id="myModal" className="modal">
          <div
            className="modal-dialog modal-confirm"
            style={{
              background: "none",
            }}
          >
            <div className="common-back">
              <h3>Change Password</h3>
              <Formik
                initialValues={{
                  oldPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    {/* Old Password */}
                    <div className="form-group p-relate">
                      <label>Old Password</label>
                      <div className="password-wrapper">
                        <Field
                          type={showPassword.oldPassword ? "text" : "password"}
                          name="oldPassword"
                        />
                        <FontAwesomeIcon
                          icon={showPassword.oldPassword ? faEyeSlash : faEye}
                          onClick={() =>
                            togglePasswordVisibility("oldPassword")
                          }
                          className="eye-icon"
                        />
                      </div>
                      <ErrorMessage
                        name="oldPassword"
                        component="div"
                        className="error"
                      />
                    </div>

                    {/* New Password */}
                    <div className="form-group p-relate">
                      <label>New Password</label>
                      <div className="password-wrapper">
                        <Field
                          type={showPassword.newPassword ? "text" : "password"}
                          name="newPassword"
                        />
                        <FontAwesomeIcon
                          icon={showPassword.newPassword ? faEyeSlash : faEye}
                          onClick={() =>
                            togglePasswordVisibility("newPassword")
                          }
                          className="eye-icon"
                        />
                      </div>
                      <ErrorMessage
                        name="newPassword"
                        component="div"
                        className="error"
                      />
                    </div>

                    {/* Confirm New Password */}
                    <div className="form-group p-relate">
                      <label>Confirm New Password</label>
                      <div className="password-wrapper">
                        <Field
                          type={
                            showPassword.confirmPassword ? "text" : "password"
                          }
                          name="confirmPassword"
                        />
                        <FontAwesomeIcon
                          icon={
                            showPassword.confirmPassword ? faEyeSlash : faEye
                          }
                          onClick={() =>
                            togglePasswordVisibility("confirmPassword")
                          }
                          className="eye-icon"
                        />
                      </div>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="error"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="form-group flex space-bw">
                      <div className="col-50 btn">
                        <button type="button" onClick={handlepasspopup}>
                          Cancel Changes
                        </button>
                      </div>
                      <div className="col-50 btn">
                        <button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? "Updating..." : "Update Changes"}
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
