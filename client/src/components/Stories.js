import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, getPostsByCategory } from '../actions/posts'
import Story from './Story'
import { useParams } from 'react-router-dom'

const Stories = () => {
    const {category} = useParams()
    const dispatch = useDispatch()
    const allPosts = useSelector((state)=> state.posts)
    const [filter, setFilter] = useState(category || "all")
    const [posts, setPosts] = useState(null)
    useEffect(()=> {
      dispatch(getPosts())
      window.scrollTo(0,0)
    },[dispatch])
    useEffect(()=> {

      if (filter === 'all') {
        setPosts(allPosts.posts)
      }
      else {
        getPostsByCategory(filter, setPosts)
      }
    },[filter,allPosts])
  return (
    <div className="mt-16 gap-2 mx-8 h-[100vh] overflow-auto mb-16">
      {/* <section className="flex-[0.3] filters:fixed filters:flex-[0]">
      
      </section> */}
      <div className="relative">
        <section className='fixed'>
        <h1 className="text-med font-important">Story Filters</h1>
      <div className="w-[260px]">
          <ul className="border-2 px-4 py-2 rounded-login text-base font-base">
            <div className="flex justify-between my-2 hover:bg-[color:var(--gray)] rounded-input px-1 cursor-pointer" onClick={()=>setFilter("all")}>
              <li className={filter==="all" ? "text-[color:var(--blue)]" : ""}>All</li>
              {/* <li>{allPosts.posts?.length || 0}</li> */}
            </div>
            <div className="flex justify-between my-2 hover:bg-[color:var(--gray)] rounded-input px-1 cursor-pointer" onClick={()=>setFilter("anxiety")}>
              <li className={filter==="anxiety" ? "text-[color:var(--blue)]" : ""}>Anxiety</li>
              {/* <li>{amount?.anxiety}</li> */}
            </div>
            <div className="flex justify-between my-2 hover:bg-[color:var(--gray)] rounded-input px-1 cursor-pointer" onClick={()=>setFilter("depression")}>
              <li className={filter==="depression" ? "text-[color:var(--blue)]" : ""}>Depression</li>
              {/* <li>{amount?.depression}</li> */}
            </div>
            <div className="flex justify-between my-2 hover:bg-[color:var(--gray)] rounded-input px-1 cursor-pointer" onClick={()=>setFilter("stress")}>
              <li className={filter==="stress" ? "text-[color:var(--blue)]" : ""}>Stress</li>
              {/* <li>{amount?.stress}</li> */}
            </div>
            <div className="flex justify-between my-2 hover:bg-[color:var(--gray)] rounded-input px-1 cursor-pointer" onClick={()=>setFilter("substance")}>
              <li className={filter==="substance" ? "text-[color:var(--blue)]" : ""}>Substance Dependence</li>
              {/* <li>{amount?.substance}</li> */}
            </div>
            <div className="flex justify-between my-2 hover:bg-[color:var(--gray)] rounded-input px-1 cursor-pointer" onClick={()=>setFilter("eating")}>
              <li className={filter==="eating" ? "text-[color:var(--blue)]" : ""}>Eating Disorder</li>
              {/* <li>{amount?.eating}</li> */}
            </div>
            <div className="flex justify-between my-2 hover:bg-[color:var(--gray)] rounded-input px-1 cursor-pointer" onClick={()=>setFilter("social")}>
              <li className={filter==="social" ? "text-[color:var(--blue)]" : ""}>Social Anxiety</li>
              {/* <li>{amount?.social || 0}</li> */}
            </div>
            <div className="flex justify-between my-2 hover:bg-[color:var(--gray)] rounded-input px-1 cursor-pointer" onClick={()=>setFilter("ptsd")}>
              <li className={filter==="ptsd" ? "text-[color:var(--blue)]" : ""}>PTSD</li>
              {/* <li>{amount?.ptsd || 0}</li> */}
            </div>
            <div className="flex justify-between my-2 hover:bg-[color:var(--gray)] rounded-input px-1 cursor-pointer" onClick={()=>setFilter("imposter")}>
              <li className={filter==="imposter" ? "text-[color:var(--blue)]" : ""}>Imposter Syndrome</li>
              {/* <li>{amount?.ptsd || 0}</li> */}
            </div>
          </ul>
      </div>
        </section>
      </div>
      <div className="flex gap-5 flex-wrap mb-16  w-[calc(100vw-400px)] relative left-[300px]">
        {posts ? posts.map((story, index) =>
          <Story key={index} story={story}/>
        )
        :
        ''
      }
      </div>
    </div>

  )
}

export default Stories