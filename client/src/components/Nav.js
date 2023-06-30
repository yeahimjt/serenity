import React from 'react'
import {LuBell, LuBellRing} from 'react-icons/lu'
import { Link } from 'react-router-dom'
import {BsPencilSquare} from 'react-icons/bs'
import { useSelector } from 'react-redux'
const Nav = () => {
  const user = useSelector((state)=> state.users)
  console.log(user)
  return (
    <nav className="flex justify-between h-[80px] p-4 font-base">
      <div className="flex items-center gap-8">
        <Link className="text-[color:var(--blue)] font-important text-big" to='/'>Serenity Spirit</Link>
        <hr className='rotate-180 border-[1px] border-[color:var(--black)] h-full'/>
        <Link className="text-med" to="/stories">Stories</Link>
        <Link className="text-med" to="/community">Community</Link>
      </div>
      <div className="flex items-center gap-8 text-med ">
        <Link className="flex gap-2 items-center" to="/write"><BsPencilSquare size={20}/>Write</Link>
        <LuBell size={24} />
        {user.isLoggedIn ? 
          <Link className="bg-gray-400 rounded-full w-[50px] h-[50px] flex items-center justify-center cursor-pointer" to="/profile"></Link>
          :
          <Link className="bg-[color:var(--blue)] text-white px-8 py-2 rounded-full" to="/login">Login</Link> 
        }
      </div>
    </nav>
  )
}

export default Nav