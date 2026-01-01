import { createSlice } from "@reduxjs/toolkit";
import { languageById, languageDelete, languageList } from "@/services/language-api";


const initialState = {
    Languages: [],
    currentLanguage: null,
    loading: false,
    error: null
}

export const language = createSlice({
    name: 'language',
    initialState,
    reducers:{
        resetCurrentLanguage: (state) => {
            state.currentLanguage = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(languageList.pending, (state) => {
            state.loading = true;
        })
        .addCase(languageList.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.Languages = action.payload.data;
            }
        })
        .addCase(languageList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(languageById.fulfilled, (state, action) => {
            if(action.payload.status){
                state.currentLanguage = action.payload.data;
            }
        })
        .addCase(languageDelete.fulfilled, (state, action) => {
            state.currentLanguage = null;
            // Remove the deleted language from the Languages array
            if(action.payload.id){
                state.Languages = state.Languages.filter(language => language._id !== action.payload.id);
            }
        })
    }
})

export const { resetCurrentLanguage } = language.actions;
export default language.reducer;
