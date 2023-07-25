import React, { useEffect, useState } from 'react'
import { getMessages, getUsersMessaged } from '../actions/dmMessages'
import DefaultPicture from '../assets/default-person.png'
const UsersMessages = ({userMessaging,setUserMessaging}) => {
    const [profiles, setProfiles] = useState(null)
    const [existing, setExisting] = useState(null)
    useEffect(()=> {
        getMessages(setExisting)
    },[])
    useEffect(()=> {
        getUsersMessaged(existing, setProfiles)
    },[existing])
    console.log(userMessaging, profiles)

  return (
    <div className="py-4 overflow-auto">
        {profiles &&
            profiles.map((profile) => 
            <>
                { userMessaging?._id === profile?._id ?
                    <div className="w-[5px] h-[81px] bg-[color:var(--blue)] absolute left-0"></div>
                    :
                    ''
                }
                <div className="w-full  flex font-base text-med justify-evenly items-center relative cursor-pointer hover:bg-[color:var(--black)] hover:text-white p-2 group" onClick={()=>setUserMessaging(profile)}>
                    {profile.images ? 
                        <img className="w-[65px] h-[65px] rounded-full" src={profile.images.url || DefaultPicture} alt=""/>
                        :
                        <div className="w-[65px] h-[65px] rounded-full bg-[color:var(--black)] flex items-center justify-center text-white group-hover:bg-white group-hover:text-[color:var(--black)]">{profile.full_name.charAt(0).toLowerCase()}</div>
                    }
                <h1 className="overflow-ellipsis">{profile.full_name}</h1>
                </div>
            </>
            )
        }
    </div>
  )
}

export default UsersMessages