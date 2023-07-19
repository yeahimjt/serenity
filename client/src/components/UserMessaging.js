import React, { useEffect, useRef } from 'react'
import DefaultPerson from '../assets/default-person.png'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const UserMessaging = ({messages,user}) => {
    const profile = useSelector((state)=> state.users)
    const nav = useNavigate()
    const messageBoxRef=useRef()
    useEffect(()=> {
      messageBoxRef.current?.scrollIntoView()
  },[messages])
  return (
    <>
    <div className="flex-grow flex flex-col m-4 overflow-auto h-full">
        <div className="flex gap-4 items-center font-important text-med cursor-pointer hover:bg-[color:var(--gray)] p-4" onClick={()=> nav(`/profile/${user._id}`)}>
            <img className="w-[65px] h-[65px] rounded-full" src={user?.images ? user.images?.url : DefaultPerson} alt="" />
            <h1>{user.full_name}</h1>
        </div>
        <hr className="my-4"/>
        {messages.map((message)=> 
          <div className={message.sender === profile.user.id ? "flex justify-end" : "flex justify-start"}>
            <h1 className={message.sender === profile.user.id ? "bg-[color:var(--blue)] text-white w-fit px-4 py-2 rounded-input mb-4 max-w-[450px]" : "bg-[color:var(--black)] text-white w-fit px-4 py-2 rounded-input mb-4 max-w-[450px]"}>{message.text}</h1>
          </div>
        )}
        <div ref={messageBoxRef} />
    </div>
    </>
  )
}

export default UserMessaging