import { createSlice } from "@reduxjs/toolkit";
//import { login, updateAdProfile, updateUsrProfile, upgradePackge } from "@/services/login-api";

const initialState = {
    userid: null,
    authState: false,
    isAuthenticated: false,
    token: undefined,
    details: null,
    role: null,
};

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthState: (state, action) => {
            console.log('setAuthState ==> ', action.payload)
            const { isAuthenticated, token, role, userid, details } = action.payload;
            state.authState = isAuthenticated;
            state.isAuthenticated = isAuthenticated;
            state.token = token;
            state.role = role;
            state.userid = userid;
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
        builder.addCase(login.fulfilled, (state, action) => {
            console.log('login.fulfilled ==> ', action.payload)
            if(action.payload.status){
                const { token, userid, role, details } = action.payload.data;
                state.token = token;
                state.isAuthenticated = true;
                state.authState = true;
                state.userid = userid;
                state.role = role;
                state.details = JSON.stringify(details);
                localStorage.setItem('token', token);
            }
        })
        .addCase(updateAdProfile.fulfilled, (state, action) => {
            if(action.payload.status){
                const {profile, name} = action.payload.data;
                const pdetails = JSON.parse(state.details);
                pdetails.profile = profile;
                pdetails.name = name;
                state.details = JSON.stringify(pdetails);
            }
        })
        .addCase(updateUsrProfile.fulfilled, (state, action) => {
            if(action.payload.status){
                const {profile, name} = action.payload.data;
                console.log('profile--->', profile);
                console.log('name--->', name);
                const pdetails = JSON.parse(state.details);
                pdetails.profile = profile;
                pdetails.name = name;
                state.details = JSON.stringify(pdetails);
            }
        })
        .addCase(upgradePackge.fulfilled, (state, action) => {
            if(action.payload.status){
                const { details } = action.payload;
                state.details = JSON.stringify(details);
            }
        })
    },
});

export const { setAuthState, logout } = auth.actions;
export default auth.reducer;
