import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../App.css";
import loginImg from "../images/loginmob.png";
import { registerApi } from "../store/Services/Auth";
import toast from "react-hot-toast";
import FullScreenLoader from "../components/FullScreenLoader/FullScreenLoader";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sendOtp, setSendOTP] = useState(false);

  // Formik with Yup validation
  const formik: any = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "Too short!")
        .max(50, "Too long!")
        .required("First name is required"),
      lastName: Yup.string()
        .min(2, "Too short!")
        .max(50, "Too long!")
        .required("Last name is required"),
      username: Yup.string()
        .min(4, "Username must be at least 4 characters")
        .max(20, "Username too long")
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values: any) => {
      setLoading(true);
      registerApi({
        body: {
          first_name: values.firstName,
          last_name: values.lastName,
          username: values.username,
          email: values.email,
          password: values.password,
          password2: values.confirmPassword,
        },
      })
        .then((res: any) => {
          toast.success(res.msg);
          setLoading(false);
          setSendOTP(true);
        })
        .catch((err: any) => {
          toast.error(err.data?.error);
          setLoading(false);
        });
    },
  });

  return (
    <>
      {loading && <FullScreenLoader />}
      {sendOtp && (
        <div className="otpScreen">
          <div className="otpEnter">
            <div className="otpContainer">
              <h1>OTP Verification</h1>
              <p>Enter the OTP you received on email</p>
              <div className="otp-input">
                <input type="text" min="0" max="9" required />
                <input type="text" min="0" max="9" required />
                <input type="text" min="0" max="9" required />
                <input type="text" min="0" max="9" required />
              </div>
              <button>Verify</button>
              <div className="resend-text">
                Didn't receive the code?
                <span className="resend-link"> Resend Code</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="login">
        <div className="flex h-100">
          <div className="col-40 login-left">
            <h1>Organize, Connect, and Stay in Touch Effortlessly!</h1>
            <img src={loginImg} alt="Login" />
          </div>
          <div className="col-60 login-text">
            <h3>Create Account</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-control">
                <div className="flex space-bw">
                  <div className="col-50">
                    <div className="coolinput">
                      <label className="text">First name:</label>
                      <input
                        type="text"
                        name="firstName"
                        className="input"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                      />
                      {formik.touched.firstName && formik.errors.firstName && (
                        <p className="error">{formik.errors.firstName}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-50">
                    <div className="coolinput">
                      <label className="text">Last name:</label>
                      <input
                        type="text"
                        name="lastName"
                        className="input"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}
                      />
                      {formik.touched.lastName && formik.errors.lastName && (
                        <p className="error">{formik.errors.lastName}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-control">
                <div className="coolinput">
                  <label className="text">Username:</label>
                  <input
                    type="text"
                    name="username"
                    className="input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <p className="error">{formik.errors.username}</p>
                  )}
                </div>
              </div>
              <div className="form-control">
                <div className="coolinput">
                  <label className="text">Email:</label>
                  <input
                    type="text"
                    name="email"
                    className="input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="error">{formik.errors.email}</p>
                  )}
                </div>
              </div>
              <div className="form-control">
                <div className="coolinput">
                  <label className="text">Password:</label>
                  <input
                    type="password"
                    name="password"
                    className="input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="error">{formik.errors.password}</p>
                  )}
                </div>
              </div>
              <div className="form-control">
                <div className="coolinput">
                  <label className="text">Confirm Password:</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                  />
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <p className="error">{formik.errors.confirmPassword}</p>
                    )}
                </div>
              </div>
              <div className="form-control">
                <button type="submit" className="submitBtn">
                  Register
                </button>
              </div>
            </form>
            <h5>
              Already have an account?{" "}
              <b onClick={() => navigate("/login")}>Log in</b>
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
