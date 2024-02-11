import { useState } from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import './App.css';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';


function App() {
  
  return (
   <Router>
      <>  
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='register/' element={<SignUpPage/>} />
        </Routes>
      </>
   </Router>
  )
}

export default App
