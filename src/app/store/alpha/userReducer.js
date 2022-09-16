import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentEnv: 'prod',
    token: null,
    user: null,
  },
  reducers: {
    switchCurrentEnvironment: (state, action) => {
      state.currentEnv = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    updateUserInfo: (state, action) => {
      console.log('action', action);
      state.user = action.payload;
    },
    // setLoginSuccessStatus: (state, action) => {
    //   state.user = action.payload;
    // },
  },
});

export const { switchCurrentEnvironment, setToken, updateUserInfo } = userSlice.actions;

export default userSlice.reducer;
