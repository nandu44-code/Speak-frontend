import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { BsCheckLg } from "react-icons/bs";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { otp_validation } from "../../features/userSlice";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";

function ForgotPassOtp() {
  const [otp, setOtp] = useState("");
  const [fullotp, setFullotp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
    console.log(newOtp);
  };
  console.log("this is console.log", fullotp);

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="h-full w-full flex justify-center items-start mt-56 pt-14">
        <div className="flex-col bg-white rounded-2xl shadow-2xl px-10 py-10 ">
          <h2 className="my-2">
            We have sent an one time password to your email.
          </h2>
          <h1 className="text-gray-600 font-medium text-xl bg-transparent">
            Enter your OTP
          </h1>
          <OtpInput
            value={otp}
            onChange={handleOtpChange} // Pass the handleOtpChange function as the onChange prop
            numInputs={6}
            renderSeparator={<span className="mx-4 mt-20"></span>}
            renderInput={(props) => (
              <input
                {...props}
                className="h-14 text-lg border-2 mb-10 mt-20 border-gray-300 rounded-md focus:outline-none focus:border-2 focus:border-blue-700 text-center"
                style={{ width: "3em" }}
              />
            )}
          />
          <button
            className=" text-white px-4 py-2 bg-indigo-800 rounded-lg"
            onClick={async () => {
              if (otp.length === 6) {
                console.log("otp length is 6");
                console.log("Entire OTP:", otp);
                setFullotp(otp);
                const intotp = parseInt(otp, 10);
                const credentials = {
                  otp: intotp,
                };
                console.log(credentials);
                try {
                  const resultAction = await dispatch(
                    otp_validation(credentials)
                  );
                  const originalPromiseResult = unwrapResult(resultAction);
                  navigate("/forgot-pass/reset/");
                } catch (error) {
                  console.log("error", error);
                }
              } else {
                toast.error("Invalid OTP length");
              }
            }}
          >
            SUBMIT
          </button>
          <p className="text-blue-800 font-normal mt-10 cursor-pointer hover:font-medium">
            Resend Otp?
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassOtp;
