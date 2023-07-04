import React, { useEffect, useState } from 'react'
import { deletePost, usersPosts } from '../actions/posts'
import { useDispatch, useSelector } from 'react-redux'
import { BsThreeDots } from 'react-icons/bs'
import DataTable, { Direction } from 'react-data-table-component'
import { Menu, MenuItem, MenuButton, MenuDivider } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import EditStory from './EditStory'
const MyStories = () => {
    const [posts, setPosts] = useState(null)
    const [modal, setModal] = useState({
        state: false,
        post_id: null
    })
    const dispatch = useDispatch()
    const user = useSelector((state)=> state.users)
    const handleSingleDelete = (post_id) => {
        console.log('in here')
        dispatch(deletePost(post_id, setPosts))
    }
    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
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
            name: "Actions",
            selector: row =>
            <Menu className="" menuButton={<BsThreeDots className="cursor-pointer" size={12} />} align="center" position="anchor" viewScroll='auto'>
                <MenuItem onClick={() => setModal({
                    state:true,
                    post_id: row
                })}>Edit</MenuItem>
                <MenuItem onClick={() => handleSingleDelete(row._id)}>Delete</MenuItem>
                <MenuDivider />
                <MenuItem>Set Active</MenuItem>
            </Menu>
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

    console.log(modal)

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
            <div className="absolute top-0 left-0 w-screen h-full z-20 bg-black/25">
                <EditStory modal={modal} setModal={setModal} />
            </div>
            :
            ''
        }
    </div>
  )
}

export default MyStories