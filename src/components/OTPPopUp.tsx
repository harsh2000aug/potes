import React from "react";

const OTPPopUp = () => {
  return (
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
  );
};

export default OTPPopUp;
