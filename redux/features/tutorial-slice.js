import { createSlice } from "@reduxjs/toolkit";
import { tutorialById, tutorialDelete, tutorialList } from "@/services/tutorial-api";


const initialState = {
    Tutorials: [],
    currentTutorial: null,
    loading: false,
    error: null
}

export const tutorial = createSlice({
    name: 'tutorial',
    initialState,
    reducers:{
        resetCurrentTutorial: (state) => {
            state.currentTutorial = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(tutorialList.pending, (state) => {
            state.loading = true;
        })
        .addCase(tutorialList.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.Tutorials = action.payload.data;
            }
        })
        .addCase(tutorialList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(tutorialById.fulfilled, (state, action) => {
            if(action.payload.status){
                state.currentTutorial = action.payload.data;
            }
        })
        .addCase(tutorialDelete.fulfilled, (state, action) => {
            state.currentTutorial = null;
            // Remove the deleted tutorial from the Tutorials array
            if(action.payload.id){
                state.Tutorials = state.Tutorials.filter(tutorial => tutorial._id !== action.payload.id);
            }
        })
    }
})

export const { resetCurrentTutorial } = tutorial.actions;
export default tutorial.reducer;
