import React, { useEffect, useRef, useState } from 'react'
import { deletePost, usersPosts } from '../actions/posts'
import { useDispatch, useSelector } from 'react-redux'
import { BsThreeDots } from 'react-icons/bs'
import DataTable, { Direction } from 'react-data-table-component'
import { Menu, MenuItem, MenuButton, MenuDivider, useClick, ControlledMenu, useHover } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import EditStory from './EditStory'
import { MdDelete, MdEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'
const MyStories = () => {
    const [posts, setPosts] = useState(null)
    const [modal, setModal] = useState({
        state: false,
        post_id: null
    })
    const dispatch = useDispatch()
    const user = useSelector((state)=> state.users)

    const handleSingleDelete = (post_id) => {
        dispatch(deletePost(post_id, setPosts))
    }
    const columns = [
        {
            name: 'Title',
            selector: row => <Link className="underline text-[color:var(--blue)]" to={`/story/${row._id}`}>{row.title}</Link>,
            sortable: true,
        },
        {
            name: "Published",
            selector: row => row.createdAt.split("T")[0],
            sortable: true,
        },
        {
            name: "Tags",
            selector: row => row.tags,
        },
        {
            name: "Status"
        },
        {
            name: "Actions",
            selector: row =>
            <section className="flex gap-2 justify-center items-center">
                <MdEdit className="cursor-pointer hover:bg-[color:var(--black)] hover:text-white rounded-full p-1" size={32} onClick={() => setModal({state:true, post_id: row})}/>
                <MdDelete className="cursor-pointer hover:bg-[color:var(--black)] hover:text-white rounded-full p-1" size={32} />
            </section>
        }
    ]

    useEffect(()=> {
        usersPosts(user.user.id,setPosts)
    },[])


    // Handle selection actions 
    const contextActions = React.useMemo(() => {
        const handleDelete = () => {
            console.log('deleting!')
        };

        return (
            <button className="bg-[color:var(--blue)] px-4 py-2 text-white rounded-input" onClick={handleDelete}>Delete</button>
        )
    })

  return (
    <div>
        {posts ?
            <DataTable
                title="My Stories"
                columns={columns}
                data={posts}
                pagination={true}
                selectableRows={true}
                highlightOnHover={true}
                pointerOnHover={false}
                contextActions={contextActions}
                selectableRowsHighlight={true}
                fixedHeader={true}
                dense={false}
                responsive={true}
                persistTableHead={true}
                striped={true}
                noTableHead={false}
                disabled={false}
            />
            :
            'no'
        }
        {modal.state === true ?
            <div className="fixed top-0 left-0 w-screen h-full z-20 bg-black/25 overflow-y-auto">
                <EditStory modal={modal} setModal={setModal} setPosts={setPosts}/>
            </div>
            :
            ''
        }
    </div>
  )
}

export default MyStories