import React from 'react'
import LoginForm from '../../components/LoginForm'
import Navbar from '../../components/Navbar'
function LoginPage() {
  return (
    <div className='flex flex-col'>
      <Navbar/>
      <div>
        <LoginForm/>  
      </div>
    </div>
  )
}

export default LoginPage
