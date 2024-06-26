import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getMyProfile,
  changeUserName,
  changeProfileImage,
} from "../../features/userSlice";
import { jwtDecode } from "jwt-decode";
import Navbar from "../../components/Navbar";
import imageSrc from "../../assets/images/profileuser.jpg";
import StudentprofileSidebar from "../../components/StudentProfileSidebar";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import { app, firebaseStore } from "../../services/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import api from "../../services/Axios";

function StudentProfile() {
  const dispatch = useDispatch();
  const userprofile = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);

  const [isUploadButton, setIsUploadButton] = useState(false);
  const [username, setUsername] = useState(
    userprofile ? userprofile.username : ""
  );
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const uploadButton = () => {
    setIsUploadButton(true);
  };

  const token = localStorage.getItem("accessToken");
  const access = jwtDecode(token);

  useEffect(() => {
    dispatch(getMyProfile(access.user));
  }, []);

  const updateUsername = async () => {
    console.log("its updated username");

    if (username.trim() === "") {
      toast.error("Username should not be empty");
      return;
    } else if (username.length <= 3) {
      toast.error("Username should contain at least 4 characters");
      return;
    } else if (username === userprofile.username) {
      toast.error("No changes detected");
      return;
    }

    const credentials = {
      id: access.user,
      username: username,
      email: userprofile.email,
      password: userprofile.password,
    };

    await dispatch(changeUserName(credentials));
  };

  useEffect(() => {
    if (imageUpload !== null) {
      uploadImage();
    }
  }, [imageUpload]);

  const uploadImage = () => {
    if (imageUpload == null) {
      toast.error("Image is not selected");
      return;
    }
    console.log("image here")
    const storageRef = ref(firebaseStore);
    const imageRef = ref(storageRef, `images/${imageUpload.name}`);

    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            setImageUrl(url);
            updateImage(url); 
            toast.success("Image uploaded successfully");
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
      username: userprofile.username,
      email: userprofile.email,
      profile_image: url, 
    };

    try{
      const request = await api.patch(`users/${credentials.id}/`, credentials);
      if (request.status == 200) {
        console.log("profile updated successfully");
        return request.data;
      }
    } catch (error) {
      console.log("Error:", error);
    }

    }
  
  return (
    <>
      <Navbar />
      <div className="flex">
        <StudentprofileSidebar />
        <div className="ml-72 mt-20 pt-28">
          <div className="max-w-md mx-auto bg-white shadow-stone-950 rounded-md border-2 px-8 pt-6 pb-8 mb-4 text-center relative ">
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={(e) => {
                setImageUpload(e.target.files[0]);
              }}
            />

            <label htmlFor="fileInput">
              {loading ? (
                // Render loader while image is loading
                <div className="mx-auto rounded-full w-32 h-32 mb-4">
                  <TailSpin />
                </div>
              ) : (
                
                <img
                  src={
                    userprofile && userprofile.profile_image
                      ? userprofile.profile_image
                      : imageSrc
                  }
                  alt="no image"
                  className="mx-auto rounded-full w-32 h-32 mb-4 cursor-pointer hover:scale-125 transition duration-500"
                />
              )}
            </label>
            
            <div className="flex flex-row">
              <lablel className="font-bold text-gray-600 mr-8">Username : </lablel>
              <input
                className="text-md text-purple-800 font-bold mb-2 rounded-lg border border-gray-300 focus:border-blue-500 px-3 py-2"
                defaultValue={userprofile && userprofile.username}
                onFocus={uploadButton}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-row">
              <lablel className="font-bold text-gray-600 mr-8">First Name: </lablel>
              <input
                className="text-md text-purple-800 font-bold mb-2 rounded-lg border border-gray-300 focus:border-blue-500 px-3 py-2"
                defaultValue={userprofile && userprofile.first_name}
                disabled
              />
            </div>

           <div className="flex flex-row">
              <lablel className="font-bold text-gray-600 mr-8">Last Name: </lablel>
              <input
                className="text-md text-purple-800 font-bold mb-2 rounded-lg border border-gray-300 focus:border-blue-500 px-3 py-2"
                defaultValue={userprofile && userprofile.last_name}
                disabled

              />
            </div>

            <div className="flex justify-end">
              {/* <lablel className="font-bold text-gray-600 mr-16">Email: </lablel> */}
              <input
                className="text-md text-purple-800 font-bold mb-2 rounded-lg border border-gray-300 focus:border-blue-500 px-3 py-2"
                defaultValue={userprofile && userprofile.email}
                disabled
              />
            </div>
            <div className="mt-5">
              {isUploadButton && (
                <button
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                  onClick={updateUsername}
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-500 bg-white dark:bg-indigo-900 rounded-md group-hover:bg-opacity-0">
                    Update
                  </span>
                </button>
              )}
            </div>
            <h5 className="font-medium text-gray-500">Joined on </h5>
            <p className="font-thin text-xs font-mono mt-1 text-red-500">
              {userprofile && userprofile.date_joined}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentProfile;
