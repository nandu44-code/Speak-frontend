import React from 'react'
import SignUpForm from '../../components/SignupForm'
import Navbar from '../../components/Navbar'
function SignUpPage() {
  return (
    <div className='flex flex-col'>
      <Navbar/>
      <div className='pt-14'>
        <SignUpForm/>  
      </div>
    </div>
  )
}

export default SignUpPage
