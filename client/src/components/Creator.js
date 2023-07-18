import React from 'react'
import DefaultPerson from '../assets/default-person.png'
import { MdMessage } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Creator = ({story}) => {
    const nav = useNavigate()
    const profile = useSelector((state)=> state.users)
    console.log(profile)
  return (
    <div className="w-[345px] h-[194px] flex flex-col border-2 px-2 cursor-pointer" onClick={()=>nav(`/profile/${story._id}`)}>
        <div className="flex h-[114px] pt-2">
            {(story.images && story.images.url) ?
                <img className="w-[128px] object-cover" src={story.images.url} />
                :
                <img className="w-[128px] object-cover" src={DefaultPerson} />
            }
            
            <div className="pl-3 pt-4">
                <h1 className="font-important text-med h-[60px]">{story.full_name}</h1>
                <section className="flex gap-4 items-center">
                    {profile.user ?
                    <button className="w-[80px] h-[25px] flex justify-center items-center bg-[color:var(--blue)] rounded-input text-white text-xs">{profile?.user?.follower_list.user_id.includes(story._id) ? 'Following' : 'Follow'}</button>
                    :
                    <button className="w-[80px] h-[25px] flex justify-center items-center bg-[color:var(--blue)] rounded-input text-white text-xs">Follow</button>
                    }
                    <button className="border-2 rounded-input p-[2px] px-2"><MdMessage size={20}/></button>
                </section>
            </div>
        </div>
        <div className="pt-2 px-4 flex justify-between">
            <section>
                <h1>{story.follower_list.user_id.length || 0}</h1>
                <p>Followers</p>
            </section>
            <section>
                <h1>{story.follow_list.user_id.length || 0}</h1>
                <p>Following</p>
            </section>
            <section>
                <h1>{story.stories}</h1>
                <p>Stories</p>
            </section>
        </div>
        
    </div>
  )
}

export default Creator