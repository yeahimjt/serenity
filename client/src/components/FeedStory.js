import React, { useEffect, useState } from 'react'
import { timeSince } from '../functions/TimeSince'
import { getUsersPicture } from '../actions/users'
import { useNavigate } from 'react-router-dom'
import DefaultPicture from '../assets/default-person.png'
import { BsFillLightbulbOffFill, BsLightbulb, BsLightbulbFill, BsLightbulbOff, BsThreeDots } from 'react-icons/bs'
import { MdLightbulbCircle } from 'react-icons/md'

const FeedStory = ({story}) => {
  const [picture, setPicture] = useState(null)
  const nav = useNavigate()
  useEffect(()=> {
    getUsersPicture(story?.user_id,setPicture)
  },[story])
  function readingTime(text) {
    const wpm = 255;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time
  }
  return (
    <div className="flex flex-col my-4 tablet:my-0 p-4 hover:scale-[1.01] cursor-pointer transition-all border-2 rounded-login gap-4" onClick={() => nav(`/story/${story._id}`)}>
        <div className="flex justify-between items-center">
            <section className="flex gap-4 items-center">
            {picture &&
                <img className="w-[70px] h-[70px] rounded-full" src={picture || DefaultPicture} alt=""/>
            }
            <div>
                <p className="font-base text-med">{story.full_name.split(" ") > 2 ? story.full_name.split(" ")[0] + ' ' +  story.full_name.split(" ")[2][0] + '.' : story.full_name.split(" ")[0] + ' ' + story.full_name.split(" ")[1][0] + '.'}</p>
                <p className="font-base text-base text-gray-500">{timeSince(new Date(story.createdAt))}</p>
            </div>
            </section>
            <BsThreeDots className="relative right-4" size={24}/>
        </div>
        <div className="flex gap-4 ">
            {story.images ? 
            <div className="flex-[0.45] h-full w-full bg-[color:var(--gray)]">
                <img className=" h-[206.59px] w-full object-cover" src={story.images.url} alt=""/>
            </div>
            :
            <div className="flex-[0.45] w-full h-[206.09px] bg-[color:var(--gray)]">

            </div>
            }
            <section className="flex flex-[0.55] flex-col gap-4">
                <h1 className="h-[60px] font-important text-med line-clamp-2 overflow-hidden">{story.title}</h1>
                <p className="h-[99px] font-base text-base line-clamp-4 overflow-hidden">{story.message}</p>
            </section>

        </div>
        <p className="flex-[1] font-base text-base text-right overflow-hidden text-gray-500">{readingTime(story.message)} minute read</p>
    </div>
  )
}

export default FeedStory
