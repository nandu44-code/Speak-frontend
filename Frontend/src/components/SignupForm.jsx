import React, { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Register } from "../features/userSlice";
import Swal from 'sweetalert2';

// import {TailSpin, ThreeDots} from 'react-loader-spinner';
// import Loader from 'react-loader-spinner/dist/loader/CradleLoader';


function SignUpForm() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector((state) => state.user.loading)

  const [formData, setformData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleRegister = () =>{
      
      const credentials = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
    }
    try{

      dispatch(Register(credentials));
      navigate('/login/');
    } catch (error) {
    console.error("Error during registration:", error);
    
   }
}

const handleLoginNavigate = () => {

  navigate('/login/')
}


  return (
    <div className="max-w-md mx-auto mt-28">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Create an Account</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:border-2"
            placeholder='Username...'
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
            placeholder='Email...'
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
            placeholder='password...'
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
            placeholder='confirm password...'
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        {loading ?'loading....' :'Sign Up'}
        </button>
        <h4>Already have an account?</h4>
        <h4 className='text-indigo-800 cursor-pointer' onClick={ handleLoginNavigate }>click here to sign in</h4>
      </form>
    </div>
  );
}

export default SignUpForm;
