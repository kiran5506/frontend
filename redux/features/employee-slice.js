import { createSlice } from "@reduxjs/toolkit";
import { employeeById, employeeDelete, employeeList } from "@/services/employee-api";


const initialState = {
    Employees: [],
    currentEmployee: null,
    loading: false,
    error: null
}

export const employee = createSlice({
    name: 'employee',
    initialState,
    reducers:{
        resetCurrentEmployee: (state) => {
            state.currentEmployee = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(employeeList.pending, (state) => {
            state.loading = true;
        })
        .addCase(employeeList.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.Employees = action.payload.data;
            }
        })
        .addCase(employeeList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(employeeById.fulfilled, (state, action) => {
            if(action.payload.status){
                state.currentEmployee = action.payload.data;
            }
        })
        .addCase(employeeDelete.fulfilled, (state, action) => {
            state.currentEmployee = null;
            // Remove the deleted employee from the Employees array
            if(action.payload.id){
                state.Employees = state.Employees.filter(emp => emp._id !== action.payload.id);
            }
        })
    }
})

export const { resetCurrentEmployee } = employee.actions;
export default  employee.reducer;
