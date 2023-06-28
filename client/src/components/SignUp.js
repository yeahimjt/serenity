import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUsers } from '../actions/users'


const SignUp = () => {
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({ full_name: '',email_address: '', password: ''})
    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(createUsers(userData))
      }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="full_name" value={userData.full_name} onChange={(e) => setUserData({...userData, full_name: e.target.value})}/>
        <input name="username" value={userData.email_address} onChange={(e) => setUserData({...userData, email_address: e.target.value})}/>
        <input name="password" value={userData.password} onChange={(e) => setUserData({...userData, password: e.target.value})}/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default SignUp