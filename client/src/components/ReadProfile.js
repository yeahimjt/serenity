import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { followUser, getUserSecretly } from '../actions/users'
import DefaultPerson from '../assets/default-person.png'
import { useDispatch, useSelector } from 'react-redux'
import { usersPosts } from '../actions/posts'
import Story from './Story'
const ReadUser = () => {
    const {id} = useParams()
    const log_user = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const [user, setUser] = useState(null)
    const [filterText, setFilterText] = useState(null)
    const [following, setFollowing] = useState(null)
    useEffect(()=> {
        getUserSecretly(id, setUser)
        usersPosts(id, setFilterText)
    },[])
    useEffect(()=> {
        if (Object.keys(log_user.user).length !== 0 && log_user.constructor === Object) {
            if (log_user?.user.follow_list.user_id.includes(id)) {
                setFollowing(true)
            }
            else {
                setFollowing(false)
            }
        }

    },[log_user, id])
    const handleFollow = () => {
        if (log_user?.user.id === id) {
            dispatch({type: "SET_MESSAGE", payload: {"error": "You can not follow yourself!"}})
        }
        else {
            dispatch(followUser(id, (log_user?.user.follow_list.user_id.includes(id) ? true : false)))
        }
    }
  return (
    <div className="flex flex-col gap-4 m-base tablet:w-[70%] tablet:mx-auto">
        <div className="flex gap-8">
            <div className="flex-[0.25]">
                <img className="rounded-full w-[150px] h-[150px]  flex justify-center items-center object-scale-down" src={user?.images ? user?.images.url : DefaultPerson} alt=""/>                
            </div>
            <div className="flex-[0.75]">
                <div className="flex flex-col justify-center h-full gap-4">
                    <div className="flex justify-between">
                        {user?.follower_list ?
                        <h2 className="font-base text-med cursor-pointer">{user?.follower_list.user_id.length || 0}<br/>Followers</h2>
                        :
                        <h2 className="font-base text-med cursor-pointer">0<br/>Followers</h2>
                        }
                        {user?.follow_list ?
                        <h2 className="font-base text-med cursor-pointer">{user?.follow_list.user_id.length || 0}<br/>Following</h2>
                        :
                        <h2 className="font-base text-med cursor-pointer">0<br/>Following</h2>
                        }
                        <h2 className="font-base text-med cursor-pointer">47<br/>Stories</h2>

                    </div>
                    <div className="flex gap-4">
                        <button className="bg-[color:var(--blue)] px-8 py-1 text-white rounded-input" onClick={handleFollow}>{ following ? 'Following' : 'Follow' || 'Follow'}</button>
                        <button className="border-2 border-[color:var(--black)] px-8 py-1 rounded-input">Message</button>
                    </div>
                </div>
            </div>
        </div>
        <section>
            <h1 className="font-important text-big">{user?.full_name}</h1>
            <p className="font-base text-med">{user?.email_address}</p>
        </section>
        <hr />
        <div className="flex flex-wrap gap-5">
            {filterText && filterText.map((post,index) => 
                <Story key={index} story={post}/>
            )}
        </div>
    </div>
  )
}

export default ReadUser