import { createSlice } from '@reduxjs/toolkit';

const subjectSlice = createSlice({
  name: 'subjects',
  initialState: {
    subjects: null,
  },
  reducers: {
    setSubjects: (state, action) => {
      state.subjects = action.payload;
    },
  },
});

export const { setSubjects } = subjectSlice.actions;

export default subjectSlice.reducer;
