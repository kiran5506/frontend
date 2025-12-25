import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers, fetchUserById, updateAdPassword, updateUsrProfile } from "@/services/login-api";

const initialState = {
    userdata: [],
    currentUser: null,
    status: 'idle',
    error: null
}

export const user = createSlice({
    name: 'user',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchUserById.fulfilled, (state, action) => {
            if(action.payload.status){
                state.currentUser = action.payload.data
            }
        })
        .addCase(fetchAllUsers.fulfilled, (state, action) => {
            if(action.payload.status){
                state.userdata = action.payload.data;
            }
        })
    }
})

export default  user.reducer;