import axios from 'axios';

// const url = 'http://localhost:5000';
const url = 'https://serenity-ddcv.onrender.com';

export const fetchPosts = () => axios.get(url + '/posts')
export const createPost = (newPost, tags, image) => axios.post('/posts', {newPost, tags, image}, { withCredentials: true })
export const usersPosts = (user_id) => axios.post('/posts/users', {user_id}, { withCredentials: true })
export const myPosts = (user_id) => axios.post('/posts/my', {user_id}, { withCredentials: true })
export const deletePosts = (post_id) => axios.post('/posts/delete', {post_id}, { withCredentials: true })
export const updatePosts = (post_id, updateFields, image, status, tagsSelected) => axios.post('/posts/update', {post_id, updateFields, image, status, tagsSelected}, { withCredentials: true})
export const postsById = (id) => axios.post('/posts/id', {id}, { withCredentials: true})
export const postsInspired = () => axios.get('/posts/inspired', { withCredentials: true})
export const postCategory = (filter) => axios.post('/posts/category', {filter} ,{ withCredentials: true })
export const getFeed = () => axios.post('/posts/feed', { withCredentials: true })

// ** NOTE ** For some reason not including the url in the axios requests solves issue with accessing cookie located in Application -> Cookies -> tokenn
// Might need to tweak this in future if problem arises

export const fetchUsers = () => axios.get('/users', { withCredentials: true })
export const createUsers = (newUser) => axios.post('/users', newUser, { withCredentials: true })
export const loginUsers = (userData) => axios.post('/users/login', userData, { withCredentials: true })
export const profileUsers = () => axios.post('/users/profile', { withCredentials: true })
export const logout = () => axios.post('/users/logout', { withCredentials: true })
export const updateUsers = (userData, images) => axios.post('/users/update', {userData,images}, { withCredentials: true })
export const fetchUsersImage = (user_id) => axios.post('/users/image', {user_id}, { withCredentials: true})
export const getUserSecretly = (id) => axios.post('/users/secret', {id}, {withCredentials: true})
export const followUser = (id) => axios.post('/users/follow', {id}, {withCredentials: true})
export const filterUsers = (filter) => axios.post('/users/filter', {filter}, { withCredentials:true })
export const searchUsers = (search) => axios.post('/users/search', {search}, {withCredentials: true })

export const fetchMessages = () => axios.get('/messages', {withCredentials: true})
export const fetchUserMessaged = (ids) => axios.post('/messages', {ids}, {withCredentials: true})
export const messageHistory = (id) => axios.post('/messages/history', {id}, {withCredentials:true})
