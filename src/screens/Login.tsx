import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../App.css";
import loginImg from "../images/loginmob.png";

const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form values:", values);
      // Handle login logic here
    },
  });

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login">
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
                <label className="text">Email:</label>
                <input
                  type="text"
                  name="email"
                  className="input"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error">{formik.errors.email}</div>
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
          <h5>
            Don't have an account? <b onClick={goToRegister}>Register</b>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Login;
