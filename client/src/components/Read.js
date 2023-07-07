import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { getPostsById } from '../actions/posts'
import { getUsersPicture } from '../actions/users'
import { timeSince } from '../functions/TimeSince'

const Read = () => {
    const {id} = useParams()
    const [post, setPost] = useState(null)
    const [picture, setPicture] = useState(null)
    const nav = useNavigate()
    useEffect(() => {
        getPostsById(id, setPost)
    },[])
    useEffect(()=> {
        getUsersPicture(post?.user_id,setPicture)
    },[post])
  return (
    <div className="flex flex-col w-[85%] mx-auto my-16 gap-4">
        <div className="flex justify-between items-end flex-wrap">
        <h1 className="font-important text-big w-[65%]">{post?.title}</h1>
            <section className="flex gap-2 justify-center items-center mt-2 hover:bg-[color:var(--gray)] rounded-full cursor-pointer p-4" onClick={()=> nav(`/profile/${post.user_id}`)}>
            {picture &&
                    <img className="w-[35px] h-[35px] rounded-full" src={picture} alt=""/>
            }
              <div className="flex gap-2 items-center">
                <p className="font-base text-base">{post?.full_name.split(" ") > 2 ? post?.full_name.split(" ")[0] + ' ' +  post?.full_name.split(" ")[2][0] + '.' : post?.full_name.split(" ")[0] + ' ' + post?.full_name.split(" ")[1][0] + '.'}</p>
              </div>
              <p className="font-base text-base">&#x2022;</p>
              <p className="font-base text-base">{timeSince(new Date(post?.createdAt))}</p>
            </section>
        </div>
        {post?.images ? 
          <div className="w-full h-[350px] bg-cover bg-local bg-left-top rounded-general bg-no-repeat" style={{backgroundImage: `url(${post?.images.url})`}}></div>
        :
        ''
        }
        <p className="font-base text-med whitespace-pre-wrap w-full pt-16">
            {post?.message}
        </p>
    </div>
  )
}

export default Read