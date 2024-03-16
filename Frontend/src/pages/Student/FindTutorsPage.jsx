    import React,{useState,useEffect} from 'react'
    import api from '../../services/Axios';
    import { useNavigate } from 'react-router-dom';
    import TutorCard from '../../components/TutorCard';
import Navbar from '../../components/Navbar';

    function FindTutorsPage() {
        const [tutors, setTutors] = useState([]);

        const navigate = useNavigate()
        useEffect(() => {
        const fetchUsers = async () => {
            try {
            const response = await api.get("/tutors/");
            if (response.status === 200) {
                console.log("Fetched all the users");
                console.log(response.data);
                setTutors(response.data);
            }
            } catch (error) {
            console.log("Error:", error);
            }
        };
    
        fetchUsers();
        }, []);

    return (
        <>
        <Navbar/>
        <p className='font-bold text-2xl text-indigo-900 mt-10 select-none'>Find a Tutor</p>
        <input type='search' placeholder='search...' className='rounded-full 2xl:w-96 w-56 placeholder-indigo-950 placeholder:font-bold px-4 py-2 my-10 focus:bg-gray-200 
         bg-stone-200'/>
        <div className='flex flex-wrap justify-center items-center sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row '>
        {tutors.map((user) => (
                <TutorCard 
                key={user.id}
                name={user.username}
                state={user.tutor.state}
                country={user.tutor.country}
                imageUrl={user.profile_image}
                />
                ))}       
         </div>
         </>
    )
    }

    export default FindTutorsPage
