import { combineReducers } from '@reduxjs/toolkit';
import user from './userReducer';

const reducers = combineReducers({
  user,
});

export default reducers;
