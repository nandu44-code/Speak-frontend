import React, { useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import OtpInput from 'react-otp-input';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { otp_validation } from '../../features/userSlice';
import { toast } from 'react-toastify';

function OtpPage() {
  const [otp, setOtp] = useState('');
  const [fullotp, setFullotp] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
    console.log(newOtp)
  }
  console.log("this is console.log",fullotp)

  return (
    <div className='h-screen w-full flex justify-center items-start mt-56'>
      <div className='flex-col shadow-2xl px-5 py-10 bg-stone-200 rounded-2xl'>
        <h1 className='text-violet-800 font-bold text-3xl bg-transparent'>
          Enter your OTP
        </h1>
        <OtpInput
          value={otp}
          onChange={handleOtpChange} // Pass the handleOtpChange function as the onChange prop
          numInputs={6}
          renderSeparator={<span className='mx-4 mt-20'></span>}
          renderInput={(props) => (
            <input
              {...props}
              className="h-14 text-lg border-2 mb-10 mt-20 border-gray-300 rounded-md focus:outline-none focus:border-4 focus:border-indigo-500 text-center"
              style={{ width: '3em' }}
            />
          )}
        />
        <button
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          onClick={async() => {
            if (otp.length === 6) {
              console.log("otp length is 6")
              console.log('Entire OTP:', otp);
              setFullotp(otp);
              const intotp = parseInt(otp,10)
              const credentials = {
                'otp': intotp,
              };
              console.log(credentials)
              try {
                await dispatch(otp_validation(credentials));
                navigate('/login/');
              } catch (error) {
                console.log("error", error);
              }
            } else {
             
              toast.error('Invalid OTP length')
              // Optionally, provide user feedback for invalid OTP length
            }
          }}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-500 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            SUBMIT
          </span>
        </button>
      </div>
    </div>
  );
}

export default OtpPage;
