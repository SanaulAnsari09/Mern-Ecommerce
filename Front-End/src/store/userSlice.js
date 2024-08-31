import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:null
}

export const userSlice = createSlice({
  name: 'login detail',
  initialState,
  reducers:{
    setUserDeatails : (state, action)=>{
        state.user = action.payload;
    }
  }
});

export const {setUserDeatails} = userSlice.actions;

export default userSlice.reducer