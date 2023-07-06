import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../actions/posts'
import Story from './Story'

const Stories = () => {
    const dispatch = useDispatch()
    const posts = useSelector((state)=> state.posts)
    useEffect(()=> {
        dispatch(getPosts())
    },[])
    console.log(posts)
  return (
    <div className="flex justify-center gap-5 flex-wrap mt-16 w-[95%] mx-auto">
      {posts !== [] && posts.map((story) =>
        <Story story={story}/>
      )}
    </div>

  )
}

export default Stories