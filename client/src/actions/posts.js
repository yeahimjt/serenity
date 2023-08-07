import * as api from '../api'

// Action Creators
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts()
        dispatch({ type: 'FETCH_ALL', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const getFeed = async (setPosts) => {
    try {
        const {data} = await api.getFeed()
        if (data.status === false) {
        }
        setPosts(data)
    } catch (error) {
       console.log(error.message)
    }
}

export const getPostsById = async (id, setPost) => {
    try {
        const { data } = await api.postsById(id)
        setPost(data)
    } catch (error) {
        console.log(error.message)
    }
}

export const getPostsByCategory = async (filter, setPost) => {
    try {
        const { data } = await api.postCategory(filter)
        setPost(data)
    } catch (error) {
        console.log(error.message)
    }
}

export const getPostsByInspired = async (setInspired) => {
    try {
        const { data } = await api.postsInspired()
        setInspired(data)
    } catch (error) {
        console.log(error.message)
    }
}

export const createPost = (post, tags, image) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post, tags, image)

        dispatch({ type: 'CREATE_POST', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const updatePost = async (post_id, updateFields, image, status, tagsSelected, setPosts) =>  {
    try {
        const { data } = await api.updatePosts(post_id, updateFields, image, status, tagsSelected)
        if (data) {
            setPosts(data)
        }
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

export const myPosts = async (user_id, setFilterText) => {
    try {
        const { data } = await api.myPosts(user_id)
        setFilterText(data)

    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost = async (post_id, setPosts) => {
    try {
        const { data } = await api.deletePosts(post_id)
        setPosts(data)
    } catch (error) {
        console.log(error.message)
    }
}