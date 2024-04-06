import React from 'react'

function Footer() {
  return (
    <div className='bg-indigo-950 flex flex-row justify-evenly'>
        <div className='m-5 flex flex-col items-start'>
            <h1 className="text-xl text-white underline cursor-pointer hover:text-gray-400">About Us</h1>
            <h1 className="text-md text-white mt-2 hover:underline">We provide Tutors</h1>
            <h1 className="text-md text-white mt-2 hover:underline">We provide best user experience</h1>
            <h1 className="text-md text-white mt-2 hover:underline">We provide optimised session</h1>
            <h1 className="text-md text-white mt-2 hover:underline">We provide online learning</h1>
            
        </div>
        <div className='m-5'>
            <h1 className="text-xl text-white">Social links</h1>
            <h1 className="text-md text-white mt-2 hover:underline">Instagram</h1>
            <h1 className="text-md text-white mt-2 hover:underline">Facebook</h1>
            <h1 className="text-md text-white mt-2 hover:underline">Twitter</h1>
            <h1 className="text-md text-white mt-2 hover:underline">Linkedin</h1>
            
        </div>
        <div className='m-5'>
            <h1 className="text-md text-gray-500 ">copyrights@c.speak.usa under the ct-2112</h1>
            
        </div>
       
      
    </div>
  )
}

export default Footer
