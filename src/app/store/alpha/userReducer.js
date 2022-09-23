import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    user: null,
    roles: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    updateUserInfo: (state, action) => {
      state.user = action.payload;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    // setLoginSuccessStatus: (state, action) => {
    //   state.user = action.payload;
    // },
  },
});

export const { setToken, updateUserInfo, setRoles } = userSlice.actions;

export default userSlice.reducer;
