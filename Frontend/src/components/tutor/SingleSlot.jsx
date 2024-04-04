import React from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import api from "../../services/Axios";
import { jwtDecode } from "jwt-decode";


const SingleSlot = ({ key,id, startDate, startTime, endTime, onDelete }) => {
  const slot_id = id
  console.log(key)
  const  token =localStorage.getItem('accessToken')
  const access = jwtDecode(token)
  const user_id = access.user

  const handleDelete = () => {
    onDelete();
  };

  const handleBooking = async () => {
    // const token = localStorage.getItem("accessToken");
    // const access = jwtDecode(token);
    // const credentials = {
    //   slot: key,
    //   user: access.user,
    // };
    // try {
    //   const response = await api.post("slot/bookings/", credentials);
    //   if (response.data.status) {
    //     if (response.data.status === 200) {
    //       console.log("slot booked");
    //     } else {
    //       console.log("something went wrong");
    //     }
    //   }
    // } catch (error) {
    //   console.error("Error booking slot:", error);
    // }
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
      <div className="border w-1/2 border-gray-300 rounded-lg p-4 mb-4 flex justify-between items-center duration-1000 hover:bg-stone-200 hover:cursor-pointer">
        <div>
          <p className="text-Indigo-800 font-bold">Date: {startDate}</p>
          <p className="text-blue-700 font-semibold">Start Time: {startTime}</p>
          <p className="text-red-700 font-semibold">End Time: {endTime}</p>
        </div>
        {location.pathname === "/tutor/viewslot/" ? (
          <button
            onClick={handleDelete}
            className="border-2 border-red-500 text-red-900 px-4 py-2 rounded-md hover:bg-red-400 hover:text-white hover:cursor-pointer"
          >
            Delete
          </button>
        ) : (
          <button
            className="border-2 border-red-500 text-red-900 px-4 py-2 rounded-md hover:bg-red-600 hover:text-white hover:cursor-pointer"
            onClick={handleBooking}
          >
            Book
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleSlot;
