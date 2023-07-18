import React from 'react'
import DefaultPerson from '../assets/default-person.png'
import { useNavigate } from 'react-router-dom'
const UserMessaging = ({messages,user}) => {
    console.log(messages)
    const nav = useNavigate()
  return (
    <div className="flex-grow flex flex-col m-4">
        <div className="flex gap-4 items-center font-important text-med cursor-pointer hover:bg-[color:var(--gray)] p-4" onClick={()=> nav(`/profile/${user._id}`)}>
            <img className="w-[65px] h-[65px] rounded-full" src={user?.images ? user.images?.url : DefaultPerson} alt="" />
            <h1>{user.full_name}</h1>
        </div>
        <hr className="my-4"/>
        {messages.map((message)=> 
          <div className={message.isMine ? "flex justify-end" : "flex justify-start"}>
            <h1 className={message.isMine ? "bg-[color:var(--blue)] text-white w-fit px-4 py-2 rounded-input mb-4 max-w-[450px]" : "bg-[color:var(--black)] text-white w-fit px-4 py-2 rounded-input mb-4 max-w-[450px]"}>{message.text}</h1>
          </div>
        )}
    </div>
  )
}

export default UserMessaging