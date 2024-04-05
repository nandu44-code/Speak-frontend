import React from 'react'
import LoginForm from '../../components/LoginForm'
import Navbar from '../../components/Navbar'
function LoginPage() {
  return (
    <div className='flex flex-col'>
      <Navbar/>
      <div className='pt-14'>
        <LoginForm/>  
      </div>
    </div>
  )
}

export default LoginPage
