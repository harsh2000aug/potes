import React, { useState } from "react";
import { useFormik } from "formik";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../App.css";
import loginImg from "../images/loginmob.png";
import { loginApiCall } from "../store/Services/Auth";
import toast from "react-hot-toast";
import FullScreenLoader from "../components/FullScreenLoader/FullScreenLoader";
import {
  forgotPasswordEmail,
  forgotPasswordOtpEmail,
} from "../store/Services/AllApi";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading]: any = useState(false);
  const [forgotPass, setForgotPass]: any = useState(false);
  const [otpPopup, setOtpPopup]: any = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleforgot = () => {
    setForgotPass(!forgotPass);
  };
  const loginApiHandler = (body: any) => {
    setLoading(true);
    loginApiCall({
      body,
    })
      .then((res: any) => {
        toast.success(res?.msg);
        localStorage.setItem("accessToken", res?.token?.access);
        setLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Invalid Credentials");
      });
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(8, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const validationSchema1 = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      loginApiHandler(values);
    },
  });
  const initialValues1 = {
    email: "",
  };
  const initialValues2 = {
    otp: ["", "", "", ""],
  };

  const validationSchemaOtp = Yup.object().shape({
    otp: Yup.array().of(
      Yup.string()
        .matches(/^[0-9]$/, "Must be a single digit")
        .required("All fields are required")
    ),
  });

  const handleSubmitOtp = (values: any, { setFieldError }: any) => {
    if (values.otp.some((digit: any) => digit === "")) {
      setFieldError("otp", "All fields are required");
      return;
    }
    const otpCode = values.otp.join("");
    forgotPasswordOtpEmail({
      body: {
        email: userEmail,
        otp: otpCode,
      },
    })
      .then((res: any) => {
        toast.success(res.msg);
        navigate("/forgot");
      })
      .catch((err: any) => toast.error(err.data.error));
  };

  const goToRegister = () => {
    navigate("/register");
  };
  const handleSubmit1 = (values: any) => {
    console.log("Form Data:", values);
    forgotPasswordEmail({
      body: {
        email: values.email,
      },
    })
      .then((res: any) => {
        toast.success(res.msg);
        setForgotPass(false);
        setOtpPopup(true);
        setUserEmail(values.email);
      })
      .catch((error) => {
        toast.error(error.data.error);
      });
  };

  return (
    <div className="login">
      {loading && <FullScreenLoader />}
      <div className="flex h-100">
        <div className="col-40 login-left">
          <h1>Organize, Connect, and Stay in Touch Effortlessly!</h1>
          <img src={loginImg} alt="Login Illustration" />
        </div>
        <div className="col-60 login-text">
          <h3>Log In</h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-control">
              <div className="coolinput">
                <label className="text">Username:</label>
                <input
                  type="text"
                  name="username"
                  className="input"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="error">{formik.errors.username}</div>
                ) : null}
              </div>
            </div>
            <div className="form-control">
              <div className="coolinput">
                <label className="text">Password:</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="error">{formik.errors.password}</div>
                ) : null}
              </div>
            </div>
            <div className="form-control">
              <input type="submit" className="submitBtn" value="Log In" />
            </div>
          </form>
          <h4
            style={{
              fontSize: "14px",
              textAlign: "right",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={handleforgot}
          >
            Forgot Password?
          </h4>
          <h5>
            Don't have an account? <b onClick={goToRegister}>Register</b>
          </h5>
        </div>
      </div>
      {forgotPass && (
        <div id="myModal" className="modal">
          <div className="modal-dialog modal-confirm">
            <div className="modal-content">
              <h3>Forgot Password</h3>
              <Formik
                initialValues={initialValues1}
                validationSchema={validationSchema1}
                onSubmit={handleSubmit1}
              >
                {({ isSubmitting }: any) => (
                  <Form>
                    <div className="form-control">
                      <div className="coolinput">
                        <label className="text">Email:</label>
                        <Field type="text" name="email" className="input" />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="error-message"
                        />
                      </div>
                    </div>
                    <div className="btn">
                      <button type="button" onClick={handleforgot}>
                        Cancel
                      </button>
                      <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
      {otpPopup && (
        <div className="otpScreen">
          <div className="otpEnter">
            <i
              className="fa-solid fa-xmark"
              onClick={() => setOtpPopup(false)}
            ></i>
            <div className="otpContainer">
              <h1>OTP Verification</h1>
              <p>Enter the OTP you received on email</p>

              <Formik
                initialValues={initialValues2}
                validationSchema={validationSchemaOtp}
                onSubmit={handleSubmitOtp}
              >
                {({
                  values,
                  handleChange,
                  handleBlur,
                  errors,
                  touched,
                  isValid,
                  setFieldError,
                }) => (
                  <Form>
                    <div className="otp-input">
                      {values.otp.map((digit: any, index: any) => (
                        <Field
                          key={index}
                          name={`otp[${index}]`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e: any) => {
                            handleChange(e);
                            if (e.target.value === "") {
                              setFieldError("otp", "All fields are required");
                            }
                          }}
                          onBlur={handleBlur}
                          className="otp-box"
                        />
                      ))}
                    </div>

                    {errors.otp && (
                      <div className="error-text">{errors.otp.slice(0, 1)}</div>
                    )}

                    <button type="submit" disabled={!isValid}>
                      Verify
                    </button>
                  </Form>
                )}
              </Formik>

              <div className="resend-text">
                Didn't receive the code?
                <span className="resend-link"> Resend Code</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
