import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOut, updateUsers } from '../actions/users'
import { MdEdit } from 'react-icons/md'
import DefaultPerson from '../assets/default-person.png'
const Profile = () => {
    const profile = useSelector((state)=> state.users)
    const dispatch = useDispatch()
    const nav = useNavigate()
    const handleLogOut = () => {
        dispatch(logOut())
        nav('/')
    }
    const [updateProfile, setUpdateProfile] = useState({full_name: '', email_address: '', image: '' })
    const [image, setImage] = useState(profile.user.source || null)
    const handleImage = (e) => {
        const file = e.target.files[0]
        setFileToBase(file)
        // setImage(file.name)
    }
    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            console.log(reader)
            setImage(reader.result)
            console.log(image)
        }
    }
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUsers(updateProfile, image))
    }
  return (
    <div className="flex flex-col gap-4 m-base tablet:w-[70%] tablet:mx-auto">
        <div className="flex gap-8">
            <div className="flex-[0.15]">
                {image ?
                    <label className=" rounded-full w-[150px] h-[150px] hover:bg-black/70 cursor-pointer group flex justify-center items-center" htmlFor="file">
                        <img className="rounded-full w-[150px] h-[150px]  flex justify-center items-center object-scale-down" src={image || profile?.user.images.url} alt=""/>
                        <MdEdit className="hidden group-hover:block z-20 absolute" size={44}/>
                        <input className="hidden" type="file" name="file" id="file" onChange={handleImage}></input>
                    </label>
                :
                <label className="rounded-full w-[150px] h-[150px] hover:bg-black/70 cursor-pointer group flex justify-center items-center" htmlFor="file">
                    <img className="rounded-full w-[150px] h-[150px]  flex justify-center items-center object-scale-down" src={profile?.user.images ? profile?.user.images.url : DefaultPerson} alt=""/>
                    <MdEdit className="hidden group-hover:block" size={44}/>
                    <input className="hidden" type="file" name="file" id="file" onChange={handleImage}></input>
                </label>
                }
                
            </div>
            <div className="flex-[0.85]">
                <div className="flex flex-col justify-center h-full gap-4">
                    <div className="flex justify-between">
                        <h2 className="font-base text-med cursor-pointer">2047<br/>Followers</h2>
                        <h2 className="font-base text-med cursor-pointer">1047<br/>Following</h2>
                        <h2 className="font-base text-med cursor-pointer">47<br/>Stories</h2>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-[color:var(--blue)] px-8 py-1 text-white rounded-input" onClick={handleLogOut}>Log Out</button>
                        <button className="border-2 border-[color:var(--black)] px-8 py-1 rounded-input">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <section>
            <h1 className="font-important text-big">{profile ? profile?.user.full_name : ''}</h1>
            <p className="font-base text-med">{profile ? profile?.user.email_address : ''}</p>
        </section>
        <div className="flex justify-between">
            <p className="hover:underline decoration-[color:var(--blue)] underline-offset-8 cursor-pointer">My Details</p>
            <p className="hover:underline decoration-[color:var(--blue)] underline-offset-8 cursor-pointer">Profile</p>
            <p className="hover:underline decoration-[color:var(--blue)] underline-offset-8 cursor-pointer">Privacy</p>
        </div>
        <hr/>
        <div className="flex gap-12 py-8">
            <label className="flex-[0.2] font-base text-med text-[color:var(--black)]" htmlFor="full_name">Full Name</label>
            <input className="w-[368px] h-[53px] border-2 border-[color:var(--black)] rounded-input px-4 py-2" id="full_name" placeholder={profile ? profile?.user.full_name : ''} onChange={(e)=> setUpdateProfile({...updateProfile, full_name: e.target.value})}/>
        </div>
        <hr/>
        <div className="flex gap-12 py-8">
            <label className="flex-[0.2] font-base text-med text-[color:var(--black)]" htmlFor="email_address">Email Address</label>
            <input className="w-[368px] h-[53px] border-2 border-[color:var(--black)] rounded-input px-4 py-2" id="email_address" placeholder={profile ? profile?.user.email_address : ''} onChange={(e)=> setUpdateProfile({...updateProfile, email_address: e.target.value})}/>
        </div>
        <hr/>
        <div className="flex gap-12 py-8">
            <label className="flex-[0.2] font-base text-med text-[color:var(--black)]" htmlFor="dob">Date of Birth</label>
            <input className="w-[368px] h-[53px] border-2 border-[color:var(--black)] rounded-input px-4 py-2" id="dob" type="date"/>
        </div>
        <hr/>
        <p className="font-base italic text-sm pt-2">Any changes will not be made unless submitted</p>
        <button className="bg-[color:var(--blue)] w-[210px] h-[31px] rounded-input text-white" onClick={onSubmit}>Submit Changes</button>
    </div>
  )
}

export default Profile

