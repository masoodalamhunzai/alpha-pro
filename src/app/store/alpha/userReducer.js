import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    updateUserInfo: (state, action) => {
      state.user = action.payload;
    },
    // setLoginSuccessStatus: (state, action) => {
    //   state.user = action.payload;
    // },
  },
});

export const { setToken, updateUserInfo } = userSlice.actions;

export default userSlice.reducer;
