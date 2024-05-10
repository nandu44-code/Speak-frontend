import React, { useState, useEffect } from "react";
import api from "../../services/Axios";
import { useNavigate } from "react-router-dom";
import TutorCard from "../../components/TutorCard";
import Navbar from "../../components/Navbar";
import { TailSpin } from "react-loader-spinner";

function FindTutorsPage() {
  const [tutors, setTutors] = useState([]);
  const [id, setId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState();
  const [option,setOption] = useState()

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const response = await api.get("tutors/");
        if (response.status === 200) {
          console.log("Fetched all the users");
          console.log(response.data);
          setTutors(response.data);
          setLoading(false)
        }
      } catch (error) {
        console.log("Error:", error);
        setLoading(false)
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (id != null) {
      navigate(`/student/TutorDetails/${id}`);
      console.log("object");
    }
  }, [id]);

//  const filterTutors = async(e) =>{

//   setOption(e.target.value)
//   console.log(e.target.value)
//   setLoading(true)
//   const response = api.get(`tutor-filter/?search=${e.target.value}`);
//   console.log(response.data.results)
//   setTutors(response.data.results)
//   setLoading(false)

//  }
   
  const searchTutors = async (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    try {
      setLoading(true);
      if (searchTerm.trim() !== "") {
        const response = await api.get(`tutor-search/?search=${searchTerm}`);
        print(searchTerm)
        setTutors(response.data.results);
      } else {
        try {
          const response = await api.get("/tutors/");
          if (response.status === 200) {
            console.log("Fetched all the users");
            console.log(response.data);
            setTutors(response.data);
          }
        } catch (error) {
          console.log("Error:", error);
        }
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <p className="font-bold text-2xl text-indigo-900 mt-10 select-none">
        Find a Tutor
      </p>
      <input
        type="search"
        placeholder="Search..."
        className="rounded-lg 2xl:w-96 w-56 b-2 border-indigo-800 placeholder-indigo-950 placeholder:font-bold px-4 py-2 my-20 focus:bg-indigo-300 focus:text-white focus-within:text-white bg-stone-200"
        onChange={searchTutors}
        value={searchTerm}
      />
      <button className="bg-indigo-800 text-white px-4 py-2 rounded-md">
        Search
      </button>
      {/* <div className="w-full">
      <label className="font-bold text-lg text-indigo-800 px-4">Filter by:</label>
      <select name="englishAccent" id="englishAccent" value={option} onChange={filterTutors} className="px-2 py-2 border-2 border-gray-200 my-2 rounded-md">
            <option value="None">None</option>
            <option value="british">British</option>
            <option value="american">American</option>
            <option value="australian">Australian</option>
            <option value="canadian">Canadian</option>
            <option value="indian">Indian</option>
            <option value="southafrican">South African</option>
            <option value="irish">Irish</option>
            <option value="newzealand">New Zealand</option>
            <option value="singaporean">Singaporean</option>
            <option value="caribbean">Caribbean</option>
        </select>
      </div> */}
      {loading ? (
        <div className="flex justify-center items-center mt-60">
          <TailSpin className="h-16 w-16 text-indigo-600" />
        </div>
      ) : tutors && tutors.length > 0 ? (
        <div className="flex flex-wrap justify-center items-center sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
          {tutors.map((user) => (
            <TutorCard
              key={user.id}
              name={user.username}
              state={user.tutor.state}
              country={user.tutor.country}
              imageUrl={user.profile_image}
              onDetail={() => setId(user.id)}
            />
          ))}
        </div>
      ) : (
        <p className="font-bold text-red-600 text-md">No results found</p>
      )}
    </>
  );
}

export default FindTutorsPage;
