import * as api from '../api'

// Action Creators
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts()
        console.log(data)
        dispatch({ type: 'FETCH_ALL', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const createPost = (post, tags) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post, tags)

        dispatch({ type: 'CREATE', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const usersPosts = async (user_id, setFilterText) =>  {
    try {
        const { data } = await api.usersPosts(user_id)
        setFilterText(data)

    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost = (post_id, setPosts) => async (dispatch) => {
    try {
        const { data } = await api.deletePosts(post_id)
        setPosts(data)
        dispatch({ type: 'FETCH_ALL', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}