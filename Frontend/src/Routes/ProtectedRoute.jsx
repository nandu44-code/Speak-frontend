import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const UserProtectedRoute = ({ children, }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null); 

  const token = localStorage.getItem('accessToken');
  console.log(token,"tpelm")

  useEffect(() => {
    try {
      if (token) {
        const decode = jwtDecode(token);

        console.log(decode,"decode")

        setRole(decode.is_student);

        if (decode.is_student!== true) {
          navigate('/');
        }
      } else {
        navigate('/login');
      }

    } catch (error) {
      console.error('Error decoding token:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }, [token, navigate,]);


  if (loading) {
    return <p>Loading...</p>; 
  }

  if (role == true) {
    return <>{children}</>;
  }

  return <p>You do not have the required role to access this page.</p>; 
}

export default UserProtectedRoute