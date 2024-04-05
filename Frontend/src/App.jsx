import { useState } from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import './App.css';


//auth related pages
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/Auth/SignUpPage';
import LoginPage from './pages/Auth/LoginPage'
import OtpPgae from './pages/Auth/OtpPgae';

//student related pages
import StudentHomePage from './pages/Student/StudentHomePage';
import StudentProfile from './pages/Student/StudentProfile';
import ChangePassPage from './pages/Student/ChangePassPage';
import PaymentSuccessPage from './pages/Student/PaymentSuccessPage';
import ViewBookingsStudent from './pages/Student/ViewBookingsStudent';

//Tutor related pages
import TutorCheklistPage from './pages/Tutor/TutorCheklistPage';
import TutorHomePage from './pages/Tutor/TutorHomePage';
import TutorProcessingPage from './pages/Tutor/TutorProcessingPage';
import FindTutorsPage from './pages/Student/FindTutorsPage';
import RejectedPage from './pages/Tutor/RejectedPage';
import CreateSlotPage from './pages/Tutor/CreateSlotPage';
import ViewSlotPage from './pages/Tutor/ViewSlotPage';
import TutorSideDetailsPage from './pages/Student/TutorDetailsPage';
import ViewBookingsPage from './pages/Tutor/ViewBookingsPage';

//admin related pages
import AdminHomePage from './pages/Admin/AdminHomePage';
import AdminUsersPage from './pages/Admin/AdminUsersPage';
import AdminRequestsPage from './pages/Admin/AdminRequestsPage';
import RequestDetailsPage from './pages/Admin/RequestDetailsPage';
import AdminTutorsPage from './pages/Admin/AdminTutorsPage';
import TutorDetailsPage from './pages/Admin/TutorDetailsPage';
import AdminBookings from './pages/Admin/AdminBookings';

function App() {
  
  return (


   <Router> 
      <>  
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='register/' element={<SignUpPage/>} />
          <Route path='/login/' element={<LoginPage/>} />
          <Route path='/otp/' element={<OtpPgae/>}/>

          <Route path='/student/home/' element={<StudentHomePage/>}/>
          <Route path='/student/profile/' element={<StudentProfile/>}/> 
          <Route path='/student/changePassword/' element={<ChangePassPage/>}/> 
          <Route path='/student/findTutors/' element={<FindTutorsPage/>}/>
          <Route path='/student/TutorDetails/:id' element={<TutorSideDetailsPage/>}/>
          <Route path='/student/paymentSuccess/' element={<PaymentSuccessPage/>}/>
          <Route path='/student/viewBookings/' element={<ViewBookingsStudent/>}/>

          <Route path='/tutor/home/' element={<TutorHomePage/>}/>
          <Route path='/tutor/checklist/' element={<TutorCheklistPage/>}/>
          <Route path='/tutor/checklist/processing' element={<TutorProcessingPage/>}/>
          <Route path='tutor/rejected/' element={<RejectedPage/>}/>
          <Route path='tutor/createslot/' element={<CreateSlotPage/>}/>
          <Route path='tutor/viewslot/' element={<ViewSlotPage/>}/>
          <Route path='tutor/viewbookings/' element={<ViewBookingsPage/>}/>

          <Route path='/admin/users' element={<AdminUsersPage/>}/>
          <Route path='/admin/tutors' element={<AdminTutorsPage/>}/>
          <Route path='/admin/' element={<AdminHomePage/>}/>
          <Route path='/admin/requests' element={<AdminRequestsPage/>}/>
          <Route path='/admin/requests/detail/:id' element={<RequestDetailsPage/>}/>
          <Route path='/admin/tutors/detail/:id' element={<TutorDetailsPage/>}/>
          <Route path='/admin/bookings' element={<AdminBookings/>}/>
          
        </Routes>
      </>
   </Router>
  )
}

export default App
