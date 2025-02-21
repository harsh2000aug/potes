import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../App.css";
import loginImg from "../images/loginmob.png";
import { loginApiCall } from "../store/Services/Auth";
import toast from "react-hot-toast";
import FullScreenLoader from "../components/FullScreenLoader/FullScreenLoader";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading]: any = useState(false);
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
        }, 1000);
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

  const goToRegister = () => {
    navigate("/register");
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
          >
            Forgot Password?
          </h4>
          <h5>
            Don't have an account? <b onClick={goToRegister}>Register</b>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Login;
