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
    <>
    <div>Stories</div>
    <Story />
    </>
  )
}

export default Stories