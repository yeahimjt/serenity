import React from 'react'
import DefaultPerson from '../assets/default-person.png'
const SearchUser = ({user, selected,setSelected}) => {
  return (
    <div className={selected === user ? "flex my-2 items-center gap-4 bg-[color:var(--black)] text-white p-4 cursor-pointer" : "flex my-2 items-center gap-4 hover:bg-[color:var(--gray)] p-4 cursor-pointer"} onClick={()=>setSelected(selected === user ? null : user)}>
        {user.images ?
            <img className="w-[65px] h-[65px] rounded-full" src={user?.images.url} alt=""/>
            :
            <img className="w-[65px] h-[65px] rounded-full" src={DefaultPerson} alt=""/>
        }
        <h1 className="font-important text-med">{user?.full_name}</h1>
    </div>
  )
}

export default SearchUser