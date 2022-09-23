import { combineReducers } from '@reduxjs/toolkit';
import org from './orgReducer';
import user from './userReducer';
import grades from './gradesReducer';
import subjects from './subjectsReducer';
import item from './itemReducer';

const reducers = combineReducers({
  user,
  org,
  grades,
  subjects,
  item,
});

export default reducers;
