import { createSlice } from "@reduxjs/toolkit";
import { generateToken } from "../../services/generate-api";


const initialState = {
    authState: false,
    token: undefined,
    isAuthenticated: false
}

export const generateAuth = createSlice({
    name: 'generateAuth',
    initialState,
    reducers: {
        setAuthState: (state, action) => {
            const { token } = action.payload.data;
            state.authState = true;
            state.token = token;
            state.isAuthenticated = true;
            localStorage.setItem('type', 'generate');
            localStorage.setItem('genToken', token);
        },
        flushToken: (state) => {
            state.token = undefined;
            state.isAuthenticated = false;
            state.authState = false;
            localStorage.removeItem('genToken');
            localStorage.removeItem('type');
            console.log('Generated token flushed successfully');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(generateToken.fulfilled, (state, action) => {
            if(action.payload.status){
                const { token } = action.payload.data;
                state.token = token;
                state.isAuthenticated = true;
                state.authState = true;
                localStorage.setItem('type', 'generate');
                localStorage.setItem('genToken', token);
                console.log('Token generated and stored successfully');
            }
        })
    }
});

export const { setAuthState, flushToken } = generateAuth.actions;

export default generateAuth.reducer;