import express from 'express';
import {getPosts, createPosts, getUsersPosts, deletePosts, updatePosts, getPostsById} from '../controllers/posts.js'
const router = express.Router();

router.get('/', getPosts)
router.post('/', createPosts)
router.post('/users', getUsersPosts)
router.post('/delete', deletePosts)
router.post('/update', updatePosts)
router.post('/id', getPostsById)

export default router