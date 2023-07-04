import axios from 'axios';

const url = 'http://localhost:5000';

export const fetchPosts = () => axios.get(url + '/posts')
export const createPost = (newPost, tags) => axios.post(url + '/posts', {newPost, tags}, { withCredentials: true })
export const usersPosts = (user_id) => axios.post(url + '/posts/users', {user_id}, { withCredentials: true })
export const deletePosts = (post_id) => axios.post(url + '/posts/delete', {post_id}, { withCredentials: true })

// ** NOTE ** For some reason not including the url in the axios requests solves issue with accessing cookie located in Application -> Cookies -> tokenn
// Might need to tweak this in future if problem arises

export const fetchUsers = () => axios.get(url + '/users', { withCredentials: true })
export const createUsers = (newUser) => axios.post('/users', newUser, { withCredentials: true })
export const loginUsers = (userData) => axios.post('/users/login', userData, { withCredentials: true })
export const profileUsers = () => axios.post('/users/profile', { withCredentials: true })
export const logout = () => axios.post('/users/logout', { withCredentials: true })
export const updateUsers = (userData, images) => axios.post('/users/update', {userData,images}, { withCredentials: true })
export const fetchUsersImage = (user_id) => axios.post(url + '/users/image', {user_id}, { withCredentials: true})