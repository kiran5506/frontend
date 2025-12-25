import { vendorLogin } from "@/services/vendor-api";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    vendorState: false,
    token: undefined,
    isAuthenticated: false,
    vendorid: null,
    role:null
}

export const vendorAuth = createSlice({
    name: 'vendorauth',
    initialState,
    reducers: {
        setAuthState: (state, action) => {
            console.log('setAuthState ==> ', action.payload)
            const { isAuthenticated, token, role, vendorid, details } = action.payload;
            state.vendorState = isAuthenticated;
            state.isAuthenticated = isAuthenticated;
            state.token = token;
            state.role = 'vendor';
            state.vendorid = vendorid;
            state.details = JSON.stringify(details);
            localStorage.setItem('token', token);
        },
        logout: (state) => {
            console.log('Logout called ==> ', state)
            state.authState = false;
            state.isAuthenticated = false;
            state.token = null;
            state.role = null;
            state.userid = null;
            state.details = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(vendorLogin.fulfilled, (state, action) => {
            console.log('vendorLogin.fulfilled ==> ', action.payload)
            if(action.payload.status){
                const { vendorData, token } = action.payload.data;
                state.token = token;
                state.isAuthenticated = true;
                state.vendorState = true;
                state.vendorid = vendorData._id;
                state.role = 'vendor';
                state.details = JSON.stringify(vendorData);
                localStorage.setItem('token', token);
            }
        })
    },
});

export const { setAuthState, logout } = vendorAuth.actions;
export default vendorAuth.reducer;
