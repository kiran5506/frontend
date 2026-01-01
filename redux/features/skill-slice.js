import { createSlice } from "@reduxjs/toolkit";
import { skillById, skillDelete, skillList } from "@/services/skill-api";


const initialState = {
    Skills: [],
    currentSkill: null,
    loading: false,
    error: null
}

export const skill = createSlice({
    name: 'skill',
    initialState,
    reducers:{
        resetCurrentSkill: (state) => {
            state.currentSkill = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(skillList.pending, (state) => {
            state.loading = true;
        })
        .addCase(skillList.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.Skills = action.payload.data;
            }
        })
        .addCase(skillList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(skillById.fulfilled, (state, action) => {
            if(action.payload.status){
                state.currentSkill = action.payload.data;
            }
        })
        .addCase(skillDelete.fulfilled, (state, action) => {
            state.currentSkill = null;
            // Remove the deleted skill from the Skills array
            if(action.payload.id){
                state.Skills = state.Skills.filter(skill => skill._id !== action.payload.id);
            }
        })
    }
})

export const { resetCurrentSkill } = skill.actions;
export default skill.reducer;
