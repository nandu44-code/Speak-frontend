import React from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import api from "../../services/Axios";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const SingleSlot = ({ key,id, startDate, startTime, endTime, onDelete,is_booked }) => {
  const slot_id = id
  console.log(key)
  console.log(is_booked,'is_booked')
  const  token =localStorage.getItem('accessToken')
  const access = jwtDecode(token)
  const user_id = access.user
  const navigate = useNavigate()
  const handleDelete = () => {
    onDelete();
  };

const handleWalletBooking = async () => {
    const token = localStorage.getItem('accessToken');
    const access = jwtDecode(token);
    const user_id = access.user;
  
    try {
      const response = await api.get(`user-wallet/${user_id}/`);
      console.log(response);
  
      if (response.data.balance >= 2500) {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Pay using Wallet",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const credentials = {
                slot: slot_id,
                booked_by: user_id,
                amount: 2500,
                status :'pending',
              };
              const response = await api.post(`slot/bookings/create/`, credentials);
              if (response.status === 201 ){
                navigate('/student/paymentSuccess/')
              }
            } catch (error) {
              console.error("Error creating booking:", error);
             
            }
          }
        });
      } else {
        Swal.fire(
          "Cancelled!",
          "Your booking has been cancelled.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error fetching user wallet:", error);
      // Handle error while fetching user wallet
    }
  };
  

  const handleBooking = async () => {
    
    const stripePromise = loadStripe(
      "pk_test_51OzPCTSBJxztjkDCY7itY03YR8Q8GJPZc0YHDlPuppVnH9p5Cdi0XSxBxF2ed9Udpt4C2zxGfgIHadmmY4eyqtHq006TvM57pG"
    );
      
    const stripe = await stripePromise
    try {
      const sessionId = await createCheckoutSession();
      if (sessionId) {
          stripe.redirectToCheckout({
              sessionId: sessionId
          });
      } else {
          console.error('Failed to create Checkout Session');
      }
  } catch (error) {
      console.error('Error:', error);
  }
  };

  const createCheckoutSession = async () => {
    try {
      const credentials ={
        slot:slot_id,
        booked_by:user_id
      }
      console.log(credentials)
      const response = await api.post("payments/create-checkout-session/", credentials);
      return response.data.id;
    } catch (error){
      console.log("error",error);
      return null;
    }
  };

  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className="flex justify-center items-center">
      <div className="border w-3/4 border-gray-300 rounded-lg p-4 mb-4 flex justify-between items-center duration-1000 hover:bg-stone-200 hover:cursor-pointer">
        <div>
          <p className="text-Indigo-800 font-bold">Date: {startDate}</p>
          <p className="text-blue-700 font-semibold">Start Time: {startTime}</p>
          <p className="text-red-700 font-semibold">End Time: {endTime}</p>
        </div>
        {location.pathname === "/tutor/viewslot/" ? (
          is_booked ? (
            <button
              className="border-2 border-gray-400 text-gray-900 px-4 py-2 rounded-md cursor-not-allowed"
              disabled={true}
            >
              Booked
            </button>
          ) : (
            <button
              onClick={handleDelete}
              className="border-2 border-red-500 text-red-900 px-4 py-2 rounded-md hover:bg-red-600 hover:text-white hover:cursor-pointer"
            >
              Delete
            </button>
          )
        ) : (
          <div className='flex flex-row'>
          <button
            className={`border-2 border-red-500 text-red-900 px-4 py-2 mx-2 rounded-md ${
              is_booked ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-red-600 hover:text-white hover:cursor-pointer'
            }`}
            onClick={is_booked ? null : handleBooking}
            disabled={is_booked}
          >
            {is_booked ? "Booked" : "Pay with Stripe"}
          </button>
    
          {!is_booked && <button className="bg-blue-700 text-white px-4 py-2 rounded-md" onClick={()=>handleWalletBooking(id)}>Pay with wallet</button>}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default SingleSlot;
