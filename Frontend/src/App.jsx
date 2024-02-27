import { useState } from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import './App.css';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage'
import AdminHomePage from './pages/AdminHomePage';
import StudentHomePage from './pages/StudentHomePage';
import StudentProfile from './pages/StudentProfile';
import TutorCheklistPage from './pages/TutorCheklistPage';
import AdminUsersPage from './pages/AdminUsersPage';
import TutorProcessingPage from './pages/TutorProcessingPage';

function App() {
  
  return (
   <Router>
      <>  
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='register/' element={<SignUpPage/>} />
          <Route path='/login/' element={<LoginPage/>} />
          <Route path='/admin/' element={<AdminHomePage/>}/>
          <Route path='/student/home/' element={<StudentHomePage/>}/>
          <Route path='/tutor/home/' element={<StudentHomePage/>}/>
          <Route path='/student/profile/' element={<StudentProfile/>}/> 
          <Route path='/tutor/checklist/' element={<TutorCheklistPage/>}/> 
          <Route path='/admin/users' element={<AdminUsersPage/>}/>
          <Route path='/tutor/checklist/processing' element={<TutorProcessingPage/>}/>
        </Routes>
      </>
   </Router>
  )
}

export default App
