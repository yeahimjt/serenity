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
        console.log(error.message)
    }
}

export const getUsersImage = async (req,res) => {
  const { user_id } = req.body;
  try {
      const users = await UserData.find({_id: user_id});
      console.log(users)
      res.status(200).json(users)
  } catch (error) {
    res.status(404).json({message:error.mesage})
    console.log(error.message)
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
  const { tokenn }  = req.cookies
  const userr = jwt.verify(tokenn, process.env.SECRET_PHRASE)
  const {full_name, email_address,password, images,anonymous} = req.body;
    const result = await cloudinary.v2.uploader.upload(images.replace(/(\r\n|\n|\r)/gm,""), {
      folder: "serenity",
      width: 500,
      crop: "scale"
    })
    try {
      const user = await UserData.findOneAndUpdate({ _id: userr.user.id }, 
        {
          full_name,
          email_address,
          password, 
          images: {
            public_id: result.public_id,
            url: result.secure_url
          },
        })
        res.status(200).send(user)
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
          },
        },
        'supersecretsuperslongpassword'
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
      return res.status(200).json({ user: {full_name: user.full_name, email_address: `${email_address}`, source: user.images.url} ,message: "You have successfully logged in!" });
    } else {
      res.status(401).send({message: 'Error'});
      // throw new Error("email or password is not valid");
    }
}

export const profileUsers = async (req,res) => {
const { tokenn }  = req.cookies
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
