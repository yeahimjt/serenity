import express from 'express';
import {getUsers, createUsers,loginUsers} from '../controllers/users.js'
const router = express.Router();

router.get('/', getUsers)
router.post('/', createUsers)
router.post('/login', loginUsers)

export default router