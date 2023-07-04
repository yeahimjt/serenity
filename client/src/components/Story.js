import React, { useEffect, useState } from 'react'
import { timeSince } from '../functions/TimeSince'
import { getUsersPicture } from '../actions/users'

const Story = ({story}) => {
  const [picture, setPicture] = useState(null)
  useEffect(()=> {
    getUsersPicture(story?.user_id,setPicture)
  },[story])
console.log(story)
  return (
    <div className="flex flex-col max-w-[325px] h-[428px] hover:scale-[1.01] cursor-pointer">
          <div className="flex-[0.45] h-full w-full bg-[color:var(--gray)] rounded-general">

          </div>
          <div className="flex-[0.55] text-ellipsis mx-6 gap-2">
            <section className="flex gap-2 justify-center items-center mt-2 hover:bg-[color:var(--gray)] rounded-full cursor-pointer">
              {picture &&
                <img className="w-[35px] h-[35px] rounded-full" src={picture} />
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
            </section>
          </div>

    </div>
  )
}

export default Story