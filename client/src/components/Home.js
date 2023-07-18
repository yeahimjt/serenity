import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPostsById, getPostsByInspired } from '../actions/posts'
import { timeSince } from '../functions/TimeSince'
import { getUsersPicture } from '../actions/users'
import { useNavigate } from 'react-router-dom'
import Story from './Story'
import Anxiety from '../assets/anxiety.jpg'
import Depression from '../assets/depression.jpg'
import ImposterSyndrome from '../assets/imposter_syndrome.jpg'
import PTSD from '../assets/ptsd.jpg'
import SocialIsolation from '../assets/social_anxiety.jpg'
import Stress from '../assets/stress.jpeg'
import MostInspiring from './MostInspiring'


const Home = () => {
  const [highlight, setHighlight] = useState(null)
  const nav = useNavigate()
  useEffect(() => {
    getPostsById('64abd59d81f2cad345208c77', setHighlight)
    getPostsByInspired(setInspired)

  }, [])
  function readingTime(text) {
    if (text) {
      const wpm = 255;
      const words = text.trim().split(/\s+/).length;
      const time = Math.ceil(words / wpm);
      return time
    }
  }
  const [picture, setPicture] = useState(null)
  const [inspired, setInspired] = useState(null)

  useEffect(()=> {
    getUsersPicture(highlight?.user_id,setPicture)

  },[highlight])
  return (
    <>
    <header className="mx-8 mt-4 bg-[color:var(--gray)] rounded-general py-12">
      <h3 className="font-important text-med text-center">Welcome to <i className="">Serenity Spirit</i></h3>
      <h2 className="font-base text-big text-center pt-2">Unleash the Power of Your Story</h2>
      <h1 className="font-base tablet:text-big text-med text-center"><b className="text-[color:var(--blue)]">Empower</b> Yourself 💪, <b className="text-[color:var(--blue)]">Inspire</b> Others 💡</h1>
    </header>
    <div className="mx-8 py-12 flex tablet:flex-row flex-col">

      {highlight ? 
          <section className="flex-[0.35] h-full w-full bg-[color:var(--gray)] rounded-general">
            <img className="rounded-general w-full h-[206.59px] wide:h-full object-cover" src={highlight && highlight?.images.url} alt=""/>
          </section>
        :
          <section className="flex-[0.45] w-full  bg-[color:var(--gray)] rounded-general">
            
          </section>
        }

      <section className="flex-[0.55] text-ellipsis mx-6 gap-2 z-20 cursor-pointer group" onClick={() => nav(`/story/${highlight._id}`)}>
            <section className="flex tablet:w-[350px] py-2 gap-4 justify-start items-center mt-2 hover:bg-[color:var(--gray)] rounded-full cursor-pointer" onClick={() => nav(`/profile/${highlight?.user_id}`)}>
              {picture &&
                <img className="w-[35px] h-[35px] rounded-full" src={picture} alt=""/>
              }
              <div className="flex gap-2 items-center">
                <p className="font-base text-base text-gray-500">{highlight?.full_name.split(" ") > 2 ? highlight?.full_name.split(" ")[0] + ' ' +  highlight?.full_name.split(" ")[2][0] + '.' : highlight?.full_name.split(" ")[0] + ' ' + highlight?.full_name.split(" ")[1][0] + '.'}</p>
              </div>
              <p className="font-base text-base text-gray-500">&#x2022;</p>
              <p className="font-base text-base text-gray-500">{timeSince(new Date(highlight?.createdAt))}</p>
            </section>
            <section className="pt-2 flex flex-col gap-2">
              <h1 className="h-[75px] font-important text-med tablet:text-4xl line-clamp-2 overflow-hidden group-hover:text-[color:var(--blue)]">{highlight?.title}</h1>
              <p className="h-[100px] wide:h-[110px] font-base wide:text-med line-clamp-4 overflow-hidden">{highlight?.message}</p>
              <p className="flex-[1] font-base text-base overflow-hidden text-gray-500">{readingTime(highlight?.message)} minute read</p>
            </section>
          <hr className="pt-4 tablet:hidden"/>
          </section>
    </div>
    <div className="mx-8">
      <h1 className="text-4xl font-important pb-6">Most Inspiring 💡</h1>
      <section className="flex flex-wrap justify-evenly gap-5">
        {inspired && inspired.map((post,index) => 
          <MostInspiring key={index} story={post}/>
        )}
      </section>
    </div>
    <div className=" py-12">
      <h1 className="font-important text-big text-center pb-6">Find A Story By Category 🗄️</h1>
      <section className="flex justify-center items-center flex-wrap gap-5 tablet:w-[75%] mx-auto pb-6">
        <div className="relative group" onClick={()=>nav(`/stories/anxiety`)}><img className="max-w-[200px] categories:max-w-[440px] rounded-general cursor-pointer"src={Anxiety}  alt=""/><p className="absolute top-0 w-full bg-black/40 text-white font-important text-med categories:text-big h-full flex justify-center items-center rounded-general group-hover:hidden">Anxiety</p></div>
        <div className="relative group" onClick={()=>nav(`/stories/depression`)}><img className="max-w-[200px] categories:max-w-[440px] rounded-general cursor-pointer"src={Depression}  alt=""/><p className="absolute top-0 w-full bg-black/40 text-white font-important text-med categories:text-big h-full flex justify-center items-center rounded-general group-hover:hidden">Depression</p></div>
        <div className="relative group" onClick={()=>nav(`/stories/ptsd`)}><img className="max-w-[200px] categories:max-w-[440px] rounded-general cursor-pointer"src={PTSD}  alt=""/><p className="absolute top-0 w-full bg-black/40 text-white font-important text-med categories:text-big h-full flex justify-center items-center rounded-general group-hover:hidden">PTSD</p></div>
      </section>
      <section className="flex justify-center items-center flex-wrap gap-5 tablet:w-[75%] mx-auto">
        <div className="relative group cursor-pointer" onClick={()=>nav(`/stories/imposter`)}><img className="max-w-[200px] categories:max-w-[440px] rounded-general"src={ImposterSyndrome}  alt=""/><p className="absolute top-0 w-full bg-black/40 text-white font-important text-med categories:text-big h-full flex justify-center items-center rounded-general group-hover:hidden">Imposter Syndrome</p></div>
        <div className="relative group cursor-pointer" onClick={()=>nav(`/stories/social`)}><img className="max-w-[200px] categories:max-w-[440px] rounded-general"src={SocialIsolation}  alt=""/><p className="absolute top-0 w-full bg-black/40 text-white font-important text-med categories:text-big h-full flex justify-center items-center rounded-general group-hover:hidden">Social Anxiety</p></div>
        <div className="relative group cursor-pointer" onClick={()=>nav(`/stories/stress`)}><img className="max-w-[200px] categories:max-w-[440px] h-[200px] categories:h-[440px] rounded-general"src={Stress}  alt=""/><p className="absolute top-0 w-full bg-black/40 text-white font-important text-med categories:text-big h-[200px] categories:h-[440px] flex justify-center items-center rounded-general group-hover:hidden">Stress</p></div>
      </section>
    </div>
    </>

  )
}

export default Home