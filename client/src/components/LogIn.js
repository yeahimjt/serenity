import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { createUsers, loginUsers } from '../actions/users'
import Rediscover from '../assets/rediscover.jpg'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from "yup"

const LogIn = () => {
  const dispatch = useDispatch()
  const basicSchema = yup.object().shape({
    email_address: yup.string().email("Please enter a valid email address").required("This is required"),
    password: yup.string()
                  .min(5, "Password must be at least 5 characters long")
                  .required("This is required")
  })
  const nav = useNavigate()
  const alert = useSelector((state)=> state.messages)
  const onSubmit = async (values, actions) => {
    dispatch(loginUsers(values))
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();

  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email_address: "",
      password: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  useEffect(()=> {

  },[alert])

  return (
    <div className="h-screen">

    <div className="m-base bg-[color:var(--gray)] rounded-login flex w-[60%] mx-auto p-8 gap-4">
      <div className="flex flex-col gap-4 flex-[0.4] p-12 bg-white">
        <h2 className="font-important text-base text-[color:var(--blue)]">Serenity Spirit</h2>
        <div className="">
          <h1 className="font-important text-med">Continue Your Journey From Where You Left Off</h1>
          <p className="font-important text-sm text-gray-500">Take a moment to log in and rediscover the incredible wellspring of strength within yourself</p>
        </div>
        <img className="" src={Rediscover} alt=""/>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 flex-[0.6] text-[color:var(--black)] ">
        <h1 className="font-important text-bigger">Log In</h1>
        <form className="flex flex-col gap-6 w-full px-12" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label>Email Address</label>
            <input className="px-4 py-2 rounded-input" 
            id="email_address"
            type="email"
            value={values.email_address}
            onBlur={handleBlur}
            onChange={handleChange}/>
            {errors.email_address && touched.email_address && <p className="text-red-500">{errors.email_address}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <label>Password</label>
            <input className="px-4 py-2 rounded-input" 
            id="password"
            type="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}/>
            {errors.password && touched.password && <p className="text-red-500">{errors.password}</p>}
          </div>
          <div className="flex justify-end">
            <button disabled={isSubmitting} className="bg-[color:var(--blue)] text-white rounded-input w-[145px] h-[40px]" type='submit'>Submit Login</button>
          </div>
        </form>
        <p className="pt-8">Don't have an account? <Link to='/signup' className="text-[color:var(--blue)]">Sign Up</Link></p>
      </div>
    </div>
    </div>

  )
}

export default LogIn