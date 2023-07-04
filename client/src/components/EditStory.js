import React, { useEffect, useState } from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();


const EditStory = ({modal,setModal}) => {
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
    const handleStatus = (selectedStatus) => {
        setStatus(selectedStatus)
    }
    const handleTags = (selectedTag) => {
        setTagsSelected(selectedTag)
    }
    useEffect(()=> {

    },[])
    console.log(status, tagsSelected)
  return (
    <div className="flex justify-center relative top-24">
        <section className="flex-[0.5] max-w-[680px] bg-white px-12 py-8 relative rounded-general">
            <AiOutlineClose className="absolute right-6 cursor-pointer hover:text-[color:var(--blue)]" size={24} onClick={()=>setModal(false)}/>
            <h1 className="font-important text-big">Update your story</h1>
            <hr />
            <div className="flex flex-col gap-2 mt-4">
                <label>Title</label>
                <input className="font-base w-full h-[53px] border-2 rounded-input px-4 py-2" value={modal.post_id.title}/>
                <label>Story</label>
                <textarea className="font-base w-full h-[253px] border-2 rounded-input px-4 py-2 resize-none" value={modal.post_id.message}/>
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
                <button className="float-left bg-[color:var(--blue)] w-[210px] h-[31px] rounded-input text-white my-4" type="submit">Submit Updates</button>
            </div>
        </section>
    </div>
  )
}

export default EditStory