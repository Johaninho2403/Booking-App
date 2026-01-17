import asyncHandler from 'express-async-handler'
import {Request, Response, NextFunction} from 'express'
import prisma from '../lib/prima'

export const addMessage = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {text} = req.body
    const {id} = req.params
    const {userId} = req

    const chat = await prisma.chat.findUnique({
        where: {
          id  
        }
    })

    if(!chat){
        throw new Error("Chat not found")
    }

    const message = await prisma.message.create({
        data: {
            text: String(text),
            userId: String(userId),
            chatId: id
        }
    })

    await prisma.chat.update({
        where: {
            id
        },
        data: {
            lastMessage: text,
            seenBy: {
                set: [userId]
            }
        }
    })

    res.status(201).json({
        success: true,
        message
    })
})