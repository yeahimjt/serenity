import MessageData from '../models/messages.js';
import UserData from '../models/userdata.js';
import jwt from 'jsonwebtoken';


export const getMessagesOfUser = async (req,res) => {
    const {tokenn} = req.cookies
    const currentUser = jwt.verify(tokenn, process.env.SECRET_PHRASE)
    try {
        // get messages where user has recieved
        const messagesToUser = await MessageData.find({$or: [{recipient: currentUser.user.id}]}, {_id:0,text:0,createdAt:0,updatedAt:0,__v:0,recipient: 0})
        const messagesSentTo = messagesToUser.map((message)=>{return message.sender})
        const sentTo = messagesSentTo.filter((item,index) => messagesSentTo.indexOf(item) === index )

        // get messages where user has sent
        const messagesFromUser = await MessageData.find({$or: [{sender: currentUser.user.id}]}, {_id:0,text:0,createdAt:0,updatedAt:0,__v:0})
        const messagesFrom = messagesFromUser.map((message)=>{return message.recipient})
        const from = messagesFrom.filter((item,index)=> messagesFrom.indexOf(item) === index)

        // combine seperate arrays, keep unique values
        // This final variable now holds unique conversations either from our user or to our user regardless of them messaging back
        const combined = [...sentTo,...from]
        const combinedFiltered = combined.filter((item,index)=>combined.indexOf(item)===index)

        res.status(200).send(combinedFiltered)
    } catch (error) {
        res.status(404).send({status: "failed"})
    }
}

export const getUsersMessaged = async (req,res) => {
    const {ids} = req.body;
    try {
        const users = await UserData.find({_id: ids}, {password:0})
        res.status(200).send(users)
    } catch (error) {
        res.status(404).send({status:"failed"})
    }
}


export const getMessageHistory = async (req,res) => {
    const {id} = req.body;
    const {tokenn} = req.cookies
    const currentUser = jwt.verify(tokenn, process.env.SECRET_PHRASE)
    try {
        const messages = await MessageData.find({
            $or: [
                {
                    $and: [
                        {sender: id},
                        {recipient: currentUser.user.id}
                    ]
                },
                {
                    $and: [
                        {sender: currentUser.user.id},
                        {recipient: id}
                    ]
                }
            ]
        })
        res.status(200).send(messages)
    } catch (error) {
        res.status(404).send({status:"failed"})
    }
}