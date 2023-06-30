import { useEffect } from "react";
import {Routes, Route} from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import { getPosts } from './actions/posts'
import { getProfile, getUsers } from "./actions/users";
import  Posts  from './components/Posts'
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn"
import Nav from './components/Nav'
import './App.css'
import Alert from "./components/Alert";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Write from "./components/Write";
import Stories from "./components/Stories";

function App() {

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users)
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getProfile());
  },[dispatch])
  return (
    <div className="">
      <Nav />
      <Alert />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/write" element={<Write />} />
        <Route path="/stories" element={<Stories />} />
      </Routes>
    </div>
  );
}

export default App;
