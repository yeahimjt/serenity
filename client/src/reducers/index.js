import { combineReducers } from "redux";
import { posts }   from './posts';
import { users } from './users'
import { messages } from './messages'
import {socket} from './socket'

export const reducers = combineReducers({ posts,users,messages, socket });