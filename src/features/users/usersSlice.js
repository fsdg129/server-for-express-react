import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    operatingUser: {
        id : 0,
        username : '',
        priviledge : 'WORKER',
        identification_id : 0
    }
  },
  reducers: {
    updateUser: (state, action) => {
        state.operatingUser = action.payload
    }
  }
})

export const { updateUser } = usersSlice.actions

export default usersSlice.reducer