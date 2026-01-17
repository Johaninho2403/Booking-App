import {Request, Response, NextFunction} from 'express'
import asyncHandler from 'express-async-handler'
import prisma from '../lib/prima'
import cloudinary from '../lib/cloudinary'


export const updateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = req
    const avatar = req.file

    let result
    if(avatar){
      result = await cloudinary.uploader.upload(avatar.path, {resource_type: "image"})
    }

    const data ={...req.body}
    if(avatar){
        data.avatar = result?.secure_url
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data
    })

    const {password, ...userInfo} = updatedUser

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        userInfo

    })
    
})

export const savePost = asyncHandler(async (req:Request, res: Response, next: NextFunction) => {
    const {id} = req.params

    const post = await prisma.post.findUnique({
        where: {
            id
        }
    })

    if(!post){
        throw new Error("Post not found")
    }

    
    const existingSavedPost = await prisma.savedPost.findUnique({
        where: {
            userId_postId: {
                postId: id,
                userId: req.userId
            }
        }
    })

    if(existingSavedPost){
        await prisma.savedPost.delete({
             where: {
            userId_postId: {
                postId: id,
                userId: req.userId
            }
        }
        })
       return  res.status(200).json({
            success: true,
            message: "Post unsaved"
        })
    }
    
    const savedPost = await prisma.savedPost.create({
        data: {
            postId: id,
            userId: req.userId
        }
    })

    res.status(201).json({
        success: true,
        message: "Post saved successfully",
        savedPost
    })
    
})

export const userProfile = asyncHandler(async (req:Request, res: Response, next: NextFunction) => {
    
    const user = await prisma.user.findUnique({
        where: {
            id: req.userId
        },
        include: {
            posts: true,
            savedPosts: {
                select: {
                    post: true
                },
                },
            },
        omit: {
            password: true
        }
    })

    if(!user){
        throw new Error("User not found")
    }

    res.status(200).json({
        success: true,
        user
    })
})