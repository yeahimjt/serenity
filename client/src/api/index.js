import axios from 'axios';

// const url = 'http://localhost:5000';
const url = 'https://api.serenity-peace-api.com';

export const fetchPosts = () => axios.get(url + '/posts')
export const createPost = (newPost, tags, image) => axios.post(url + '/posts', {newPost, tags, image}, { withCredentials: true, credentials: 'include' })
export const usersPosts = (user_id) => axios.post(url + '/posts/users', {user_id}, { withCredentials: true, credentials: 'include'  })
export const myPosts = (user_id) => axios.post(url + '/posts/my', {user_id}, { withCredentials: true, credentials: 'include'  })
export const deletePosts = (post_id) => axios.post(url + '/posts/delete', {post_id}, { withCredentials: true, credentials: 'include'  })
export const updatePosts = (post_id, updateFields, image, status, tagsSelected) => axios.post(url + '/posts/update', {post_id, updateFields, image, status, tagsSelected}, { withCredentials: true, credentials: 'include' })
export const postsById = (id) => axios.post(url + '/posts/id', {id}, { withCredentials: true, credentials: 'include' })
export const postsInspired = () => axios.get(url + '/posts/inspired', { withCredentials: true, credentials: 'include' })
export const postCategory = (filter) => axios.post(url + '/posts/category', {filter} ,{ withCredentials: true, credentials: 'include' })
export const getFeed = () => axios.post(url + '/posts/feed', { withCredentials: true, credentials: 'include' })

// ** NOTE ** For some reason not including the url in the axios requests solves issue with accessing cookie located in Application -> Cookies -> tokenn
// Might need to tweak this in future if problem arises

export const fetchUsers = () => axios.get(url + '/users', { withCredentials: true, credentials: 'include' })
export const createUsers = (newUser) => axios.post(url + '/users', newUser, { withCredentials: true, credentials: 'include' })
export const loginUsers = (userData) => axios.post(url + '/users/login', userData, { withCredentials: true, credentials: 'include' })
export const profileUsers = () => axios.get(url + '/users/profile', { withCredentials: true, credentials: 'include' })
export const logout = () => axios.post(url + '/users/logout', { withCredentials: true, credentials: 'include' })
export const updateUsers = (userData, images) => axios.post(url + '/users/update', {userData,images}, { withCredentials: true, credentials: 'include' })
export const fetchUsersImage = (user_id) => axios.post(url + '/users/image', {user_id}, { withCredentials: true, credentials: 'include' })
export const getUserSecretly = (id) => axios.post(url + '/users/secret', {id}, {withCredentials: true, credentials: 'include' })
export const followUser = (id) => axios.post(url + '/users/follow', {id}, {withCredentials: true, credentials: 'include' })
export const filterUsers = (filter) => axios.post(url + '/users/filter', {filter}, { withCredentials:true, credentials: 'include' })
export const searchUsers = (search) => axios.post(url + '/users/search', {search}, {withCredentials: true, credentials: 'include' })

export const fetchMessages = () => axios.get(url + '/messages', {withCredentials: true, credentials: 'include' })
export const fetchUserMessaged = (ids) => axios.post(url + '/messages', {ids}, {withCredentials: true, credentials: 'include' })
export const messageHistory = (id) => axios.post(url + '/messages/history', {id}, {withCredentials:true, credentials: 'include' })
