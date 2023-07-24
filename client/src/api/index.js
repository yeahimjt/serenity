import axios from 'axios';

// const url = 'http://localhost:5000';
const url = 'https://serenity-ddcv.onrender.com';

export const fetchPosts = () => axios.get(url + '/posts')
export const createPost = (newPost, tags, image) => axios.post(url + '/posts', {newPost, tags, image})
export const usersPosts = (user_id) => axios.post(url + '/posts/users', {user_id})
export const myPosts = (user_id) => axios.post(url + '/posts/my', {user_id})
export const deletePosts = (post_id) => axios.post(url + '/posts/delete', {post_id})
export const updatePosts = (post_id, updateFields, image, status, tagsSelected) => axios.post(url + '/posts/update', {post_id, updateFields, image, status, tagsSelected})
export const postsById = (id) => axios.post(url + '/posts/id', {id})
export const postsInspired = () => axios.get(url + '/posts/inspired' )
export const postCategory = (filter) => axios.post(url + '/posts/category', {filter})
export const getFeed = () => axios.post(url + '/posts/feed')

// ** NOTE ** For some reason not including the url in the axios requests solves issue with accessing cookie located in Application -> Cookies -> tokenn
// Might need to tweak this in future if problem arises

export const fetchUsers = () => axios.get(url + '/users')
export const createUsers = (newUser) => axios.post(url + '/users', newUser)
export const loginUsers = (userData) => axios.post(url + '/users/login', userData)
export const profileUsers = () => axios.post(url + '/users/profile')
export const logout = () => axios.post(url + '/users/logout')
export const updateUsers = (userData, images) => axios.post(url + '/users/update', {userData,images})
export const fetchUsersImage = (user_id) => axios.post(url + '/users/image', {user_id})
export const getUserSecretly = (id) => axios.post(url + '/users/secret', {id})
export const followUser = (id) => axios.post(url + '/users/follow', {id})
export const filterUsers = (filter) => axios.post(url + '/users/filter', {filter})
export const searchUsers = (search) => axios.post(url + '/users/search', {search})

export const fetchMessages = () => axios.get(url + '/messages')
export const fetchUserMessaged = (ids) => axios.post(url + '/messages', {ids})
export const messageHistory = (id) => axios.post(url + '/messages/history', {id})
