import React, { useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Login } from '../features/userSlice';
import {jwtDecode} from 'jwt-decode';
import { TailSpin } from 'react-loader-spinner';
import imageSrc from "../assets/images/12953573_Data_security_05.jpg";
import Modal from './modal/Modal';

function LoginForm() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showModal,setShowModal] = useState(false)
  const loading = useSelector((state) => state.user.loading);

  
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
      const credentials = {
        email: formData.email,
        password: formData.password,
    }
    console.log(formData.password)
    await dispatch(Login(credentials));
    if (localStorage.getItem('accessToken')){
      let token = localStorage.getItem('accessToken')
      let access = jwtDecode(token)
      console.log('hi there')
      if (access.is_superuser){
        navigate('/admin')
      }
      else if (access.is_student){
        navigate('/')
      }
      else{
        if (access.is_approved){
            navigate('/tutor/home/')
            console.log('access.is_approvded is true')
        }else if (access.is_rejected){
          console.log('tutor is rejected')
          navigate('/tutor/rejected')
        }
        else if (!access.is_approved && !access.tutor){
          
          navigate('/tutor/checklist/')
        }
        else if (access.tutor && !access.is_approved){
          navigate('/tutor/checklist/processing')
        }
      }
    }
  }

  return (
    <div className="flex flex-row">
       {showModal && <Modal onClose={()=> setShowModal(false)}/>}
    <div className="w-2/4 sm:hidden md:block lg:block xl:block 2xl:block hidden">
      <img src={imageSrc} className="w-full h-screen"></img>
    </div>
    <div className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 2xl:w-1/3 mx-auto h-full bg-transparent mt-32 shadow-md shadow-black p-2 mb-4 rounded-lg">
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
        <div className='flex justify-start px-2'>
          {/* <h4 className='text-indigo-800 cursor-pointer' onClick={()=> {setShowModal(true)}}>forgot password?</h4> */}
        </div>
        <button
            type="submit"
            className="w-full bg-indigo-900 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-blue-600"
          >
            {loading ? <div className="flex justify-center items-center w-full"><TailSpin width={30} height={30} color="white"/></div>: "Login here"}
          </button>
        <h4 className='text-md'>Don't have an account?</h4>
        <h4 className='text-indigo-800 cursor-pointer' onClick={handleClickSignUp}>click here to register</h4>
      </form>
    </div>
    </div>
  );

  }

export default LoginForm;
