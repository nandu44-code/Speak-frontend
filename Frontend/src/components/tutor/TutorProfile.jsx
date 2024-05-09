import React,{useState,useEffect} from 'react'
import { jwtDecode } from 'jwt-decode';
import TutorSidebar from './TutorSidebar'
import api from '../../services/Axios';
import { TailSpin } from 'react-loader-spinner';
function TutorProfile() {
    const [userData,setUserData] = useState('')
    const [id, setId] = useState('')
    

    useEffect(() => {
        let token = localStorage.getItem('accessToken')
        let access = jwtDecode(token)
        setId(access.user)
        console.log(access.user)
    },[])
 
    useEffect(() => {
        const fetchData = async () => {
            console.log('this is api calling useEffect')
          try {
            const response = await api.get(`user/${id}/`);
            console.log(response.data)
            setUserData(response.data);
            setId(id)
          } catch (error) {
            console.error();
          }
        };
        fetchData();
      }, [id]);
      if (!userData) {
        return (
            <div className='flex justify-center items-center w-full h-screen'>
                <TailSpin />
            </div>
        );
    }
    
  return (
    <div className='flex flex-row'>
        <TutorSidebar/>
        <div className='flex flex-col w-full mt-10 items-center mb-5'>
            <p  className='text-gray-600 font-normal text-xl mb-10'>Profile</p>
            <div className='flex flex-row gap-4 justify-center w-1/4 mb-5'>
                <img src={userData.profile_image} className='rounded-xl'></img>
            </div>
            <div className='flex flex-row bg-gray-300 gap-4 justify-between w-1/2 rounded-sm mb-1'>
                <p className='text-gray-800 px-10 py-2 '>User name</p>
                <p className='text-indigo-950 font-semibold text-lg px-10 py-2'>{userData.username}</p>
            </div>
            <div className='flex flex-row bg-stone-300 gap-4 justify-between w-1/2 rounded-sm mb-1'>
                <p className='text-gray-800 px-10 py-2 '>First name</p>
                <p className='text-indigo-950 font-semibold text-lg px-10 py-2'>{userData.first_name}</p>
            </div>
            <div className='flex flex-row bg-gray-300 gap-4 justify-between w-1/2 rounded-sm mb-1'>
                <p className='text-gray-800 px-10 py-2 '>Last name</p>
                <p className='text-indigo-950 font-semibold text-lg px-10 py-2'>{userData.last_name}</p>
            </div>
            <div className='flex flex-row bg-stone-300 gap-4 justify-between w-1/2 rounded-sm mb-1'>
                <p className='text-gray-800 px-10 py-2 '>Email</p>
                <p className='text-indigo-950 font-semibold text-lg px-10 py-2'>{userData.email}</p>
            </div>
            <div className='flex flex-row bg-gray-300 gap-4 justify-between w-1/2 rounded-sm mb-1'>
                <p className='text-gray-800 px-10 py-2 '>Dialect</p>
                <p className='text-indigo-950 font-semibold text-lg px-10 py-2'>{userData.tutor.dialect}</p>
            </div>
            <div className='flex flex-row bg-stone-300 gap-4 justify-between w-1/2 rounded-sm mb-1'>
                <p className='text-gray-800 px-10 py-2 '>State</p>
                <p className='text-indigo-950 font-semibold text-lg px-10 py-2'>{userData.tutor.state}</p>
            </div>
            <div className='flex flex-row bg-gray-300 gap-4 justify-between w-1/2 rounded-sm mb-1'>
                <p className='text-gray-800 px-10 py-2 '>Country</p>
                <p className='text-indigo-950 font-semibold text-lg px-10 py-2'>{userData.tutor.country}</p>
            </div>
        </div>
    </div>
  )
}

export default TutorProfile
