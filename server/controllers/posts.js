import PostMessage from '../models/postMessage.js';
import jwt from 'jsonwebtoken';

export const getPosts = async (req,res) => {
    try {
        const postMessages = await PostMessage.find();
        console.log(postMessages)
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({message: error.message})
        console.log(error.message)
    }
}

export const deletePosts = async (req,res) => {
    const { post_id } = req.body
    try {
        const deleted = await PostMessage.deleteOne({_id: post_id})
        if (deleted) {
            const postMessages = await PostMessage.find();
            res.status(200).json(postMessages)
        }
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getUsersPosts = async (req,res) => {
    const { tokenn } = req.cookies
    try {
        const user = jwt.verify(tokenn, 'supersecretsuperslongpassword')
        const usersPosts = await PostMessage.find({user_id: user.user.id})
        res.status(200).json(usersPosts)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createPosts = async (req,res) => {
    const {newPost, tags} = req.body;
    const { tokenn }  = req.cookies
    let tag = ''
    if (!tokenn) {
      return res.sendStatus(204);
    }
      const user = jwt.verify(tokenn, 'supersecretsuperslongpassword')
      if (tags) {
          tags.forEach(el => {if (tag !== '' ) {tag=tag+','+el['value']} else {tag = el['value']}})
      }
    const newwPost = new PostMessage({title:newPost.title,full_name: user.user.full_name, user_id:user.user.id,message:newPost.message, tags: tag, createdAt: new Date()});
    try {
        await newwPost.save()
        res.status(201).json(newwPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}