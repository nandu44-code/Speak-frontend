import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { change_password } from '../features/userSlice'
import {toast} from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
function ChangePass() {

    const [formData,setFormData] = useState({
        password:"",
        confirmPassword:""
    })

    const dispatch = useDispatch()

    const token = localStorage.getItem("accessToken");
    const access = jwtDecode(token);
    
    const handleChange = (e) =>{

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
    }

    const handlesubmit = (e) => {
        e.preventDefault();
       
        if (
          formData.password != "" &&
          formData.confirmPassword != ""
        ) {
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
          if (!passwordRegex.test(formData.password)) {
            toast.error(
              "Password must be at least 8 characters, contain one uppercase letter, one lowercase letter, and one digit."
            );
            return;
          }else if (formData.password !== formData.confirmPassword){
            toast.error('passwords do not match')
          }else{

                const credentials = {
                    id:access.user,
                    password:formData.password

                }
                dispatch(change_password(credentials))
          }
        }else{
            toast.error("fields are empty")
        }
    }


  return (
    <div>
        <h1 className='font-bold text-xl text-purple-800'>Change Password</h1>
        <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 my-4 border rounded-md focus:outline-none focus:border-blue-500 focus:border-2"
            placeholder='Enter your new password...'
            required
          />
        <input
            type="password"
            id="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:border-2"
            placeholder='Confirm password...'
            required
          />

        <button
          className="relative inline-flex items-center justify-center px-4 py-2 m-6 overflow-hidden text-sm font-medium text-white rounded-lg bg-indigo-900 hover:bg-opacity-90"
          onClick={handlesubmit}
        >
         Change
        </button>
      
    </div>
  )
}

export default ChangePass
