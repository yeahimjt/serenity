import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../actions/posts';

const Posts = () => {
    const posts = useSelector((state) => state.posts);
    const [postData, setPostData] = useState({ title: '', user_id: 1, message: ''})
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
      e.preventDefault()
      dispatch(createPost(postData))
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="title" value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})}/>
        <input name="message" value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})}/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Posts