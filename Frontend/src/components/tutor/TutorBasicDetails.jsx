import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import imageSrc from "../../assets/images/profileuser.jpg";
import {
  changeProfileImage,
  getMyProfile,
  tutorchecklist,
  getTutorProfile,
} from "../../features/userSlice";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { TailSpin } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import { app, firebaseStore } from "../../services/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

function TutorBasicDetails() {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [selfIntro, setSelfIntro] = useState("");
  const [teachingStyle, setTeachingStyle] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [selectedAccent, setSelectedAccent] = useState("");
  const [selfIntroVideo, setSelfIntroVideo] = useState(null);
  const [certificates, setCertificates] = useState(null);
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [demo,setDemo] = useState('')


  const preferencesList = [
    "No proficiency",
    "Low proficiency",
    "Intermediate proficiency",
    "Upper Intermediate proficiency",
    "High proficiency",
  ];
  let loading = useSelector((state) => state.user.loading);

  const countryRegex = "^[a-zA-Z]+$";

  const userprofile = useSelector((state) => state.user.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("accessToken");
  const access = jwtDecode(token);

  const handleAccent = (e) => {
    setSelectedAccent(e.target.value);
    console.log(e.target.value);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (country.split(" ").join(" ") == "") {
      toast.error("country should not be empty");
    } else if (state.split(" ").join("") == "") {
      toast.error("state should not be empty");
    } else if (selectedAccent == "None") {
      toast.error("accent should not be none ");
    } else if (selfIntro.split(" ").join("") == "") {
      toast.error("self introduction should not be empty.");
    } else if (teachingStyle.split(" ").join("") == "") {
      toast.error("teaching style should not be empty.");
    } else if (certificates === null) {
      toast.error("add relevant certificate");
    } else if(selectedPreferences.length == 0){
          toast.error("choose atleast one preference")
    }else {
      // loading = true
      // const uuid = uuidv4();

      const storageRef = ref(firebaseStore);
      const imageRef = ref(
        storageRef,
        `certificates/${certificates.name}`
      );
      uploadBytes(imageRef, profileImage).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          // setImageUrl(url);
          tutorChecklist(url);
          toast.success("certificates uploaded successfully");
          // getMyProfile(access.user)
          // loading = false
        });
      });
    }

    const tutorChecklist = async (url) => {
      const credentials = {
        state: state,
        country: country,
        introduction_description: selfIntro,
        teaching_style: teachingStyle,
        dialect: selectedAccent,
        student_preferences:selectedPreferences,
        certificates: url,
        user: access.user,
      };
      console.log(credentials);
      const resultAction = await dispatch(tutorchecklist(credentials));
      const originalPromiseResult = unwrapResult(resultAction);
      navigate("/tutor/checklist/processing");
    };
  };

  useEffect(() => {
    dispatch(getTutorProfile(access.user));
  }, []);

  useEffect(() => {
    dispatch(getTutorProfile(access.user));
  }, [demo]);

  useEffect(() => {
    if (profileImage !== null) {
      console.log("profile image selcted successfully");
      uploadImage();
    }
  }, [profileImage]);

  const uploadImage = () => {
    if (profileImage == null) {
      toast.error("Image is not selected");
      return;
    }
    console.log("its entering here");
    // const uuid = uuidv4();

    const storageRef = ref(firebaseStore);
    const imageRef = ref(storageRef, `images/${profileImage.name}_${access.user}`);

    uploadBytes(imageRef, profileImage)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            // setImageUrl(url);
            updateImage(url); // Pass the URL to updateImage function
            toast.success("Image uploaded successfully");
            console.log("firebase uploaded url", url);
            setDemo(true)
            // getMyProfile(access.user)
          })
          .catch((error) => {
            console.log("Error retrieving URL:", error);
            toast.error("Error retrieving image URL");
          });
      })
      .catch((error) => {
        console.log("Error uploading image:", error);
        toast.error("Image upload failed");
      });
  };

  const updateImage = async (url) => {
    console.log("its updated userImage");
    const credentials = {
      id: access.user,
      //   username: userprofile.username,
      //   email: userprofile.email,
      // "password": userprofile.password,
      profile_image: url, // Use the URL passed as an argument
    };
    await dispatch(changeProfileImage(credentials));
  };

  const handlePreferenceClick = (preference) => {
    
    const newSelectedPreferences = [...selectedPreferences];
    const index = newSelectedPreferences.indexOf(preference);
    if (index > -1) {
      newSelectedPreferences.splice(index, 1); // Remove preference if already selected
    } else {
      newSelectedPreferences.push(preference); // Add preference if not selected
    }
    setSelectedPreferences(newSelectedPreferences);
  }
  return (
    <div>
      <div className="mt-20 w-full ml-36">
        <div className="w-1/4 ml-96">
          <h1 className="text-xl mb-10 font-normal text-gray-500">
            Profile image
          </h1>
          <input
            type="file"
            id="fileInput"
            className="hidden cursor-pointer"
            onChange={(e) => {
              setProfileImage(e.target.files[0]);
            }}
          />

          <label htmlFor="fileInput">
            {loading ? (
              // Render loader while image is loading
              <div className="mx-auto rounded-full w-32 h-32 mb-4">
                <TailSpin />
              </div>
            ) : (
              // Render the image when it is loaded
              <img
                src={
                  userprofile && userprofile.profile_image
                    ? userprofile.profile_image
                    : imageSrc
                }
                className="mx-auto rounded-full w-32 h-32 mb-4 cursor-pointer hover:scale-125 transition duration-500"
              />
            )}

            {userprofile && userprofile.profile_image ? (
              <h1
                className="mb-10 text-indigo-700 font-bold cursor-pointer hover:text-red-900 hover:font-bold hover:shadow-red"
                htmlFor="fileInput"
              >
                Edit
              </h1>
            ) : (
              <h1 className="mb-10">Choose a profile picture</h1>
            )}
          </label>
        </div>
      </div>
      <form className="w-full" onSubmit={formSubmit}>
        <div className="flex  flex-col w-1/2 justify-center ml-96">
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:border-2 mb-4"
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
          />

          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:border-2 mb-4"
            placeholder="state"
            onChange={(e) => setState(e.target.value)}
          />

          <div className="preferences-container">
            <h2 className="text-lg mb-4">Select Student Preferences</h2>
            <div className="tabs flex flex-wrap">
              {preferencesList.map((preference) => (
                <div
                  key={preference}
                  className={`mx-4 text-white px-4 py-2 rounded-md my-4 cursor-pointer  ${selectedPreferences.includes(preference)
                      ? "bg-sky-950 text-white"
                      : "bg-sky-800 text-white"
                  }`} onClick={()=>handlePreferenceClick(preference)}
                >
                  {preference}
                </div>
              ))}
            </div>
          </div>

          <select
            name="englishAccent"
            id="englishAccent"
            value={selectedAccent}
            onChange={handleAccent}
            className="px-2 py-2 border-2 border-gray-200 my-2 rounded-md"
          >
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
          <textarea
            className="w-full px-3 py-2 border mb-4 rounded-md focus:outline-none focus:border-blue-500 focus:border-2"
            placeholder="self introduction.  (self intro should atlest contain 100 words.) "
            onChange={(e) => setSelfIntro(e.target.value)}
          />

          <textarea
            className="w-full px-3 py-2 border mb-4 rounded-md focus:outline-none focus:border-blue-500 focus:border-2"
            placeholder="Teaching style"
            onChange={(e) => setTeachingStyle(e.target.value)}
          />

          <div className="m-10 flex">
            <label className="text-gray-700 mr-10 font-medium">
              Certificates:
            </label>
            <input
              type="file"
              id="fileInput"
              onChange={(e) => {
                setCertificates(e.target.files[0]);
              }}
            />
          </div>
          {loading ? (
            <button
              className="bg-sky-400 p-2 rounded-md hover:bg-sky-900 text-white font-medium hover:scale-110 duration-500 mb-96"
              type="submit"
            >
              Submiting..
            </button>
          ) : (
            <button className="bg-sky-800 p-2 rounded-md hover:bg-sky-900 text-white font-medium duration-500 mb-96">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TutorBasicDetails;
