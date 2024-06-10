import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const UserProtectedRoute = ({ children, requiredRole }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  const token = localStorage.getItem('accessToken');
  console.log(token, "token");

  useEffect(() => {
    try {
      if (token) {
        const decode = jwtDecode(token);

        console.log(decode, "decode");

        // Assuming the token contains user roles
        if (decode.is_superuser) {
          setRole('admin');
        } else if (decode.is_student) {
          setRole('student');
        } else if (decode.is_tutor) {
          setRole('tutor');
        } else {
          setRole('unknown');
          navigate('/');
        }

        const currentTime = Date.now() / 1000;
        if (decode.exp < currentTime) {
          console.warn('Token has expired');
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          navigate('/login');
        } else {
          setLoading(false);
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      navigate('/login');
    }
  }, [token, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (role === requiredRole) {
    return <>{children}</>;
  }

  return <>
  <div className='w-full h-screen flex justify-center items-center'>

      <p className='font-normal text-xl'>Sorry ,You do not have the required role to access this page.</p>;
        
  </div>
  </>
};

export default UserProtectedRoute;
