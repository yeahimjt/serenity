import PostMessage from '../models/postMessage.js';

export const getPosts = async (req,res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({message: error.message})
        console.log(error.message)
    }
}

export const createPosts = async (req,res) => {
    const {title,user_id, message} = req.body;
    const newPost = new PostMessage({title,user_id,message});
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}