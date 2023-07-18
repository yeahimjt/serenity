import React, { useEffect, useState } from 'react'
import { getFeed } from '../actions/posts'
import FeedStory from './FeedStory'
import ActionRequired from '../assets/action_required.png'

import { Link, useSearchParams } from 'react-router-dom'

const Timeline = () => {
  const [posts,setPosts] = useState(null)
  console.log(posts)
  useEffect(()=> {
    getFeed(setPosts)
  },[])
  return (
    <>
    { posts ? 
      posts?.status ? 
      <div className="min-h-[100vh] mx-8 my-16 gap-8 flex flex-col">
        {posts?.status && posts?.posts.map((post) => 
          <FeedStory story={post} />
        )}
      </div>
      :
        <div className="h-screen mx-8 my-16 items-center flex flex-col">
          <h1>You are not following any creators</h1>
          <Link to="/creators" className="text-blue-500 text-center">Explore Creators</Link>
        </div>

      :
      <div className="my-16 h-[80vh] flex items-center flex-col">
        <img className="max-w-[400px]" src={ActionRequired} />
        <p className="text-center font-important text-med py-2">Please log in to access your timeline.</p>
        <Link to="/login" className="text-blue-500 text-center border-2 rounded-input px-8 py-2">Log In</Link>
      </div>
    }
    
    </>
  )
}

export default Timeline