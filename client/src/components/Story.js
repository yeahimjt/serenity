import React, { useEffect, useState } from 'react'
import { timeSince } from '../functions/TimeSince'
import { getUsersPicture } from '../actions/users'
import { useNavigate } from 'react-router-dom'

const Story = ({story}) => {
  const [picture, setPicture] = useState(null)
  const nav = useNavigate()
  useEffect(()=> {
    getUsersPicture(story?.user_id,setPicture)
  },[story])
  function readingTime(text) {
    const wpm = 255;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    console.log(time)
    return time
  }

  return (
    <div className="flex flex-col tablet:max-w-[325px] tablet:h-[458px] hover:scale-[1.01] cursor-pointer" onClick={() => nav(`/story/${story._id}`)}>
      {story.images ? 
          <div className="flex-[0.45] h-full w-full bg-[color:var(--gray)] rounded-general">
            <img className="rounded-general h-[206.59px] w-full object-cover" src={story.images.url} alt=""/>
          </div>
        :
          <div className="flex-[0.45] w-full h-[206.09px] bg-[color:var(--gray)] rounded-general">

          </div>
        }
          <div className="flex-[0.55] text-ellipsis mx-6 gap-2 z-20">
            <section className="flex gap-2 justify-evenly items-center mt-2 hover:bg-[color:var(--gray)] rounded-full cursor-pointer" onClick={() => nav(`/profile/${story.user_id}`)}>
              {picture &&
                <img className="w-[35px] h-[35px] rounded-full" src={picture} alt=""/>
              }
              <div className="flex gap-2 items-center">
                <p className="font-base text-base">{story.full_name.split(" ") > 2 ? story.full_name.split(" ")[0] + ' ' +  story.full_name.split(" ")[2][0] + '.' : story.full_name.split(" ")[0] + ' ' + story.full_name.split(" ")[1][0] + '.'}</p>
              </div>
              <p className="font-base text-base">&#x2022;</p>
              <p className="font-base text-base">{timeSince(new Date(story.createdAt))}</p>
            </section>
            <section className="pt-2 flex flex-col gap-2">
              <h1 className="h-[60px] font-important text-med line-clamp-2 overflow-hidden">{story.title}</h1>
              <p className="h-[99px] font-base text-base line-clamp-4 overflow-hidden">{story.message}</p>
              <p className="flex-[1] font-base text-base overflow-hidden">{readingTime(story.message)} minute reading time</p>
            </section>
          <hr className="pt-4 tablet:hidden"/>
          </div>
    </div>
  )
}

export default Story