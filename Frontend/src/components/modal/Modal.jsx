import React,{useState} from "react";
import { CloudFog, X } from "lucide-react";

function Modal({ onClose }) {

    const [email,setEmail] = useState('')
    const [error,setError] = useState('')
    const handle_change = (e) =>{
        setEmail(e.target.value)
        console.log(e.target.value)
    }
    
  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-stone-200 w-1/2 rounded-xl">
        <div className="flex justify-end">
          <button onClick={onClose} className="hover:scale-125 duration-500 rounded-full bg-gray-100">
            <X />
          </button>
        </div>
        <p className="my-4 text-lg font-semibold text-gray-600">Do you really forget your password?</p>
        <p className="my-4 text-md font-norma text-indigo-950">If so Enter your email address to verify</p>
        <form className="flex flex-col items-center gap-3">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={handle_change}
            className="w-3/4 px-4 py-3 border-2 border-blue-500 rounded-md "
            required
          />
          <button className="mb-4 bg-indigo-800 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
