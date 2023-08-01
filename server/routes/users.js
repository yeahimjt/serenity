import express from 'express';
import {getUsers, createUsers,loginUsers, profileUsers, logout, updateUsers, getUsersImage, getUsersSecretly, followUser, getUsersFiltered, searchUsers} from '../controllers/users.js'
const router = express.Router();

router.get('/', getUsers)
router.post('/', createUsers)
router.post('/login', loginUsers)
router.get('/profile', profileUsers)
router.post('/update', updateUsers)
router.post('/logout', logout)
router.post('/image', getUsersImage)
router.post('/secret', getUsersSecretly)
router.post('/follow', followUser)
router.post('/filter', getUsersFiltered)
router.post('/search', searchUsers)

export default router