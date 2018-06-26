import { combineReducers } from 'redux';
import postsReducer from './posts_reducer';
import {reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  posts: postsReducer,
    form: formReducer
});

export default rootReducer;
