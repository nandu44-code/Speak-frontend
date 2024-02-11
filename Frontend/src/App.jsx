import { useState } from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import './App.css';
import LandingPage from './pages/LandingPage';

function App() {
  const [count, setCount] = useState(0)

  return (
   <Router>
      <>  
      <Routes>
        <Route path='/' element={<LandingPage/>} />
      </Routes>
    </>
   </Router>
  )
}

export default App
