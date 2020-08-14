import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiUrl, createCorsInit } from '../../properties';

export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id, thunkAPI) => {
  const userState = thunkAPI.getState().users.operatingUser;
  const authorization = userState.username + ":" + userState.password;
  const init = createCorsInit("GET", authorization, "");
  const response = await fetch(apiUrl+'users/'+id, init);
  return response.data;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState : {
    operatingUser : {
      id : 0,
      username : '',
      password: '',
      priviledge : '',
      identification_id : 0
    },
    loggedInformation : {
      boolLoggedIn : false,
      token : 0
    },
    cachedUser : {},
    fetchingInformation: {
      status: 'idle',
      error: {
        displayMessage: "",
        developMessage: "",
        errorCode: 0
      }
    }

  },
  reducers: {
    updateUser: (state, action) => {
      state.operatingUser = state.cachedUser;
    }
  },
  extraReducers: {
    [fetchUserById.pending]: (state, action) => {
      state.fetchingInformation.status = 'loading';
    },
    [fetchUserById.fulfilled]: (state, action) => {
      state.fetchingInformation.status = 'succeeded';
      state.cachedUser = action.payload;
    },
    [fetchUserById.rejected]: (state, action) => {
      state.fetchingInformation.status = 'failed';
      state.fetchingInformation.error = action.error;
    }
  }
});

export const { updateUser } = usersSlice.actions;

export default usersSlice.reducer;

export const selectOperatingUser = state => state.users.operatingUser;
export const selectFetchingUserStatus = state => state.users.fetchingInformation.status;

