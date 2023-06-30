import PostMessage from '../models/postMessage.js';
import jwt from 'jsonwebtoken';

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
    const {newPost, tags} = req.body;
    console.log(req.body)
    const { tokenn }  = req.cookies
    let tag
    if (!tokenn) {
      return res.sendStatus(204);
    }
      const user = jwt.verify(tokenn, 'supersecretsuperslongpassword')
      if (tags) {
          tags.forEach(el => {if(el['value'] !== 'undefined') {tag=tag+','+el['value']}})
      }
    //   res.status(200).send(user.user)
    console.log(user)
    const newwPost = new PostMessage({title:newPost.title,full_name: user.user.full_name, user_id:user.user.id,message:newPost.message, tags: tag});
    try {
        await newwPost.save()
        res.status(201).json(newwPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}