import React, { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Register } from "../features/userSlice";
import imageSrc from "../assets/images/pexels-andrea-piacquadio-3772511.jpg";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin, ThreeDots } from "react-loader-spinner";
// import Loader from 'react-loader-spinner/dist/loader/CradleLoader';

function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.user.loading);
  // const [selectedOption, setSelectedOption] = useState('');
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    selectedOption: "",
    is_tutor: false,
    is_student: false,
  });

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
   
    if (
      formData.username.split(" ").join("") != "" &&
      formData.email != "" &&
      formData.password != "" &&
      formData.confirmPassword != ""
    ) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        toast.error(
          "Password must be at least 8 characters, contain one uppercase letter, one lowercase letter, and one digit."
        );
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address.");
        return;
      }

      // Username length validation
      const minUsernameLength = 3;
      if (formData.username.length < minUsernameLength) {
        toast.error(
          `Username must be at least ${minUsernameLength} characters.`
        );
        return;
      }

      // Matching password and confirm password
      if (formData.password !== formData.confirmPassword) {
        toast.error("Password and Confirm Password must match.");
        return;
      }

      // Checking if a radio button is selected
      if (!formData.selectedOption) {
        toast.error("Please choose student or tutor.");
        return;
      }

      if (formData.selectedOption == "tutor") {
        formData.is_tutor = true;
      } else {
        formData.is_student = true;
      }

      const credentials = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        is_tutor: formData.is_tutor,
        is_student: formData.is_student,
      };

      try {
        dispatch(Register(credentials));
        navigate("/otp/");
      } catch (error) {
        console.error("Error during registration:", error);
      }
    } else {
      toast.error("Enter the valid credentials.");
    }
  };

  const handleLoginNavigate = () => {
    navigate("/login/");
  };

  return (
      <div className="w-1/4 mx-auto bg-transparent mt-32">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          Create an Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-4 ">
          <div>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:border-2"
              placeholder="Username..."
              required
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:border-2"
              placeholder="Email..."
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:border-2"
              placeholder="password..."
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:border-2"
              placeholder="confirm password..."
              required
            />
          </div>
          <div>
            <label className="mr-20 flex text-fuchsia-900 font-semibold mt-5">
              <input
                name="selectedOption"
                type="radio"
                value="tutor"
                checked={formData.selectedOption === "tutor"}
                onChange={handleChange}
                className="mr-3 cursor-pointer"
              />
              Register as a Tutor
            </label>

            <label className="mr-20 flex font-semibold text-indigo-600 mt-2 mb-5">
              <input
                name="selectedOption"
                type="radio"
                value="student"
                checked={formData.selectedOption === "student"}
                onChange={handleChange}
                className="mr-3 cursor-pointer"
              />
              Register as a student
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            {loading ? <TailSpin /> : "Sign Up"}
          </button>
          <h4>Already have an account?</h4>
          <h4
            className="text-indigo-800 cursor-pointer"
            onClick={handleLoginNavigate}
          >
            click here to sign in
          </h4>
        </form>
      
     </div>
  );
}

export default memo(SignUpForm);
