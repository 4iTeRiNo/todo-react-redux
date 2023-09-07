import {  createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: []
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push( {
        id: new Date().toISOString(),
        text: state.payload.text,
        complete: false,
      })
    },
    removeTodo(state, action) {},
    toggleTodo(state, action) {},
  }
});

export const {addTodo, removeTodo, toggleTodo} = todoSlice.actions;

export default todoSlice.reducer;