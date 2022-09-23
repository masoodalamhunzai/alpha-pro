import { createSlice } from "@reduxjs/toolkit";

const gradeSlice = createSlice({
  name: "grades",
  initialState: {
    grade: null,
    gradeNameList: null,
  },
  reducers: {
    setGrade: (state, action) => {
      state.grade = action.payload;
    },
    setGradeNameList: (state, action) => {
      state.gradeNameList = action.payload;
    },
  },
});

export const { setGrade, setGradeNameList } = gradeSlice.actions;

export default gradeSlice.reducer;
