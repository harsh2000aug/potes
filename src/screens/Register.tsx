import React from "react";
import "../App.css";
import loginImg from "../images/loginmob.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigation = useNavigate();
  const goToLogin = () => {
    navigation("/login");
  };

  return (
    <div className="login">
      <div className="flex">
        <div className="col-40 login-left">
          <h1>Organize, Connect, and Stay in Touch Effortlessly!</h1>
          <img src={loginImg} alt="" />
        </div>
        <div className="col-60 login-text">
          <h3>Create Account</h3>
          <form action="">
            <div className="form-control">
              <div className="flex space-bw">
                <div className="col-50">
                  <div className="coolinput">
                    <label className="text">First name:</label>
                    <input type="text" name="input" className="input" />
                  </div>
                </div>
                <div className="col-50">
                  <div className="coolinput">
                    <label className="text">Last name:</label>
                    <input type="text" name="input" className="input" />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-control">
              <div className="coolinput">
                <label className="text">Email:</label>
                <input type="text" name="email" className="input" />
              </div>
            </div>
            <div className="form-control">
              <div className="coolinput">
                <label className="text">Password:</label>
                <input type="password" name="password" className="input" />
              </div>
            </div>
            <div className="form-control">
              <input type="submit" name="submit" className="submitBtn" />
            </div>
          </form>
          <h5>
            Already have an account? <b onClick={goToLogin}>Log in</b>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Register;
