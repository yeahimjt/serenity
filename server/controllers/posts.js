import PostMessage from '../models/postMessage.js';
import jwt from 'jsonwebtoken';
import * as cloudinary from 'cloudinary'
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_KEY_SECRET,
})

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

export const getPostsById = async (req,res) => {
    const { id } = req.body
    try {
        const posts = await PostMessage.findById({_id: id})
        res.status(200).json(posts)
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
    const {newPost, tags, image} = req.body;
    const { tokenn }  = req.cookies
    let tag = ''
    if (!tokenn) {
      return res.sendStatus(204);
    }
    if (tags) {
        tags.forEach(el => {if (tag !== '' ) {tag=tag+','+el['value']} else {tag = el['value']}})
    }
    const user = jwt.verify(tokenn, 'supersecretsuperslongpassword')
    let result
    if (image) {
        result = await cloudinary.v2.uploader.upload(image.replace(/(\r\n|\n|\r)/gm,""), {
            folder: "serenity",
            width: 500,
            crop: "scale"
        })
    }
    const newwPost = new PostMessage({title:newPost.title,full_name: user.user.full_name, user_id:user.user.id,message:newPost.message, tags: tag, createdAt: new Date(), images: {public_id: result.public_id, url: result.secure_url}});
    try {
        await newwPost.save()
        res.status(201).json(newwPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const updatePosts = async (req,res) => {
    const {post_id, updateFields, image, status, tagsSelected} = req.body;
    const { tokenn } = req.cookies
    
    if (!tokenn) {
        return res.sendStatus(204);
    }
    
    let tags = ''
    if (tagsSelected) {
        tagsSelected.forEach(el => {if (tags !== '' ) {tags=tags+','+el['value']} else {tags = el['value']}})
    }
    let result
    if (image) {
        result = await cloudinary.v2.uploader.upload(image.replace(/(\r\n|\n|\r)/gm,""), {
            folder: "serenity",
            width: 500,
            crop: "scale"
        })
    }
    try {
        const user = jwt.verify(tokenn, 'supersecretsuperslongpassword')
        const post = await PostMessage.findById({_id: post_id})
        if (post) {
            post.title = updateFields.title || post.title
            post.message = updateFields.message || post.message
            post.images = {
                public_id: (result?result.public_id:null) || post.images.public_id,
                url: (result?result.secure_url:null) || post.images.url
              }
            post.status = (status? status.value : null) || post.status
            post.tags = tags || post.tags


            const updatedPost = await post.save()
            const posts = await PostMessage.find({user_id: post.user_id})
            res.status(200).json(posts)
        }
    
    } catch (error) {
        res.status(409).json({message: error.message})
    }

    

}