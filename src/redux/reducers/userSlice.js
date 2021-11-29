// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// export const getUsersAsync = createAsyncThunk('users/getUsersAsync', async () => {
//   const response = await fetch('https://kesho-congo-api.herokuapp.com/user/all', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `bearer ${localStorage.getItem('token')}`
//     }
//   });
//   if (response.ok) {
//     const users = await response.json();
//     return { users };
//   }
// });
// export const addUsersAsync = createAsyncThunk('users/addUsersAsync', async (payload) => {
//   try {
//     const response = await fetch('https://kesho-congo-api.herokuapp.com/user/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `bearer ${localStorage.getItem('token')}`
//       },
//       body: JSON.stringify(payload)
//     });
//     if (response.ok) {
//       const users = await response.json();
//       // console.log(`dans response ok ${response}`);
//       return { users };
//     }
//     console.log(`dans else ${response}`);
//     return null;
//   } catch (error) {
//     console.log(error);
//   }
// });

// export const deleteUserAsync = createAsyncThunk('users/deleteUserAsync', async (payload) => {
//   const response = await fetch(
//     `https://kesho-congo-api.herokuapp.com/user?id_user=${payload.id_user}`,
//     {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `bearer ${localStorage.getItem('token')}`
//       }
//     }
//   );
//   if (response.ok) {
//     return { id_user: payload.id_user };
//   }
// });

// export const getOneUserAsync = createAsyncThunk('users/getOneUserAsync', async () => {
//   const response = await fetch(
//     `https://kesho-congo-api.herokuapp.com/user?id_user=${localStorage.getItem('id_user')}`,
//     {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `bearer ${localStorage.getItem('token')}`
//       }
//     }
//   );
//   if (response.ok) {
//     const user = await response.json();
//     return { user };
//   }
// });

// const userSlice = createSlice({
//   name: 'users',
//   initialState: [],
//   reducers: {},
//   extraReducers: {
//     [getUsersAsync.fulfilled]: (state, action) => action.payload.users,
//     [addUsersAsync.fulfilled]: (state, action) => {
//       state.push(action.payload.user);
//     },
//     [deleteUserAsync.fulfilled]: (state, action) => {
//       console.log('fetched successfully');
//       return state.filter((user) => user.id_user !== action.payload.id_user);
//     },
//     [getOneUserAsync.fulfilled]: (state, action) => {
//       console.log('fetched successfully');
//       // return action.payload.user;
//       // console.log(action.payload.user);
//       return action.payload.user;
//     }
//   }
// });

// // export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

// export default userSlice.reducer;
