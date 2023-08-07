import React, { useEffect, useState } from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import { MdPhotoCamera } from 'react-icons/md';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { updatePost } from '../actions/posts';

const animatedComponents = makeAnimated();


const EditStory = ({modal,setModal, setPosts}) => {
    const categories = [
        {value: "Active",label:"Active"},
        {value: "Inactive",label:"Inactive"},
        {value: "Followers",label:"Followers"},
    ]
    const tags = [
        {value: "anxiety",label:"Anxiety"},
        {value: "depression",label:"Depression"},
        {value: "stress",label:"Stress"},
        {value: "substance_dependence",label:"Substance Dependence"},
        {value: "eating_disorder",label:"Eating Disorder"},
        {value: "social_anxiety",label:"Social Anxiety"},
    ]
    const [status, setStatus] = useState(null)
    const [tagsSelected, setTagsSelected] = useState(null)
    const [updateFields, setUpdateFields] = useState({
        title: modal.post_id.title,
        message: modal.post_id.message,
    })
    const handleStatus = (selectedStatus) => {
        setStatus(selectedStatus)
    }
    const handleTags = (selectedTag) => {
        setTagsSelected(selectedTag)
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateFields({...updateFields, [name]: value})
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

    const handleEdit = (e) => {
        e.preventDefault()
        updatePost(modal.post_id._id, updateFields, image, status, tagsSelected, setPosts)
    }

    useEffect(()=> {

    },[])
  return (
    <div className="flex justify-center relative top-24 ">
        <section className="flex-[0.5] max-w-[680px] bg-white px-12 py-8 relative rounded-general">
            <AiOutlineClose className="absolute right-6 cursor-pointer hover:text-[color:var(--blue)]" size={24} onClick={()=>setModal(false)}/>
            <h1 className="font-important text-big">Update your story</h1>
            <hr />
            <div className="flex flex-col gap-2 mt-4">
                <label>Title</label>
                <input className="font-base w-full h-[53px] border-2 rounded-input px-4 py-2" name="title" value={updateFields['title']} onChange={handleChange}/>
                <label>Story</label>
                <textarea className="font-base w-full h-[253px] border-2 rounded-input px-4 py-2 resize-none" name="message" value={updateFields['message']} onChange={handleChange}/>
                <label>Status</label>
                <Select
                    closeMenuOnSelect={false}
                    options={categories}
                    className=""
                    id="tags"
                    onChange={handleStatus}
                    />
                <label>Tags</label>
                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={tags}
                    className=""
                    id="tags"
                    onChange={handleTags}
                    sele
                />
                <label className="flex gap-2 items-center rounded-full border-2 w-fit px-4 mt-2" htmlFor="file"> <MdPhotoCamera size={18}/> <p>Upload Photo</p></label>
                <input className="" type="file" id="file" onChange={handleImage}></input>
                <button className="float-left bg-[color:var(--blue)] w-[210px] h-[31px] rounded-input text-white my-4" type="submit" onClick={handleEdit}>Submit Updates</button>
            </div>
        </section>
    </div>
  )
}

export default EditStory