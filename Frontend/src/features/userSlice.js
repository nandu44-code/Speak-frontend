import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import api from "../services/Axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCreativeCommonsNcJp } from "react-icons/fa";

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
    console.log(response.data);
    const accessToken = response.data.access;
    const refreshToken = response.data.refresh;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
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
    toast.error(error);
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


export const getTutorProfile = createAsyncThunk("get_tutor_profile", async (id) => {
  try {
    console.log("its coming here as well");
    const request = await api.get(`tutorlist/${id}/`);
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
      const request = await api.patch(`users/${credentials.id}/`, credentials);
      if (request.status === 200) {
        console.log("everything is perfect");
        console.log(request.data)
        return request.data;
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }
);

export const changeProfileImage = createAsyncThunk(
  "change_profileImage",
  async (credentials) => {
    try {
      const request = await api.patch(`tutorlist/${credentials.id}/`, credentials);
      if (request.status == 200) {
        console.log("profile updated successfully");
        return request.data;
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }
);

export const tutorchecklist = createAsyncThunk(
  "Tutor_checklist",
  async (credentials) => {
    console.log(credentials);
    try {
      const request = await api.post("tutor/register/", credentials);
      if (request.status == 200) {
        console.log("tutor profile completed");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUsers = createAsyncThunk("get_users", async () => {
  try {
    const request = await api.get("users/");
    if (request.status == 200) {
      console.log("fetched all the users");
    }
  } catch (error) {
    console.log("Error:", error);
  }
});

export const getTutors = createAsyncThunk("getTutors", async () => {
  try {
    const request = await api.get("users/");
    const response = request.data;
    if (request.status == 200) {
      console.log("fetched all the tutors");
      console.log(response);
      const data = response.filter((item) => item.is_tutor);
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log("Error:", error);
  }
});

export const otp_validation = createAsyncThunk(
  "otpValidation",
  async (credentials) => {
    try {
      const response = await api.post("validate-otp/", credentials);
  
      if (response.data.status) {
        if (response.data.status == 200) {
          console.log("otp verified successfully");
        } else {
          console.log("otp is not verified");
        }
      }
    } catch (error) {
      console.log("Error", error);

      toast.error(error);
    }
  }
);

export const change_password = createAsyncThunk(
  "change_password",
  async (credentials) => {
    const response = await api.post("change-password/", credentials);
    return response.data;
  }
);

const initialState = {
  msg: "",
  user: null,
  is_authenticated: false,
  token: "",
  loading: false,
  error: "",
  data: [],
  tutor: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
    },
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
            title: "An otp send to your email",
            text: "OTP sent successfully!!",
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
        toast.success("welcome to your profile");
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
      .addCase(getTutorProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTutorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        toast.success("welcome to your profile");
      })
      .addCase(getTutorProfile.rejected, (state) => {
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
        toast.success("username changed successfully");
      })
      .addCase(changeUserName.rejected, (state) => {
        state.loading = false;
        toast.error("something went wrong");
      });

    builder
      .addCase(changeProfileImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeProfileImage.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(changeProfileImage.rejected, (state) => {
        state.loading = false;
        toast.error("Error while uploading image");
      });

    builder
      .addCase(tutorchecklist.pending, (state) => {
        state.loading = true;
      })
      .addCase(tutorchecklist.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        toast.success("successfully submitted");
      })
      .addCase(tutorchecklist.rejected, (state) => {
        state.loading = false;
        toast.error("something went wrong");
      });

    builder
      .addCase(getTutors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTutors.fulfilled, (state, action) => {
        state.loading = false;
        state.tutor = action.payload;
        console.log(action.payload);
      })
      .addCase(getTutors.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(otp_validation.pending, (state) => {
        state.loading = true;
      })
      .addCase(otp_validation.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("account created successfully");
      })
      .addCase(otp_validation.rejected, (state) => {
        state.loading = false;
        Swal.fire({
          background: "#fff",
          icon: "error",
          title: "oops, something went wrong",
          text: action.payload,
        });
      });

    builder
      .addCase(change_password.pending, (state) => {
        state.loading = true;
      })
      .addCase(change_password.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Password changed successfully");
      })
      .addCase(change_password.rejected, (state) => {
        state.loading = false;
        Swal.fire({
          background: "#fff",
          icon: "error",
          title: "oops, something went wrong",
          text: "Internal server error",
        });
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
