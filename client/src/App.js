import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from './actions/posts'
import { getUsers } from "./actions/users";
import  Posts  from './components/Posts'
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn"
function App() {

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users)
  useEffect(() => {
    dispatch(getUsers());
  },[dispatch])
  return (
    <div className="App">
      <SignUp />
      <LogIn />
    </div>
  );
}

export default App;
