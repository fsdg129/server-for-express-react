import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiUrl, createCorsInit } from '../../properties';

export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id, thunkAPI) => {
  const userState = thunkAPI.getState().users;
  const data = {
    userId: userState.operatingUser.id,
    token: userState.loggedInformation.token
  };
  const init = createCorsInit(data);
  const response = await fetch(apiUrl+'users/'+id, init);
  return response.data;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState : {
    operatingUser : {
      id : 0,
      name : '',
      priviledge : '',
      identification_id : 0
    },
    cachedUser : {},
    loggedInformation : {
      boolLoggedIn : false,
      token : 0
    },
    status: 'idle',
    error: null
  },
  reducers: {
    updateUser: (state, action) => {
      state.operatingUser = state.cachedUser;
    }
  },
  extraReducers: {
    [fetchUserById.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchUserById.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Add any fetched posts to the array
      state.cachedUser = action.payload;
    },
    [fetchUserById.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
});

export const { updateUser } = usersSlice.actions;

export default usersSlice.reducer;

export const selectOperatingUser = state => state.users.operatingUser;
export const selectUserStatus = state => state.users.status;
export const selectUserError = state => state.users.error;
