const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    list: [],
    user: 'todo'
}

export const todo = createSlice({
    name: 'todo',
    initialState,
    reducers:{
        addTodo: (state, action) => {
            state.list.push(action.payload);
        },
        removeTodo: (state, action) => {
        state.list = state.list.filter((todo) => todo.id !== action.payload);
        },
        toggleTodo: (state, action) => {
            const todo = state.list.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.done = !todo.done;
            }
        },
    }
})

export const { addTodo, removeTodo, toggleTodo } = todo.actions;
export default  todo.reducer;