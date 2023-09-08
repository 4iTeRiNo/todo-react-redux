import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createElement } from "react";

export const fetchTodo = createAsyncThunk(
  'todos/fetchTodo',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')

      if (!response.ok) {
        throw new Error('Server Error')
      }

      const data = await response.json()

      return data;

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const deleteTodos = createAsyncThunk(
  'todos/deleteTodos',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Can\'t delete task. Server error')
      }


      dispatch(removeTodo({ id }))

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleStatus = createAsyncThunk(
  'todos/toggleStatus',
  async function (id, { rejectWithValue, dispatch, getState }) {

    const todo = getState().todos.todos.find(todo => todo.id === id);

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'aplication/json',
        },
        body: JSON.stringify({
          completed: !todo.completed,
        })
      })

      if (!response.ok) {
        throw new Error('Can\'t change status. Server error')
      }
      dispatch(toggleTodo({ id }))

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async function (text, { rejectWithValue, dispatch }) {
    try {
      const todo = {
        title: text,
        useId: 1,
        completed: false,
      };

      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo),
      });

      if (!response.ok) {
        throw new Error('Can\'t add task. Server error')
      }
      const data = await response.json();
      dispatch(addTodo(data))

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const setError = (state, action) => {
  state.status = 'resolved';
  state.todos = action.payload;
};


const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload)
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
    },
    toggleTodo(state, action) {
      const toggleTodo = state.todos.find(todo => todo.id === action.payload.id)
      toggleTodo.completed = !toggleTodo.completed;
    },
  },
  extraReducers: {
    [fetchTodo.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchTodo.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.todos = action.payload;
    },
    [fetchTodo.rejected]: setError,
    [deleteTodos.rejected]: setError,
    [toggleStatus.rejected]: setError,
  }
});

const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;