import PostMessage from '../models/postMessage.js';
import UserData from "../models/userdata.js";

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
        const something = await PostMessage.aggregate([
            {
                $match: {}
            },
            {
                $project: {tags: 1}
            },
            {
                $unwind: '$tags'
            },
            {
                $group: {
                    _id: { tag : '$tags'},
                    count: {$sum: 1}
                }
            }
        ])
        res.status(200).send({posts:postMessages,tags: something})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const getFeed = async (req,res) => {
    const { tokenn } = req.cookies
    let currentUser
    if (tokenn) {
        currentUser = jwt.verify(tokenn, process.env.SECRET_PHRASE)
        try {
            const posts = await PostMessage.find({user_id: currentUser.user.follow_list.user_id}).sort({"createdAt":-1})
            if (!posts.length > 0 ) {
                res.status(200).send({status: false})
            }
            else {
                res.status(200).send({posts, status:true})
            }
        } catch (error) {
            res.status(404).send({message: error.message})
        }
    }
    else {
        res.status(400).send({message: "You are not logged in."})
    }
    
}

export const deletePosts = async (req,res) => {
    const { post_id } = req.body
    const {tokenn} = req.cookies
    try {
        const user = jwt.verify(tokenn, process.env.SECRET_PHRASE)
        const deleted = await PostMessage.deleteOne({_id: post_id})
        if (deleted) {
            const postMessages = await PostMessage.find({_id: user.user.id});
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
        if (posts) {
            posts.inspired = posts.inspired + 1
            const updated = await posts.save()
            res.status(200).json(updated)
        }
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getPostsByCategory = async (req,res) => {
    const { filter } = req.body
    try {
        const posts = await PostMessage.find({tags: {"$in": [filter]}})
        res.status(200).send(posts)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getPostsByInspired = async (req,res) => {
    try {
        const mostInspired = await PostMessage.find({}).sort({"inspired":-1}).limit(5)
        res.status(200).send(mostInspired)
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const getUsersPosts = async (req,res) => {

    const {user_id} = req.body
    try {
        const usersPosts = await PostMessage.find({user_id: user_id})
        res.status(200).json(usersPosts)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}
export const getMyPosts = async (req,res) => {
    const { tokenn } = req.cookies
    try {
        const user = jwt.verify(tokenn, process.env.SECRET_PHRASE)
        const usersPosts = await PostMessage.find({user_id: user.user.id})

        res.status(200).json(usersPosts)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createPosts = async (req,res) => {
    const {newPost, tags, image} = req.body;
    const { tokenn }  = req.cookies

    if (!tokenn) {
      return res.sendStatus(204);
    }

    const user = jwt.verify(tokenn, process.env.SECRET_PHRASE)
    let tagss = []
    if (tags) {
        tags.forEach((tag)=> {tagss.push(tag['value'])})
    }
    let result
    if (image) {
        result = await cloudinary.v2.uploader.upload(image.replace(/(\r\n|\n|\r)/gm,""), {
            folder: "serenity",
            width: 500,
            crop: "scale"
        })
    }
    const newwPost = new PostMessage({title:newPost.title,full_name: user.user.full_name, user_id:user.user.id,message:newPost.message, tags: tagss, createdAt: new Date(), images: {public_id: result?.public_id, url: result?.secure_url}});
    try {
        await newwPost.save()
        const updateUser = await UserData.findOneAndUpdate({_id: user.user.id}, {"$inc": {stories: 1}})
        res.clearCookie("tokenn")

        const accessToken = jwt.sign(
            {
            user: {
                email_address: updateUser.email_address,
                full_name: updateUser.full_name,
                id: updateUser.id,
                source: updateUser.images.url,
                follow_list: {
                user_id: updateUser.follow_list.user_id
                },
                follower_list: {
                user_id: updateUser.follower_list.user_id
                },
                stories: updateUser.stories
            },
            },
            process.env.SECRET_PHRASE
        );
        res.cookie('tokenn', accessToken,{
            // maxAge: 60*60*24*3,
            // expires works the same as the maxAge
            expires: new Date('8 12 2023'),

            //CHANGE TO TRUE THAT IS WHAT IT SHULD BE I THINK
            secure: false,
            httpOnly: true,
            sameSite: 'lax'
            });
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
        let tags = []
        if (tagsSelected) {
            if (tagsSelected.length > 1) {
                tagsSelected.forEach((tag)=> {tags.push(tag['value'])})
            }
            else {
                tags = tagsSelected[0]['value']
            }
        }
        const post = await PostMessage.findById({_id: post_id})
        if (post) {
            post.title = updateFields.title || post.title
            post.message = updateFields.message || post.message
            post.images = {
                public_id: (result?result.public_id:null) || post.images.public_id,
                url: (result?result.secure_url:null) || post.images.url
              }
            post.status = (status? status.value : null) || post.status
            post.tags = (tags ? tags : null ) || post.tags

            const updatedPost = await post.save()
            const posts = await PostMessage.find({user_id: post.user_id})
            res.status(200).json(posts)
        }
    
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}
