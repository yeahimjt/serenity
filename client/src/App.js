import { useEffect, useState } from "react";
import {Routes, Route, useLocation} from 'react-router-dom'

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
import MyStories from "./components/MyStories";
import Read from "./components/Read";
import ReadProfile from "./components/ReadProfile";
import Footer from "./components/Footer";
import Timeline from "./components/Timeline";
import Creators from "./components/Creators";
import DMmessages from "./components/DMmessages";

function App() {

  const dispatch = useDispatch();
  const location = useLocation()
  console.log(location)
  const users = useSelector((state) => state.users)
  useEffect(() => {
    dispatch(getProfile());
    dispatch({type: "INIT_SOCKET"})
  },[dispatch])
  
  return (
    <div className="">
      {!(location.pathname === '/messages') && <Nav />}
      <Alert />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/write" element={<Write />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/:category" element={<Stories />} />
        <Route path="/feed" element={<Timeline />} />
        <Route path="/creators" element={<Creators />} />
        <Route path="/messages" element={<DMmessages />} />
        <Route path="/mystories" element={<MyStories />} />
        <Route path="/story/:id" element={<Read />} />
        <Route path="/profile/:id" element={<ReadProfile />} />
      </Routes>
      {!(location.pathname === '/messages') && <Footer />}
    </div>
  );
}

export default App;
