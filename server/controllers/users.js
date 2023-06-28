import UserData from "../models/userdata.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
export const getUsers = async (req,res) => {
    try {
        const users = await UserData.find();

        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({message: error.message})
        console.log(error.message)
    }
}

export const createUsers = async (req,res) => {
    const {full_name,email_address, password,anonymous} = req.body;
    const newUser = new UserData({full_name,email_address,password});
    try {
        await newUser.save()
        console.log(newUser)
        res.status(201).json(newUser)
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
      res.cookie('login_token', accessToken,{
        maxAge: 50000,
        // expires works the same as the maxAge
        // expires: new Date('8 12 2023'),
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
        });
      return res.status(200).json({ user: {full_name: user.full_name, email_address: `${email_address}`} ,message: "You have successfully logged in!" });
    } else {
      res.status(401).send({message: 'Error'});
      // throw new Error("email or password is not valid");
    }
}
