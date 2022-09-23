import { createSlice } from '@reduxjs/toolkit';

const itemSlice = createSlice({
  name: 'item',
  initialState: {
    items: null,
    itemDetail: null,
    questions: null,
    questionDetail: null,
    tagsList: null,
    gradesList:null,
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setItemDetail: (state, action) => {
      state.itemDetail = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setQuestionDetail: (state, action) => {
      state.questionDetail = action.payload;
    },
    setTagsList: (state, action) => {
      state.tagsList = action.payload;
    },
    setGradesList: (state, action) => {
      state.gradesList = action.payload;
    },
  },
});

export const { setItems, setQuestions, setItemDetail, setQuestionDetail,setTagsList,setGradesList } = itemSlice.actions;

export default itemSlice.reducer;
