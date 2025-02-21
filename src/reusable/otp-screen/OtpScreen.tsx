import React, { useState } from "react";
import "./OtpScreen.css";
import { verifyOtp } from "../../store/Services/Auth";
import toast from "react-hot-toast";
const OtpScreen = ({ onClose, formData, apiCallHandler, setLoading }: any) => {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const verifyOtpHandler = () => {
    if (otp.join("").length === 4) {
      setLoading(true);
      verifyOtp({
        body: {
          username: formData.username,
          otp: otp.join(""),
        },
      })
        .then((res: any) => {
          toast.success(res?.msg);
          localStorage.setItem("accessToken", res?.token?.access);
          setLoading(false);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err: any) => {
          toast.error(err?.data?.error);
          setLoading(false);
        });
    } else {
      toast.error("Please enter the OTP.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
    if (value.length > 1) return; // Ensure only 1 character

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input if available
    if (value && e.target.nextElementSibling) {
      (e.target.nextElementSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      (e.target as HTMLInputElement).previousElementSibling
    ) {
      (
        (e.target as HTMLInputElement)
          .previousElementSibling as HTMLInputElement
      ).focus();
    }
  };

  return (
    <div className="otpScreen">
      <div className="otpEnter">
        <i className="fa-solid fa-xmark" onClick={() => onClose(false)}></i>
        <div className="otpContainer">
          <h1>OTP Verification</h1>
          <p>Enter the OTP you received on email</p>
          <div className="otp-input">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
              />
            ))}
          </div>
          <button onClick={verifyOtpHandler}>Verify</button>
          <div className="resend-text">
            Didn't receive the code?
            <span
              className="resend-link"
              onClick={() => apiCallHandler(formData)}
            >
              {" "}
              Resend Code
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpScreen;
