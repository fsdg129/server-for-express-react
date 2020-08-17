import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiUrl, createCorsInit } from '../../properties';

export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id, thunkAPI) => {
  const userState = thunkAPI.getState().users.loggedInformation;
  const authorization = userState.username + ":" + userState.password;
  const init = createCorsInit("GET", authorization, "");
  try{
    const response = await fetch(apiUrl+'users/'+id, init);
    if(response.status === 401){
      let value = {
        displayMessage: "Incorrect username or password.",
        developMessage: "",
        errorCode: 1
      }
      thunkAPI.rejectWithValue(value);
    } else if (response.status === 404) {
      let value = {
        displayMessage: "The expected user doesn't exist.",
        developMessage: "",
        errorCode: 2
      }
      thunkAPI.rejectWithValue(value);
    } else if (!response.ok) {
      let value = {
        displayMessage: "Unknown Response",
        developMessage: response.status,
        errorCode: 3
      }
      thunkAPI.rejectWithValue(value);
    } else {
      const data = await response.json();
      if(data.status === "failed"){
        let value = {
          displayMessage: data.displayMessage,
          developMessage: data.developMessage,
          errorCode: data.errorCode
        }
        thunkAPI.rejectWithValue(value);
      }
      return data.payload;
    }

  }
  catch(err){
    let value = {
      displayMessage: "Unknown Error",
      developMessage: err.toString(),
      errorCode: 99
    }
    thunkAPI.rejectWithValue(value);
  }
  
});

export const addUser = createAsyncThunk('users/addUser', async (data, thunkAPI) => {

  /*   
  let data = {
    username: username,
    password: password
  } 
  */
  const init = createCorsInit("PUSH", "", data);
  try{
    const response = await fetch(apiUrl+'users/', init);
    if(response.status === 403){
      let value = {
        displayMessage: "The username has been used",
        developMessage: "",
        errorCode: 1
      }
      thunkAPI.rejectWithValue(value);
    } else if (response.status === 404) {
      let value = {
        displayMessage: "",
        developMessage: "Uncorrect link",
        errorCode: 2
      }
      thunkAPI.rejectWithValue(value);
    } else if (!response.ok) {
      let value = {
        displayMessage: "Unknown Response",
        developMessage: response.status,
        errorCode: 3
      }
      thunkAPI.rejectWithValue(value);
    } else {
      const data = await response.json();
      if(data.status === "failed"){
        let value = {
          displayMessage: data.displayMessage,
          developMessage: data.developMessage,
          errorCode: data.errorCode
        }
        thunkAPI.rejectWithValue(value);
      }
      return data.payload;
    }

  }
  catch(err){
    let value = {
      displayMessage: "Unknown Error",
      developMessage: err.toString(),
      errorCode: 99
    }
    thunkAPI.rejectWithValue(value);
  }
  
});

export const checkUsername = createAsyncThunk('users/checkUsername', async (username, thunkAPI) => {

  const init = createCorsInit("HEAD", authorization, "");
  try{
    const response = await fetch(apiUrl+'users/'+username, init);
    if(response.status === 401){
      return false;
    } else if (response.status === 404) {
      return true;
    } else {
      let value = {
        displayMessage: "Unknown Response",
        developMessage: "",
        errorCode: 99
      }
      thunkAPI.rejectWithValue(value);
    }

  }
  catch(err){
    let value = {
      displayMessage: "Unknown Error",
      developMessage: err.toString(),
      errorCode: 99
    }
    thunkAPI.rejectWithValue(value);
  }
  
});

export const usersSlice = createSlice({
  name: 'users',
  initialState : {
    operatingUser : {
      id : 0,
      username : '',
      priviledge : '',
      identification_id : 0
    },
    loggingInformation : {
      boolLoggedIn : false,
      token : 0,
      username: '',
      password: ''
    },
    fetchUserById: {
      cachedUser : {},
      status: 'idle',
      error: {
        displayMessage: "",
        developMessage: "",
        errorCode: 0
      }
    },

    addUser: {
      cachedUser : {},
      status: 'idle',
      error: {
        displayMessage: "",
        developMessage: "",
        errorCode: 0
      }
    },

    checkUsername: {
      status: "idle",
      boolAvailable : false,
      error: {
        displayMessage: "",
        developMessage: "",
        errorCode: 0
      }
    }

  },
  reducers: {
    updateOperatingUser: (state, action) => {
      state.operatingUser = state.cachedUser;
    },
    updateUsernamePassword: (state, action) => {
      state.loggingInformation.username = action.payload.username;
      state.loggingInformation.password = action.payload.password;
    },
    login: (state, action) => {
      state.loggedInformation.boolLoggedIn = true;
    },
    logout: (state, action) => {
      state.loggedInformation.boolLoggedIn = false;
    }
  },
  extraReducers: {
    [fetchUserById.pending]: (state, action) => {
      state.fetchUserById.status = 'loading';
    },
    [fetchUserById.fulfilled]: (state, action) => {
      state.fetchUserById.status = 'succeeded';
      state.fetchUserById.cachedUser = action.payload;
    },
    [fetchUserById.rejected]: (state, action) => {
      state.fetchUserById.status = 'failed';
      if(action.payload){
        state.fetchUserById.error = action.payload;
      } else{
        state.fetchUserById.error.developMessage = action.error.message;
      }
      
    },

    [addUser.pending]: (state, action) => {
      state.addUser.status = 'loading';
    },
    [addUser.fulfilled]: (state, action) => {
      state.addUser.status = 'succeeded';
      state.addUser.cachedUser = action.payload;
    },
    [addUser.rejected]: (state, action) => {
      state.addUser.status = 'failed';
      if(action.payload){
        state.addUser.error = action.payload;
      } else{
        state.addUser.error.developMessage = action.error.message;
      }
      
    },

    [checkUsername.pending]: (state, action) => {
      state.checkUsername.status = 'loading';
    },
    [checkUsername.fulfilled]: (state, action) => {
      state.checkUsername.status = 'succeeded';
      state.checkUsername.boolAvailable = action.payload;
    },
    [checkUsername.rejected]: (state, action) => {
      state.checkUsername.status = 'failed';
      if(action.payload){
        state.checkUsername.error = action.payload;
      } else{
        state.checkUsername.error.developMessage = action.error.message;
      }
      
    }

  }
});

export const { updateUser } = usersSlice.actions;

export default usersSlice.reducer;

export const selectOperatingUser = state => state.users.operatingUser;
export const selectFetchingUserStatus = state => state.users.fetchUserById.status;
export const selectUsernameAvailability = state => state.users.checkUsername.boolAvailable;