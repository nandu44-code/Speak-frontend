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
import WalletPage from './pages/Student/WalletPage';

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
import TutorChatPage from './pages/Tutor/TutorChatPage';

//admin related pages
import AdminHomePage from './pages/Admin/AdminHomePage';
import AdminUsersPage from './pages/Admin/AdminUsersPage';
import AdminRequestsPage from './pages/Admin/AdminRequestsPage';
import RequestDetailsPage from './pages/Admin/RequestDetailsPage';
import AdminTutorsPage from './pages/Admin/AdminTutorsPage';
import TutorDetailsPage from './pages/Admin/TutorDetailsPage';
import AdminBookings from './pages/Admin/AdminBookings';
import UserProtectedRoute from './Routes/ProtectedRoute';
import TutorProfile from './components/tutor/TutorProfile';
import { Wallet } from 'lucide-react';

import Room from './pages/Common/Room';
import ChatPage from './pages/Common/ChatPage';


function App() {
  
  return (



   <Router> 
      <>  
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='register/' element={<SignUpPage/>} />
          <Route path='/login/' element={<LoginPage/>} />
          <Route path='/otp/' element={<OtpPgae/>}/>
          
  {/* Student Routes */}
        <Route path="/student/home/" element={<UserProtectedRoute requiredRole="student"><StudentHomePage/></UserProtectedRoute>} />
        <Route path="/student/profile/" element={<UserProtectedRoute requiredRole="student"><StudentProfile/></UserProtectedRoute>} />
        <Route path="/student/changePassword/" element={<UserProtectedRoute requiredRole="student"><ChangePassPage/></UserProtectedRoute>} />
        <Route path="/student/findTutors/" element={<UserProtectedRoute requiredRole="student"><FindTutorsPage/></UserProtectedRoute>} />
        <Route path="/student/TutorDetails/:id" element={<UserProtectedRoute requiredRole="student"><TutorSideDetailsPage/></UserProtectedRoute>} />
        <Route path="/student/paymentSuccess/" element={<UserProtectedRoute requiredRole="student"><PaymentSuccessPage/></UserProtectedRoute>} />
        <Route path="/student/viewBookings/" element={<UserProtectedRoute requiredRole="student"><ViewBookingsStudent/></UserProtectedRoute>} />
        <Route path="/student/wallet/" element={<UserProtectedRoute requiredRole="student"><WalletPage/></UserProtectedRoute>} />
        
        {/* Tutor Routes */}
        <Route path="/tutor/home/" element={<UserProtectedRoute requiredRole="tutor"><TutorHomePage/></UserProtectedRoute>} />
        <Route path="/tutor/checklist/" element={<UserProtectedRoute requiredRole="tutor"><TutorCheklistPage/></UserProtectedRoute>} />
        <Route path="/tutor/checklist/processing" element={<UserProtectedRoute requiredRole="tutor"><TutorProcessingPage/></UserProtectedRoute>} />
        <Route path="/tutor/rejected/" element={<UserProtectedRoute requiredRole="tutor"><RejectedPage/></UserProtectedRoute>} />
        <Route path="/tutor/createslot/" element={<UserProtectedRoute requiredRole="tutor"><CreateSlotPage/></UserProtectedRoute>} />
        <Route path="/tutor/viewslot/" element={<UserProtectedRoute requiredRole="tutor"><ViewSlotPage/></UserProtectedRoute>} />
        <Route path="/tutor/viewbookings/" element={<UserProtectedRoute requiredRole="tutor"><ViewBookingsPage/></UserProtectedRoute>} />
        <Route path="/tutor/profile/" element={<UserProtectedRoute requiredRole="tutor"><TutorProfile/></UserProtectedRoute>} />
        <Route path="/tutor/chat/" element={<UserProtectedRoute requiredRole="tutor"><TutorChatPage/></UserProtectedRoute>} />

        {/* Admin Routes */}
        <Route path='/admin/users' element={<UserProtectedRoute requiredRole="admin"><AdminUsersPage/></UserProtectedRoute>}/>
        <Route path='/admin/tutors' element={<UserProtectedRoute requiredRole="admin"><AdminTutorsPage/></UserProtectedRoute>}/>
        <Route path='/admin/' element={<UserProtectedRoute requiredRole="admin"><AdminHomePage/></UserProtectedRoute>}/>
        <Route path='/admin/requests' element={<UserProtectedRoute requiredRole="admin"><AdminRequestsPage/></UserProtectedRoute>}/>
        <Route path='/admin/requests/detail/:id' element={<UserProtectedRoute requiredRole="admin"><RequestDetailsPage/></UserProtectedRoute>}/>
        <Route path='/admin/tutors/detail/:id' element={<UserProtectedRoute requiredRole="admin"><TutorDetailsPage/></UserProtectedRoute>}/>
        <Route path='/admin/bookings' element={<UserProtectedRoute requiredRole="admin"><AdminBookings/></UserProtectedRoute>}/>

        {/* common routes for user and tutor*/}
        <Route path='/room/:roomID/' element={<Room/>} />
        <Route path='/chat/' element={<ChatPage/>} />
          
        </Routes>
      </>
   </Router>
  )
}

export default App
