import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import api from "../../services/Axios";
import { TailSpin } from "react-loader-spinner";

function Modal({ onClose }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handle_change = (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(emailInput)) {
      setError("");
    } else {
      setError("Please enter a valid email address");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(" entering to the submit button");
    if (email.trim() == "") {
      setError("please enter a valid email");
    } else {
      const credential = {
        email: email,
      };
      console.log(email);
      setLoading(true);
      const response = await api.post("forgot-password/", credential);
      setLoading(false);
      console.log(response.data);
      if (response.status == 200) {
        navigate("/forgot-pass/otp/");
      } else {
        console.log("something went wrong");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-stone-200 w-1/2 rounded-xl">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="hover:scale-125 duration-500 rounded-full bg-gray-100"
          >
            <X />
          </button>
        </div>
        <p className="my-4 text-lg font-semibold text-gray-600">
          Do you really forget your password?
        </p>
        <p className="my-4 text-md font-normal text-indigo-950">
          If so, enter your email address to verify
        </p>
        {loading ? (
          <div className="flex justify-center items-center">
            <TailSpin color="indigo" height={70} />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={handle_change}
              className="w-3/4 px-4 py-3 border-2 border-blue-500 rounded-md"
              required
            />
            {error ? (
              <>
                <p className="text-red-500">{error}</p>
                <button
                  className="mb-4 bg-indigo-400 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  disabled
                >
                  Submit
                </button>
              </>
            ) : (
              <button
                className="mb-4 bg-indigo-800 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
