import { combineReducers } from "redux";
import { posts }   from './posts';
import { users } from './users'
import { messages } from './messages'

export const reducers = combineReducers({ posts,users,messages });