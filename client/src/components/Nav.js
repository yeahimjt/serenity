import React, { useRef, useState } from 'react'
import {LuBell, LuBellRing} from 'react-icons/lu'
import { Link } from 'react-router-dom'
import {BsHammer, BsPencilSquare} from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { Menu, MenuItem, MenuButton, MenuDivider, useHover, ControlledMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
const Nav = ({mobileMenu, setMobileMenu}) => {
  const user = useSelector((state)=> state.users)
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const { anchorProps, hoverProps } = useHover(isOpen, setOpen);

  return (
    <nav className="flex justify-between h-[80px] p-4 font-base select-none">
      <div className="flex items-center gap-8">
        <Link className="text-[color:var(--blue)] font-important text-big" to='/'>Serenity Spirit</Link>
        <hr className='rotate-180 border-[1px] border-[color:var(--black)] h-full nav:block hidden'/>
        <div className="hidden items-center gap-8 nav:flex">
          <Link className="text-med" to="/stories">Stories</Link>
          <Link className="text-med" to="/feed">Timeline</Link>
          <Link className="text-med" to="/creators">Creators</Link>
          <Link className="text-med" to="/messages">Messages</Link>
          {/* <input className="border-2 rounded-input p-2 w-[240px] "/> */}
        </div>
      </div>
      <div className="flex items-center gap-8 text-med ">
        {user.isLoggedIn &&
        <Link className=" gap-2 items-center hidden nav:flex" to="/write"><BsPencilSquare size={20}/>Write</Link>
        }
        <LuBell size={24} />
        {user.isLoggedIn ? 
          // <Link className="bg-gray-400 rounded-full w-[50px] h-[50px] flex items-center justify-center cursor-pointer" to="/profile"></Link>
            user.user.source ? 
              <>
              <img className="w-[50px] h-[50px] rounded-full select-none" src={user.user.source} ref={ref} {...anchorProps} alt=""/>
              <ControlledMenu {...hoverProps} state={isOpen? 'open' : 'closed'} anchorRef={ref} onClose={()=>setOpen(false)} transition>
                <MenuItem className="p-0">
                  <Link className="w-full px-4 py-2" to="/profile">Profile</Link>
                </MenuItem>
                <MenuItem className="p-0">
                  <Link className="w-full px-4 py-2" to="/mystories">My Stories</Link>
                </MenuItem>
              </ControlledMenu>
              </>
            :
            <>
              <div className="bg-gray-400 rounded-full w-[50px] h-[50px] flex items-center justify-center cursor-pointer  select-none" ref={ref} {...anchorProps}></div>
              <ControlledMenu {...hoverProps} state={isOpen? 'open' : 'closed'} anchorRef={ref} onClose={()=>setOpen(false)} transition>
              <MenuItem className="p-0">
                <Link className="w-full px-4 py-2" to="/profile">Profile</Link>
              </MenuItem>
              <MenuItem className="p-0">
                <Link className="w-full px-4 py-2" to="/mystories">My Stories</Link>
              </MenuItem>
            </ControlledMenu>
            </>
          :
          <Link className="bg-[color:var(--blue)] text-white px-8 py-2 rounded-full" to="/login">Login</Link> 
        }
        <AiOutlineMenu className="nav:hidden block cursor-pointer" size={24} onClick={()=>setMobileMenu(true)}/>
      </div>
      {mobileMenu &&
      <div className="fixed w-screen h-screen left-0 top-0  z-50 nav:hidden flex flex-col   py-4 px-2 bg-black/80 text-white font-important overflow-auto">
        <AiOutlineClose className="cursor-pointer right-7 top-6  absolute" size={32} onClick={()=>setMobileMenu(false)}/>
        <section className="flex flex-col items-center justify-start gap-8 w-full pt-8">
          <Link className="text-big hover:underline" to="/stories" onClick={()=>setMobileMenu(false)}>Stories</Link>
          <Link className="text-big hover:underline" to="/feed" onClick={()=>setMobileMenu(false)}>Timeline</Link>
          <Link className="text-big hover:underline" to="/creators" onClick={()=>setMobileMenu(false)}>Creators</Link>
          <Link className="text-big hover:underline" to="/messages" onClick={()=>setMobileMenu(false)}>Messages</Link>
          {user.isLoggedIn &&
            <Link className="flex gap-2 items-center text-big hover:underline" to="/write" onClick={()=>setMobileMenu(false)}><BsPencilSquare size={24}/>Write</Link>
          }
        </section>
      </div>
      }
    </nav>
  )
}


export default Nav