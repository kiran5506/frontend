import { updateProfileCompletionStatus, vendorLogin, verifyVendorOtp, viewVendorById, updateVendorProfile, updateVendorPassword } from "@/services/vendor-api";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    vendorState: false,
    token: undefined,
    isAuthenticated: false,
    vendorid: null,
    role: null,
    details: null,
    registeredVendor: null,
    otpVerificationLoading: false,
    otpVerificationError: null,
    profileUpdateLoading: false,
    profileUpdateError: null,
    passwordUpdateLoading: false,
    passwordUpdateError: null
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
            // Store only specific fields
            const filteredDetails = {
                is_otp_verified: details?.is_otp_verified,
                is_profile_completed: details?.is_profile_completed,
                is_profile_verified: details?.is_profile_verified,
                profile_status: details?.profile_status
            };
            state.details = JSON.stringify(filteredDetails);
            localStorage.setItem('token', token);
        },
        setRegisteredVendor: (state, action) => {
            state.registeredVendor = action.payload;
        },
        clearRegisteredVendor: (state) => {
            state.registeredVendor = null;
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
                // Store only specific fields
                const filteredDetails = {
                    is_otp_verified: vendorData?.is_otp_verified,
                    is_profile_completed: vendorData?.is_profile_completed,
                    is_profile_verified: vendorData?.is_profile_verified,
                    profile_status: vendorData?.profile_status
                };
                state.details = JSON.stringify(filteredDetails);
                localStorage.setItem('token', token);
            }
        })
        .addCase(verifyVendorOtp.pending, (state) => {
            state.otpVerificationLoading = true;
            state.otpVerificationError = null;
        })
        .addCase(verifyVendorOtp.fulfilled, (state, action) => {
            state.otpVerificationLoading = false;
            if(action.payload.status){
                const { vendorData, token } = action.payload.data || {};
                state.registeredVendor = vendorData;
                console.log('OTP verification successful, updated vendor data ==> ', vendorData);
                state.details = JSON.stringify({
                    is_otp_verified: vendorData?.is_otp_verified,
                    is_profile_completed: vendorData?.is_profile_completed,
                    is_profile_verified: vendorData?.is_profile_verified,
                    profile_status: vendorData?.profile_status
                });

                // For register flow, backend returns token on OTP verify.
                // Keep vendor authenticated so redirect to /vendor/business-profile works.
                if (token && vendorData?._id) {
                    state.token = token;
                    state.isAuthenticated = true;
                    state.vendorState = true;
                    state.vendorid = vendorData._id;
                    state.role = 'vendor';
                    localStorage.setItem('token', token);
                }
            }
        })
        .addCase(verifyVendorOtp.rejected, (state, action) => {
            state.otpVerificationLoading = false;
            state.otpVerificationError = action.payload;
        })
        .addCase(updateProfileCompletionStatus.fulfilled, (state, action) => {
            if(action.payload.status){
                const { vendorData } = action.payload.data;
                console.log('Profile completion status updated, updated vendor data ==> ', vendorData);
                state.details = JSON.stringify({
                    is_otp_verified: vendorData?.is_otp_verified,
                    is_profile_completed: vendorData?.is_profile_completed,
                    is_profile_verified: vendorData?.is_profile_verified,
                    profile_status: vendorData?.profile_status
                });
            }
        })
        .addCase(viewVendorById.fulfilled, (state, action) => {
            if(action.payload.status){
                const { data } = action.payload;
                console.log('Fetched vendor details, updated vendor data ==> ', action.payload);
                state.details = JSON.stringify({
                    is_otp_verified: data?.is_otp_verified,
                    is_profile_completed: data?.is_profile_completed,
                    is_profile_verified: data?.is_profile_verified,
                    profile_status: data?.profile_status
                });
            }
        })
        .addCase(updateVendorProfile.pending, (state) => {
            state.profileUpdateLoading = true;
            state.profileUpdateError = null;
        })
        .addCase(updateVendorProfile.fulfilled, (state, action) => {
            state.profileUpdateLoading = false;
            if(action.payload.status){
                const { data } = action.payload;
                console.log('Vendor profile updated successfully ==> ', data);
                state.details = JSON.stringify({
                    is_otp_verified: data?.is_otp_verified,
                    is_profile_completed: data?.is_profile_completed,
                    is_profile_verified: data?.is_profile_verified,
                    profile_status: data?.profile_status
                });
            }
        })
        .addCase(updateVendorProfile.rejected, (state, action) => {
            state.profileUpdateLoading = false;
            state.profileUpdateError = action.payload;
        })
        .addCase(updateVendorPassword.pending, (state) => {
            state.passwordUpdateLoading = true;
            state.passwordUpdateError = null;
        })
        .addCase(updateVendorPassword.fulfilled, (state, action) => {
            state.passwordUpdateLoading = false;
            if(action.payload.status){
                const { data } = action.payload;
                console.log('Vendor password updated successfully ==> ', data);
                state.details = JSON.stringify({
                    is_otp_verified: data?.is_otp_verified,
                    is_profile_completed: data?.is_profile_completed,
                    is_profile_verified: data?.is_profile_verified,
                    profile_status: data?.profile_status
                });
            }
        })
        .addCase(updateVendorPassword.rejected, (state, action) => {
            state.passwordUpdateLoading = false;
            state.passwordUpdateError = action.payload;
        })
    },
});

export const { setAuthState, setRegisteredVendor, clearRegisteredVendor, logout } = vendorAuth.actions;
export default vendorAuth.reducer;
