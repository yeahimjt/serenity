import React from 'react'
import {LuBell, LuBellRing} from 'react-icons/lu'
import { Link } from 'react-router-dom'
import {BsPencilSquare} from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { Menu, MenuItem, MenuButton, MenuDivider } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
const Nav = () => {
  const user = useSelector((state)=> state.users)
  console.log(user.user)
  return (
    <nav className="flex justify-between h-[80px] p-4 font-base select-none">
      <div className="flex items-center gap-8">
        <Link className="text-[color:var(--blue)] font-important text-big" to='/'>Serenity Spirit</Link>
        <hr className='rotate-180 border-[1px] border-[color:var(--black)] h-full'/>
        <Link className="text-med" to="/stories">Stories</Link>
        <Link className="text-med" to="/stories">Timeline</Link>
        <Link className="text-med" to="/stories">Creators</Link>
        <Link className="text-med" to="/stories">Resources</Link>
        <input className="border-2 rounded-input p-2 w-[480px]"/>
      </div>
      <div className="flex items-center gap-8 text-med ">
        <Link className="flex gap-2 items-center" to="/write"><BsPencilSquare size={20}/>Write</Link>
        <LuBell size={24} />
        {user.isLoggedIn ? 
          // <Link className="bg-gray-400 rounded-full w-[50px] h-[50px] flex items-center justify-center cursor-pointer" to="/profile"></Link>
            user.user.source ? 
              <Menu  menuButton={<img className="w-[50px] h-[50px] rounded-full select-none" src={user.user.source} alt=""/>} transition>
                <MenuItem className="p-0">
                  <Link className="w-full px-4 py-2" to="/profile">Profile</Link>
                </MenuItem>
                <MenuItem className="p-0">
                  <Link className="w-full px-4 py-2" to="/mystories">My Stories</Link>
                </MenuItem>
              </Menu>
            :
              <Menu  menuButton={<div className="bg-gray-400 rounded-full w-[50px] h-[50px] flex items-center justify-center cursor-pointer  select-none"></div>} transition>
              <MenuItem className="p-0">
                <Link className="w-full px-4 py-2" to="/profile">Profile</Link>
              </MenuItem>
              <MenuItem className="p-0">
                <Link className="w-full px-4 py-2" to="/mystories">My Stories</Link>
              </MenuItem>
            </Menu>
          :
          <Link className="bg-[color:var(--blue)] text-white px-8 py-2 rounded-full" to="/login">Login</Link> 
        }
      </div>
      
    </nav>
  )
}

export default Nav