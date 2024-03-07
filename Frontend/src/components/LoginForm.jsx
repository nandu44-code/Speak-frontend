import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Login } from '../features/userSlice';
import {jwtDecode} from 'jwt-decode';
import imageSrc from "../assets/images/signupPageImage.jpg";

function LoginForm() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  
  const handleClickSignUp = () => {
    navigate('/register/');
  };

  const [formData, setformData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async(e) =>{
      e.preventDefault()  
      console.log('hiiiiiiiiiiiii..........')
      const credentials = {
        email: formData.email,
        password: formData.password,
    }
    console.log(formData.password)
    await dispatch(Login(credentials));
    console.log('after dispatching the login')
    if (localStorage.getItem('accessToken')){
      let token = localStorage.getItem('accessToken')
      let access = jwtDecode(token)
      console.log('hi there')
      if (access.is_superuser){
        navigate('/admin')
      }
      else if (access.is_student){
        navigate('/student/home')
      }
      else{
        navigate('/tutor/checklist')
      }
    }
  }

  return (
    <div className="flex flex-row bg-yellow-300">
    <div className="w-3/5 mr-2">
      <img src={imageSrc} className="w-full h-screen p-2"></img>
    </div>
    <div className="w-1/3 mx-auto bg-transparent mt-32">
   
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Log in here....</h2>
      <form className="space-y-4" onSubmit={handleLogin} method='post'>
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
        <button type="submit" className="w-full cursor-wait bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ">
         Log in
        </button>
        <h4 className='text-md'>Don't have an account?</h4>
        <h4 className='text-indigo-800 cursor-pointer' onClick={handleClickSignUp}>click here to register</h4>
      </form>
    </div>
    </div>
  );

  }

export default LoginForm;
