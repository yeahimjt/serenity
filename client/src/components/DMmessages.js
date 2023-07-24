import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { MdOutlineExitToApp } from 'react-icons/md'
import { BsFillSendCheckFill, BsArrowLeft } from 'react-icons/bs'
import { BiMessageAdd } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import {uniqBy} from 'lodash'
import { searchUsers } from '../actions/users'
import SearchUser from './SearchUser'
import UserMessaging from './UserMessaging'
import { getMessages, messageHistory } from '../actions/dmMessages'
import UsersMessages from './UsersMessages'
const DMmessages = () => {

    // state variables for messaging

    const [modal, setModal] = useState(null)
    const [search,setSearch] = useState(null)
    const [results, setResults] = useState(null)
    const [timeout, setTimeOut] = useState(null)
    const [process, setProcess] = useState(null)
    const [selected,setSelected] = useState(null)
    const [newMessageText,setNewMessageText] = useState(null)
    const [messageText, setMessageText] = useState([])
    const [userMessaging, setUserMessaging] = useState(null)
    const [existing, setExisting] = useState(null)
    const profile = useSelector((state)=> state.users)
    const socket = useSelector((state)=> state.socket.ws)

    // upon message page being mounted, add a listener for incoming messages

    useEffect(()=> {
        if (socket) {
            socket.addEventListener('message', handleMessage)
        }
    },[socket])

    useEffect(()=> {
        setMessageText([])
        messageHistory(userMessaging?._id, setMessageText)

    },[userMessaging])
    // handle incoming messages by grabbing online users or messages from user
    function handleMessage(ev) {
        const messageData = JSON.parse(ev.data);
        if ('online' in messageData) {
            showOnlinePeople(messageData.online);
        } else if ('text' in messageData) {
            setMessageText(prev => ([...prev, {...messageData}]))
        }
    }

    function showOnlinePeople(peopleArray) {
        const people = {};
        peopleArray.forEach(({id,full_name}) => {
            people[id] = full_name;
        });
    }

    // send messages to selected user (either by ws socket or store in mongodb)
    const sendMessage = (e) => {
        e.preventDefault()
        setNewMessageText(null)
        socket.send(JSON.stringify({
            recipient: userMessaging._id,
            sender: profile.user.id,
            text: newMessageText,
        }))
        setMessageText(prev=> ([...prev, {sender: profile.user.id, recipient: userMessaging._id,text:newMessageText, _id: Date.now()}]))
    }
    // call search user function as user types, specifically only call as they stop typing (to prevent spam)
    useEffect(() => {
        if (search !== null) {
            setProcess(true)
            setTimeOut(
                setTimeout(()=> {
                    searchUsers(search, setResults);
                    setProcess(null)
                },100)
                )
            }
        },[search])
        
        // For sake of development process, remove any unnecessary double rendered messages
        const messagesDupeless = uniqBy(messageText, '_id')

  return (
    <>
    <div className="h-screen flex">
        <div className="flex-[0.25] max-w-[350px] bg-[color:var(--gray)] h-screen flex flex-col">
            <Link to="/" className="text-[color:var(--blue)] font-important text-base flex gap-1 p-4 w-fit"><MdOutlineExitToApp className="rotate-180" size={24}/> Back To Serenity Spirit</Link>
            <section className="flex flex-col flex-grow gap-4 mx-4 my-2">
                <h1 className="font-important text-5xl">Direct Messages</h1>
                <UsersMessages userMessaging={userMessaging} setUserMessaging={setUserMessaging}/>
            </section>
            <button className="bg-[color:var(--blue)] m-4  flex justify-center tablet:gap-2 items-center font-important text-sm p-2 text-white rounded-input tablet:text-med" onClick={()=>setModal(true)}>
                <BiMessageAdd className="" size={30}/>
                <h1>Start A New Conversation</h1>
            </button>
        </div>
        <div className="flex-[0.75] flex flex-col">
            {
                userMessaging ?
                <>
                    <UserMessaging messages={messagesDupeless} user={userMessaging}/>
                    <form className="flex m-4 h-[40px] items-center" onSubmit={(e)=>sendMessage(e)}>
                        <input className="border flex-grow p-3 rounded-input" value={newMessageText || ''} type="text" placeholder="Enter your message here..." onChange={(e)=> setNewMessageText(e.target.value)}></input>
                        <button className="m-4 p-3 bg-[color:var(--blue)] text-white rounded-input"><BsFillSendCheckFill size={24}/></button>
                    </form>
                </>
                :
                <div className="flex-grow flex items-center justify-center text-[color:var(--black)] gap-4"><BsArrowLeft size={20} /> Select A User To Start Messaging</div>

            }
            
        </div>
    </div>
    {modal &&
        <div className="w-screen h-screen bg-black/40 absolute z-50 top-0 flex justify-center items-center">
            <div className="w-[80%] max-w-[600px] bg-white flex flex-col p-6 rounded-login relative">
                <section className="flex justify-between">
                    <h1 className="font-important text-med">Select A User To Message</h1>
                    <AiOutlineClose className="hover:cursor-pointer" size={24} onClick={()=>setModal(false)}/>
                </section>
                <input className="border-2 rounded-input px-4 py-2 my-2" placeholder="Start by entering their name" onChange={(e)=> {setSearch(e.target.value); clearTimeout(timeout)}}/>
                {process &&
                    <h1>Searching for user...</h1>
                }
                {results &&
                    results?.map((user) =>
                        <SearchUser user={user} selected={selected} setSelected={setSelected}/>
                    )
                }
                {selected &&
                    <button className="bg-[color:var(--blue)] text-white py-1 my-2" onClick={()=>{setUserMessaging(selected); setModal(false)}}>Select User</button>
                }
            </div>
        </div>
    }
    </>
  )
}

export default DMmessages