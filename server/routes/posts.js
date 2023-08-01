import express from 'express';
import {getPosts, createPosts, getUsersPosts, deletePosts, updatePosts, getPostsById, getPostsByInspired, getPostsByCategory, getFeed, getMyPosts} from '../controllers/posts.js'
const router = express.Router();

router.get('/', getPosts)
router.get('/inspired', getPostsByInspired)
router.post('/', createPosts)
router.post('/users', getUsersPosts)
router.post('/delete', deletePosts)
router.post('/update', updatePosts)
router.post('/id', getPostsById)
router.post('/category', getPostsByCategory)
router.get('/feed', getFeed)
router.post('/my', getMyPosts)


export default router