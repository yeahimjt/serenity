import React, { useEffect, useState } from 'react'
import { timeSince } from '../functions/TimeSince'
import { getUsersPicture } from '../actions/users'
import { useNavigate } from 'react-router-dom'
import DefaultPicture from '../assets/default-person.png'

const MostInspiring = ({story}) => {
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
    <div className="flex flex-[1] flex-col min-w-[325px] tablet:max-w-[625px] tablet:h-[458px] my-4 tablet:my-0 hover:scale-[1.01] cursor-pointer transition-all" onClick={(e) => nav(`/story/${story._id}`)}>
      {story.images ? 
          <div className="flex-[0.45] h-full w-full bg-[color:var(--gray)] rounded-general">
            <img className="rounded-general h-[206.59px] w-full object-cover" src={story.images.url} alt=""/>
          </div>
        :
          <div className="w-full h-[206px] bg-[color:var(--gray)] rounded-general">
            
          </div>
        }
          <div className="flex-[0.55] text-ellipsis mx-6 gap-2 z-20">
            <section className="flex gap-2 justify-start items-center mt-2 hover:bg-[color:var(--gray)] rounded-full cursor-pointer py-2 w-fit px-2" onClick={(e) => {nav(`/profile/${story.user_id}`); e.cancelBubble = true; if (e.stopPropagation) e.stopPropagation();}}>
              {picture &&
                <img className="w-[35px] h-[35px] rounded-full" src={picture || DefaultPicture} alt=""/>
              }
              <div className="flex gap-2 items-center">
                <p className="font-base text-base text-gray-500">{story.full_name.split(" ") > 2 ? story.full_name.split(" ")[0] + ' ' +  story.full_name.split(" ")[2][0] + '.' : story.full_name.split(" ")[0] + ' ' + story.full_name.split(" ")[1][0] + '.'}</p>
              </div>
              <p className="font-base text-base text-gray-500">&#x2022;</p>
              <p className="font-base text-base text-gray-500">{timeSince(new Date(story.createdAt))}</p>
            </section>
            <section className="pt-2 flex flex-col gap-2">
              <h1 className="h-[60px] font-important text-med line-clamp-2 overflow-hidden">{story.title}</h1>
              <p className="h-[99px] font-base text-base line-clamp-4 overflow-hidden">{story.message}</p>
              <p className="flex-[1] font-base text-base overflow-hidden text-gray-500">{readingTime(story.message)} minute read</p>
            </section>
          <hr className="pt-4 tablet:hidden"/>
          </div>
    </div>
  )
}

export default MostInspiring