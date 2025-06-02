import React, { useState } from "react";
import { useFormik } from "formik";
import loginImg from "../images/loginmob.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { forgotPasswordChange } from "../store/Services/AllApi";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Forgot = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userDetailsEmail = location.state?.email;
  const userDetailsOtp = location.state?.otp;
  const [showPassword, setShowPassword]: any = useState(false);
  const [showConfirmPassword, setShowConfirmPassword]: any = useState(false);
  const formik: any = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values: any) => {
      forgotPasswordChange({
        body: {
          email: userDetailsEmail,
          otp: userDetailsOtp,
          new_password: values.password,
          confirm_password: values.confirmPassword,
        },
      })
        .then((res: any) => {
          toast.success(res.msg);
          navigate("/login");
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  });
  return (
    <div>
      {" "}
      <div className="login">
        <div className="flex h-100">
          <div className="col-40 login-left">
            <h1>Organize, Connect, and Stay in Touch Effortlessly!</h1>
            <img src={loginImg} alt="Login" />
          </div>
          <div className="col-60 login-text">
            <h3>Change Password</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-control">
                <div className="coolinput">
                  <label className="text">New Password:</label>
                  <div className="password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                      onClick={() => setShowPassword(!showPassword)}
                      className="eye-icon"
                    />
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p className="error">{formik.errors.password}</p>
                  )}
                </div>
                <div className="coolinput">
                  <label className="text">Confirm New Password:</label>
                  <div className="password-wrapper">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      className="input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                    />
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEye : faEyeSlash}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="eye-icon"
                    />
                  </div>
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <p className="error">{formik.errors.confirmPassword}</p>
                    )}
                </div>
              </div>
              <div className="form-control">
                <button type="submit" className="submitBtn">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
