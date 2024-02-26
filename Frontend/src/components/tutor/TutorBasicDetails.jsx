import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import imageSrc from "../../assets/images/profileuser.jpg";
import { changeProfileImage,getMyProfile } from "../../features/userSlice";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import { app, firebaseStore } from "../../services/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {v4 as uuidv4} from 'uuid';

function TutorBasicDetails() {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [selfIntro, setSelfIntro] = useState("");
  const [teachingStyle, setTeachingStyle] = useState("");
  const [profileImage,setProfileImage] = useState(null)

  const countryRegex = "^[a-zA-Z]+$";

  const userprofile = useSelector((state) => state.user.user);

  const dispatch = useDispatch()
  const formSubmit = (e) => {
    e.preventDefault();
    if (country.split(" ").join(" ") == "") {
      toast.error("country should not be empty");
    } else if (state.split(" ").join("") == "") {
      toast.error("state should not be empty");
    } else if (selfIntro.split(" ").join("") == "" || selfIntro.length <= 400) {
      toast.error(
        "self introduction should not be empty and should contain atleast 100 words"
      );
    } else if (
      teachingStyle.split(" ").join("") == "" ||
      teachingStyle.length <= 200
    ) {
      toast.error(
        "teaching style shoule not be empty and should contain atlest 50 words"
      );
    }
  };
  const token = localStorage.getItem("accessToken");
  const access = jwtDecode(token);

  useEffect(() => {
    dispatch(getMyProfile(access.user));
  }, []);

  useEffect(()=>{
    if (profileImage !== null){
        console.log("profile image selcted successfully")
        uploadImage()
    }
  },[profileImage])

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
}
  return (
    <div>
      <div>
        <p className="font-medium mt-4 font-mono text-meium text-red-800">
          "Your tutor profile is your chance to market yourself to students on
          speakiko. You can make edit changes on your profile later. New
          students may browse tutor profiles to find a tutor that fits their
          learning goals personally."
        </p>

        <div className="mt-20">
          <input type="file" id="fileInput" className="hidden"  onChange={(e)=>{setProfileImage(e.target.files[0])}}/>

          <label htmlFor="fileInput">
            <img
              src={ userprofile && userprofile.profile_image
                ? userprofile.profile_image
                : imageSrc}
              alt="no image"
              className="mx-auto rounded-full w-32 h-32 mb-4 cursor-pointer hover:scale-125 transition duration-500"
              
            />
          </label>
        </div>
      </div>
      <form className="w-full" onSubmit={formSubmit}>
        <div className="flex  flex-col w-1/4 justify-center ml-96">
          {/* <select onChange={""} className="mt-10 mr-10">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        <select onChange={""} className="mt-10 mr-10">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select> */}
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

          <input type="file" id="fileInput" className="hidden" />

          <label htmlFor="fileInput">
            <video
              width="640"
              height="360"
              controls
              src=""
              alt=""
              className="mx-auto rounded-full w-32 h-32 mb-4 cursor-pointer hover:scale-125 transition duration-500"
            ></video>
          </label>

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

          {/* <select onChange={""} className="mt-10 mr-10">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select> */}
          <div>
            <input type="file" id="fileInput" className="hidden" />

            <label htmlFor="fileInput">
              <img
                src={imageSrc}
                alt="no image"
                className="mx-auto rounded-full w-32 h-32 mb-4 cursor-pointer hover:scale-125 transition duration-500"
              />
            </label>
          </div>
          <button
            className="bg-sky-800 p-2 rounded-md hover:bg-sky-900 text-white font-medium hover:scale-110 duration-500 mb-96"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}


export default TutorBasicDetails;
