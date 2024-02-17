import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/Axios"


export const Register = createAsyncThunk('register',

    async (credentials) => {

        try{
            const request = await api.post('/register/',credentials)
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
    loading:"false",
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
			const { error, msg } = action.payload;
			if (error) {
			  state.error = error;
			} else {
			  state.msg = msg;
			}
		  })
		  .addCase(Register.rejected, (state) => {
			state.loading = true;
		  });
	  },
  });
  
  export default userSlice.reducer;