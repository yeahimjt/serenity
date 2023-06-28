import axios from 'axios';

const url = 'http://localhost:5000';

export const fetchPosts = () => axios.get(url + '/posts')
export const createPost = (newPost) => axios.post(url + '/posts', newPost)

export const fetchUsers = () => axios.get(url + '/users')
export const createUsers = (newUser) => axios.post(url + '/users', newUser)
export const loginUsers = (userData) => axios.post(url + '/users/login', userData, { withCredentials: true })