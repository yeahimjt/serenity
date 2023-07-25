import UserData from "../models/userdata.js";
import dotenv from 'dotenv/config'
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import * as cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_KEY_SECRET,
})

export const getUsers = async (req,res) => {
    try {
        const users = await UserData.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
    
}

export const getUsersFiltered = async (req,res) => {
  const { filter } = req.body
  try {
    let users
    if (filter === 'inspiring')  {
      users = await UserData.aggregate([
        {
            $addFields: { "follow_list.user_id": {$size: { "$ifNull": [ "$answers", [] ] } }}
        }, 
        {   
            $sort: {"follower_list.user_id":-1} 
        }
    ])
      
    }
    else if (filter === 'recent') {
      users = await UserData.find().sort({"createdAt": -1})
    }
    else if (filter === 'stories') {
      users = await UserData.find().sort({"stories":-1})
    }
    res.status(200).send(users)
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}



export const getUsersSecretly = async (req,res) => {
  const { id } = req.body
  const { tokenn } = req.cookies
  let currentUser
  if (tokenn) {
    currentUser = jwt.verify(tokenn, process.env.SECRET_PHRASE)
  }
  try {
    const user = await UserData.findById({_id: id}, {password: 0, _id: 0, });
    res.status(200).send(user)
  } catch (error) {
    
  }
}

export const getUsersImage = async (req,res) => {
  const { user_id } = req.body;
  try {
      const users = await UserData.find({_id: user_id});
      res.status(200).json(users)
  } catch (error) {
    res.status(404).json({message:error.mesage})
    console.log(error.message)
  }
}

export const searchUsers = async (req,res) => {
  const {search} = req.body;
  try {
    const users = await UserData.find({"full_name": {'$regex': search, '$options': 'i'}}, {password: 0})
    if (users) {
      res.status(200).send(users)
    }
    else {
      res.status(200).send({users: null})
    }
    
  } catch (error) {
    res.status(404).json({message:error.mesage})
  }
}

export const followUser = async (req,res) => {
  const {id} = req.body
  const {tokenn} = req.cookies
  if (!tokenn) {
    return res.status(404).send({message: "You must be logged in."})
  }
  try {

    // Get currently logged in profile by accessing cookie data for user_id
    const me = jwt.verify(tokenn, process.env.SECRET_PHRASE)
    const user = await UserData.findById({_id: me.user.id})


    // Get user following/unfollowing from to update their follower list later
    const other = await UserData.findById({_id: id})

    // Check if user attemping to follow is already followed or not, if not follow them, else unfollow. (Do the same for the account being followed/unfollowed with the users id)
    if (!user.follow_list.user_id.includes(id)) {
      user.follow_list.user_id.push(id)
      other.follower_list.user_id.push(me.user.id) // Update user following/unfollowing from's follower list
      const updated = await user.save()
      const otherUpdated = await other.save()

      res.clearCookie("tokenn")
      const accessToken = jwt.sign(
        {
          user: {
            email_address: user.email_address,
            full_name: user.full_name,
            id: user.id,
            source: user.images.url,
            follow_list: {
              user_id: user.follow_list.user_id
            },
            follower_list: {
              user_id: user.follower_list.user_id
            },
            stories: user.stories
          },
        },
        process.env.SECRET_PHRASE
      );
      res.cookie('tokenn', accessToken,{
        // maxAge: 60*60*24*3,
        // expires works the same as the maxAge
        expires: new Date('8 30 2023'),

        //CHANGE TO TRUE THAT IS WHAT IT SHULD BE I THINK
        secure: true,
        httpOnly: false,
        sameSite: 'none'
        });

      return res.status(200).json({ user: {full_name: user.full_name, email_address: user.email_address, source: user.images.url, id: user._id, follow_list: {user_id: user.follow_list.user_id}, follower_list: {user_id: user.follower_list.user_id}, stories: user.stories} ,message: "You have successfully followed!" });

    }

    else {
      const updated = await UserData.updateOne({_id: me.user.id}, {$pull: {'follow_list.user_id': id}})
      const otherUpdated = await UserData.updateOne({_id: id}, {$pull: {'follower_list.user_id': me.user.id}})

      // Now that they are updated find our users account to send back
      const currentUser = await UserData.findById({_id: me.user.id})

      res.clearCookie("tokenn")
      const accessToken = jwt.sign(
        {
          user: {
            email_address: user.email_address,
            full_name: user.full_name,
            id: user.id,
            source: user.images.url,
            follow_list: {
              user_id: currentUser.follow_list.user_id
            },
            follower_list: {
              user_id: currentUser.follower_list.user_id
            },
            stories: user.stories
          },
        },
        process.env.SECRET_PHRASE
      );
      res.cookie('tokenn', accessToken,{
        // maxAge: 60*60*24*3,
        // expires works the same as the maxAge
        expires: new Date('8 12 2023'),

        //CHANGE TO TRUE THAT IS WHAT IT SHULD BE I THINK
        secure: true,
        httpOnly: false,
        sameSite: 'none'
        });

      
      return res.status(200).json({ user: {full_name: user.full_name, email_address: user.email_address, source: user.images.url, id: user._id, follow_list: {user_id: currentUser.follow_list.user_id}, follower_list: {user_id: currentUser.follower_list.user_id},stories: user.stories} ,message: "You have succesfully unfollowed!" });

    }

  } catch (error) {
    res.status(404).json({message: error.message})
  }
}

export const createUsers = async (req,res) => {
    const {full_name,email_address, password,anonymous} = req.body;
    const user = await UserData.findOne({ email_address })
    if (user) {
      res.status(400).send({message: 'This email address is already in use'})
    }
    else {
      const newUser = new UserData({full_name,email_address,password});
      try {
          await newUser.save()
          res.status(201).json(newUser)
      } catch (error) {
          res.status(409).json({message: error.message})
      }
    }
}

export const updateUsers = async (req,res) => {
  const userr = jwt.verify(req.cookies.tokenn, process.env.SECRET_PHRASE)
  const {userData, images} = req.body;
  let result

  if (images) {
    result = await cloudinary.v2.uploader.upload(images.replace(/(\r\n|\n|\r)/gm,""), {
      folder: "serenity",
      width: 500,
      crop: "scale"
    })
  }

  try {
    const user = await UserData.findById({ _id: userr.user.id })
    if (user) {
      user.full_name = userData.full_name || user.full_name
      user.email_address = userData.email_address || user.email_address
      user.images = {
        public_id: (result?result.public_id:null) || user.images.public_id,
        url: (result?result.secure_url:null) || user.images.url
      }

      const updated = await user.save()

      res.clearCookie("tokenn")

      const accessToken = jwt.sign(
        {
          user: {
            email_address: user.email_address,
            full_name: user.full_name,
            id: user.id,
            source: user.images.url,
            follow_list: {
              user_id: user.follow_list.user_id
            },
            follower_list: {
              user_id: user.follower_list.user_id
            },
            stories: user.stories
          },
        },
        process.env.SECRET_PHRASE
      );
      res.cookie('tokenn', accessToken,{
        // maxAge: 60*60*24*3,
        // expires works the same as the maxAge
        expires: new Date('8 12 2023'),

        //CHANGE TO TRUE THAT IS WHAT IT SHULD BE I THINK
        secure: true,
        httpOnly: false,
        sameSite: 'none'
        });
      return res.status(200).send({ user: {full_name: updated.full_name, email_address: updated.email_address, source: updated.images.url, id: updated._id, follow_list: {user_id: user.follow_list.user_id}, follower_list: {user_id: user.follower_list.user_id}, stories: user.stories} ,message: "You have successfully updated!" })
    }
  } catch (error) {
    res.status(409).json({message: error.message})
  }

}

export const loginUsers = async (req,res) => {
    const {email_address, password} = req.body;
    if (!email_address || !password) {
      return res.status(404).send({message: 'Error'})
    }
    const user = await UserData.findOne({ email_address });
    //compare password with hashedpassword
    if (user && (user.password === password)) {
      const accessToken = jwt.sign(
        {
          user: {
            email_address: user.email_address,
            full_name: user.full_name,
            id: user.id,
            source: user.images.url,
            follow_list: {
              user_id: user.follow_list.user_id
            },
            follower_list: {
              user_id: user.follower_list.user_id
            },
            stories: user.stories
          },
        },
        process.env.SECRET_PHRASE
      );
      res.cookie('tokenn', accessToken,{
        // maxAge: 60*60*24*3,
        // expires works the same as the maxAge
        expires: new Date('8 12 2023'),

        //CHANGE TO TRUE THAT IS WHAT IT SHULD BE I THINK
        secure: true,
        httpOnly: false,
        sameSite: 'none'
        });
      return res.status(200).json({ user: {full_name: user.full_name, email_address: `${email_address}`, source: user.images.url, id: user._id, follow_list: {user_id: user.follow_list.user_id}, follower_list: {user_id: user.follower_list.user_id}, stories: user.stories} ,message: "You have successfully logged in!" });
    } else {
      res.status(401).send({message: 'Error'});
      // throw new Error("email or password is not valid");
    }
}

export const profileUsers = async (req,res) => {
const { tokenn }  = req.cookies
console.log('token from profile', tokenn)
  if (!tokenn) {
    return res.sendStatus(204);
  }
  try {
    const user = jwt.verify(tokenn, process.env.SECRET_PHRASE)
    res.status(200).send(user.user)
  } catch (error) {
    return res.sendStatus(204)
  }
}

export const logout = async (req,res) => {
  const { tokenn } = req.cookies
  if (!tokenn) {
    return res.sendStatus(204);
  }
  try {
    res.clearCookie("tokenn")
    res.status(200).send({message: "You have successfuly logged out!"})
  } catch (error) {
    return res.sendStatus(204)
  }
}
