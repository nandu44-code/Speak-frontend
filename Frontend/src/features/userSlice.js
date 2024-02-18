import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import api from "../services/Axios"
import Swal from 'sweetalert2'


export const Register = createAsyncThunk('register',

    async (credentials) => {

        try{
            const response = await api.post('/register/',credentials)
			return response.data
        }
        catch (error){
			console.error('error',error);
            throw error ;
        }
    }
	);

const initialState = {
    msg:"",
    user:"",
    token:"",
    loading:false,
    error:"" 


  };
  
  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
	extraReducers: (builder) => {
		builder
		  .addCase(Register.pending, (state) => {
			state.loading = true;

		  })
		  .addCase(Register.fulfilled, (state, action) => {
			state.loading = false;
			console.log('API Response Data:', action.payload);
			if (action.payload){
				Swal.fire({
					background: '#fff',
					icon: 'success',
					title: 'Account Created!',
					text: 'Your account has been created!!',
				});
			}
			
		  })
		  .addCase(Register.rejected, (state) => {
			state.loading = true;
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Something went wrong! Try again",
				footer: '<a href="#">Why do I have this issue?</a>'
			  });
		  });
	  },
  });
  
  export default userSlice.reducer;