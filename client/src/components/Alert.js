import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import {TbAlertSquareFilled,TbCheckbox} from 'react-icons/tb'

import {AiOutlineClose} from 'react-icons/ai'
const Alert = () => {
    const alert = useSelector((state) => state.messages)
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch({ type: "CLEAR_MESSAGE" })
    }
  return (
    <>
        {alert.message && alert.message.error &&
            <div className="fixed bottom-0 right-0 mx-8 my-4 bg-[color:var(--alert)] border-2 border-[color:var(--alert-border)] flex items-center gap-4 text-med pr-16 pl-4 py-4 select-none">
                <TbAlertSquareFilled size={32} className="text-[color:var(--alert-border)]" />
                <h1 className="text-black">{alert.message.error}</h1>
                <div className=" cursor-pointer  hover:text-[color:var(--blue)] hover:scale-105 absolute right-4 top-4">
                    <AiOutlineClose className="" size={18} onClick={handleClose}/>
                </div>
            </div>
        }
        {alert.message && alert.message.success &&
            <div className="fixed bottom-0 right-0 mx-8 my-4 bg-[color:var(--success)] border-2 border-[color:var(--success-border)] flex items-center gap-4 text-med pr-16 pl-4 py-4 select-none">
                <TbCheckbox size={32} className="text-[color:var(--success-border)]" />
                <h1 className="text-black">{alert.message.success}</h1>
                <div className=" cursor-pointer  hover:text-[color:var(--blue)] hover:scale-105 absolute right-4 top-4">
                    <AiOutlineClose className="" size={18} onClick={handleClose}/>
                </div>
            </div>
        }
    </>
  )
}

export default Alert