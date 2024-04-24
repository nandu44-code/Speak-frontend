// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar";
// import Sidebar from "../../components/SideBar";
// import { useDispatch, useSelector } from "react-redux";
// import { getTutors,getTutorRequests } from "../../features/userSlice";
// import { useNavigate } from "react-router-dom";

// function AdminRequestsPage() {
//   // const [requests,setRequests] = useState([])
//   const [id,setId] = useState(null)
//   const tutors = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate()
//   const [pendingRequests, setPendingRequests] = useState([]);

  

//   useEffect(() => {
//     const requestedTutors = async () => {
//       try {
//         await dispatch(getTutorRequests());
//       } catch (error) {
//         console.log("error");
//       }
//     };
//     requestedTutors();
//   }, []);

//   useEffect(() => {
//     if (id != null){
//         navigate(`/admin/requests/detail/${id}`)
//     }
//   },[id])

//   setPendingRequests( tutors ? tutors : [])
//   console.log(pendingRequests, 'pendingrequests');

//   return (
//     <div className="flex-row"> 
//       {/* <Navbar /> */}
//       <div className="flex">
//         <Sidebar />
//         {console.log("hi")}
//         <div className="flex flex-col mt-10 ml-96">
//           <p className="font-medium text-stone-700 text-2xl mb-20">Requests</p>

//           {Array.isArray(pendingRequests) && pendingRequests.length === 0 ? (
//       <p className="text-red-500">No Pending Requests</p>
//     ) : (
//       pendingRequests.map((tutor, index) => (
//         <div key={index} className="border-b p-4 flex bg-stone-300 mt-10 mb-10 rounded-2xl hover:scale-110 duration-500 hover:bg-neutral-400 cursor-pointer" onClick={() => {setId(tutor.id)}}>
//           <img src={tutor.profile_image} className="rounded w-32 h-32 mr-10"></img>
//           <div className="flex-col ">
//             <p className="font-bold text-2xl">{tutor.username || "no username"}</p>
//             <button className="bg-red-500 p-2 mt-5 text-white font-semibold rounded-lg">View Details</button>
//           </div>
//         </div>
//       ))
//     )}
          
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminRequestsPage;


import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getTutors, getTutorRequests } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";

function AdminRequestsPage() {
 const [id, setId] = useState(null);
 const [pendingRequests, setPendingRequests] = useState([]);
 const tutors = useSelector((state) => state.user);
 const dispatch = useDispatch();
 const navigate = useNavigate();

 useEffect(() => {
    const requestedTutors = async () => {
      try {
        await dispatch(getTutorRequests());
      } catch (error) {
        console.log("error");
      }
    };
    requestedTutors();
 }, []);

 useEffect(() => {
    if (id != null) {
      navigate(`/admin/requests/detail/${id}`);
    }
 }, [id]);

 useEffect(() => {

  console.log('tutors',tutors)
 
  setPendingRequests(tutors);
 
}, [tutors]);

 return (
    <div className="flex-row">
      {/* <Navbar /> */}
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col mt-10 ml-96">
          <p className="font-medium text-stone-700 text-2xl mb-20">Requests</p>
          {pendingRequests && pendingRequests.length === 0 ? (
            <p className="text-red-500">No Pending Requests</p>
          ) : (
            pendingRequests.user.map((tutor, index) => (
              <div key={index} className="border-b p-4 flex bg-stone-300 mt-10 mb-10 rounded-2xl hover:scale-110 duration-500 hover:bg-neutral-400 cursor-pointer" onClick={() => {setId(tutor.id)}}>
                <img src={tutor.profile_image} className="rounded w-32 h-32 mr-10"></img>
                <div className="flex-col ">
                 <p className="font-bold text-2xl">{tutor.username || "no username"}</p>
                 <button className="bg-red-500 p-2 mt-5 text-white font-semibold rounded-lg">View Details</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
 );
}

export default AdminRequestsPage;
