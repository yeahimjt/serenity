import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
    const profile = useSelector((state)=> state.users)
    console.log(profile)
  return (
    <div>Home</div>
  )
}

export default Home