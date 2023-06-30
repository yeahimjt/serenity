import express from 'express';
import {getUsers, createUsers,loginUsers, profileUsers, logout, updateUsers} from '../controllers/users.js'
const router = express.Router();

router.get('/', getUsers)
router.post('/', createUsers)
router.post('/login', loginUsers)
router.post('/profile', profileUsers)
router.post('/update', updateUsers)
router.post('/logout', logout)

export default router