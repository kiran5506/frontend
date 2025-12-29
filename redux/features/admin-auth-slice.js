
import { createSlice } from "@reduxjs/toolkit";
import { adminLogin } from "@/services/admin-api";

const initialState = {
    adminState: false,
    token: undefined,
    isAuthenticated: false,
    adminid: null,
    role:null
}

export const adminAuth = createSlice({
    name: 'adminauth',
    initialState,
    reducers: {
        setAuthState: (state, action) => {
            console.log('setAuthState ==> ', action.payload)
            const { isAuthenticated, token, role, adminid, details } = action.payload;
            state.adminState = isAuthenticated;
            state.isAuthenticated = isAuthenticated;
            state.token = token;
            state.role = 'admin';
            state.adminid = adminid;
            state.details = JSON.stringify(details);
            localStorage.setItem('adminToken', token);
        },
        adminLogout: (state) => {
            console.log('Logout called ==> ', state)
            state.adminState = false;
            state.isAuthenticated = false;
            state.token = null;
            state.role = null;
            state.adminid = null;
            state.details = null;
            localStorage.removeItem('adminToken');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(adminLogin.fulfilled, (state, action) => {
            console.log('adminLogin.fulfilled ==> ', action.payload)
            if(action.payload.status){
                const { adminData, token } = action.payload.data;
                state.token = token;
                state.isAuthenticated = true;
                state.adminState = true;
                state.adminid = adminData._id;
                state.role = 'admin';
                state.details = JSON.stringify(adminData);
                localStorage.setItem('adminToken', token);
            }
        })
    },
});

export const { setAuthState, adminLogout } = adminAuth.actions;
export default adminAuth.reducer;
