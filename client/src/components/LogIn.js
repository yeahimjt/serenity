import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUsers } from '../actions/users'


const LogIn = () => {
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({ full_name: '',email_address: '', password: ''})
    const user = useSelector((state) => state.users)
    const message = useSelector((state) => state.messages)
    console.log(useSelector)
    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(loginUsers(userData))
      }
      console.log(message)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* {user.user.email_address} */}
        <input name="full_name" value={userData.full_name} onChange={(e) => setUserData({...userData, full_name: e.target.value})}/>
        <input name="email_address" value={userData.email_address} onChange={(e) => setUserData({...userData, email_address: e.target.value})}/>
        <input name="password" value={userData.password} onChange={(e) => setUserData({...userData, password: e.target.value})}/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default LogIn