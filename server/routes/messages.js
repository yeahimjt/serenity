import express from 'express';
import { getMessageHistory, getMessagesOfUser, getUsersMessaged } from '../controllers/messages.js'
const router = express.Router();

router.get('/', getMessagesOfUser)
router.post('/', getUsersMessaged)
router.post('/history', getMessageHistory)


export default router