import React, { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Register } from "../features/userSlice";
import imageSrc from "../assets/images/signupPageImage.jpg";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin } from "react-loader-spinner";

function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.user.loading);
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    selectedOption: "",
    is_tutor: false,
    is_student: false,
  });

  const [errors, setErrors] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    selectedOption: "",
  });

  const [success,setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    let errorMessage = "";

    switch (name) {
      case "username":
        if (value.trim() === "") {
          errorMessage = "Username is required";
        } else {
          const usernameRegex =
            /^(?=.*[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*[a-zA-Z])[a-zA-Z0-9_!@#$%^&*()+=\-[\]{};':"|,.<>/?]{4,}$/;
          if (!usernameRegex.test(value)) {
            errorMessage = "username should contain atleast 4 alphabets";
          }
        }
        break;

      case "first_name":
        if (value.trim() === "") {
          errorMessage = "first name required";
        } else {
          const first_nameRegex = /^[a-zA-Z\s]+$/;
          if (!first_nameRegex.test(value)) {
            errorMessage = "name should not contain any symbols or digits";
          }
        }
        break;

      case "last_name":
        if (value.trim() === "") {
          errorMessage = "last name required";
        } else {
          const last_nameRegex = /^[a-zA-Z\s]+$/;
          if (!last_nameRegex.test(value)) {
            errorMessage = "name should not contain any symbols or digits";
          }
        }

        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMessage = "Please enter a valid email address.";
        }
        break;
      case "password":
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(value)) {
          errorMessage =
            "Password must be at least 8 characters, contain one uppercase letter, one lowercase letter, and one digit.";
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          errorMessage = "Password and Confirm Password must match.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));

    
   const isErrorsEmpty = Object.values(errors).every(value => value === "");
   if (isErrorsEmpty){
    setSuccess(true)
   }else{
    setSuccess(false)
   }
   console.log(errors)
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      formData.username.trim() !== "" &&
      formData.email !== "" &&
      formData.password !== "" &&
      formData.confirmPassword !== ""
    ) {
      // Perform other validations here if needed

      const credentials = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        is_tutor: formData.selectedOption === "tutor",
        is_student: formData.selectedOption === "student",
        first_name: formData.first_name,
        last_name: formData.last_name,
      };

      try {
        dispatch(Register(credentials));
        navigate("/otp/");
      } catch (error) {
        console.error("Error during registration:", error);
      }
    } else {
      toast.error("Enter valid credentials.");
    }
  };

  const handleLoginNavigate = () => {
    navigate("/login/");
  };

  return (
    <div className="flex flex-row">
      <div className="w-1/2 sm:hidden md:block lg:block xl:block 2xl:block flex justify-center items-center ">
        <img
          src={imageSrc}
          className="w-full h-full"
          alt="signup-image"
        ></img>
      </div>
      <div className="w-1/2sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 2xl:w-1/3 mx-auto h-full bg-transparent mt-32 shadow-md shadow-black p-2 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          Create an Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
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
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full px-3 py-2 mr-2 border rounded-md focus:outline-none focus:border-blue-500 focus:border-2"
              placeholder="First Name"
              required
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm">{errors.first_name}</p>
            )}
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:border-2"
              placeholder="Last Name"
              required
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm">{errors.last_name}</p>
            )}
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
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:border-2"
              placeholder="Password..."
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:border-2"
              placeholder="Confirm Password..."
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
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
         {success? <button
            type="submit"
            className="w-full bg-indigo-900 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-blue-600"
          >
            {loading ? <TailSpin /> : "Sign Up"}
          </button>: <button
            type="submit"
            className="w-full bg-indigo-900 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-blue-600"
            disabled
          >
            {loading ? <TailSpin /> : "Sign Up"}
          </button>}
          <h4>Already have an account?</h4>
          <h4
            className="text-indigo-800 cursor-pointer"
            onClick={handleLoginNavigate}
          >
            click here to sign in
          </h4>
        </form>
      </div>
    </div>
  );
}

export default memo(SignUpForm);
