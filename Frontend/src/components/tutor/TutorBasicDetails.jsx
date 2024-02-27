import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import imageSrc from "../../assets/images/profileuser.jpg";
import {
  changeProfileImage,
  getMyProfile,
  tutorchecklist,
} from "../../features/userSlice";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import { app, firebaseStore } from "../../services/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

function TutorBasicDetails() {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [selfIntro, setSelfIntro] = useState("");
  const [teachingStyle, setTeachingStyle] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [selfIntroVideo, setSelfIntroVideo] = useState(null);
  const [certificates, setCertificates] = useState(null);
  const loading = useSelector((state)=> state.user.loading)

  const countryRegex = "^[a-zA-Z]+$";

  const userprofile = useSelector((state) => state.user.user);

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const token = localStorage.getItem("accessToken");
  const access = jwtDecode(token);

  const formSubmit = (e) => {
    e.preventDefault();
    if (country.split(" ").join(" ") == "") {
      toast.error("country should not be empty");
    } else if (state.split(" ").join("") == "") {
      toast.error("state should not be empty");
    } else if (selfIntro.split(" ").join("") == "" ){
      toast.error(
        "self introduction should not be empty."
      );
    } else if (
      teachingStyle.split(" ").join("") == ""
    ) {
      toast.error(
        "teaching style should not be empty."
      );
    } else if (certificates === null) {
      toast.error("add relevant certificate");
    } else {
      const uuid = uuidv4();

      const storageRef = ref(firebaseStore);
      const imageRef = ref(
        storageRef,
        `certificates/${certificates.name}_${uuid}`
      );
      uploadBytes(imageRef, profileImage).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          // setImageUrl(url);
          tutorChecklist(url);
          toast.success("certificates uploaded successfully");
          // getMyProfile(access.user)
        });
      });
    }

    
    const tutorChecklist = async (url) => {
      const credentials = {
       
        state: state,
        country: country,
        introduction_description: selfIntro,
        teaching_style: teachingStyle,
        certificates: url,
        user: access.user
      };
      console.log(credentials);
      await dispatch(tutorchecklist(credentials));
      navigate('/tutor/checklist/processing')

    };
  };

  useEffect(() => {
    dispatch(getMyProfile(access.user));
  }, []);

  useEffect(() => {
    if (profileImage !== null) {
      console.log("profile image selcted successfully");
      uploadImage();
    }
  }, [profileImage]);

  // useEffect(() => {
  //   if (certificates !== null) {
  //     console.log("profile image selcted successfully");
  //     uploadImage();
  //   }
  // }, [certificates]);

  const uploadImage = () => {
    if (profileImage == null) {
      toast.error("Image is not selected");
      return;
    }
    const uuid = uuidv4();

    const storageRef = ref(firebaseStore);
    const imageRef = ref(storageRef, `images/${profileImage.name}_${uuid}`);

    uploadBytes(imageRef, profileImage)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            // setImageUrl(url);
            updateImage(url); // Pass the URL to updateImage function
            toast.success("Image uploaded successfully");
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
            <img
              src={
                userprofile && userprofile.profile_image
                  ? userprofile.profile_image
                  : imageSrc
              }
              alt="no image"
              className="mx-auto rounded-full w-40 h-40 mb-4 cursor-pointer hover:scale-110 transition duration-500"
            />

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
          {/* <label htmlFor="fileInput" className="block mt-10 mb-10 text-indigo-500 cursor-pointer">
           Upload your self introduction 
          </label>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            placeholder="your self introduction video"
            onChange={(e) => {
              setSelfIntroVideo(e.target.files[0]);
            }}
          /> */}

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
              Certificates(*optional):
            </label>
            <input
              type="file"
              id="fileInput"
              onChange={(e) => {
                setCertificates(e.target.files[0]);
              }}
            />
          </div>
          {loading?
          <button
            className="bg-sky-400 p-2 rounded-md hover:bg-sky-900 text-white font-medium hover:scale-110 duration-500 mb-96"
            type="submit"
          >
            Submiting..
          </button>
          :<button
          className="bg-sky-800 p-2 rounded-md hover:bg-sky-900 text-white font-medium hover:scale-110 duration-500 mb-96"
          
        >
          Submit
        </button>}
        </div>
      </form>
    </div>
  );
}

export default TutorBasicDetails;
