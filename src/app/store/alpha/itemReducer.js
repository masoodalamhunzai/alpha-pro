import { createSlice } from '@reduxjs/toolkit';

const itemSlice = createSlice({
  name: 'item',
  initialState: {
    items: null,
    itemDetail: null,
    questions: null,
    questionDetail: null,
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
  },
});

export const { setItems, setQuestions,setItemDetail,setQuestionDetail } = itemSlice.actions;

export default itemSlice.reducer;
