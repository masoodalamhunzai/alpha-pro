import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current_env: 'prod',
  },
  reducers: {
    switchCurrentEnvironment: (state, action) => {
      state.current_env = action.payload;
    },
  },
});

export const { switchCurrentEnvironment } = userSlice.actions;

export default userSlice.reducer;
