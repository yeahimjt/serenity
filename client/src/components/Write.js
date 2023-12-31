import React, { useState } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from "yup"
import { createPost } from '../actions/posts';
import { MdPhotoCamera } from 'react-icons/md';

const animatedComponents = makeAnimated();

const Write = () => {
    const categories = [
        {value: "anxiety",label:"Anxiety"},
        {value: "depression",label:"Depression"},
        {value: "stress",label:"Stress"},
        {value: "substance",label:"Substance Dependence"},
        {value: "eating",label:"Eating Disorder"},
        {value: "social",label:"Social Anxiety"},
        {value: "ptsd",label:"PTSD"},
    ]

    const basicSchema = yup.object().shape({
        title: yup.string().required("This is required"),
        message: yup.string().required("This is required"),
    })
    const dispatch = useDispatch()
    const [selected, setSelected] = useState(null)
    const onSubmit = async (values, actions) => {
        dispatch(createPost(values, selected, image))
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
            title: "",
            message: "",
            tags: "",
    },
    validationSchema: basicSchema,
    onSubmit,
    });
    const handleTags = (selectedOption) => {
        setSelected(selectedOption)
    }
    const [image, setImage] = useState(null)
    const handleImage = (e) => {
        const file = e.target.files[0]
        setFileToBase(file)
        // setImage(file.name)
    }
    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImage(reader.result)
        }
    }
  return (
    <div className="flex flex-col gap-4 m-base tablet:w-[70%] tablet:mx-auto h-[100vh]">
        <section>
            <h1 className="font-important text-big">Share your story</h1>
            <p className="font-base text-base">Illuminate the path for others facing similar challanges or let them illuminate yours</p>
       </section>
       <hr />
       <form onSubmit={handleSubmit}>
       <div className="py-4 flex flex-col gap-2">
        <label className="font-important text-med" for="title">Title</label>
        <input className="font-base w-full h-[53px] border-2 rounded-input px-4 py-2"
        id="title"
        value={values.title}
        onBlur={handleBlur}
        onChange={handleChange}/>
        {errors.title && touched.title && <p className="text-red-500">{errors.title}</p>}

       </div>
       <div className="py-4 flex flex-col gap-2">
        <label className="font-important text-med" htmlFor="title">Story</label>
        <textarea className="font-base w-full h-[253px] border-2 rounded-input px-4 py-2 resize-y"
        id="message"
        value={values.message}
        onBlur={handleBlur}
        onChange={handleChange}/>
        {errors.message && touched.message && <p className="text-red-500">{errors.message}</p>}
       </div>
       <p className="font-base italic">Select the appropriate tags for your story to help those looking for their specific resolve</p>
       <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={categories}
        className=""
        id="tags"
        onBlur={handleBlur}
        onChange={handleTags}
        />
        {errors.tags && touched.tags && <p className="text-red-500">{errors.tags}</p>}
        <label className="flex gap-2 items-center rounded-full border-2 w-fit px-4 mt-4" htmlFor="file"> <MdPhotoCamera size={18}/> <p>Upload Photo</p></label>
        <input className="" type="file" id="file" onChange={handleImage}></input>
        <button className="bg-[color:var(--blue)] w-[210px] h-[31px] rounded-input text-white my-4" type="submit">Submit Story</button>
        </form>
    </div>
  )
}

export default Write