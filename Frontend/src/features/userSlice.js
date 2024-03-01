import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import api from "../services/Axios";
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Register = createAsyncThunk("register", async (credentials) => {
  try {
    const response = await api.post("/register/", credentials);
    return response.data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
});

export const Login = createAsyncThunk("login", async (credentials) => {
  console.log("its working here aswell");
  try {
    const response = await api.post("login/", credentials);
    console.log(response);
    const accessToken = response.data.access;
    localStorage.setItem("accessToken", accessToken);
    if (response.status === 200) {
      Swal.fire({
        background: "#fff",
        icon: "success",
        title: "Login Successful!",
        text: "Welcome!!",
      });
    }
  } catch (error) {
    console.error("error", error);
    toast.error(error)
    throw error;
  }
});

export const getMyProfile = createAsyncThunk("get_my_profile", async (id) => {
  try {
    console.log("its coming here as well");
    const request = await api.get(`users/${id}/`);
    const response = request.data;
    console.log(response);
    console.log("profile details calls are gone successfully");
    if (request.status === 200) {
      console.log("everything is perfect");
      return response;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
});

export const changeUserName = createAsyncThunk(
  "change_username",
  async (credentials) => {
    try {
      const request = await api.put(`users/${credentials.id}/`,credentials);
      if (request.status === 200) {
        console.log("everything is perfect");
        return request.data;
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }
);

export const changeProfileImage = createAsyncThunk(
  "change_profileImage",
  async(credentials) =>{
    try{
      const request = await api.patch(`users/${credentials.id}/`,credentials);
      if(request.status == 200){
        console.log('profile updated successfully')
        return request.data
      }
    }catch(error) {
      console.log("Error:",error)
    }
  }
);

export const tutorchecklist = createAsyncThunk(
  "Tutor_checklist",
  async(credentials) =>{
    console.log(credentials)
    try{
      const request = await api.post("tutor/register/",credentials);
      if(request.status == 200){
        console.log('tutor profile completed')

      }
    }catch(error){
      console.log(error)
    }
  }
);

export const getUsers = createAsyncThunk(
  "get_users",
  async() =>{
    try{
      const request = await api.get("users/")
      if(request.status == 200){
        console.log("fetched all the users")
      }
    }catch(error){
      console.log("Error:",error)
    }
  }
)

export const getTutors = createAsyncThunk(
  "getTutors",
  async() =>{
    try{
      const request = await api.get("users/")
      const response = request.data
      if(request.status == 200){
        console.log("fetched all the tutors")
        console.log(response)
        const data = response.filter((item) => item.is_tutor)
        console.log(data)
        return data
      }
    }catch(error){
      console.log("Error:",error)
    }
  }
)



const initialState = {
  msg: "",
  user: null,
  is_authenticated: false,
  token: "",
  loading: false,
  error: "",
  data:[],
  tutor:[]
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser(state){
      state.user=null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(Register.pending, (state) => {
        state.loading = true;
      })
      .addCase(Register.fulfilled, (state, action) => {
        state.loading = false;
        console.log("API Response Data:", action.payload);
        if (action.payload) {
          Swal.fire({
            background: "#fff",
            icon: "success",
            title: "Account Created!",
            text: "Your account has been created!!",
          });
        }
      })
      .addCase(Register.rejected, (state) => {
        state.loading = false;
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong! Try again",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      });

    builder
      .addCase(Login.pending, (state) => {
        state.loading = true;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.loading = false;
        state.is_authenticated = true;
        console.log("API Response Data:", action.payload);
      })
      .addCase(Login.rejected, (state) => {
        state.loading = false;
        Swal.fire({
          background: "#fff",
          icon: "error",
          title: "Enter valid credentials",
          text: "Try again",
        });
      });

    builder
      .addCase(getMyProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        toast.success('welcome to your profile')
      })
      .addCase(getMyProfile.rejected, (state) => {
        state.loading = false;
        Swal.fire({
          background: "#fff",
          icon: "error",
          title: "oops, something went wrong",
          text: "Try again",
        });
      });

	  builder
      .addCase(changeUserName.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeUserName.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        toast.success('username changed successfully')
      })
      .addCase(changeUserName.rejected, (state) => {
        state.loading = false;
        toast.error("something went wrong")
      });

    builder
      .addCase(tutorchecklist.pending, (state) => {
        state.loading = true;
      })
      .addCase(tutorchecklist.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        toast.success('successfully submitted')
      })
      .addCase(tutorchecklist.rejected, (state) => {
        state.loading = false;
        toast.error("something went wrong")
      });

    builder
      .addCase(getTutors.pending, (state) => {
        state.loading = true;
        
      })
      .addCase(getTutors.fulfilled, (state, action) => {
        state.loading = false;
        state.tutor=action.payload
        console.log(action.payload)
        
      })
      .addCase(getTutors.rejected, (state) => {
        state.loading = false;
        
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
