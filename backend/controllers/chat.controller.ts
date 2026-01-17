import asyncHandler from 'express-async-handler'
import { Request, Response, NextFunction } from 'express'
import prisma from '../lib/prima'

export const getChats = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = req

    const chats = await prisma.chat.findMany({
        where: {
            usersId: {
                has: userId
            }
        },
        include: {
            users : {
                select: {
                    id: true,
                    username: true,
                    avatar: true
                }
            }
        }
    })

    res.status(200).json({
        success: true,
        chats
    })
})

export const getChat = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    const {userId} = req

    const chat = await prisma.chat.findUnique({
        where: {
            id,
            usersId: {
                has: userId
            }
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    })

    if(!chat){
        throw new Error("Chat not found")
    }

    await prisma.chat.update({
        where: {
            id,
            usersId: {
                has: userId
            }
        },
        data: {
            seenBy: {
                push: userId
            }
        }
    })

    res.status(200).json({
        success: true,
        chat
    })

})

export const addChat = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {receiverId} = req.body
    const {userId} = req

    const newChat = await prisma.chat.create({
        data: {
            usersId: [userId, receiverId]
        },
    })

    res.status(201).json({
        success: true,
        newChat
    })
})

export const  readChat = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = req
    const {id} = req.params

    const chat = await prisma.chat.findUnique({
        where: {
            id,
            usersId: {
                has: userId
            }
        }
    })

    if(!chat){
        throw new Error("Chat not found")
    }

    await prisma.chat.update({
        where: {
            id,
            usersId: {
                has: userId
            }
        },
        data: {
            seenBy: {
                push: userId
            }
        }
    })

    res.status(200).json({
        success: true,
        chat
    })
})