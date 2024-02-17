import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


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

//   const handleRegister = async () =>{
      
//       const credentials = {
//         username: formData.username,
//         email: formData.email,
//         password: formData.password,
//     }
//     dispatch(Register(credentials)).catch((error) => {
//       console.error("Error during registration:", error);
//     });
    
    const LoginNavigate = () => {

      navigate('')
    }


  return (
    <div className="max-w-md mx-auto mt-28">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Log in here....</h2>
      <form className="space-y-4">
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
  );

  }
export default LoginForm;
