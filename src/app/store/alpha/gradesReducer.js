import { createSlice } from "@reduxjs/toolkit";

const gradeSlice = createSlice({
  name: "grades",
  initialState: {
    grade: null,
  },
  reducers: {
    setGrade: (state, action) => {
      state.grade = action.payload;
    },
  },
});

export const { setGrade } = gradeSlice.actions;

export default gradeSlice.reducer;
