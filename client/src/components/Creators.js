import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { filterUsers, getUsers } from '../actions/users'
import Creator from './Creator'

const Creators = () => {
    const [users,setUsers] = useState(null)
    const [filter, setFilter] = useState("all")
    useEffect(()=> {
      if (filter === 'all') {
        getUsers(setUsers)
      }
      else {
        filterUsers(filter, setUsers)
      }
    },[filter])
  return (
    <div className="mt-16 gap-2 mx-8 h-[100vh] overflow-auto mb-16">
      {/* <section className="flex-[0.3] filters:fixed filters:flex-[0]">
      
      </section> */}
      <div className="relative">
        <section className='fixed'>
        <h1 className="text-med font-important">Creator Filters</h1>
      <div className="w-[260px]">
          <ul className="border-2 px-4 py-2 rounded-login text-base font-base">
            <div className="flex justify-between my-2 hover:bg-[color:var(--gray)] rounded-input px-1 cursor-pointer" onClick={()=>setFilter("all")}>
              <li className={filter==="all" ? "text-[color:var(--blue)]" : ""}>All</li>
            </div>
            <div className="flex justify-between my-2 hover:bg-[color:var(--gray)] rounded-input px-1 cursor-pointer" onClick={()=>setFilter("inspiring")}>
              <li className={filter==="inspiring" ? "text-[color:var(--blue)]" : ""}>Most Inspiring</li>
            </div>
            <div className="flex justify-between my-2 hover:bg-[color:var(--gray)] rounded-input px-1 cursor-pointer" onClick={()=>setFilter("recent")}>
              <li className={filter==="recent" ? "text-[color:var(--blue)]" : ""}>Most Recent</li>
            </div>
            <div className="flex justify-between my-2 hover:bg-[color:var(--gray)] rounded-input px-1 cursor-pointer" onClick={()=>setFilter("stories")}>
              <li className={filter==="stories" ? "text-[color:var(--blue)]" : ""}>Most Stories</li>
            </div>
          </ul>
      </div>
        </section>
      </div>
      <div className="flex gap-5 flex-wrap mb-16  w-[calc(100vw-400px)] relative left-[300px]">
        {users ? users.map((user)=> 
            <Creator story={user}/>
        )
        :
        ''
        }
      </div>
    </div>
  )
}

export default Creators